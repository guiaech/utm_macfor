import { useState, useEffect, useMemo } from "react";

export interface HistoryItemType {
  url: string;
  domain: string;
  source: string;
  medium: string;
  campaign: string;
  timestamp: number;
}

export const useUtm = () => {
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [utmSource, setUtmSource] = useState<string>("");
  const [utmMedium, setUtmMedium] = useState<string>("");
  const [utmCampaign, setUtmCampaign] = useState<string>("");
  const [utmContent, setUtmContent] = useState<string>("");
  const [utmTerm, setUtmTerm] = useState<string>("");
  const [historyItems, setHistoryItems] = useState<HistoryItemType[]>([]);
  const [errors, setErrors] = useState<{
    websiteUrl?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
  }>({});

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("utmHistory");
    if (savedHistory) {
      try {
        setHistoryItems(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history from localStorage", e);
      }
    }
  }, []);

  // Validate URL format
  const validateWebsiteUrl = (url: string): boolean => {
    if (!url) return true;
    
    const regex = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    const isValid = regex.test(url);
    
    setErrors(prev => ({
      ...prev,
      websiteUrl: isValid ? undefined : "Por favor, insira uma URL válida incluindo http:// ou https://"
    }));
    
    return isValid;
  };

  // Validate UTM parameters (no special chars or spaces)
  const validateUtmParameter = (value: string, field?: 'utmCampaign' | 'utmContent' | 'utmTerm'): boolean => {
    if (!value) return true;
    
    const regex = /^[a-zA-Z0-9_-]*$/;
    const isValid = regex.test(value);
    
    if (field) {
      setErrors(prev => ({
        ...prev,
        [field]: isValid ? undefined : "Não são permitidos caracteres especiais ou espaços."
      }));
    }
    
    return isValid;
  };

  // Generate the URL whenever parameters change
  const generatedUrl = useMemo(() => {
    if (!websiteUrl) {
      return "";
    }

    try {
      const url = new URL(websiteUrl);
      
      if (utmSource) url.searchParams.append("utm_source", utmSource);
      if (utmMedium) url.searchParams.append("utm_medium", utmMedium);
      if (utmCampaign) url.searchParams.append("utm_campaign", utmCampaign);
      if (utmContent) url.searchParams.append("utm_content", utmContent);
      if (utmTerm) url.searchParams.append("utm_term", utmTerm);
      
      return url.toString();
    } catch (e) {
      return "";
    }
  }, [websiteUrl, utmSource, utmMedium, utmCampaign, utmContent, utmTerm]);

  // Add to history
  const addToHistory = () => {
    if (!generatedUrl) return;
    
    try {
      const url = new URL(generatedUrl);
      const domain = url.hostname;
      const source = url.searchParams.get("utm_source") || "-";
      const medium = url.searchParams.get("utm_medium") || "-";
      const campaign = url.searchParams.get("utm_campaign") || "-";
      
      const historyItem: HistoryItemType = {
        url: generatedUrl,
        domain,
        source,
        medium,
        campaign,
        timestamp: Date.now()
      };
      
      const updatedHistory = [historyItem, ...historyItems].slice(0, 10); // Keep only last 10 items
      setHistoryItems(updatedHistory);
      localStorage.setItem("utmHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  };

  // Remove history item
  const removeHistoryItem = (index: number) => {
    const updatedHistory = [...historyItems];
    updatedHistory.splice(index, 1);
    setHistoryItems(updatedHistory);
    localStorage.setItem("utmHistory", JSON.stringify(updatedHistory));
  };

  // Clear all history
  const clearHistory = () => {
    setHistoryItems([]);
    localStorage.removeItem("utmHistory");
  };

  // Set form values from history item
  const setFromHistoryItem = (item: HistoryItemType) => {
    try {
      const url = new URL(item.url);
      
      // Extract base URL (protocol + hostname + pathname)
      setWebsiteUrl(`${url.protocol}//${url.hostname}${url.pathname}`);
      
      // Set UTM parameters
      setUtmSource(url.searchParams.get("utm_source") || "");
      setUtmMedium(url.searchParams.get("utm_medium") || "");
      setUtmCampaign(url.searchParams.get("utm_campaign") || "");
      setUtmContent(url.searchParams.get("utm_content") || "");
      setUtmTerm(url.searchParams.get("utm_term") || "");
    } catch (error) {
      console.error("Error setting form from history:", error);
    }
  };

  return {
    websiteUrl,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    generatedUrl,
    historyItems,
    errors,
    setWebsiteUrl,
    setUtmSource,
    setUtmMedium,
    setUtmCampaign,
    setUtmContent,
    setUtmTerm,
    addToHistory,
    removeHistoryItem,
    clearHistory,
    setFromHistoryItem,
    validateWebsiteUrl,
    validateUtmParameter
  };
};