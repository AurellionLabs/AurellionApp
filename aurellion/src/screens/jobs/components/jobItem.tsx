import React from 'react';
import { SelectedBox } from './StyledComponents';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignatureScreenNavigationProp } from '../../../navigation/types';
import { useMainContext } from '../../main.provider';
import { Journey } from '../../../common/types/types';

type BoxProps = {
  jobID: any;
};

const JobItem: React.FC<BoxProps> = ({ jobID }) => {
  const { userType } = useMainContext();
  const navigation = useNavigation<SignatureScreenNavigationProp>();
  const onPress = () => {
    if (userType === 'customer') {
      navigation.navigate('Signature', {
        heading: 'Sign to confirm package hand off to driver',
        job: job,
      });
    } else if (userType === 'driver') {
      navigation.navigate('AssignDriver', {
        job: job,
      });
    }
  };
  return (
    <SelectedBox onPress={onPress}>
      <Text>{jobID}</Text>
    </SelectedBox>
  );
};

export default JobItem;
