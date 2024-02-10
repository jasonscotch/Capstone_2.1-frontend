import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { user, updateAdventurerName } = useAuth();
  const [newAdventurerName, setNewAdventurerName] = useState('');

  const handleUpdateAdventurerName = (e) => {
    e.preventDefault();

    updateAdventurerName(newAdventurerName);
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='main'>
        <div className="rpgui-container framed">
            <h2>Settings</h2>
            <p>Current Username: {user.username}</p>
            <p>Current Adventurer Name: {user.adventurer_name}</p>
            <br />
            <hr className='golden'></hr>
            <br /> 
            <br />
            <form onSubmit={handleUpdateAdventurerName}>
                <label>
                New Adventurer Name:
                <br />
                <input
                    type="text"
                    value={newAdventurerName}
                    onChange={(e) => setNewAdventurerName(e.target.value)}
                    required
                />
                </label>
                <br />
                <br />
                <button className="rpgui-button" type="submit"><p>Update Name</p></button>
                <button className="rpgui-button" onClick={handleCancel}><p>Cancel</p></button>
            </form>
        </div>
    </div>
  );
};

export default SettingsPage;
