
import React from 'react';
import { cn } from '@/lib/utils';
import { Dumbbell, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

type HeaderProps = React.HTMLAttributes<HTMLDivElement>

const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  const { user, logout } = useAuth();

  return (
    <header className={cn("py-4 border-b border-border/40", className)} {...props}>
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
        
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm font-medium">
                Welcome, {user.name}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout} 
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          )}
          <div className="text-sm font-medium">
            Your 21-Day Fitness Revolution
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
