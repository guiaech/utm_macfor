import React from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import SearchableDropdown from "./SearchableDropdown";
import { platformOptions, mediumOptions } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UTMFormProps {
  websiteUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  errors: {
    websiteUrl?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
  };
  setWebsiteUrl: (value: string) => void;
  setUtmSource: (value: string) => void;
  setUtmMedium: (value: string) => void;
  setUtmCampaign: (value: string) => void;
  setUtmContent: (value: string) => void;
  setUtmTerm: (value: string) => void;
  validateWebsiteUrl: (url: string) => boolean;
  validateUtmParameter: (value: string) => boolean;
}

const UTMForm: React.FC<UTMFormProps> = ({
  websiteUrl,
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
  utmTerm,
  errors,
  setWebsiteUrl,
  setUtmSource,
  setUtmMedium,
  setUtmCampaign,
  setUtmContent,
  setUtmTerm,
  validateWebsiteUrl,
  validateUtmParameter
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6">Criar URL com Parâmetros UTM</h2>
        
        <form className="space-y-6">
          {/* Website URL */}
          <div>
            <Label htmlFor="website-url" className="mb-1">
              Website URL <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type="url"
                id="website-url"
                name="website-url"
                placeholder="https://www.example.com"
                value={websiteUrl}
                onChange={(e) => {
                  setWebsiteUrl(e.target.value);
                  validateWebsiteUrl(e.target.value);
                }}
                className={errors.websiteUrl ? "border-red-500" : ""}
                required
              />
              {errors.websiteUrl && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.websiteUrl}
                </div>
              )}
            </div>
          </div>

          {/* UTM Source */}
          <div>
            <Label htmlFor="utm-source" className="mb-1">
              Campaign Source (utm_source) <span className="text-red-500">*</span>
            </Label>
            <SearchableDropdown
              id="utm-source"
              value={utmSource}
              onChange={setUtmSource}
              options={platformOptions}
              placeholder="Selecione a plataforma"
              searchPlaceholder="Buscar plataforma..."
            />
          </div>

          {/* UTM Medium */}
          <div>
            <Label htmlFor="utm-medium" className="mb-1">
              Campaign Medium (utm_medium) <span className="text-red-500">*</span>
            </Label>
            <SearchableDropdown
              id="utm-medium"
              value={utmMedium}
              onChange={setUtmMedium}
              options={mediumOptions}
              placeholder="Selecione a estratégia"
              searchPlaceholder="Buscar estratégia..."
            />
          </div>

          {/* UTM Campaign */}
          <div>
            <Label htmlFor="utm-campaign" className="mb-1">
              Campaign Name (utm_campaign) <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="utm-campaign"
                name="utm_campaign"
                placeholder="exemplo-campanha-verao"
                value={utmCampaign}
                onChange={(e) => {
                  setUtmCampaign(e.target.value);
                  validateUtmParameter(e.target.value);
                }}
                className={errors.utmCampaign ? "border-red-500" : ""}
                required
              />
              {errors.utmCampaign && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.utmCampaign}
                </div>
              )}
            </div>
          </div>

          {/* UTM Content */}
          <div>
            <Label htmlFor="utm-content" className="mb-1">
              Campaign Content (utm_content)
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="utm-content"
                name="utm_content"
                placeholder="banner-hero"
                value={utmContent}
                onChange={(e) => {
                  setUtmContent(e.target.value);
                  validateUtmParameter(e.target.value);
                }}
                className={errors.utmContent ? "border-red-500" : ""}
              />
              {errors.utmContent && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.utmContent}
                </div>
              )}
            </div>
          </div>

          {/* UTM Term */}
          <div>
            <Label htmlFor="utm-term" className="mb-1">
              Campaign Term (utm_term)
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="utm-term"
                name="utm_term"
                placeholder="marketing-digital"
                value={utmTerm}
                onChange={(e) => {
                  setUtmTerm(e.target.value);
                  validateUtmParameter(e.target.value);
                }}
                className={errors.utmTerm ? "border-red-500" : ""}
              />
              {errors.utmTerm && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.utmTerm}
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UTMForm;
