import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-12 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Norsk Kryssord Ordbok
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Din beste hjelper for kryssord og ordgåter på norsk
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Nyttige lenker
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Hjem
                </Link>
              </li>
              <li>
                <Link to="/kategorier" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Kategorier
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Om oss
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Vi bruker data fra Ordbokene og andre norske kilder for å gi deg
              de beste ordforslag og definisjoner.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} Norsk Kryssord Ordbok. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;