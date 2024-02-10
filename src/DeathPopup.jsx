import { useNavigate } from 'react-router-dom';
import './DeathPopup.css';
import death from './dead.gif';

const DeathPopup = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
      // Redirect to the homepage
      navigate('/');
      window.location.reload();
    };
    
  
    return (
    <div className="popup-container">
      <div className="popup-content rpgui-container framed">
        <h2>Your Adventure is over...</h2>
        <div className='gif-2'>
            <img src={death} alt='death'/>
          </div>
          <br></br>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default DeathPopup;