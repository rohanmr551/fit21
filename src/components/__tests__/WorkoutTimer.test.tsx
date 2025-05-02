import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import WorkoutTimer from '../WorkoutTimer';

describe('WorkoutTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial state correctly', () => {
    render(<WorkoutTimer />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('starts and stops timer correctly', () => {
    render(<WorkoutTimer />);
    const startButton = screen.getByText('Start');
    
    // Start timer
    fireEvent.click(startButton);
    expect(screen.getByText('Stop')).toBeInTheDocument();
    
    // Advance time by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:01')).toBeInTheDocument();
    
    // Stop timer
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('resets timer correctly', () => {
    render(<WorkoutTimer />);
    const startButton = screen.getByText('Start');
    
    // Start timer and let it run for 5 seconds
    fireEvent.click(startButton);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    // Stop timer
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);
    
    // Reset timer
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('stops automatically when target time is reached', () => {
    render(<WorkoutTimer />);
    
    // Get all buttons
    const buttons = screen.getAllByRole('button');
    
    // Start timer
    act(() => {
      fireEvent.click(buttons[0]);
    });
    
    // Advance time to target (30 minutes)
    act(() => {
      vi.advanceTimersByTime(30 * 60 * 1000);
    });
    
    // Check if timer has stopped
    expect(screen.getByText('30:00')).toBeInTheDocument();
    
    // Try to advance time further
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    // Check if time hasn't changed
    expect(screen.getByText('30:00')).toBeInTheDocument();
  });
}); 