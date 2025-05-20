import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";

interface SearchableDropdownProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  searchPlaceholder: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Focus the search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative cursor-pointer"
        onClick={toggleDropdown}
      >
        <Input
          type="text"
          id={id}
          value={value}
          placeholder={placeholder}
          className="cursor-pointer"
          readOnly
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
      
      {isOpen && (
        <div className="custom-dropdown absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1">
          <div className="p-2 border-b dark:border-gray-700">
            <div className="relative">
              <Input
                ref={searchInputRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-8 text-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                Nenhuma opção encontrada
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
