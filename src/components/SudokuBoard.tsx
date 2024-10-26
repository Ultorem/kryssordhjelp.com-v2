import React from 'react';

interface SudokuBoardProps {
  board: number[][];
  initialBoard: number[][];
  selectedCell: [number, number] | null;
  onCellClick: (row: number, col: number) => void;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({
  board,
  initialBoard,
  selectedCell,
  onCellClick,
}) => {
  const isSelected = (row: number, col: number) => {
    return selectedCell?.[0] === row && selectedCell?.[1] === col;
  };

  const isInitial = (row: number, col: number) => {
    return initialBoard[row][col] !== 0;
  };

  return (
    <div className="grid grid-cols-9 gap-px bg-gray-300 dark:bg-gray-600 p-px rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            disabled={isInitial(rowIndex, colIndex)}
            className={`
              aspect-square flex items-center justify-center text-lg font-medium
              ${isInitial(rowIndex, colIndex)
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }
              ${isSelected(rowIndex, colIndex)
                ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                : ''
              }
              ${colIndex % 3 === 2 && colIndex !== 8 ? 'mr-0.5' : ''}
              ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'mb-0.5' : ''}
            `}
          >
            {cell !== 0 ? cell : ''}
          </button>
        ))
      )}
    </div>
  );
};

export default SudokuBoard;