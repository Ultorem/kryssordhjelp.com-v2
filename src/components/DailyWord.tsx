import React, { useState, useEffect } from 'react';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dailyWords } from '../data/dailyWords';

const DailyWord: React.FC = () => {
  const [dailyWord, setDailyWord] = useState(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return dailyWords[dayOfYear % dailyWords.length];
  });

  return (
    <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <Book className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Dagens ord
        </h3>
      </div>

      <div className="mb-3">
        <Link 
          to={`/ord/${dailyWord.word.toLowerCase()}`}
          className="text-xl font-bold text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200"
        >
          {dailyWord.word}
        </Link>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {dailyWord.category}
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {dailyWord.definition}
        </p>
      </div>
    </div>
  );
};

export default DailyWord;