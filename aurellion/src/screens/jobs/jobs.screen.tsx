import React, { useState } from 'react';
import {
  useColorScheme,
} from 'react-native';
import {
  Container,
} from '../../common/components/StyledComponents';
import NavigationBar from '../../common/components/NavBar';
import Menu from './components/jobMenu'
import { DarkTheme, LightTheme } from '../../common/constants/Colors';
import MapView, { Marker, Region } from 'react-native-maps';


const JobScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;
  return (
    <Container style={{ backgroundColor }}>
        <Menu />
        <NavigationBar/>
    </Container>
  );
};




export default JobScreen;