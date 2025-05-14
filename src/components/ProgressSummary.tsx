import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Trophy, Flame, Calendar, Clock } from 'lucide-react';

interface ProgressSummaryProps {
  currentDay: number;
  completedDays: number[];
  streak: number;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({ 
  currentDay, 
  completedDays, 
  streak 
}) => {
  // Save progress data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const progressData = {
          currentDay,
          completedDays,
          streak,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('progressData', JSON.stringify(progressData));
      } catch (error) {
        console.error('Error saving progress data:', error);
      }
    }
  }, [currentDay, completedDays, streak]);

  const progressPercentage = (completedDays.length / 21) * 100;
  const daysLeft = 21 - currentDay + 1;
  const completionRate = currentDay > 1 
    ? Math.round((completedDays.length / (currentDay )) * 100) 
    : 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="fitness-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Progress Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-2 bg-muted" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard 
                icon={<Calendar className="h-4 w-4 text-fit-primary" />}
                label="Days Left"
                value={daysLeft.toString()}
              />
              <StatCard 
                icon={<Clock className="h-4 w-4 text-fit-secondary" />}
                label="Completion Rate"
                value={`${completionRate}%`}
                valueColor={completionRate >= 80 ? 'text-fit-secondary' : 'text-amber-500'}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="fitness-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard 
                icon={<Flame className="h-4 w-4 text-orange-500" />}
                label="Current Streak"
                value={streak.toString()}
                valueColor="text-orange-500"
              />
              <StatCard 
                icon={<Trophy className="h-4 w-4 text-amber-500" />}
                label="Days Completed"
                value={completedDays.length.toString()}
              />
            </div> 
            {completedDays.length >= 5 && (
              <div className="mt-3 p-3 bg-fit-primary/10 rounded-lg border border-fit-primary/30 flex items-center gap-2">
                <div className="rounded-full bg-fit-primary/20 p-1">
                  <Trophy className="h-4 w-4 text-fit-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">5-Day Milestone Reached!</p>
                  <p className="text-xs text-muted-foreground">Keep going, you're doing great!</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}
const StatCard: React.FC<StatCardProps> = ({ icon, label, value, valueColor }) => (
  <div className="p-3 bg-muted/30 rounded-lg border border-border/40 flex flex-col">
    <div className="flex items-center justify-between mb-1">
      {icon}
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <span className={cn("text-xl font-bold", valueColor)}>{value}</span>
  </div>
);
export default ProgressSummary;