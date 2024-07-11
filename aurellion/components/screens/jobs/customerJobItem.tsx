import React from 'react';
import { TextRow, StyledSelectedBox } from './StyledComponents';
import { Journey, JourneyStatus } from '@/constants/Types';
import { StyledText } from '@/components/common/StyledComponents';
import { useDeliveryContext } from '@/providers/delivery.provider';
import { useMainContext } from '@/providers/main.provider'
import { router } from 'expo-router';
import { SCREEN_TEXT } from '@/constants/ScreenText';

type BoxProps = {
  journey: Journey;
  handOn?: boolean;
  handOff?: boolean;
};

const CustomerJobItem: React.FC<BoxProps> = ({ journey, handOn, handOff }) => {
  const { isDarkMode } = useMainContext();
  const {setSelectedJourney, setSignatureScreenHeading} = useDeliveryContext();

  if (!handOn && !handOff) {
    console.error("At least one of 'handOn' or 'handOff' prop must be provided");
    return null;
  }

  const onPress = () => {
    setSelectedJourney(journey)
    if (handOn) {
      setSignatureScreenHeading(SCREEN_TEXT.SIGNATURE.CUSTOMER_HAND_ON)
      router.push({pathname: '/signature'})
    } else if (handOff) {
      setSignatureScreenHeading(SCREEN_TEXT.SIGNATURE.CUSTOMER_HAND_OFF)
      router.push({pathname: '/signature'})
    }
  };
  return (
    <StyledSelectedBox isDarkMode={isDarkMode} onPress={onPress}>
      <TextRow>
        <StyledText isDarkMode={isDarkMode} style={{ width: '20%', fontWeight: 'bold', marginRight: 8 }}>
          Job ID:
        </StyledText>
        <StyledText isDarkMode={isDarkMode} style={{ width: '80%' }} numberOfLines={1} ellipsizeMode="tail">
          {journey.jobId}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText isDarkMode={isDarkMode} style={{ width: '20%', fontWeight: 'bold', marginRight: 8 }}>
          Status:
        </StyledText>
        <StyledText isDarkMode={isDarkMode} style={{ width: '80%' }} numberOfLines={1} ellipsizeMode="tail">
          {journey.currentStatus == JourneyStatus.PENDING
            ? 'Pending'
            : journey.currentStatus == JourneyStatus.IN_PROGRESS
            ? 'InProgress'
            : journey.currentStatus == JourneyStatus.COMPLETED
            ? 'Completed'
            : journey.currentStatus == JourneyStatus.CANCELED
            ? 'Canceled'
            : 'Unknown Status'}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText isDarkMode={isDarkMode} style={{ width: '20%', fontWeight: 'bold', marginRight: 8 }}>
          Start:
        </StyledText>
        <StyledText isDarkMode={isDarkMode} style={{ width: '80%' }} numberOfLines={1} ellipsizeMode="tail">
          {journey.parcelData.startName}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText isDarkMode={isDarkMode} style={{ width: '20%', fontWeight: 'bold', marginRight: 8 }}>
          End:
        </StyledText>
        <StyledText isDarkMode={isDarkMode} style={{ width: '80%' }} numberOfLines={1} ellipsizeMode="tail">
          {journey.parcelData.endName}
        </StyledText>
      </TextRow>
    </StyledSelectedBox>
  );
};

export default CustomerJobItem;
