import React from 'react';
import { TextRow, StyledSelectedBox } from './StyledComponents';
import { useNavigation } from '@react-navigation/native';
// import { SignatureScreenNavigationProp } from '../../../navigation/types';
import { Journey, JourneyStatus } from '@/constants/Types';
import { StyledText } from '@/components/common/StyledComponents';
import { useMainContext } from '@/providers/main.provider'

type BoxProps = {
  job: Journey;
  handOn?: boolean;
  handOff?: boolean;
};

const CustomerJobItem: React.FC<BoxProps> = ({ job, handOn, handOff }) => {
  // const navigation = useNavigation<SignatureScreenNavigationProp>();
  const { setDeliveryOption, isDarkMode } = useMainContext();

  if (!handOn && !handOff) {
    console.error("At least one of 'handOn' or 'handOff' prop must be provided");
    return null;
  }

  const onPress = () => {
    if (handOn) {
      // navigation.navigate('Signature', {
      //   heading: 'Sign to confirm package hand off to driver',
      //   job: job,
      // });
    } else if (handOff) {
      // navigation.navigate('Signature', {
      //   heading: 'Sign to confirm package received from driver',
      //   job: job,
      // });
    }
  };
  return (
    <StyledSelectedBox isDarkMode={isDarkMode} onPress={onPress}>
      <TextRow>
        <StyledText isDarkMode={isDarkMode} style={{ width: '20%', fontWeight: 'bold', marginRight: 8 }}>
          Job ID:
        </StyledText>
        <StyledText isDarkMode={isDarkMode} style={{ width: '80%' }} numberOfLines={1} ellipsizeMode="tail">
          {job.jobId}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText isDarkMode={isDarkMode} style={{ width: '20%', fontWeight: 'bold', marginRight: 8 }}>
          Status:
        </StyledText>
        <StyledText isDarkMode={isDarkMode} style={{ width: '80%' }} numberOfLines={1} ellipsizeMode="tail">
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
        <StyledText isDarkMode={isDarkMode} style={{ width: '20%', fontWeight: 'bold', marginRight: 8 }}>
          Start:
        </StyledText>
        <StyledText isDarkMode={isDarkMode} style={{ width: '80%' }} numberOfLines={1} ellipsizeMode="tail">
          {job.parcelData.startName}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText isDarkMode={isDarkMode} style={{ width: '20%', fontWeight: 'bold', marginRight: 8 }}>
          End:
        </StyledText>
        <StyledText isDarkMode={isDarkMode} style={{ width: '80%' }} numberOfLines={1} ellipsizeMode="tail">
          {job.parcelData.endName}
        </StyledText>
      </TextRow>
    </StyledSelectedBox>
  );
};

export default CustomerJobItem;
