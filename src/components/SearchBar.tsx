import React, { KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Skriv inn et ord..."
        className="w-full px-6 py-4 text-lg rounded-full border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors pl-14"
      />
      <button
        onClick={() => onSearch(searchTerm)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors"
      >
        <Search className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SearchBar;