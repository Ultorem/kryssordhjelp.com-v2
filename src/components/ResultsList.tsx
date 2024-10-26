import React from 'react';

interface ResultsListProps {
  results: string[];
  onWordClick: (word: string) => void;
}

const ResultsList: React.FC<ResultsListProps> = ({ results, onWordClick }) => {
  if (results.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Resultater</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((word, index) => (
          <div
            key={index}
            onClick={() => onWordClick(word)}
            className="bg-blue-50 rounded-lg p-3 text-center hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <span className="text-gray-700">{word}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsList;