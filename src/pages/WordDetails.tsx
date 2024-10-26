import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface WordDefinition {
  word: string;
  partOfSpeech: string;
  definitions: string[];
  synonyms: string[];
  examples: string[];
}

const WordDetails: React.FC = () => {
  const { word } = useParams<{ word: string }>();
  const [loading, setLoading] = useState(true);
  const [wordData, setWordData] = useState<WordDefinition | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWordData = async () => {
      setLoading(true);
      setError('');

      try {
        // Fetch word definition from Ordbokene API
        const definitionResponse = await fetch(
          `https://ord.uib.no/api/articles/${encodeURIComponent(word || '')}`
        );
        
        if (!definitionResponse.ok) {
          throw new Error('Kunne ikke finne ordet');
        }

        const definitionData = await definitionResponse.json();

        // Fetch synonyms from Datamuse
        const synonymsResponse = await fetch(
          `https://api.datamuse.com/words?ml=${encodeURIComponent(word || '')}&v=no`
        );
        const synonymsData = await synonymsResponse.json();

        setWordData({
          word: word || '',
          partOfSpeech: definitionData.partOfSpeech || '',
          definitions: definitionData.definitions || [],
          synonyms: synonymsData.map((s: { word: string }) => s.word),
          examples: definitionData.examples || []
        });
      } catch (err) {
        setError('Kunne ikke laste orddetaljer');
      } finally {
        setLoading(false);
      }
    };

    if (word) {
      fetchWordData();
    }
  }, [word]);

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !wordData) {
    return (
      <div className="text-center text-red-500 my-4">
        {error || 'Ingen data funnet'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{wordData.word}</h1>
        {wordData.partOfSpeech && (
          <p className="text-gray-600 mb-6 italic">{wordData.partOfSpeech}</p>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Definisjoner</h2>
          <ul className="space-y-2">
            {wordData.definitions.map((def, index) => (
              <li key={index} className="text-gray-700">
                {index + 1}. {def}
              </li>
            ))}
          </ul>
        </section>

        {wordData.synonyms.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Synonymer</h2>
            <div className="flex flex-wrap gap-2">
              {wordData.synonyms.map((synonym, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 rounded-full text-blue-700 hover:bg-blue-100 cursor-pointer"
                >
                  {synonym}
                </span>
              ))}
            </div>
          </section>
        )}

        {wordData.examples.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Eksempler</h2>
            <ul className="space-y-2">
              {wordData.examples.map((example, index) => (
                <li key={index} className="text-gray-700 italic">
                  "{example}"
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default WordDetails;