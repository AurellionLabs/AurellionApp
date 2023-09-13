import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { RedButtonText } from './StyledComponents';

function TypingText({ text, speed }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearInterval(timer);
    }
  }, [index, text, speed]);

  return <RedButtonText style={{color:"#fca503"}}>{displayedText}</RedButtonText>;
}

export default TypingText;

