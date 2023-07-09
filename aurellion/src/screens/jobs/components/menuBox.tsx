import React from 'react';
import {
  SelectedBox,
  BoxHeadingText,
  AnimatedRoot,
  Box
} from './StyledComponents';
import {
    Dimensions,
    Text,
    useColorScheme,
    View,
    Image
  } from 'react-native';
type BoxProps = {
  selected: boolean;
  jobID: any;
};

const MenuBox: React.FC<BoxProps> = ({ selected, jobID }) => {
  return (
    <SelectedBox boxState={selected} boxSelected={selected}>
      <View>
              <Text>{jobID}</Text>
        </View>
    </SelectedBox>
  );
};

export default MenuBox;