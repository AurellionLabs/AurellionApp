import React from 'react';
import { SelectedBox } from './StyledComponents';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignatureScreenNavigationProp } from '../../../navigation/types';
import { Journey } from '../../../common/types/types';
import { BigNumber, ethers } from 'ethers';

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
    // console.log(job);
    // const dateVal = ethers.BigNumber.from(job.createdDateTime).toNumber();
    // console.log("\n\nCreatedDateTime: " + dateVal + "\n\n");
    // const date = new Date(dateVal * 1000);
    // console.log("\n\nCreatedDateTime as Date: " + date.toLocaleString("en-GB") + "\n\n");
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
      {/* <Text>{job.jobId}</Text> */}
      {/* <Text>Created At</Text> */}
      <Text>{job.createdDateTime}</Text>
      {/* <Text>{job.journeyStart}</Text> */}
    </SelectedBox>
  );
};

export default CustomerJobItem;
