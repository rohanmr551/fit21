
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Moon, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';

const SleepTracker = () => {
  const { toast } = useToast();
  const [hoursSlept, setHoursSlept] = useState<number>(7);
  const [sleepQuality, setSleepQuality] = useState<number>(3);

  const qualityLabels = ['Poor', 'Fair', 'Good', 'Great', 'Excellent'];

  const handleSaveData = () => {
    toast({
      title: "Sleep data saved!",
      description: `You slept for ${hoursSlept} hours with ${qualityLabels[sleepQuality-1]} quality.`,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Moon className="h-5 w-5" />
          Sleep Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Hours Slept</span>
              <span className="text-sm font-semibold">{hoursSlept} hrs</span>
            </div>
            <Slider 
              value={[hoursSlept]} 
              min={0} 
              max={12} 
              step={0.5}
              onValueChange={(value) => setHoursSlept(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sleep Quality</span>
              <span className="text-sm font-semibold">{qualityLabels[sleepQuality-1]}</span>
            </div>
            <Slider 
              value={[sleepQuality]} 
              min={1} 
              max={5} 
              step={1}
              onValueChange={(value) => setSleepQuality(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>

          <Button 
            onClick={handleSaveData}
            className="w-full gradient-blue"
          >
            Save Sleep Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepTracker;
