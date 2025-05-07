import React, { useEffect, useState } from 'react';

interface TypingSimulationProps {
  text: string;
}

const TypingSimulation: React.FC<TypingSimulationProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Reset and start typing when text changes
    setDisplayedText('');
    setIsComplete(false);
    
    let currentIndex = 0;
    const typingSpeed = 60; // ms per character
    
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <div className="animated-text">
      <span>{displayedText}</span>
      {!isComplete && <span className="typing-cursor"></span>}
    </div>
  );
};

export default TypingSimulation; 