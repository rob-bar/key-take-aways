import { useState, useEffect } from 'react';
import LetterByLetter from './animations/LetterByLetter';
import WordByWord from './animations/WordByWord';
import TypingSimulation from './animations/TypingSimulation';
import FlipAnimation from './animations/FlipAnimation';
import FadeInScale from './animations/FadeInScale';
import '../styles/AnimatedPresentation.css';

interface AnimatedPresentationProps {
  statements: string[];
}

const AnimatedPresentation: React.FC<AnimatedPresentationProps> = ({ statements }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        setCurrentIndex(prev => {
          // If we've reached the end, loop back to the first slide
          if (prev >= statements.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Start with the first slide
    setCurrentIndex(0);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [statements.length]);

  // If no statement is selected yet
  if (currentIndex === -1) {
    return (
      <div className="presentation">
        <h2>Press spacebar to start presentation</h2>
      </div>
    );
  }

  const renderCurrentAnimation = () => {
    const statement = statements[currentIndex];
    
    // Each statement has a different animation style
    switch (currentIndex) {
      case 0:
        return <LetterByLetter text={statement} />;
      case 1:
        return <WordByWord text={statement} />;
      case 2:
        return <TypingSimulation text={statement} />;
      case 3:
        return <FlipAnimation text={statement} />;
      case 4:
        return <FadeInScale text={statement} />;
      default:
        return <div>{statement}</div>;
    }
  };

  return (
    <div className="presentation">
      {renderCurrentAnimation()}
      <div className="presentation-counter">
        {currentIndex + 1} / {statements.length}
      </div>
    </div>
  );
};

export default AnimatedPresentation; 