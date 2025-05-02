import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, Sparkles } from 'lucide-react';

const workoutSuggestions = [
  {
    title: "Full Body HIIT",
    description: "High-intensity interval training to boost metabolism and build strength.",
    duration: "25 mins",
    difficulty: "Medium",
    exercises: ["Jumping jacks", "Push-ups", "Squats", "Mountain climbers", "Burpees"]
  },
  {
    title: "Core Crusher",
    description: "Focus on building a strong core with these targeted exercises.",
    duration: "15 mins",
    difficulty: "Medium",
    exercises: ["Planks", "Russian twists", "Bicycle crunches", "Leg raises", "Side planks"]
  },
  {
    title: "Upper Body Power",
    description: "Build strength in your arms, chest, and back.",
    duration: "30 mins",
    difficulty: "Hard",
    exercises: ["Push-ups", "Tricep dips", "Pike push-ups", "Superman holds", "Arm circles"]
  },
  {
    title: "Lower Body Burn",
    description: "Focus on strengthening your legs and glutes.",
    duration: "20 mins",
    difficulty: "Medium",
    exercises: ["Squats", "Lunges", "Glute bridges", "Calf raises", "Wall sits"]
  },
  {
    title: "Quick Energy Boost",
    description: "A short, effective workout to energize your day.",
    duration: "10 mins",
    difficulty: "Easy",
    exercises: ["Jumping jacks", "High knees", "Arm circles", "Squats", "Side lunges"]
  }
];

const WorkoutSuggestion: React.FC = () => {
  const [workout, setWorkout] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedWorkout = localStorage.getItem('currentWorkout');
      if (savedWorkout) {
        try {
          return JSON.parse(savedWorkout);
        } catch (error) {
          console.error('Error parsing saved workout:', error);
          return workoutSuggestions[0];
        }
      }
    }
    return workoutSuggestions[0];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('currentWorkout', JSON.stringify(workout));
      } catch (error) {
        console.error('Error saving workout:', error);
      }
    }
  }, [workout]);

  const getNewWorkout = () => {
    setLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * workoutSuggestions.length);
      const newWorkout = workoutSuggestions[randomIndex];
      setWorkout(newWorkout);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="fitness-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-fit-accent" />
          AI Workout Suggestion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{workout.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{workout.duration}</span>
              <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{workout.difficulty}</span>
            </div>
          </div>
          
          <p className="text-gray-600">{workout.description}</p>
          
          <div className="space-y-2">
            <p className="font-medium flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Exercises:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {workout.exercises.map((exercise, index) => (
                <li key={index} className="text-sm flex items-center">
                  <span className="h-6 w-6 rounded-full bg-fit-primary/10 text-fit-primary flex items-center justify-center mr-2 text-xs">
                    {index + 1}
                  </span>
                  {exercise}
                </li>
              ))}
            </ul>
          </div>

          <Button 
            onClick={getNewWorkout} 
            disabled={loading}
            className="w-full gradient-purple"
          >
            {loading ? "Generating..." : "Get New Workout"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutSuggestion;
