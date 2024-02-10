import { useEffect } from 'react';
import SaveProgress from "./SaveProgress";
import DeleteProgress from './DeleteProgress';
import { useGame } from "./GameContext";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";


const Book = () => {

  const {
    inventoryItems,
    setInventoryItems,
    gold,
    setGold,
    stamina,
    setStamina,
    skill,
    setSkill,
    setLuck,
    enemies,
    setEnemies,
    combatRound,
    setCombatRound,
    inCombat,
    setInCombat,
    data,
    items,
    itemsAvailable,
    setItemsAvailable,
    disabledButtons,
    setDisabledButtons,
    showCombatResults,
    setShowCombatResults,
    fightButton,
    setFightButton,
    matchingItems,
    setMatchingItems,
    effectItems, 
    setEffectItems, 
    LoadSavedGame,
    fetchData, 
    progressId,
    loadAvailable

  } = useGame();

  const { user } = useAuth();
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
    window.location.reload();
  };

  const handleLoadGame = async () => { 
    await LoadSavedGame(); 
  };

  const areThereItems = () => {
    if (items.length >= 1) {
      setItemsAvailable(true);
    } else {
      setItemsAvailable(false);
    }
  };

  useEffect(() => {
    areThereItems();
    
  }, [items]);
  

  const handleButtonClick = async (choiceNumber) => {
    const chapterId = data[`choice_${choiceNumber}`];
    if (chapterId) {
      await fetchData(chapterId);
    }
  };

  const renderChoiceButton = (choiceNumber) => {
    const choiceValue = data[`choice_${choiceNumber}`];
    return (
      choiceValue && (
        <button 
          data-testid={`choice`}
          key={choiceNumber}
          disabled={inCombat} 
          className="rpgui-button"
          onClick={() => handleButtonClick(choiceNumber)} 
        >
          <p>Turn to {choiceValue}</p>
        </button>
      )
    );
  };

  // Buying and Taking Items in chapter
  const handleTakeItem = (itemId) => {
    const takenItem = items.find(item => item.item_id === itemId);

    if (takenItem && takenItem.cost === 0) {

      setInventoryItems([...inventoryItems, takenItem]);
      setDisabledButtons([...disabledButtons, takenItem.item_id]);
    }
  };

  const handleBuyItem = (itemId) => {

    const boughtItem = items.find(item => item.item_id === itemId);

    if (boughtItem && boughtItem.cost > 0 && boughtItem.cost <= gold) {

      setInventoryItems([...inventoryItems, boughtItem]);
      setDisabledButtons([...disabledButtons, boughtItem.item_id]);
      
      // Deduct gold from the character
      setGold(gold - boughtItem.cost);
    }
  };

  const renderItems = () => {
    console.log('Debug includes call:', {disabledButtons});
    if (items.length === 0 || (items && items.some(item => item.item_id === null))) {
      return <p> </p>;
    }
    return items.map((item) => (
      <div key={item.item_id}>
        <p>
          Item: {item.item_name}
        </p>

        {item.cost === 0 ? (
          <button className="rpgui-button" onClick={() => handleTakeItem(item.item_id)} disabled={disabledButtons?.includes(item.item_id) || false}>Take</button>
        ) : (
          <button className="rpgui-button" onClick={() => handleBuyItem(item.item_id)} disabled={disabledButtons?.includes(item.item_id) || false}>Buy</button>
        )}
      </div>
    ));
  };


  // Fighting Monsters/Enemies
  const handleFight = () => {
    const playerDiceRolls = rollBothDice();
    const playerAttackStrength = playerDiceRolls.reduce((sum, roll) => sum + roll, 0) + skill;

    const matchItems = inventoryItems.filter(item => item.monster_category === enemies[0].monster_category);

    setMatchingItems(matchItems);

    const itemsWithEffects = inventoryItems.filter(item => item.monster_category === 'player-combatRound');

    setEffectItems(itemsWithEffects);

    effectItems.forEach(item => {
      if (item.effect_category === 'stamina') {
        setStamina(prevStamina => prevStamina + item.effect_amount);
      } else if (item.effect_category === 'skill') {
        setSkill(prevSkill => prevSkill + item.effect_amount);
      } else if (item.effect_category === 'luck') {
        setLuck(prevLuck => prevLuck + item.effect_amount);
      }
    });

    const playerModifiedAttackStrength = matchingItems.reduce((modifiedStrength, item) => {
      return modifiedStrength + item.effect_amount;
    }, playerAttackStrength);


    const updatedEnemies = enemies.map(enemy => {
      const enemyDiceRolls = rollBothDice();
      const enemyAttackStrength = enemyDiceRolls.reduce((sum, roll) => sum + roll, 0) + enemy.skill;

      if (playerModifiedAttackStrength > enemyAttackStrength) {
        //Player wounds the enemy
        return { ...enemy, stamina: enemy.stamina - 2};
      } else if (enemyAttackStrength > playerModifiedAttackStrength) {
        //Enemy wounds player
        setStamina(prevStamina => prevStamina - 2);
        return enemy;
      }
      // If you both miss, return the enemy unchanged
      return enemy;
    })
    .filter(enemy => enemy.stamina > 0);
    setEnemies(updatedEnemies);
    setCombatRound((prevCombatRound) => prevCombatRound + 1);

    if (updatedEnemies.length === 0 || updatedEnemies.some(monster => monster.monster_id === null)) {
      setShowCombatResults(false);
      setFightButton(true);
      setCombatRound(0);
      setInCombat(false);
    }
  };

  const rollBothDice = () => {
    const rolls = [];
    
    for (let i = 0; i < 2; i++) {
      const roll = getRandomNumber(1, 6);
      rolls.push(roll);
    }
  
    return rolls;
  };

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const renderEnemies = () => {
    if (enemies.length === 0 || enemies.some(monster => monster.monster_id === null)) {
        return <p> </p>;
    }

    return enemies.map((monster) => (
        <div key={monster.monster_id}>
            <h2>
                {monster.monster_name}&emsp;&emsp;&emsp;&emsp;Skill: {monster.skill}&emsp;&emsp;Stamina: {monster.stamina}
            </h2>
        </div>
    ));
  };
  

  return (
    <div style={{width: '60%'}}>
    <div className='rpgui-container framed' style={{maxHeight: '99vh', overflowY: 'auto' }}>
      <div className='book'>
        <h2>{data.title}</h2>
        <button className="rpgui-button golden"><p>Chapter: {data.chapter_id}</p></button>

        
        <div dangerouslySetInnerHTML={{ __html: data.text_body }} />

        <hr className='golden'></hr>

        {renderItems()}

        {showCombatResults && (
          <div>
            <h4>Combat Round: {combatRound}</h4>
            <h2>Player Stamina: {stamina}</h2>
            {matchingItems.length > 0 && (
              <h3>Item Effects: {matchingItems[0].effect_name}</h3>
            )}
            {effectItems.length > 0 && (
              <h3>Item Effects: {effectItems[0].effect_name}</h3>
            )}
            {renderEnemies()}
          </div>
        )}

        {inCombat && 
          <div className='main-game'>
            <div class="rpgui-icon sword"></div>
            <button className="rpgui-button" disabled={fightButton} onClick={() => {setShowCombatResults(true); handleFight();}}>Fight</button>
            <div class="rpgui-icon exclamation"></div>
            <br></br>
          </div>
        }
        <br></br>
        <div>
          {Array.from({ length: 5 }, (_, i) => renderChoiceButton(i + 1))}
        </div>
        
        <div className="rpgui-right">
          <button onClick={goHome}>HOME</button>
          <SaveProgress />
          <button disabled={itemsAvailable || !loadAvailable} onClick={handleLoadGame}>LOAD</button>
          <DeleteProgress progressId={progressId}/>
        </div>    
        
      </div>
    </div>
    </div>
  );
};

export default Book;
