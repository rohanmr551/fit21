import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../Header';

// Mock the AuthContext
const mockLogout = vi.fn();
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'Test User' },
    logout: mockLogout,
  }),
}));

describe('Header', () => {
  it('renders the logo and app name', () => {
    render(<Header />);
    
    // Check if logo and app name are present
    expect(screen.getByText('Fit 21')).toBeInTheDocument();
    expect(screen.getByText('21')).toBeInTheDocument();
  });

  it('displays welcome message and logout button when user is logged in', () => {
    render(<Header />);
    
    // Check if user name and logout button are present
    expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout function when logout button is clicked', () => {
    render(<Header />);
    
    // Click logout button
    fireEvent.click(screen.getByText('Logout'));
    
    // Verify logout was called
    expect(mockLogout).toHaveBeenCalled();
  });
}); 