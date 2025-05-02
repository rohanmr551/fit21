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
    expect(screen.getByText(/Target:.*30:00/)).toBeInTheDocument();
    
    // Get buttons by their SVG icons
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('starts and stops timer correctly', () => {
    render(<WorkoutTimer />);
    const buttons = screen.getAllByRole('button');
    const playButton = buttons[0]; // First button is play/pause

    // Start timer
    fireEvent.click(playButton);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:01')).toBeInTheDocument();

    // Stop timer
    fireEvent.click(playButton);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:01')).toBeInTheDocument();
  });

  it('resets timer correctly', () => {
    render(<WorkoutTimer />);
    const buttons = screen.getAllByRole('button');
    const playButton = buttons[0]; // First button is play/pause
    const resetButton = buttons[1]; // Second button is reset

    // Start timer and let it run for 5 seconds
    fireEvent.click(playButton);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('00:05')).toBeInTheDocument();

    // Reset timer
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