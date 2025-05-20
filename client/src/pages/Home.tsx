import React from "react";
import UTMForm from "@/components/UTMForm";
import ResultPanel from "@/components/ResultPanel";
import { ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useUtm } from "@/hooks/use-utm";

const Home: React.FC = () => {
  const {
    websiteUrl,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    errors,
    historyItems,
    generatedUrl,
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
    validateUtmParameter,
  } = useUtm();

  const { toast } = useToast();

  const copyToClipboard = async () => {
    if (generatedUrl && generatedUrl.startsWith("http")) {
      try {
        await navigator.clipboard.writeText(generatedUrl);
        toast({
          title: "URL copiada com sucesso!",
          variant: "success",
        });
        addToHistory();
      } catch (err) {
        toast({
          title: "Falha ao copiar URL",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Gere uma URL válida primeiro",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">
              MACFOR - UTM Builder{" "}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <UTMForm
              websiteUrl={websiteUrl}
              utmSource={utmSource}
              utmMedium={utmMedium}
              utmCampaign={utmCampaign}
              utmContent={utmContent}
              utmTerm={utmTerm}
              errors={errors}
              setWebsiteUrl={setWebsiteUrl}
              setUtmSource={setUtmSource}
              setUtmMedium={setUtmMedium}
              setUtmCampaign={setUtmCampaign}
              setUtmContent={setUtmContent}
              setUtmTerm={setUtmTerm}
              validateWebsiteUrl={validateWebsiteUrl}
              validateUtmParameter={validateUtmParameter}
            />
          </div>
          <div className="md:col-span-1">
            <ResultPanel
              generatedUrl={generatedUrl}
              historyItems={historyItems}
              onCopy={copyToClipboard}
              onClearHistory={clearHistory}
              onSelectHistoryItem={setFromHistoryItem}
              onRemoveHistoryItem={removeHistoryItem}
            />
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Gerador de UTM. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
