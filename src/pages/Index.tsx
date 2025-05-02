import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import DayTracker from '@/components/DayTracker';
import DailyCheckIn from '@/components/DailyCheckIn';
import GoalSetting from '@/components/GoalSetting';
import MotivationalQuote from '@/components/MotivationalQuote';
import WorkoutSuggestion from '@/components/WorkoutSuggestion';
import ProgressSummary from '@/components/ProgressSummary';
import WorkoutTimer from '@/components/WorkoutTimer';
import MoodTracker from '@/components/MoodTracker';
import SleepTracker from '@/components/SleepTracker';
import { Button } from '@/components/ui/button';

import { useAuth } from '@/contexts/AuthContext';

const getInitialData = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedData = localStorage.getItem('progressData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Only use saved data if it's from today
        const lastUpdated = new Date(parsedData.lastUpdated);
        const today = new Date();
        if (lastUpdated.toDateString() === today.toDateString()) {
          return {
            currentDay: parsedData.currentDay,
            completedDays: parsedData.completedDays,
            streak: parsedData.streak,
            goals: [
              { id: 1, text: "Complete all 21 days of the challenge." },
              { id: 2, text: "Run 5k three times a week." }
            ]
          };
        }
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
  }
  
  // Default data if no saved data exists or it's from a different day
  return {
    currentDay: 5,
    completedDays: [1, 2, 4],
    streak: 0,
    goals: [
      { id: 1, text: "Complete all 21 days of the challenge." },
      { id: 2, text: "Run 5k three times a week." }
    ]
  };
};

const Index = () => {
  const [userData, setUserData] = useState(getInitialData());
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const calculateStreak = () => {
      let streak = 0;
      const { completedDays, currentDay } = userData;
      const sortedDays = [...completedDays].sort((a, b) => a - b);
      if (sortedDays.includes(currentDay - 1)) {
        streak = 1;
        for (let i = currentDay - 2; i >= 1; i--) {
          if (sortedDays.includes(i)) {
            streak++;
          } else {
            break;
          }
        }
      }
      setUserData(prev => ({ ...prev, streak }));
    };

    calculateStreak();
  }, [userData, userData.completedDays, userData.currentDay]);

  const handleDayClick = (day: number) => {
    console.log(`Viewing day ${day} details`);
  };

  const handleCheckIn = (completedItems: string[]) => {
    if (!userData.completedDays.includes(userData.currentDay)) {
      setUserData(prev => ({
        ...prev,
        completedDays: [...prev.completedDays, prev.currentDay]
      }));
    }
    console.log(`Checked in for day ${userData.currentDay}:`, completedItems);
  };

  const handleAddGoal = (goalText: string) => {
    const newGoal = {
      id: Date.now(),
      text: goalText
    };
    setUserData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-fit-background flex flex-col">
      <Header />

      <main className="flex-1 container py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Fitness Journey</h2>
          <Button variant="destructive" onClick={handleLogout}>
            Log Out
          </Button>
        </div>

        <ProgressSummary 
          currentDay={userData.currentDay}
          completedDays={userData.completedDays}
          streak={userData.streak}
        />

        <DayTracker 
          currentDay={userData.currentDay}
          completedDays={userData.completedDays}
          onDayClick={handleDayClick}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <DailyCheckIn 
              day={userData.currentDay} 
              onComplete={handleCheckIn} 
            />
            <WorkoutSuggestion />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WorkoutTimer />
              <MoodTracker />
            </div>
          </div>
          
          <div className="space-y-6">
            <GoalSetting 
              existingGoals={userData.goals}
              onSaveGoal={handleAddGoal} 
            />
            <SleepTracker />
            <MotivationalQuote />
          </div>
        </div>
      </main>
      
      <footer className="py-4 border-t border-border/40 text-center text-sm text-muted-foreground">
        <div className="container">
          Fit 21 - Your 21-Day Fitness Revolution {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
