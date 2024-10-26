import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const CrosswordTimer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <Timer className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Kryssordtimer
        </h3>
      </div>
      
      <div className="text-3xl font-mono text-center mb-3 text-gray-800 dark:text-gray-200">
        {formatTime(time)}
      </div>
      
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700"
        >
          {isRunning ? 
            <Pause className="w-5 h-5 text-blue-600 dark:text-blue-400" /> :
            <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          }
        </button>
        <button
          onClick={handleReset}
          className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700"
        >
          <RotateCcw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </button>
      </div>
    </div>
  );
};

export default CrosswordTimer;