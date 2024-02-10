import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import GoldSection from '../src/Gold';

describe('GoldSection', () => {
  it('renders correctly with initial gold value', () => {
    render(<GoldSection gold={10} setGold={vi.fn()} />);
    
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('10');
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });

  it('increases gold value when + button is clicked', async () => {
    const setGold = vi.fn();
    render(<GoldSection gold={10} setGold={setGold} />);
    
    await userEvent.click(screen.getByRole('button', { name: '+' }));
    expect(setGold).toHaveBeenCalledWith(11);
  });

  it('decreases gold value when - button is clicked', async () => {
    const setGold = vi.fn();
    render(<GoldSection gold={10} setGold={setGold} />);
    
    await userEvent.click(screen.getByRole('button', { name: '-' }));
    expect(setGold).toHaveBeenCalledWith(9);
  });

  it('does not decrease gold value below 0', async () => {
    const setGold = vi.fn();
    render(<GoldSection gold={0} setGold={setGold} />);
    
    await userEvent.click(screen.getByRole('button', { name: '-' }));
    expect(setGold).not.toHaveBeenCalled();
  });
});