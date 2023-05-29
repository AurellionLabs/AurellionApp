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
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import {
  SelectedBox,
  UnSelectedBox,
  BoxHeadingText,
  AnimatedBox,
  AnimatedRoot
} from '../components/StyledComponents';
import { useNavigation } from '@react-navigation/native';

import { DarkTheme, LightTheme } from '../../../common/constants/Colors';
import { Button, ButtonText } from '../../../common/components/StyledComponents';
import { HomeScreenNavigationProp } from '../../../navigation/types';

const Menu = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode

    ? DarkTheme.background2
    : LightTheme.background2;
  const { height: SCREEN_HEIGHT } = Dimensions.get('window')
  const defaultHeight = 70 / 100 * SCREEN_HEIGHT
  const [rootPosition, setRootPosition] = useState<number>(defaultHeight)

  const translateY = useSharedValue(0)
  const setJSHeight = (selectedheight: number) => {
    setRootPosition(selectedheight)
  }
  const gesture = Gesture.Pan().onUpdate((event) => {
    if (event.translationY >= 0 && rootPosition <= defaultHeight) {
      const newHeight = 25 / 100 * SCREEN_HEIGHT
      runOnJS(setJSHeight)(newHeight)
    }
    if (event.translationY <= 0 && rootPosition == 25 / 100 * SCREEN_HEIGHT) {
      const newHeight = 70 / 100 * SCREEN_HEIGHT
      runOnJS(setJSHeight)(newHeight)
    }

  })
  const translateYStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    }
  })
  return (

    <AnimatedRoot height={rootPosition}>
      <GestureDetector gesture={gesture}>
        <AnimatedBox style={translateYStyle}>
          <SelectedBox>
            <View>
              <Image source={require('../../../common/assets/images/hare.png')} style={{ height: 20, width: 20 }} />
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
                  <Image source={require('../../../common/assets/images/running.png')} style={{ height: 20, width: 20 }} />
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
              <Image source={require('../../../common/assets/images/turtle.png')} style={{ height: 20, width: 20 }} />
              <BoxHeadingText>Slow</BoxHeadingText>
              <Text>Next 3 Days</Text>
              <Text>Edit...</Text>
            </View>
            <Text style={{ textAlign: 'right', margin: 0, padding: 0 }}>100 AURA</Text>
          </UnSelectedBox>
          <Button isDarkMode={isDarkMode} backgroundColor={LightTheme.accent} onPress={() => navigation.navigate("Signature")}>
            <ButtonText>Begin</ButtonText>
          </Button>
        </AnimatedBox>
      </GestureDetector>
    </AnimatedRoot>
  );
};




export default Menu;