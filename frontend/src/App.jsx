import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import ChatApp from "./pages/ChatApp";

const App = () => {
  // Fix for mobile viewport height issues
  useEffect(() => {
    const setVH = () => {
      // Set the value of --vh custom property to the actual viewport height
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial set
    setVH();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <div className="flex flex-col" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <Navbar />
      <ChatApp />
    </div>
  );
};

export default App;