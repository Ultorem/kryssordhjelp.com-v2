import React, { useState, useEffect } from 'react';
import { Trophy, CheckSquare } from 'lucide-react';

const emojis = ['🌱', '🌿', '🌺', '🌸', '🌼', '⭐', '🌟', '✨', '🏆', '👑'];

const CrosswordProgress: React.FC = () => {
  const [completedCount, setCompletedCount] = useState(() => {
    const saved = localStorage.getItem('crosswordProgress');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('crosswordProgress', completedCount.toString());
  }, [completedCount]);

  const getCurrentEmoji = () => {
    const level = Math.min(Math.floor(completedCount / 10), emojis.length - 1);
    return emojis[level];
  };

  const handleComplete = () => {
    setCompletedCount(prev => prev + 1);
  };

  return (
    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Din Fremgang
        </h3>
      </div>

      <div className="text-center mb-3">
        <span className="text-4xl">{getCurrentEmoji()}</span>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Løste kryssord: {completedCount}
        </div>
      </div>

      <button
        onClick={handleComplete}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 
                 bg-purple-100 dark:bg-purple-800 hover:bg-purple-200 
                 dark:hover:bg-purple-700 rounded-lg transition-colors"
      >
        <CheckSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        <span className="text-purple-700 dark:text-purple-300">Merk som løst</span>
      </button>
    </div>
  );
};

export default CrosswordProgress;