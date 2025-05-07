import React, { useEffect, useState } from 'react';

interface FadeInScaleProps {
  text: string;
}

const FadeInScale: React.FC<FadeInScaleProps> = ({ text }) => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setShow(false);
    // Start animation after a small delay
    const timeout = setTimeout(() => {
      setShow(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [text]);

  // Split text into words for a staggered animation
  const words = text.split(' ');

  return (
    <div className="animated-text fade-scale-container">
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <ScaledWord 
            word={word} 
            index={index} 
            visible={show} 
            total={words.length}
          />
          {index < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </div>
  );
};

interface ScaledWordProps {
  word: string;
  index: number;
  visible: boolean;
  total: number;
}

const ScaledWord: React.FC<ScaledWordProps> = ({ word, index, visible, total }) => {
  // Create staggered effect radiating from center
  const middleIndex = Math.floor(total / 2);
  const distanceFromMiddle = Math.abs(index - middleIndex);
  
  const style = {
    display: 'inline-block',
    opacity: visible ? 1 : 0,
    transform: visible 
      ? 'scale(1) translateY(0)' 
      : 'scale(0.5) translateY(20px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
    transitionDelay: `${0.1 + distanceFromMiddle * 0.15}s`,
  };

  return (
    <span style={style}>
      {word}
    </span>
  );
};

export default FadeInScale; 