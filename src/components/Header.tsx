import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchOverlay from './SearchOverlay';

const Header: React.FC = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigation = [
    { name: 'Hjem', path: '/' },
    { name: 'Kategorier', path: '/kategorier' },
    { name: 'Sudoku', path: '/sudoku' },
  ];

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Norsk Kryssord Ordbok
              </span>
            </Link>

            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    } transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 
                         dark:hover:text-blue-400 transition-colors"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;