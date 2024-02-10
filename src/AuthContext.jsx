import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";
const LOCAL_STORAGE_KEY = 'userData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [signUpError, setSignUpError] = useState(null); 
    const navigate = useNavigate();
    

    useEffect(() => {
        const savedUserData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedUserData) {
            setUser(JSON.parse(savedUserData));
        }
    }, []);

    const login = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, userData);

            const { data } = response;

            if (response.status === 200) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user));
                setUser(data.user);
                navigate('/');
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
      

    const logout = async () => {

        try {
            await axios.post(`${BASE_URL}/logout`, null, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            localStorage.removeItem(LOCAL_STORAGE_KEY);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const signUp = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/sign-up`, userData);

            const { data } = response;

            console.log(data);

            if (response.status === 200) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user));
                setUser(data.user);
                setSignUpError(null);
                navigate('/');
            }  else {
                console.error('Sign-up failed:', data.error);
                setSignUpError(data.error);
            }
        } catch (error) {
            if (error.status == 500) {
                console.error('Sign-up failed:', error);
                setSignUpError(error); 
            } else {
                console.error('Error during sign-up:', error);
                
                if (error.response.data.error.message == "duplicate key value violates unique constraint \"users_username_key\"") {
                    setSignUpError('Username already exists. Please choose another.');
                } else {
                    console.error('Sign-up failed:', error);
                    setSignUpError('Sign-up failed. Please try again');
                };
                
            };
        };
    };

    const updateAdventurerName = async (newAdventurerName) => {
        try {
          const response = await axios.post(`${BASE_URL}/update-player`, {
            userId: user.id, 
            newAdventurerName: newAdventurerName,
          }, 
          { headers: {
            Authorization: `Bearer ${user.token}`,
            }
        });
      
          const { data } = response;
      
          if (response.status === 200) {
            setUser(data.user);
        
          } else {
            console.error('Adventurer name update failed:', data.error);

          }
        } catch (error) {
          console.error('Error during update:', error);

        }
      };

    return (
        <AuthContext.Provider value={{ user, login, logout, signUp, signUpError, updateAdventurerName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    // console.log(context);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};