import { RouterProvider, Navigate } from 'react-router-dom';
import  router  from './router';
import { useStateContext } from './contexts/StateContext';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { setActiveMenu, currentMode, screenSize, setScreenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className={currentMode === 'Light' ? 'light' : ''}>
      <RouterProvider router={router} /> 
      <Toaster position="top-right" />
    </div>
  )
}

export default App;