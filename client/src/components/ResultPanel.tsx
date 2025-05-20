import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import HistoryItem from "./HistoryItem";
import { HistoryItemType } from "@/hooks/use-utm";

interface ResultPanelProps {
  generatedUrl: string;
  historyItems: HistoryItemType[];
  onCopy: () => void;
  onClearHistory: () => void;
  onSelectHistoryItem: (item: HistoryItemType) => void;
  onRemoveHistoryItem: (index: number) => void;
}

const ResultPanel: React.FC<ResultPanelProps> = ({
  generatedUrl,
  historyItems,
  onCopy,
  onClearHistory,
  onSelectHistoryItem,
  onRemoveHistoryItem
}) => {
  return (
    <Card className="sticky top-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold mb-4">URL Gerada</h2>
        
        <div className="mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 break-all">
            <p className="text-sm font-mono">
              {generatedUrl || "Adicione uma URL base para começar"}
            </p>
          </div>
          
          <div className="mt-4">
            <Button 
              onClick={onCopy}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Copy className="w-4 h-4 mr-2" />
              <span>Copiar URL</span>
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-semibold mb-3 flex items-center justify-between">
            <span>Histórico Recente</span>
            <button 
              onClick={onClearHistory}
              className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            >
              Limpar
            </button>
          </h3>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-dropdown">
            {historyItems.length === 0 ? (
              <div className="text-gray-400 text-xs text-center py-2">
                Nenhum histórico disponível
              </div>
            ) : (
              historyItems.map((item, index) => (
                <HistoryItem
                  key={item.timestamp}
                  item={item}
                  index={index}
                  onSelect={() => onSelectHistoryItem(item)}
                  onRemove={() => onRemoveHistoryItem(index)}
                />
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultPanel;
