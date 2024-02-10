import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './dist/rpgui.css';


const SignUpPage = () => {
  const { signUp, signUpError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adventurerName, setAdventurerName] = useState('');

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/login');
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      signUp({ username, password, adventurerName });
    } catch (err) {
      console.error('Error during sign-up:', err);
    }
    
  };

  return (
    <div className="main">
      <div className="rpgui-container framed">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label>
            Username:
            <input
              data-testid='username-input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {signUpError && <p style={{ color: 'red' }}>{signUpError}</p>}
          <br />
          <br />
          <label>
            Adventurer Name:
            <input
              data-testid='adventurer-name'
              type="text"
              value={adventurerName}
              onChange={(e) => setAdventurerName(e.target.value)}
              required
            />
          </label>
          <br />
          <br />
          <label>
            Password:
            <input
              data-testid='password-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <br />
          <br />
          <button data-testid='sign-up' className="rpgui-button" type="submit"><p>Sign Up</p></button>
          <button data-testid='cancel' className="rpgui-button" onClick={handleCancel}><p>Cancel</p></button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
