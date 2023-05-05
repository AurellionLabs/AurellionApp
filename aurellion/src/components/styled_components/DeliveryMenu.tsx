import React, { useState, useCallback, useEffect } from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  PanResponder,
  Dimensions,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { 
  SafeArea,
  Shadow,
  Box,
  SelectedBox,
  UnSelectedBox,
  Container,
  BoldText,
  WhiteText,
  BoxHeadingText,
  BlueButton,
  BlueButtonText,
  DisconnectButton,
  Logo,
  AnimatedBox,
AnimatedRoot } from '../../components/styled_components/StyledComponents';
import { DarkTheme, LightTheme } from '../../constants/Colors';



const Menu = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;
    const {height: SCREEN_HEIGHT} = Dimensions.get('window') 
    const translateY = useSharedValue(0)
    const gesture = Gesture.Pan().onUpdate((event)=>{
        console.log(translateY.value )
        if (event.translationY >= 0) {
            translateY.value = event.translationY;
          }

    })
    const translateYStyle = useAnimatedStyle(() =>{
        return{
            transform: [{translateY: translateY.value}]
        }
    })
return (
    
    <AnimatedRoot>
    <GestureDetector gesture={gesture}>
    <AnimatedBox style={translateYStyle}>
        <SelectedBox>
          <View>
            <Image source={require('../../assets/images/hare.png')} style={{ height: 20, width: 20 }} />
            <Text style={{ color: 'green', fontWeight: '700', textAlign: 'left' }}>Fast</Text>
            <Text>Same Day</Text>
            <Text>Edit...</Text>
          </View>
          <Text style={{ textAlign: 'right', margin: 0, padding: 0 }}>100 AURA</Text>
        </SelectedBox>

        <UnSelectedBox>
          <TouchableOpacity>
            <View>
              <TouchableOpacity>
                <Image source={require('../../assets/images/running.png')} style={{ height: 20, width: 20 }} />
                <Text style={{ color: LightTheme.foreground2, fontWeight: '700', textAlign: 'left' }}>Medium</Text>
                <Text>Next Day</Text>
                <Text>Edit...</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <Text style={{ textAlign: 'right', margin: 0, padding: 0 }}>100 AURA</Text>
        </UnSelectedBox>
        <UnSelectedBox>
          <View>
            <Image source={require('../../assets/images/turtle.png')} style={{ height: 20, width: 20 }} />
            <BoxHeadingText>Slow</BoxHeadingText>
            <Text>Next 3 Days</Text>
            <Text>Edit...</Text>
          </View>
          <Text style={{ textAlign: 'right', margin: 0, padding: 0 }}>100 AURA</Text>
        </UnSelectedBox>
        <BlueButton isDarkMode={isDarkMode} onPress={() => console.log('ran')}>
          <BlueButtonText>Begin</BlueButtonText>
        </BlueButton>
      </AnimatedBox>
      </GestureDetector>
      </AnimatedRoot>
  );
};




export default Menu;