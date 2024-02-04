import React from 'react';
import { SelectedBox, TextRow, StyledSelectedBox } from './StyledComponents';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignatureScreenNavigationProp } from '../../../navigation/types';
import { useMainContext } from '../../main.provider';
import { Journey, ParcelData } from '../../../common/types/types';
import { StyledText } from '../../../common/components/StyledComponents';

type BoxProps = {
  job: Journey;
};

const JobItem: React.FC<BoxProps> = ({ job }) => {
  const { userType } = useMainContext();
  const navigation = useNavigation<SignatureScreenNavigationProp>();
  const { setDeliveryOption, isDarkMode } = useMainContext();
  const onPress = () => {
    if (userType === 'customer') {
      navigation.navigate('Signature', {
        heading: 'Sign to confirm package hand off to driver',
        jobID: job.jobId,
      });
    } else if (userType === 'driver') {
      navigation.navigate('AssignDriver', {
        jobID: job.jobId,
      });
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
          {job.currentStatus == '0'
            ? 'Pending'
            : job.currentStatus == '1'
            ? 'InProgress'
            : job.currentStatus == '2'
            ? 'Completed'
            : job.currentStatus == '3'
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

export default JobItem;
