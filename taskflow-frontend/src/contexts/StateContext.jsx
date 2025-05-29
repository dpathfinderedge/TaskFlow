import React, { createContext, useContext, useState } from 'react';
const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [ currentMode, setCurrentMode ] = useState(localStorage.getItem('themeMode') || 'Dark');
  const [currentColor, setCurrentColor] = useState(localStorage.getItem('colorMode') || '#03C9D7');
  const [ themeSettings, setThemeSettings ] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
    setThemeSettings(false);
  }

  return(
      <StateContext.Provider
        value={{
          activeMenu,
          setActiveMenu,
          screenSize,
          setScreenSize,
          currentColor,
          setCurrentColor,
          currentMode,
          setCurrentMode,
          themeSettings,
          setThemeSettings,
          setMode,
          setColor
        }}
      >
        {children}
      </StateContext.Provider>
  )
};

export const useStateContext = () => useContext(StateContext);