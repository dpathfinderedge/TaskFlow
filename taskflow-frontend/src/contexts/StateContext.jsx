import React, { createContext, useContext, useState } from 'react';
const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [ currentMode, setCurrentMode ] = useState(localStorage.getItem('themeMode') || 'Dark');
  const [ themeSettings, setThemeSettings ] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
    setThemeSettings(false);
  };

  return(
      <StateContext.Provider
        value={{
          activeMenu,
          setActiveMenu,
          screenSize,
          setScreenSize,
          currentMode,
          setCurrentMode,
          themeSettings,
          setThemeSettings,
          setMode,
        }}
      >
        {children}
      </StateContext.Provider>
  )
};

export const useStateContext = () => useContext(StateContext);