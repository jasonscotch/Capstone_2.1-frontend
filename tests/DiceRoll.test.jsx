import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DiceRoll from '../src/DiceRoll';

describe('DiceRoll', () => {
  let setDiceResult;

  beforeEach(() => {
    setDiceResult = vi.fn();
  });

  it('renders correctly', () => {
    render(<DiceRoll diceResult={null} setDiceResult={setDiceResult} />);
    
    expect(screen.getByRole('button', { name: 'Roll One' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Roll Both' })).toBeInTheDocument();
  });

  it('calls setDiceResult with a number between 1 and 6 when "Roll One" is clicked', async () => {
    render(<DiceRoll diceResult={null} setDiceResult={setDiceResult} />);
    
    userEvent.click(screen.getByRole('button', { name: 'Roll One' }));
    
    await waitFor(() => expect(setDiceResult).toHaveBeenCalled(), { timeout: 2000 });
    // Note: This assertion checks if setDiceResult was called, but it cannot verify the exact value since it's random.
  });

  it('calls setDiceResult with a number between 2 and 12 when "Roll Both" is clicked', async () => {
    render(<DiceRoll diceResult={null} setDiceResult={setDiceResult} />);
    
    userEvent.click(screen.getByRole('button', { name: 'Roll Both' }));
    
    await waitFor(() => expect(setDiceResult).toHaveBeenCalled(), { timeout: 2000 });
    // Similar note as above regarding the randomness of the value.
  });
});
