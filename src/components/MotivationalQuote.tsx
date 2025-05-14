import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { text: "Your body can stand almost anything. It's your mind that you have to convince.", author: "Andrew Murphy" },
  { text: "The hard days are the best because that's when champions are made.", author: "Gabrielle Reece" },
  { text: "You don't have to be extreme, just consistent.", author: "Unknown" },
  { text: "Strength does not come from the physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
  { text: "The difference between the impossible and the possible lies in a person's determination.", author: "Tommy Lasorda" },
  { text: "It's not about having time, it's about making time.", author: "Unknown" },
  { text: "The only way to define your limits is by going beyond them.", author: "Arthur C. Clarke" },
  { text: "What seems impossible today will one day become your warm-up.", author: "Unknown" },
  { text: "The clock is ticking. Are you becoming the person you want to be?", author: "Greg Plitt" }
];

const MotivationalQuote: React.FC = () => {
  const [quote, setQuote] = useState<Quote>(quotes[0]);
  const [animate, setAnimate] = useState(false);

  const getRandomQuote = (currentQuote?: Quote): Quote => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (currentQuote && quotes[randomIndex].text === currentQuote.text);
    return quotes[randomIndex];
  };

  const refreshQuote = () => {
    setAnimate(true);
    const newQuote = getRandomQuote(quote);
    setTimeout(() => {
      setQuote(newQuote);
      setAnimate(false);
    }, 500);
  };

  useEffect(() => {
    // Set initial quote
    const initialQuote = getRandomQuote();
    setQuote(initialQuote);
    
    // Set up interval for automatic quote changes
    const interval = setInterval(() => {
      refreshQuote();
    }, 60000); // Change quote every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="fitness-card overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-fit-primary to-fit-accent"></div>
      <CardContent className="p-6">
        <div 
          className={`transition-opacity duration-500 ${animate ? 'opacity-0' : 'opacity-100'}`}
          data-testid="quote-container"
        >
          <p className="text-lg font-medium italic mb-2" data-testid="quote-text">"{quote.text}"</p>
          <p className="text-muted-foreground text-sm flex items-center justify-end">
            <span data-testid="quote-author">— {quote.author}</span>
          </p>
        </div>
        <button 
          onClick={refreshQuote}
          className="absolute bottom-3 right-3 text-muted-foreground hover:text-fit-primary transition-colors"
          aria-label="Get new quote"
          data-testid="refresh-button"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuote;
