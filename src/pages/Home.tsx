import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';

const popularWords = [
  'fjord', 'hytte', 'skog', 'elv', 'fjell', 'troll', 'nisse',
  'gård', 'båt', 'ski', 'kaffe', 'lefse', 'bunad', 'viking',
  'brunost', 'stavkirke'
];

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/ord/${searchTerm.toLowerCase()}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="flex justify-center mb-6">
          <BookOpen className="w-16 h-16 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Norsk Ordbok
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Din komplette guide til norske ord, definisjoner og betydninger
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Søk etter et ord..."
            className="w-full px-6 py-4 text-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                     dark:focus:ring-blue-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 
                     text-gray-500 dark:text-gray-400 hover:text-blue-600 
                     dark:hover:text-blue-400"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Populære søk
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularWords.map((word) => (
              <button
                key={word}
                onClick={() => navigate(`/ord/${word}`)}
                className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full 
                         text-blue-700 dark:text-blue-300 hover:bg-blue-100 
                         dark:hover:bg-blue-900/50"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Dagens ord
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>FJORD</strong> - En lang, smal havarm som strekker seg inn i landet,
            ofte omgitt av bratte fjellsider
          </p>
          <button
            onClick={() => navigate('/ord/fjord')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 
                     dark:hover:text-blue-300"
          >
            Les mer →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;