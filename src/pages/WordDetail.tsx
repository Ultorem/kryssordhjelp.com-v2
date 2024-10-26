import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Loader2, Book, ExternalLink } from 'lucide-react';
import { WordArticle, searchWord, getSuggestions } from '../services/api';

const WordDetail: React.FC = () => {
  const { word } = useParams<{ word: string }>();
  const [wordData, setWordData] = useState<WordArticle | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWordData = async () => {
      if (!word) return;
      setLoading(true);
      
      try {
        const [searchResults, suggestionResults] = await Promise.all([
          searchWord(word),
          getSuggestions(word)
        ]);
        
        setSuggestions(suggestionResults);
        if (searchResults && searchResults.length > 0) {
          setWordData(searchResults[0]);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWordData();
  }, [word]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Hjem
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <li className="text-gray-900 dark:text-gray-100 font-medium">{word}</li>
        </ol>
      </nav>

      {wordData ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {wordData.lemmas[0].lemma}
            </h1>
            <Book className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {wordData.lemmas[0].wordClass && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {wordData.lemmas[0].wordClass}
              </span>
            )}
            {wordData.lemmas[0].gender && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                {wordData.lemmas[0].gender}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {wordData.definitions.map((def, index) => (
              <div key={index} className="border-l-4 border-blue-200 dark:border-blue-700 pl-4">
                <p className="text-gray-800 dark:text-gray-200 text-lg mb-3">{def.definition}</p>
                {def.examples && def.examples.length > 0 && (
                  <ul className="space-y-2">
                    {def.examples.map((example, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-400 italic">
                        "{example}"
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Kilde: {wordData.dictionary === 'bm' ? 'Bokmålsordboka' : 'Nynorskordboka'}</span>
              <a
                href={`https://ordbokene.no/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Se på ordbokene.no
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Lignende ord</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {suggestions.map((suggestion) => (
              <Link
                key={suggestion}
                to={`/ord/${suggestion}`}
                className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg 
                         hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  {suggestion}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Fant ingen eksakt match for "{word}". Prøv et av ordene ovenfor.
          </div>
        </div>
      )}
    </div>
  );
};

export default WordDetail;