import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Target } from 'lucide-react';

interface Goal {
  id: number;
  text: string;
}

interface GoalSettingProps {
  existingGoals?: Goal[];
  onSaveGoal?: (goal: string) => void;
}

const GoalSetting: React.FC<GoalSettingProps> = ({
  existingGoals = [],
  onSaveGoal
}) => {
  const { toast } = useToast();
  const [newGoal, setNewGoal] = useState("");
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (typeof window !== 'undefined') {
      const savedGoals = localStorage.getItem('fitnessGoals');
      if (savedGoals) {
        try {
          return JSON.parse(savedGoals);
        } catch (error) {
          console.error('Error parsing saved goals:', error);
          return existingGoals;
        }
      }
    }
    return existingGoals;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('fitnessGoals', JSON.stringify(goals));
      } catch (error) {
        console.error('Error saving goals:', error);
      }
    }
  }, [goals]);

  const handleAddGoal = async () => {
    if (!newGoal.trim()) {
      toast({
        title: "Empty Goal",
        description: "Please enter a goal to add.",
        variant: "destructive",
      });
      return;
    }

    const goalText = newGoal.trim();

    try {
      await addDoc(collection(db, "goals"), {
        text: goalText,
        timestamp: serverTimestamp(),
      });

      const goal = {
        id: Date.now(),
        text: goalText,
      };

      setGoals([...goals, goal]);
      setNewGoal("");

      if (onSaveGoal) {
        onSaveGoal(goalText);
      }

      toast({
        title: "Goal Added",
        description: "Your fitness goal has been added and saved.",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding goal:", error.message);
        toast({
          title: "Error saving goal",
          description: error.message || "Something went wrong.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error saving goal",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="fitness-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-fit-primary" />
          Your Fitness Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.length > 0 ? (
            <div className="space-y-2">
              {goals.map(goal => (
                <div
                  key={goal.id}
                  className="p-3 bg-muted/40 rounded-lg border border-border/40"
                >
                  {goal.text}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              No goals set yet. Add your first fitness goal below!
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="new-goal">Add a new goal</Label>
            <div className="flex gap-2">
              <Input
                id="new-goal"
                placeholder="e.g., Run 5k three times a week"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleAddGoal}
                className="gradient-green"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalSetting;
