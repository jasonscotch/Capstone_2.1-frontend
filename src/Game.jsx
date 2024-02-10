import { useEffect } from 'react';
import Book from "./Book.jsx";
import AdventureSheet from "./AdventureSheet.jsx";
import { useGame } from "./GameContext.jsx";
import { useNavigate } from 'react-router-dom';


function Game() {
  
  const { stamina } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (stamina <= 0) {
      navigate('/death');
    }
  }, [stamina]);
  
  return (
    <div className="main-game">

      <Book />

      <AdventureSheet />

    </div>
       
  );
}

export default Game;
