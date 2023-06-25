import React, { useEffect, useState} from 'react';
import { Gesture, GestureDetector  } from 'react-native-gesture-handler';
import {
  Dimensions,
  Text,
  useColorScheme,
  View,
  Image,
  ScrollView
} from 'react-native';
import { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import {
  SelectedBox,
  BoxHeadingText,
  AnimatedRoot,
  Box
} from './StyledComponents';

import { LightTheme } from '../../../common/constants/Colors';
import { RedButton, RedButtonText } from '../../../common/components/StyledComponents';
import { fetchCustomersJobs, jobCreation } from '../../../dapp-connectors/dapp-controller';
import { useMainContext } from '../../main.provider';
import { navigateDeepLink } from '../../../utils/ExplorerUtils';
import { useNavigation } from '@react-navigation/native';
import { JobScreenNavigationProp } from '../../../navigation/types';
import MenuBox from './menuBox';
const Menu = () => {
  const navigation = useNavigation<JobScreenNavigationProp>()
  const {universalLink, deepLink, wcURI}= useMainContext();
  const { height: SCREEN_HEIGHT } = Dimensions.get('window')
  const defaultHeight = 70/100 * SCREEN_HEIGHT
  const [rootPosition,setRootPosition] = useState<number>(defaultHeight)
  const [boxState,setBoxState] = useState<boolean>(true)
  const [selectedBox,setSelectedBox] = useState<boolean>(true)
  const [selectedBox2,setSelectedBox2] = useState<boolean>(false)
  const [selectedBox3,setSelectedBox3] = useState<boolean>(false)

  const selector = (box:number) =>{
  }
  useEffect(() => {
    createJob()
    }, []);
  const createJob = async () => {
    navigateDeepLink(universalLink, deepLink, wcURI)
    await jobCreation()
    navigation.navigate('Jobs') 
    
  }
  
  var joblist:undefined | number[] = [];
  const returnCustomerJobs = async () =>{

    joblist = await fetchCustomersJobs()
  }
  return (
          <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}style={{width:"100%"}}>
          {
            joblist.map((job, index) => {
            return(
            <MenuBox selected={selectedBox} jobID={job}/>)})
            }
          </ScrollView>       
        );
};




export default Menu;