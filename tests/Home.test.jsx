import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Home from '../src/Home';
import * as AuthContext from '../src/AuthContext';
import * as GameContext from '../src/GameContext';

// Mock react-router-dom's useNavigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

// Prepare mocks for AuthContext and GameContext
const mockLogout = vi.fn();
const mockLoadSavedGame = vi.fn();
const mockNewGame = vi.fn();
const mockCheckForLoadGame = vi.fn();

vi.mock('../src/AuthContext', () => ({
  useAuth: () => ({
    logout: mockLogout,
  }),
}));

vi.mock('../src/GameContext', () => ({
  useGame: () => ({
    LoadSavedGame: mockLoadSavedGame,
    NewGame: mockNewGame,
    loadAvailable: false, 
    CheckForLoadGame: mockCheckForLoadGame,
  }),
}));

it('renders the home page correctly', () => {
  render(<Home />);
  expect(screen.getByText('Shadow of the Giants')).toBeInTheDocument();
  expect(screen.getByText('Start Game')).toBeInTheDocument();
  expect(screen.getByText('Load Game')).toBeInTheDocument();
  expect(screen.getByText('Settings')).toBeInTheDocument();
  expect(screen.getByText('Log Out')).toBeInTheDocument();
});

it('calls NewGame when the "Start Game" button is clicked', async () => {
  render(<Home />);
  await userEvent.click(screen.getByText('Start Game'));
  expect(mockNewGame).toHaveBeenCalled();
});

it('calls logout when the "Log Out" button is clicked', async () => {
  render(<Home />);
  await userEvent.click(screen.getByText('Log Out'));
  expect(mockLogout).toHaveBeenCalled();
});

it('calls settings when the "Settings" button is clicked', async () => {
  render(<Home />);
  await userEvent.click(screen.getByText('Settings'));
  expect(navigateMock).toHaveBeenCalledWith('/settings');
});
