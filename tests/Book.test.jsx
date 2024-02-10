import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Book from '../src/Book';
import { useGame } from '../src/GameContext';


// Mocking useNavigate
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../src/GameContext', () => ({
  useGame: vi.fn().mockReturnValue({
    inventoryItems: [],
    items: [],
    disabledButtons: [],
    data: { title: 'Test Chapter', text_body: '<p>Test Content</p>', chapter_id: '1', choice_1: '2', choice_2: '3' },
    LoadSavedGame: vi.fn(), 
    fetchData: vi.fn(),
    setItemsAvailable: vi.fn(),
  }),
}));

vi.mock('../src/AuthContext', () => ({
  useAuth: vi.fn().mockReturnValue({
    user: { name: 'Test User' },
  }),
}));



it('renders the book title and content correctly', () => {
  render(<Book />);
  expect(screen.getByText('Test Chapter')).toBeInTheDocument();
  expect(screen.getByText('Test Content', { selector: 'p' })).toBeInTheDocument();
});


it('updates items availability based on items change', () => {
  useGame.mockReturnValue({
    items: [{ item_id: 1, item_name: 'Sword' }], 
    setItemsAvailable: vi.fn(),
    data: { title: 'Dynamic Test Chapter', text_body: '<p>Dynamic Test Content</p>', chapter_id: '2', choice_1: '2', choice_2: '3' },
  });
  render(<Book />);
  expect(useGame().setItemsAvailable).toHaveBeenCalledWith(true);
});

it('navigates correctly when a choice button is clicked', async () => {
  useGame.mockReturnValue({
    items: [],
    setItemsAvailable: vi.fn(),
    data: { title: 'Dynamic Test Chapter', text_body: '<p>Dynamic Test Content</p>', chapter_id: '2', choice_1: '2', choice_2: '3' },
    fetchData: vi.fn(),
  });
  render(<Book />);

  const choiceButtons = screen.queryAllByTestId('choice');
  expect(choiceButtons.length).toBeGreaterThan(0);
  const choiceButton = choiceButtons[0];
  fireEvent.click(choiceButton);

  expect(useGame().fetchData).toHaveBeenCalledWith('2');
});
