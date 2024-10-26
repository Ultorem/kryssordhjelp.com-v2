import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CurrentTime: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('no-NO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <a
      href="https://www.kalenderendin.no/"
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 
                dark:hover:bg-gray-600 transition-colors"
    >
      <div className="flex items-center justify-center space-x-2">
        <Clock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {formatTime(time)}
        </span>
      </div>
    </a>
  );
};

export default CurrentTime;