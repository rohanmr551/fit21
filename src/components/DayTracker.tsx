
import React from 'react';
import { cn } from '@/lib/utils';

interface DayTrackerProps {
  currentDay: number;
  completedDays: number[];
  onDayClick?: (day: number) => void;
}

const DayTracker: React.FC<DayTrackerProps> = ({ 
  currentDay, 
  completedDays, 
  onDayClick 
}) => {
  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  const getDayStatus = (day: number) => {
    if (completedDays.includes(day)) return 'completed';
    if (day === currentDay) return 'today';
    return 'upcoming';
  };

  return (
    <div className="fitness-card p-6">
      <h3 className="text-xl font-bold mb-4">21-Day Challenge</h3>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <button 
            key={day}
            onClick={() => onDayClick && onDayClick(day)}
            className={cn(
              'day-marker',
              getDayStatus(day) === 'completed' && 'day-marker-completed',
              getDayStatus(day) === 'today' && 'day-marker-today',
              getDayStatus(day) === 'upcoming' && 'day-marker-upcoming'
            )}
            disabled={day > currentDay}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Day {currentDay} of 21
        </span>
        <span className="text-sm font-medium">
          {Math.round((completedDays.length / 21) * 100)}% Complete
        </span>
      </div>
    </div>
  );
};

export default DayTracker;
