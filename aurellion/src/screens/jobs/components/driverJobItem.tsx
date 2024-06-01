import React from 'react';
import {TextRow, StyledSelectedBox} from './StyledComponents';
import {useNavigation} from '@react-navigation/native';
import {SignatureScreenNavigationProp} from '../../../navigation/types';
import {Journey, JourneyStatus} from '../../../common/types/types';
import {StyledText} from '../../../common/components/StyledComponents';
import {useMainContext} from '../../main.provider';

type BoxProps = {
  job: Journey;
  assigned?: boolean;
  available?: boolean;
};

const CustomerJobItem: React.FC<BoxProps> = ({job, assigned, available}) => {
  const navigation = useNavigation<SignatureScreenNavigationProp>();
  const {setDeliveryOption, isDarkMode} = useMainContext();

  if (!assigned && !available) {
    console.error(
      "At least one of 'handOn' or 'handOff' prop must be provided",
    );
    return null;
  }

  const onPress = () => {
    if (available) {
      navigation.navigate('AssignDriver', {
        job: job,
      });
    } else if (assigned) {
      if (job.currentStatus == JourneyStatus.PENDING) {
        navigation.navigate('Signature', {
          heading: 'Sign to confirm package received from customer',
          job: job,
        });
      } else if (job.currentStatus == JourneyStatus.IN_PROGRESS) {
        navigation.navigate('Signature', {
          heading: 'Sign to confirm package handed over to receiver',
          job: job,
        });
      }
    }
  };
  return (
    <StyledSelectedBox isDarkMode={isDarkMode} onPress={onPress}>
      <TextRow>
        <StyledText
          isDarkMode={isDarkMode}
          style={{width: '20%', fontWeight: 'bold', marginRight: 8}}>
          Job ID:
        </StyledText>
        <StyledText
          isDarkMode={isDarkMode}
          style={{width: '80%'}}
          numberOfLines={1}
          ellipsizeMode="tail">
          {job.jobId}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText
          isDarkMode={isDarkMode}
          style={{width: '20%', fontWeight: 'bold', marginRight: 8}}>
          Status:
        </StyledText>
        <StyledText
          isDarkMode={isDarkMode}
          style={{width: '80%'}}
          numberOfLines={1}
          ellipsizeMode="tail">
          {job.currentStatus == JourneyStatus.PENDING
            ? 'Pending'
            : job.currentStatus == JourneyStatus.IN_PROGRESS
            ? 'InProgress'
            : job.currentStatus == JourneyStatus.COMPLETED
            ? 'Completed'
            : job.currentStatus == JourneyStatus.CANCELED
            ? 'Canceled'
            : 'Unknown Status'}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText
          isDarkMode={isDarkMode}
          style={{width: '20%', fontWeight: 'bold', marginRight: 8}}>
          Start:
        </StyledText>
        <StyledText
          isDarkMode={isDarkMode}
          style={{width: '80%'}}
          numberOfLines={1}
          ellipsizeMode="tail">
          {job.parcelData.startName}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText
          isDarkMode={isDarkMode}
          style={{width: '20%', fontWeight: 'bold', marginRight: 8}}>
          End:
        </StyledText>
        <StyledText
          isDarkMode={isDarkMode}
          style={{width: '80%'}}
          numberOfLines={1}
          ellipsizeMode="tail">
          {job.parcelData.endName}
        </StyledText>
      </TextRow>
    </StyledSelectedBox>
  );
};

export default CustomerJobItem;
