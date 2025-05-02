import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DailyCheckIn from '../DailyCheckIn';

// Mock the toast hook
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

describe('DailyCheckIn', () => {
  const mockOnComplete = vi.fn();

  it('renders check-in items and day number', () => {
    render(<DailyCheckIn day={1} onComplete={mockOnComplete} />);
    
    // Check if day number is displayed
    expect(screen.getByText('Day 1 Check-In')).toBeInTheDocument();
    
    // Check if all check-in items are present
    expect(screen.getByText('Completed Workout')).toBeInTheDocument();
    expect(screen.getByText('Healthy Nutrition')).toBeInTheDocument();
    expect(screen.getByText('Proper Hydration')).toBeInTheDocument();
  });

  it('toggles checkboxes when clicked', () => {
    render(<DailyCheckIn day={1} onComplete={mockOnComplete} />);
    
    // Get all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    
    // Click first checkbox
    fireEvent.click(checkboxes[0]);
    
    // Verify checkbox is checked
    expect(checkboxes[0]).toBeChecked();
  });

  it('shows error toast when submitting with no items checked', () => {
    render(<DailyCheckIn day={1} onComplete={mockOnComplete} />);
    
    // Click submit button
    fireEvent.click(screen.getByText('Complete Check-In'));
    
    // Verify error toast was shown
    expect(mockToast).toHaveBeenCalledWith({
      title: "Nothing selected",
      description: "Please check at least one item to complete your daily check-in.",
      variant: "destructive",
    });
  });

  it('calls onComplete with correct items when submitted', () => {
    render(<DailyCheckIn day={1} onComplete={mockOnComplete} />);
    
    // Check some items
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]); // Workout
    fireEvent.click(checkboxes[1]); // Nutrition
    
    // Click submit button
    fireEvent.click(screen.getByText('Complete Check-In'));
    
    // Verify onComplete was called with correct items
    expect(mockOnComplete).toHaveBeenCalledWith(['workout', 'nutrition']);
  });
}); 