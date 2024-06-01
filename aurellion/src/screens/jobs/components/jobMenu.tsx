import React, {useEffect, useState} from 'react';
import SwitchSelector from 'react-native-switch-selector';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {LightTheme, DarkTheme} from '../../../common/constants/Colors';
import {
  fetchDriverUnassignedJourneys,
  fetchDriverAssignedJourneys,
  fetchCustomerJobs,
  fetchReceiverJobs,
} from '../../../dapp-connectors/dapp-controller';
import {useMainContext} from '../../main.provider';
import {Journey} from '../../../common/types/types';
import CustomerJobItem from './customerJobItem';
import DriverJobItem from './driverJobItem';
import {Container} from '../../../common/components/StyledComponents';
import {UserType} from '../../../common/types/types';
import Loader from '../../../common/loader/loader';
import Accordion from './accordian';

const Menu = () => {
  const {
    userType,
    setUserType,
    refetchDataFromAPI,
    setRefetchDataFromAPI,
    isDarkMode,
  } = useMainContext();
  const [switchOption, setSwitchOption] = useState(0);
  const [createdJobs, setCreatedJobs] = useState<Journey[]>([]);
  const [receiverJobs, setReceiveJobs] = useState<Journey[]>([]);
  const [unassignedDriverJobs, setUnassignedDriverJobs] = useState<Journey[]>(
    [],
  );
  const [assignedDriverJobs, setAssignedDriverJobs] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const options = [
    {label: 'Customer', value: 'customer', accessibilityLabel: 'Customer'},
    {label: 'Driver', value: 'driver', accessibilityLabel: 'Driver'},
  ];

  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;

  const fetchAndSetJourneys = async () => {
    let createdJourneys: Journey[] = [];
    let receiveJourneys: Journey[] = [];
    let unassignedDriverJourneys: Journey[] = [];
    let assignedDriverJourneys: Journey[] = [];
    setIsLoading(true);
    try {
      if (userType === 'customer') {
        setSwitchOption(0);
        createdJourneys = await fetchCustomerJobs();
        setCreatedJobs(createdJourneys);
        receiveJourneys = await fetchReceiverJobs();
        setReceiveJobs(receiveJourneys);
      } else if (userType === 'driver') {
        setSwitchOption(1);
        unassignedDriverJourneys = await fetchDriverUnassignedJourneys();
        setUnassignedDriverJobs(unassignedDriverJourneys);
        assignedDriverJourneys = await fetchDriverAssignedJourneys();
        setAssignedDriverJobs(assignedDriverJourneys);
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
    let assignedDriverJourneys: Journey[] = [];
    try {
      if (userType === 'customer') {
        setSwitchOption(0);
        createdJourneys = await fetchCustomerJobs();
        setCreatedJobs(createdJourneys);
        receiveJourneys = await fetchReceiverJobs();
        setReceiveJobs(receiveJourneys);
      } else if (userType === 'driver') {
        setSwitchOption(1);
        unassignedDriverJourneys = await fetchDriverUnassignedJourneys();
        setUnassignedDriverJobs(unassignedDriverJourneys);
        assignedDriverJourneys = await fetchDriverAssignedJourneys();
        setAssignedDriverJobs(assignedDriverJourneys);
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
    <Container styles={{width: '100%', backgroundColor: backgroundColor}}>
      {isError || isLoading ? (
        <Loader
          isLoading={isLoading}
          isError={isError}
          setIsError={setIsError}
          errorText={errorMessage}
        />
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
                        {createdJobs.map(job => (
                          <CustomerJobItem key={job.jobId} job={job} handOn />
                        ))}
                      </>
                    ),
                  },
                  {
                    title: 'Receive Parcels',
                    content: (
                      <>
                        {receiverJobs.map(job => (
                          <CustomerJobItem key={job.jobId} job={job} handOff />
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
                        {assignedDriverJobs.map(job => (
                          <DriverJobItem key={job.jobId} job={job} assigned />
                        ))}
                      </>
                    ),
                  },
                  {
                    title: 'Available Jobs',
                    content: (
                      <>
                        {unassignedDriverJobs.map(job => (
                          <DriverJobItem key={job.jobId} job={job} available />
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
    width: '100%',
  },
});

export default Menu;
