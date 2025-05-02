import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import WorkoutSuggestion from '../WorkoutSuggestion';

describe('WorkoutSuggestion', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial state correctly', () => {
    render(<WorkoutSuggestion />);
    expect(screen.getByText('Workout Suggestion')).toBeInTheDocument();
    expect(screen.getByText('Get a random workout suggestion')).toBeInTheDocument();
  });

  it('displays loading state when generating suggestion', () => {
    render(<WorkoutSuggestion />);
    const generateButton = screen.getByText('Get a random workout suggestion');
    
    fireEvent.click(generateButton);
    expect(screen.getByText('Generating suggestion...')).toBeInTheDocument();
  });

  it('displays workout suggestion after loading', () => {
    render(<WorkoutSuggestion />);
    const generateButton = screen.getByText('Get a random workout suggestion');
    
    fireEvent.click(generateButton);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(screen.queryByText('Generating suggestion...')).not.toBeInTheDocument();
    expect(screen.getByText(/^Here's your workout suggestion:/)).toBeInTheDocument();
  });

  it('renders initial workout suggestion', () => {
    render(<WorkoutSuggestion />);
    
    // Check if initial workout is displayed
    expect(screen.getByText('Full Body HIIT')).toBeInTheDocument();
    expect(screen.getByText('25 mins')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Jumping jacks')).toBeInTheDocument();
  });

  it('displays all workout details', () => {
    render(<WorkoutSuggestion />);
    
    // Check if all workout details are present
    expect(screen.getByText('AI Workout Suggestion')).toBeInTheDocument();
    expect(screen.getByText('Exercises:')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
}); 