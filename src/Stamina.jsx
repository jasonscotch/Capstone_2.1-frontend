

const StaminaSection = ({ stamina, setStamina, originalStamina, setOriginalStamina, initialStaminalInputDone, setInitialStaminaInputDone }) => {

    const handleIncrease = () => {
        setStamina(stamina + 1);
    };

    const handleDecrease = () => {
        setStamina(stamina - 1);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setOriginalStamina(isNaN(value) ? 0 : value);
    };

    const handleInputSubmit = () => {
        setInitialStaminaInputDone(true);
        setStamina(originalStamina); 
    };

    return (
        <div className='rpgui-container framed-golden'>
        {!initialStaminalInputDone && (
            <div className='main-game-stats'>
            <label>
                Stamina: 
                <input
                type="number"
                value={originalStamina}
                onChange={(e) => handleInputChange(e)}
                />
                <button onClick={handleInputSubmit}> > </button>
            </label>
            
            </div>
        )}
        {initialStaminalInputDone && (
            <div className='main-game-stats-2'>
                <h2>Stamina</h2>
                <h1>{stamina}</h1>

                <div>
                    <button aria-label="-" onClick={handleDecrease} disabled={stamina === 0}>-</button>
                    <button aria-label="+"onClick={handleIncrease} disabled={stamina === originalStamina}>+</button>
                </div>
            </div>
        )}
        </div>
    );
};

export default StaminaSection;
