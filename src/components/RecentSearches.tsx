import React from 'react';
import { History } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSearchClick: (word: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onSearchClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <History className="w-5 h-5 text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Nylige søk</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearchClick(search)}
            className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;