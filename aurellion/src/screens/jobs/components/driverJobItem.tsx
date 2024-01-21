import React from 'react';
import { SelectedBox } from './StyledComponents';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignatureScreenNavigationProp } from '../../../navigation/types';
import { Journey, JourneyStatus } from '../../../common/types/types';

type BoxProps = {
  job: Journey;
  assigned?: boolean;
  available?: boolean;
};

const CustomerJobItem: React.FC<BoxProps> = ({ job, assigned, available }) => {
  const navigation = useNavigation<SignatureScreenNavigationProp>();

  if (!assigned && !available) {
    console.error("At least one of 'handOn' or 'handOff' prop must be provided");
    return null;
  }

  const onPress = () => {
    if (available) {
      navigation.navigate('AssignDriver', {
        jobID: job.jobId,
      });
    } else if (assigned) {
      if (job.currentStatus == JourneyStatus.PENDING) {
        navigation.navigate('Signature', {
          heading: 'Sign to confirm package received from customer',
          jobID: job.jobId,
        });
      } else if (job.currentStatus == JourneyStatus.IN_PROGRESS) {
        navigation.navigate('Signature', {
          heading: 'Sign to confirm package handed over to receiver',
          jobID: job.jobId,
        });
      }
    }
  };
  return (
    <SelectedBox onPress={onPress}>
      <Text>{job.jobId}</Text>
    </SelectedBox>
  );
};

export default CustomerJobItem;
