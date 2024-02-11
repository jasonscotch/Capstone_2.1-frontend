import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingModal from './LoadingModal';

const LoginPage = () => {
  const { user, login, isLoading, setIsLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { username, password };
    setIsLoading(true); 
    try {
      await login(userData);
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }

  };

  // Check if the user is already logged in
  useEffect(() => {
    if (user) {

      navigate('/', { replace: true });
    }
  }, [user]);

  return (
    <div>
    <div>
       
    </div>
    <div className='main'>
      {isLoading && <LoadingModal />}
      <div className='rpgui-container framed'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input data-testid='username-input' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <br />
          <label>
            Password:
            <input data-testid='password-input' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <br />
          <br />
          <button className="rpgui-button" type='submit' data-testid='login'><p>Login</p></button>
        </form>
      </div>
      
    </div>
    </div>
  );
};

export default LoginPage;
