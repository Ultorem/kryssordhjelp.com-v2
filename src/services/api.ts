import axios from 'axios';

const ORDBOKENE_API = 'https://ord.uib.no/api';

export interface SuggestionResponse {
  q: string;
  cnt: number;
  cmatch: number;
  a: {
    exact: Array<[string, number]>;
    similar: Array<[string, number]>;
  };
}

export interface WordArticle {
  articleId: string;
  dictionary: string;
  lemmas: Array<{
    lemma: string;
    paradigmId: string;
    wordClass: string;
    gender: string;
  }>;
  definitions: Array<{
    definition: string;
    examples: string[];
  }>;
}

export const searchWord = async (word: string): Promise<WordArticle[]> => {
  try {
    // First get suggestions
    const suggestResponse = await axios.get<SuggestionResponse>(`${ORDBOKENE_API}/suggest`, {
      params: {
        q: word,
        dict: 'bm', // Bokmål dictionary
      },
    });

    // Check if we have any exact matches
    if (!suggestResponse.data.a.exact || suggestResponse.data.a.exact.length === 0) {
      return [];
    }

    // Get the first exact match
    const exactMatch = suggestResponse.data.a.exact[0][0];
    
    // Now search for the article using the exact match
    const articleResponse = await axios.get(`${ORDBOKENE_API}/articles`, {
      params: {
        w: exactMatch,
        dict: 'bm',
        scope: 'ei',
      },
    });

    return articleResponse.data;
  } catch (error) {
    console.error('Error fetching word data:', error);
    throw error;
  }
};

export const getWordDetails = async (articleId: string): Promise<WordArticle> => {
  try {
    const response = await axios.get(`${ORDBOKENE_API}/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching word details:', error);
    throw error;
  }
};

export const getSuggestions = async (word: string): Promise<string[]> => {
  try {
    const response = await axios.get<SuggestionResponse>(`${ORDBOKENE_API}/suggest`, {
      params: {
        q: word,
        dict: 'bm',
      },
    });

    // Combine exact and similar matches
    const exactMatches = response.data.a.exact?.map(([word]) => word) || [];
    const similarMatches = response.data.a.similar?.map(([word]) => word) || [];

    return [...exactMatches, ...similarMatches];
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};