import { DarkTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { LightTheme } from '../constants/Colors';
import { TitleText } from './StyledComponents';

function TypingText({ text, speed, isDarkMode }) {
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

  return <TitleText isDarkMode={isDarkMode}>{displayedText}</TitleText>;
}

export default TypingText;
