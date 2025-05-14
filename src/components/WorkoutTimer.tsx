
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const WorkoutTimer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [targetTime, setTargetTime] = useState(30 * 60); 

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time < targetTime) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (time >= targetTime) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time, targetTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (time / targetTime) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5" />
          Workout Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{formatTime(time)}</div>
          
          <Progress value={progressPercentage} className="w-full h-2" />
          
          <div className="flex space-x-3">
            <Button onClick={toggleTimer} variant="outline" size="icon">
              {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button onClick={resetTimer} variant="outline" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Target: {formatTime(targetTime)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutTimer;
