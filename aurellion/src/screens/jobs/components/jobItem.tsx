import React from 'react';
import { SelectedBox, TextRow, TextValue, LabelText, StyledSelectedBox } from './StyledComponents';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignatureScreenNavigationProp } from '../../../navigation/types';
import { useMainContext } from '../../main.provider';
import { Journey, ParcelData } from '../../../common/types/types';

type BoxProps = {
  job: Journey;
};

const JobItem: React.FC<BoxProps> = ({ job }) => {
  const { userType } = useMainContext();
  const navigation = useNavigation<SignatureScreenNavigationProp>();
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
    <StyledSelectedBox onPress={onPress}>
      <TextRow>
        <LabelText>Job ID:</LabelText>
        <TextValue numberOfLines={1} ellipsizeMode="tail">
          {job.jobId}
        </TextValue>
      </TextRow>
      <TextRow>
        <LabelText>Status:</LabelText>
        <TextValue>
          {job.currentStatus == '0'
            ? 'Pending'
            : job.currentStatus == '1'
            ? 'InProgress'
            : job.currentStatus == '2'
            ? 'Completed'
            : job.currentStatus == '3'
            ? 'Canceled'
            : 'Unknown Status'}
        </TextValue>
      </TextRow>
      <TextRow>
        <LabelText>Start:</LabelText>
        <TextValue>{job.parcelData.startName}</TextValue>
      </TextRow>
      <TextRow>
        <LabelText>End:</LabelText>
        <TextValue>{job.parcelData.endName}</TextValue>
      </TextRow>
    </StyledSelectedBox>
  );
};

export default JobItem;
