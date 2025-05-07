import React, { useEffect, useState } from "react";

interface FlipAnimationProps {
  text: string;
}

const FlipAnimation: React.FC<FlipAnimationProps> = ({ text }) => {
  const [show, setShow] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    // Reset states
    setShow(false);

    // Start animation after a small delay
    const timeout = setTimeout(() => {
      setShow(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  return (
    <div className="animated-text">
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <WordFlip
            word={word}
            index={index}
            visible={show}
            total={words.length}
          />
          {index < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.5rem" }}></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

interface WordFlipProps {
  word: string;
  index: number;
  visible: boolean;
  total: number;
}

const WordFlip: React.FC<WordFlipProps> = ({ word, index, visible }) => {
  const style = {
    display: "inline-block",
    opacity: visible ? 1 : 0,
    transform: visible ? "rotateX(0deg)" : "rotateX(90deg)",
    transformOrigin: "center",
    transition: "transform 0.7s ease, opacity 0.3s ease",
    transitionDelay: `${index * 150}ms`,
    whiteSpace: "nowrap",
    perspective: "800px",
  };

  return <span style={style}>{word}</span>;
};

export default FlipAnimation;
