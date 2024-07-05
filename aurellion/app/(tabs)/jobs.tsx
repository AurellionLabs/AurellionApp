import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { Container } from '@/components/common/StyledComponents';
import Menu from '@/components/screens/jobs/jobMenu';
import MapView, { Marker, Region } from 'react-native-maps';
import { DarkTheme, LightTheme } from '@/constants/Colors';

const JobScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? DarkTheme.background2 : LightTheme.background2;
  return (
    <Container style={{ backgroundColor }}>
      <Menu />
    </Container>
  );
};

export default JobScreen;
