import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Provisions from '../src/Provisions';

describe('Provisions', () => {
  let originalStamina, stamina, setStamina, remainingProvisions, setRemainingProvisions;

  beforeEach(() => {
    originalStamina = 10;
    stamina = 5;
    setStamina = vi.fn();
    remainingProvisions = 3;
    setRemainingProvisions = vi.fn();
  });

  it('renders correctly with initial props', () => {
    render(<Provisions originalStamina={originalStamina} stamina={stamina} setStamina={setStamina} remainingProvisions={remainingProvisions} setRemainingProvisions={setRemainingProvisions} />);
    
    expect(screen.getByText('Provisions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Use Provision' })).toBeEnabled();
    expect(screen.getByText(remainingProvisions.toString())).toBeInTheDocument();
  });

  it('disables "Use Provision" button when stamina equals original stamina', () => {
    render(<Provisions originalStamina={10} stamina={10} setStamina={setStamina} remainingProvisions={remainingProvisions} setRemainingProvisions={setRemainingProvisions} />);
    
    expect(screen.getByRole('button', { name: 'Use Provision' })).toBeDisabled();
  });

  it('updates stamina and remaining provisions when "Use Provision" button is clicked', () => {
    render(<Provisions originalStamina={originalStamina} stamina={stamina} setStamina={setStamina} remainingProvisions={remainingProvisions} setRemainingProvisions={setRemainingProvisions} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Use Provision' }));
    
    expect(setStamina).toHaveBeenCalled();
    expect(setRemainingProvisions).toHaveBeenCalled();
  });
});
