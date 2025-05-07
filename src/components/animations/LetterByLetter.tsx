import React, { useEffect, useState } from "react";

interface LetterByLetterProps {
  text: string;
}

const LetterByLetter: React.FC<LetterByLetterProps> = ({ text }) => {
  const [show, setShow] = useState(false);
  // Split text into words first
  const words = text.split(" ");

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
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((letter, letterIndex) => (
              <Letter
                key={letterIndex}
                letter={letter}
                index={wordIndex * 100 + letterIndex}
                visible={show}
              />
            ))}
          </span>
          {/* Add space between words, but not after the last word */}
          {wordIndex < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.5rem" }}></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

interface LetterProps {
  letter: string;
  index: number;
  visible: boolean;
}

const Letter: React.FC<LetterProps> = ({ letter, index, visible }) => {
  // Don't animate spaces, just render them
  if (letter === " ") {
    return <span style={{ display: "inline-block", width: "0.5rem" }}></span>;
  }

  const style = {
    display: "inline-block",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.5s ease, transform 0.5s ease`,
    transitionDelay: `${index * 2}ms`,
  };

  return (
    <span className="letter" style={style}>
      {letter}
    </span>
  );
};

export default LetterByLetter;
