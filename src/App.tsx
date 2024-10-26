import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import WordDetail from './pages/WordDetail';
import Sudoku from './pages/Sudoku';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8 flex gap-8">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kategorier" element={<Categories />} />
              <Route path="/ord/:word" element={<WordDetail />} />
              <Route path="/sudoku" element={<Sudoku />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Sidebar />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;