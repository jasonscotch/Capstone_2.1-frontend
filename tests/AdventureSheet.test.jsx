import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AdventureSheet from '../src/AdventureSheet';

// Mock the external hooks
vi.mock('../src/GameContext', () => ({
  useGame: vi.fn().mockReturnValue({
    // Mock the data and functions returned by useGame
    inventoryItems: [],
    gold: 10,
    stamina: 5,
    originalStamina: 5,
    skill: 3,
    originalSkill: 3,
    luck: 7,
    originalLuck: 7,
    diceResult: 4,
    remainingProvisions: 2,
    // Add other necessary mock data and functions
  }),
}));

vi.mock('../src/AuthContext', () => ({
  useAuth: vi.fn().mockReturnValue({
    user: { adventurer_name: 'Test Adventurer' },
  }),
}));

describe('AdventureSheet', () => {
  it('renders correctly', () => {
    render(<AdventureSheet />);
    expect(screen.getByText('Adventure Sheet - Test Adventurer')).toBeInTheDocument();
    expect(screen.getByAltText('Character')).toBeInTheDocument();
  });

  // Add more tests as needed to cover user interactions and conditional rendering
});
