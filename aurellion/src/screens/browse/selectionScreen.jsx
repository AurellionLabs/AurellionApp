import React, { useState, useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image
} from 'react-native';
import {
  Container,
} from '../../common/components/StyledComponents';
import Menu from './components/DeliveryMenu'
import { DarkTheme, LightTheme } from '../../common/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Region } from 'react-native-maps';

const selectionScreen = ()=>{
    places = ["ikea", "HnM","Supreme"] 
    return(
        <Container style={ backgroundColor }>
            
        </Container>
    )
    
}

export default selectionScreen;