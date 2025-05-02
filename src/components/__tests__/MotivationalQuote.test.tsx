import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MotivationalQuote from '../MotivationalQuote';

describe('MotivationalQuote', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial quote correctly', () => {
    render(<MotivationalQuote />);
    expect(screen.getByText(/^"Believe you can and you're halfway there."/)).toBeInTheDocument();
    expect(screen.getByText('- Theodore Roosevelt')).toBeInTheDocument();
  });

  it('changes quote after interval', () => {
    render(<MotivationalQuote />);
    const initialQuote = screen.getByText(/^"Believe you can and you're halfway there."/).textContent;
    
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    
    const newQuote = screen.getByText(/^"/).textContent;
    expect(newQuote).not.toBe(initialQuote);
  });
}); 