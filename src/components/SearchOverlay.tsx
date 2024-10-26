import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, ArrowRight } from 'lucide-react';
import { getSuggestions } from '../services/api';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 1) {
        const results = await getSuggestions(searchTerm);
        setSuggestions(results.slice(0, 6));
      } else {
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/ord/${term.toLowerCase()}`);
      onClose();
      setSearchTerm('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="p-4 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Søk etter et ord..."
                className="w-full pl-12 pr-4 py-3 text-lg bg-gray-50 dark:bg-gray-700 
                         border border-gray-200 dark:border-gray-600 rounded-lg
                         text-gray-900 dark:text-gray-100 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 
                         text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-700">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full flex items-center justify-between px-4 py-3 
                             text-gray-700 dark:text-gray-200 hover:bg-gray-50 
                             dark:hover:bg-gray-700/50 group"
                  >
                    <span>{suggestion}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 
                                       transition-opacity text-blue-500" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;