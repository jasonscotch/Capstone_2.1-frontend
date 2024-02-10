import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useGame } from "./GameContext";
import './dist/rpgui.css';

function Home() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { LoadSavedGame, NewGame, loadAvailable, CheckForLoadGame } = useGame();

    const startGame = async () => { await NewGame(); };
    const handleLogout = async () => { await logout(); };

    const handleSettings = () => {
        navigate('/settings');
      }
    
    const handleLoadGame = async () => { 
        await LoadSavedGame(); 
      };
    CheckForLoadGame();

    return (
        <div className="main">
            <div className="rpgui-center">
                <div className="rpgui-container framed">
                    <h1>Shadow of the Giants</h1>
                    <h2>FIGHTING FANTASY - You are the Hero</h2>
                    <hr className="golden"></hr>
                    <div className="rpgui-center-buttons">
                        <button className="rpgui-button golden" type="button" onClick={startGame}>
                            <p>Start Game</p>
                        </button>
                        <button className="rpgui-button golden" type="button" disabled={!loadAvailable} onClick={handleLoadGame}>
                            <p>Load Game</p>
                        </button>
                        <button className="rpgui-button golden" type="button" onClick={handleSettings}>
                            <p>Settings</p>
                        </button>
                        <button className="rpgui-button golden" type="button" onClick={handleLogout}>
                            <p>Log Out</p>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Home;
