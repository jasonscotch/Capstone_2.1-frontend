import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Luck from '../src/Luck';

describe('Luck', () => {
  it('renders correctly with initial props', () => {
    render(<Luck luck={7} originalLuck={""} initialLuckInputDone={false} setLuck={vi.fn()} setOriginalLuck={vi.fn()} setInitialLuckInputDone={vi.fn()} />);
    
    // Adjust these expectations based on Luck component's structure
    expect(screen.getByLabelText(/Luck:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '>' })).toBeInTheDocument();
  });

  it('increments and decrements luck value', async () => {
    const setLuck = vi.fn();
    
    render(<Luck luck={7} originalLuck={10} initialLuckInputDone={true} setLuck={setLuck} setOriginalLuck={vi.fn()} setInitialLuckInputDone={vi.fn()} />);
    
    await userEvent.click(screen.getByRole('button', { name: '-' }));
    expect(setLuck).toHaveBeenCalledWith(6);
    
    await userEvent.click(screen.getByRole('button', { name: '+' }));
    expect(setLuck).toHaveBeenCalledWith(8);
  });
});
