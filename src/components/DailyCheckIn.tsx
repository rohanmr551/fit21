
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Dumbbell, Salad, Droplets } from 'lucide-react';

interface CheckInItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  completed: boolean;
}


interface DailyCheckInProps {
  day: number;
  onComplete: (completedItems: string[]) => void;
}


const DailyCheckIn: React.FC<DailyCheckInProps> = ({ day, onComplete }) => {
  const { toast } = useToast();
  const [checkItems, setCheckItems] = useState<CheckInItem[]>([
    { id: 'workout', label: 'Completed Workout', icon: <Dumbbell className="h-5 w-5" />, completed: false },
    { id: 'nutrition', label: 'Healthy Nutrition', icon: <Salad className="h-5 w-5" />, completed: false },
    { id: 'hydration', label: 'Proper Hydration', icon: <Droplets className="h-5 w-5" />, completed: false },
  ]);

  
  const toggleItem = (id: string) => {
    setCheckItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleSubmit = () => {
    const completed = checkItems.filter(item => item.completed).map(item => item.id);
    
    if (completed.length === 0) {
      toast({
        title: "Nothing selected",
        description: "Please check at least one item to complete your daily check-in.",
        variant: "destructive",
      });
      return;
    }

    
    onComplete(completed);
    toast({
      title: "Day " + day + " Checked In!",
      description: "Great job staying committed to your fitness journey.",
    });
  };

  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Day {day} Check-In</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checkItems.map(item => (
            <div key={item.id} className="flex items-center space-x-3 border rounded-lg p-3 transition-all hover:bg-muted/30">
              <Checkbox 
                id={item.id} 
                checked={item.completed} 
                onCheckedChange={() => toggleItem(item.id)} 
              />
              <div className="flex items-center flex-1 gap-2">
                {item.icon}
                <label htmlFor={item.id} className="flex-1 cursor-pointer">
                  {item.label}
                </label>
              </div>
            </div>
          ))}

          
          <Button 
            onClick={handleSubmit} 
            className="w-full mt-4 gradient-blue"
          >
            Complete Check-In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyCheckIn;
