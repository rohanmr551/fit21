
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SmilePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Mood = 'great' | 'good' | 'okay' | 'tired' | 'stressed';

interface MoodOption {
  value: Mood;
  label: string;
  emoji: string;
}

const MoodTracker = () => {
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const moodOptions: MoodOption[] = [
    { value: 'great', label: 'Great', emoji: '😄' },
    { value: 'good', label: 'Good', emoji: '🙂' },
    { value: 'okay', label: 'Okay', emoji: '😐' },
    { value: 'tired', label: 'Tired', emoji: '😴' },
    { value: 'stressed', label: 'Stressed', emoji: '😰' },
  ];

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "No mood selected",
        description: "Please select your mood before saving",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to a database
    toast({
      title: "Mood tracked!",
      description: `You're feeling ${selectedMood} today`,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <SmilePlus className="h-5 w-5" />
          Today's Mood
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {moodOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedMood === option.value ? "default" : "outline"}
              className="flex flex-col h-16 w-16 p-2"
              onClick={() => handleMoodSelect(option.value)}
            >
              <span className="text-xl">{option.emoji}</span>
              <span className="text-xs">{option.label}</span>
            </Button>
          ))}
        </div>
        <Button 
          onClick={handleSubmit} 
          className="w-full mt-2 gradient-blue"
        >
          Save Mood
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
