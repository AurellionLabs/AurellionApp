import React from 'react';
import { SelectedBox } from './StyledComponents';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMainContext } from '@/providers/main.provider';
import { Journey } from '@/constants/Types';
import { useDeliveryContext } from '@/providers/delivery.provider';
import { SCREEN_TEXT } from '@/constants/ScreenText';
import { router } from 'expo-router';

type BoxProps = {
  journey: Journey;
};

const JobItem: React.FC<BoxProps> = ({ journey }) => {
  var { userType } = useMainContext();
  const {setSelectedJourney, setSignatureScreenHeading} = useDeliveryContext();

  const onPress = () => {
    setSelectedJourney(journey)
    if (userType === 'customer') {
      setSignatureScreenHeading(SCREEN_TEXT.SIGNATURE.CUSTOMER_HAND_ON)
      router.push({pathname: '/delivery/signature'})
    } else if (userType === 'driver') {
      router.push({pathname: '/delivery/driver/assignDriver'})      
    }
  };
  return (
    <SelectedBox onPress={onPress}>
      <Text>{job.jobId}</Text>
    </SelectedBox>
  );
};

export default JobItem;
