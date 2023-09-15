import { DarkTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { LightTheme } from '../constants/Colors';
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

  return <RedButtonText style={{color:LightTheme.accent,fontFamily:"Inter-Bold",fontWeight:"300", fontSize:70, paddingBottom:"10%"}}>{displayedText}</RedButtonText>;
}

export default TypingText;

