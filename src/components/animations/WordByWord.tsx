import React, { useEffect, useState } from 'react';

interface WordByWordProps {
  text: string;
}

const WordByWord: React.FC<WordByWordProps> = ({ text }) => {
  const [show, setShow] = useState(false);
  const words = text.split(' ');
  
  useEffect(() => {
    setShow(false);
    // Start animation after a small delay
    const timeout = setTimeout(() => {
      setShow(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="animated-text">
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <Word 
            word={word} 
            index={index} 
            visible={show} 
          />
          {index < words.length - 1 && <span style={{ display: 'inline-block', width: '0.5rem' }}></span>}
        </React.Fragment>
      ))}
    </div>
  );
};

interface WordProps {
  word: string;
  index: number;
  visible: boolean;
}

const Word: React.FC<WordProps> = ({ word, index, visible }) => {
  const style = {
    display: 'inline-block',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-20px)',
    transition: `opacity 0.5s ease, transform 0.5s ease`,
    transitionDelay: `${index * 200}ms`,
  };

  return (
    <span className="word" style={style}>
      {word}
    </span>
  );
};

export default WordByWord; 