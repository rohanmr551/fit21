import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WorkoutSuggestion from '../WorkoutSuggestion';

// Mock the workout generation function
vi.mock('../WorkoutSuggestion', async () => {
  const actual = await vi.importActual('../WorkoutSuggestion');
  return {
    ...actual,
    generateWorkout: vi.fn().mockImplementation(() => 
      Promise.resolve({
        name: 'Full Body HIIT',
        duration: '25 mins',
        difficulty: 'Medium',
        description: 'High-intensity interval training to boost metabolism and build strength.',
        exercises: [
          'Jumping jacks',
          'Push-ups',
          'Squats',
          'Mountain climbers',
          'Burpees'
        ]
      })
    )
  };
});

describe('WorkoutSuggestion', () => {
  it('renders initial state correctly', () => {
    render(<WorkoutSuggestion />);
    expect(screen.getByText('AI Workout Suggestion')).toBeInTheDocument();
    expect(screen.getByText('Get New Workout')).toBeInTheDocument();
  });

  it('displays loading state when generating suggestion', () => {
    render(<WorkoutSuggestion />);
    const generateButton = screen.getByText('Get New Workout');
    
    fireEvent.click(generateButton);
    expect(screen.getByText('Generating...')).toBeInTheDocument();
  });

  it('displays workout suggestion after loading', async () => {
    render(<WorkoutSuggestion />);
    const generateButton = screen.getByText('Get New Workout');
    
    fireEvent.click(generateButton);
    
    // Wait for loading state to appear
    await waitFor(() => {
      expect(screen.getByText('Generating...')).toBeInTheDocument();
    });
    
    // Wait for workout details to appear
    await waitFor(() => {
      expect(screen.getByText('Full Body HIIT')).toBeInTheDocument();
      expect(screen.getByText('25 mins')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
    }, { timeout: 2000 });
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