import {render, screen, waitFor} from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from '@testing-library/user-event';
import SignUpPage from "../src/SignUpPage";
import { AuthProvider } from '../src/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

const renderSignUpPage = () => {
    render (
        <Router>
            <AuthProvider>
                <SignUpPage />  
            </AuthProvider>
        </Router>
    );
};

const signUp = vi.fn();
const saveError = vi.fn();
const setSaveError = vi.fn();

describe('SignUp Page', () => {
    beforeEach(() => {
        signUp.mockReset();
        
        vi.mock('../src/AuthContext', async (importOriginal) => {
           
            const actual = await importOriginal(); // Import the actual module
            return {
              ...actual, // Spread all original exports
              useAuth: () => ({ // Override specific exports as needed
                  user: null,
                  login: vi.fn(),
                  logout: vi.fn(),
                  signUp: signUp,
                  signUpError: 'Test error message',
                  updateAdventurerName: vi.fn(),
              }),
            };
          });

          vi.mock("../src/GameContext", async (importOriginal) => {
            const actual = await importOriginal();
            return {
                ...actual,
                useGame: () => ({
                    saveError: saveError,
                    setSaveError: setSaveError
                })
            };
          });

          vi.mock('react-router-dom', async (importOriginal) => {
            const actual = await importOriginal();
            return {
                ...actual,
                useNavigate: () => vi.fn(),
            }
            
          });

    });

    afterEach(() => {
        vi.clearAllMocks();
    });


    it('renders the signup page correctly', () => {
       renderSignUpPage(); 
       expect(screen.getByTestId("sign-up")).toHaveTextContent("Sign Up");
       expect(screen.getByTestId("cancel")).toHaveTextContent("Cancel");
    });

    it('calls signup with the username, adventurer name, and password when the form is submitted', async () => {
      
        renderSignUpPage();
      
        await userEvent.type(screen.getByTestId('username-input'), 'testuser');
        await userEvent.type(screen.getByTestId('adventurer-name'), 'Geralt');
        await userEvent.type(screen.getByTestId('password-input'), 'password');
      
        userEvent.click(screen.getByTestId('sign-up'));
      
        await waitFor(() => {
          expect(signUp).toHaveBeenCalledWith({
            username: 'testuser',
            adventurerName: 'Geralt',
            password: 'password',
            });
        });
      });

      it('displays an error message if sign-up fails', async () => {
        // Setup the mock to reject to simulate a sign-up error
        signUp.mockRejectedValue(new Error('Test error message'));
      
        renderSignUpPage();
      
        await userEvent.type(screen.getByTestId('username-input'), 'testuser');
        await userEvent.type(screen.getByTestId('password-input'), 'password');
        await userEvent.type(screen.getByTestId('adventurer-name'), 'adventurer');
      
        await userEvent.click(screen.getByTestId('sign-up'));
      
        expect(screen.getByText('Test error message')).toBeInTheDocument();
      });


});
