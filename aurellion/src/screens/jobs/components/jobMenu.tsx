import React, { useEffect, useState } from 'react';
import SwitchSelector from 'react-native-switch-selector';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LightTheme } from '../../../common/constants/Colors';
import {
  fetchDriverUnassignedJourneys,
  fetchCustomersJobsObj,
  fetchReceiverJobsObj,
} from '../../../dapp-connectors/dapp-controller';
import { useMainContext } from '../../main.provider';
import { Journey } from '../../../common/types/types';
import JobItem from './jobItem';
import { Container } from '../../../common/components/StyledComponents';
import { UserType } from '../../../common/types/types';
import Loader from '../../../common/loader/loader';
import Accordion from './accordian';

const Menu = () => {
  const { userType, setUserType, refetchDataFromAPI, setRefetchDataFromAPI } = useMainContext();
  const [switchOption, setSwitchOption] = useState(0);
  const [createdJobs, setCreatedJobs] = useState<Journey[]>([]);
  const [receiverJobs, setReceiveJobs] = useState<Journey[]>([]);
  const [unassignedDriverJobs, setUnassignedDriverJobs] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const options = [
    { label: 'Customer', value: 'customer', accessibilityLabel: 'Customer' },
    { label: 'Driver', value: 'driver', accessibilityLabel: 'Driver' },
  ];

  const fetchAndSetJourneys = async () => {
    let createdJourneys: Journey[] = [];
    let receiveJourneys: Journey[] = [];
    let unassignedDriverJourneys: Journey[] = [];
    setIsLoading(true);
    try {
      if (userType === 'customer') {
        setSwitchOption(0);
        createdJourneys = await fetchCustomersJobsObj();
        setCreatedJobs(createdJourneys);
        receiveJourneys = await fetchReceiverJobsObj();
        setReceiveJobs(receiveJourneys);
      } else if (userType === 'driver') {
        setSwitchOption(1);
        unassignedDriverJourneys = await fetchDriverUnassignedJourneys();
        setUnassignedDriverJobs(unassignedDriverJourneys);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Error Fetching Jobs');
    } finally {
      setIsLoading(false);
    }
  };
  // Logic is similar to fetchAndSetJourneys but without the loading animation
  const refetchAndSetJourneys = async () => {
    let createdJourneys: Journey[] = [];
    let receiveJourneys: Journey[] = [];
    let unassignedDriverJourneys: Journey[] = [];
    try {
      if (userType === 'customer') {
        setSwitchOption(0);
        createdJourneys = await fetchCustomersJobsObj();
        setCreatedJobs(createdJourneys);
        receiveJourneys = await fetchReceiverJobsObj();
        setReceiveJobs(receiveJourneys);
      } else if (userType === 'driver') {
        setSwitchOption(1);
        unassignedDriverJourneys = await fetchDriverUnassignedJourneys();
        setUnassignedDriverJobs(unassignedDriverJourneys);
      }
    } catch (error) {
      console.log('Error Fetching Jobs');
    }
  };

  useEffect(() => {
    fetchAndSetJourneys();
  }, [userType]);

  useEffect(() => {
    if (refetchDataFromAPI) {
      refetchAndSetJourneys();
      setRefetchDataFromAPI(false);
    }
  }, [refetchDataFromAPI]);

  return (
    <Container>
      {isError || isLoading ? (
        <Loader isLoading={isLoading} isError={isError} setIsError={setIsError} errorText={errorMessage} />
      ) : (
        <>
          <SwitchSelector
            initial={switchOption}
            onPress={(value: UserType) => setUserType(value)}
            textColor={LightTheme.foreground1}
            selectedColor={LightTheme.accent}
            buttonColor={LightTheme.background2}
            borderColor={LightTheme.accent}
            hasPadding
            options={options}
            accessibilityLabel="user-type-switch-selector"
          />
          {userType === 'customer' && (
            <ScrollView style={styles.container}>
              <Accordion
                data={[
                  {
                    title: 'Send Parcels',
                    content: (
                      <>
                        {createdJobs.map((job) => (
                          <JobItem key={job.jobId} jobID={job.jobId} />
                        ))}
                      </>
                    ),
                  },
                  {
                    title: 'Receive Parcels',
                    content: (
                      <>
                        {receiverJobs.map((job) => (
                          <JobItem key={job.jobId} jobID={job.jobId} />
                        ))}
                      </>
                    ),
                  },
                ]}
              />
            </ScrollView>
          )}
          {userType === 'driver' && (
            <ScrollView style={styles.container}>
              <Accordion
                data={[
                  {
                    title: 'Assigned Jobs',
                    content: (
                      <>
                        <Text>Need to be implemented</Text>
                      </>
                    ),
                  },
                  {
                    title: 'Available Jobs',
                    content: (
                      <>
                        {unassignedDriverJobs.map((job) => (
                          <JobItem key={job.jobId} jobID={job.jobId} />
                        ))}
                      </>
                    ),
                  },
                ]}
              />
            </ScrollView>
          )}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    // TODO: width doesn't behave as expected
    width: '70%',
  },
});

export default Menu;
