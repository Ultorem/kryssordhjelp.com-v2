import React, { useState } from 'react';
import SudokuBoard from '../components/SudokuBoard';
import { generateSudoku } from '../utils/sudokuGenerator';

const difficulties = {
  easy: { empty: 30 },
  medium: { empty: 40 },
  hard: { empty: 50 }
};

const Sudoku: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [board, setBoard] = useState(() => generateSudoku(difficulties[difficulty].empty));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [initialBoard, setInitialBoard] = useState(board.map(row => [...row]));

  const handleNewGame = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    const newBoard = generateSudoku(difficulties[newDifficulty].empty);
    setDifficulty(newDifficulty);
    setBoard(newBoard);
    setInitialBoard(newBoard.map(row => [...row]));
    setSelectedCell(null);
  };

  const handleCellClick = (row: number, col: number) => {
    if (initialBoard[row][col] === 0) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = (number: number) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      if (initialBoard[row][col] === 0) {
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = number;
        setBoard(newBoard);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
      handleNumberInput(num);
    }
  };

  return (
    <div className="max-w-2xl mx-auto" onKeyDown={handleKeyPress} tabIndex={0}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Sudoku
        </h1>

        <div className="flex gap-4 mb-6">
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <button
              key={level}
              onClick={() => handleNewGame(level)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                difficulty === level
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <SudokuBoard
          board={board}
          initialBoard={initialBoard}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
        />

        <div className="grid grid-cols-9 gap-2 mt-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              onClick={() => handleNumberInput(number)}
              className="p-2 text-center bg-gray-100 dark:bg-gray-700 rounded 
                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors
                       text-gray-800 dark:text-gray-200"
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sudoku;