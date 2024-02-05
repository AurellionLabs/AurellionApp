import React from 'react';
import { SelectedBox } from './StyledComponents';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignatureScreenNavigationProp } from '../../../navigation/types';
import { Journey } from '../../../common/types/types';

type BoxProps = {
  job: Journey;
  handOn?: boolean;
  handOff?: boolean;
};

const CustomerJobItem: React.FC<BoxProps> = ({ job, handOn, handOff }) => {
  const navigation = useNavigation<SignatureScreenNavigationProp>();

  if (!handOn && !handOff) {
    console.error("At least one of 'handOn' or 'handOff' prop must be provided");
    return null;
  }

  const onPress = () => {
    if (handOn) {
      navigation.navigate('Signature', {
        heading: 'Sign to confirm package hand off to driver',
        job: job,
      });
    } else if (handOff) {
      navigation.navigate('Signature', {
        heading: 'Sign to confirm package received from driver',
        job: job,
      });
    }
  };
  return (
    <SelectedBox onPress={onPress}>
      <Text>{job.jobId}</Text>
    </SelectedBox>
  );
};

export default CustomerJobItem;
