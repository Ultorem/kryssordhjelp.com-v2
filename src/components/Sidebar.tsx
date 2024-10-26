import React from 'react';
import { Clock, Trophy, Timer } from 'lucide-react';
import CrosswordTimer from './CrosswordTimer';
import CrosswordProgress from './CrosswordProgress';
import DailyWord from './DailyWord';
import CurrentTime from './CurrentTime';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 space-y-6">
      <CurrentTime />
      <DailyWord />
      <CrosswordTimer />
      <CrosswordProgress />
    </div>
  );
};

export default Sidebar;