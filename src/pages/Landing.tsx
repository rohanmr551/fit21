
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dumbbell } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-fit-background to-background flex flex-col">
      <header className="py-6 border-b border-border/40">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="bg-fit-primary rounded-full w-10 h-10 flex items-center justify-center text-white">
                <Dumbbell className="h-5 w-5" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-fit-secondary rounded-full text-[10px] text-white flex items-center justify-center">
                21
              </span>
            </div>
            <h1 className="text-xl font-bold">Fit 21</h1>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <section className="container flex-1 flex flex-col md:flex-row items-center py-12 md:py-24 gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your 21-Day Fitness Revolution
          </h1>
          <p className="text-lg text-muted-foreground">
            Transform your body and habits in just 21 days with our proven fitness challenge.
            Track your progress, set goals, and stay motivated every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Continue Your Progress
              </Button>
            </Link>
          </div>
          <div className="pt-4 flex items-center space-x-2 text-sm">
            <span className="flex h-3 w-3 bg-green-500 rounded-full"></span>
            <span>Join other fitness enthusiasts</span>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -z-10 top-0 -left-4 w-72 h-72 bg-fit-primary/25 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-0 -right-4 w-72 h-72 bg-fit-secondary/20 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1374&auto=format&fit=crop" 
              alt="Person exercising" 
              className="rounded-xl shadow-2xl border border-border/40"
            />
          </div>
        </div>
      </section>
      
      <section className="bg-muted/50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Fit 21?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/40">
              <div className="h-12 w-12 bg-fit-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fit-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Tracking</h3>
              <p className="text-muted-foreground">Keep track of your workouts, mood, and sleep quality with simple daily check-ins.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/40">
              <div className="h-12 w-12 bg-fit-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fit-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Goal Setting</h3>
              <p className="text-muted-foreground">Set personalized fitness goals and track your progress throughout your 21-day journey.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/40">
              <div className="h-12 w-12 bg-fit-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fit-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Workout Timer</h3>
              <p className="text-muted-foreground">Time your workouts effectively with our built-in timer to maximize your training efficiency.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-8 border-t border-border/40">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Fit 21 - Your 21-Day Fitness Revolution © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
