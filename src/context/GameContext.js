import { createContext, useContext, useState } from 'react';

const GameContext = createContext(null);

const STARTING_COINS = 100;

export function GameProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [coins, setCoins] = useState(STARTING_COINS);
  const [route, setRoute] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [missionItems, setMissionItems] = useState([]);
  const [gameTime, setGameTime] = useState(0);

  const resetGame = () => {
    setCart([]);
    setCoins(STARTING_COINS);
    setRoute([]);
    setCurrentStore(null);
    setGameTime(0);
  };

  return (
    <GameContext.Provider
      value={{
        cart,
        setCart,
        coins,
        setCoins,
        route,
        setRoute,
        currentStore,
        setCurrentStore,
        missionItems,
        setMissionItems,
        gameTime,
        setGameTime,
        resetGame,
      }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}
