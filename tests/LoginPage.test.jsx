import {render, screen, waitFor} from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from '@testing-library/user-event';
import LoginPage from "../src/LoginPage";
import { AuthProvider } from '../src/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

const renderLoginPage = () => {
    render (
        <Router>
            <AuthProvider>
                <LoginPage />  
            </AuthProvider>
        </Router>
    );
};

const login = vi.fn();

describe('LoginPage', () => {
    beforeEach(() => {
        login.mockReset();
        
        vi.mock('../src/AuthContext', async (importOriginal) => {
           
            const actual = await importOriginal(); // Import the actual module
            return {
              ...actual, // Spread all original exports
              useAuth: () => ({ // Override specific exports as needed
                  user: null,
                  login: login,
                  logout: vi.fn(),
                  signUp: vi.fn(),
                  signUpError: null,
                  updateAdventurerName: vi.fn(),
              }),
            };
          });

    });

    afterEach(() => {
        vi.clearAllMocks();
    });


    it('renders the login page correctly', () => {
       renderLoginPage(); 
       expect(screen.getByTestId("login")).toHaveTextContent(
        "Login"
        );
    });

    it('calls login with the username and password when the form is submitted', async () => {
      
        renderLoginPage();
      
        await userEvent.type(screen.getByTestId('username-input'), 'testuser');
        await userEvent.type(screen.getByTestId('password-input'), 'password');
      
        userEvent.click(screen.getByTestId('login'));
      
        await waitFor(() => {
          expect(login).toHaveBeenCalledWith({
            username: 'testuser',
             password: 'password',
            });
        });
      });


});
