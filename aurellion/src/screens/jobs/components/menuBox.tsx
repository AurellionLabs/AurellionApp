import React from 'react';
import {
  SelectedBox,
} from './StyledComponents';
import {
    Text,
    View,
  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignatureScreenNavigationProp } from '../../../navigation/types';
import { useMainContext } from '../../main.provider';

type BoxProps = {
  selected: boolean;
  jobID: any;
};


const MenuBox: React.FC<BoxProps> = ({ selected, jobID }) => {
  const navigation = useNavigation<SignatureScreenNavigationProp>()
  const { userType } = useMainContext();
  const onPress = () => {
    navigation.navigate('Signature', { heading: userType === 'customer' ? 'Sign to confirm package hand off to driver' : 'Sign to confirm pacakge received from customer', jobID: jobID })
  }
  return (
    <SelectedBox boxState={selected} boxSelected={selected} onPress={onPress}>
      <View>
              <Text>{jobID}</Text>
        </View>
    </SelectedBox>
  );
};

export default MenuBox;