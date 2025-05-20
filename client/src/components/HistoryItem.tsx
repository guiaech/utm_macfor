import React from "react";
import { X } from "lucide-react";
import { HistoryItemType } from "@/hooks/use-utm";

interface HistoryItemProps {
  item: HistoryItemType;
  index: number;
  onSelect: () => void;
  onRemove: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  item,
  onSelect,
  onRemove
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // Only trigger onSelect if not clicking the remove button
    if (!(e.target as HTMLElement).closest('button')) {
      onSelect();
    }
  };

  return (
    <div 
      className="bg-gray-50 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-xs relative group cursor-pointer"
      onClick={handleClick}
    >
      <div className="font-medium mb-1 pr-6 truncate">{item.domain}</div>
      <div className="text-gray-500 dark:text-gray-400 truncate">
        {item.source} / {item.medium} / {item.campaign}
      </div>
      <button 
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

export default HistoryItem;
