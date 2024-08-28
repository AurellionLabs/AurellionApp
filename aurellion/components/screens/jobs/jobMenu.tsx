import React, { useEffect, useState } from 'react';
import SwitchSelector from 'react-native-switch-selector';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { LightTheme, DarkTheme } from '@/constants/Colors';
import {
    fetchDriverUnassignedJourneys,
    fetchDriverAssignedJourneys,
    fetchReceiverJobs,
} from '../../../dapp-connectors/dapp-controller';
import { useMainContext } from '@/providers/main.provider';
import { Journey, UserType } from '@/constants/Types';
import CustomerJobItem from './customerJobItem';
import DriverJobItem from './driverJobItem';
import { Container } from '@/components/common/StyledComponents';
import Loader from '@/components/common/loader';
import Accordion from './accordian';
import { Signer, ethers } from 'ethers';
const contractABI = require('../../../aurellion-abi.json');
const AUSYS_ADDRESS = process.env.EXPO_PUBLIC_AUSYS_CONTRACT_ADDRESS
const Menu = () => {
    const { ethersProvider, userType, setUserType, refetchDataFromAPI, setRefetchDataFromAPI, isDarkMode } = useMainContext();
    const [switchOption, setSwitchOption] = useState(0);
    const [createdJobs, setCreatedJobs] = useState<Journey[]>([]);
    const [receiverJobs, setReceiveJobs] = useState<Journey[]>([]);
    const [unassignedDriverJobs, setUnassignedDriverJobs] = useState<Journey[]>([]);
    const [assignedDriverJobs, setAssignedDriverJobs] = useState<Journey[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const options = [
        { label: 'Customer', value: 'customer', accessibilityLabel: 'Customer' },
        { label: 'Driver', value: 'driver', accessibilityLabel: 'Driver' },
    ];

    const backgroundColor = isDarkMode ? DarkTheme.background2 : LightTheme.background2;

    const fetchReceiverJobs = async () => {
        let contract;
        var signer: Signer | undefined;
        if (ethersProvider)
            signer = await ethersProvider.getSigner();
        else console.error("ethersProvider is underfined")
        try {
            if (!signer) {
                throw new Error('Signer is undefined');
            }
            if (!AUSYS_ADDRESS)
                throw new Error("AUSYS_ADDRESS is undefined")
            try {
                contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
            } catch (error) {
                console.error(
                    `failed to instantiate contract object at with Contract Address: ${AUSYS_ADDRESS} contractABI: ${contractABI} signer:${signer}`
                );
                throw error;
            }

            const walletAddress = await signer.getAddress();
            if (!walletAddress) {
                throw new Error('Failed to get wallet address');
            }

            let jobNumber;
            try {
                jobNumber = await contract.numberOfJobsCreatedForReceiver(walletAddress);
            } catch (error) {
                console.error('Error fetching number of jobs for receiver with wallet address', walletAddress, 'Error:', error);
                throw error;
            }
            const jobs = [];
            const jobsObjList: Journey[] = [];
            for (let i = 0; i < jobNumber; i++) {
                try {
                    const job = await contract.receiverToJobId(walletAddress, i);
                    jobs.push(job);
                } catch (err) {
                    console.error(`Error fetching journeyId with index ${i}:`, err);
                }
            }

            for (const journeyId of jobs) {
                try {
                    const jobsObj = await contract.jobIdToJourney(journeyId);
                    jobsObjList.push(jobsObj);
                } catch (err) {
                    console.error(`Error fetching job object with journeyId ${journeyId}:`, err);
                }
            }
            return jobsObjList;
        } catch (error) {
            console.error('General error in fetchReceiverJobs:', error);
            return []; // Return an empty array in case of an error
        }
    };

    const fetchCustomerJobs = async () => {
        const journeyIds = [];
        const jobs: Journey[] = [];
        let contract;
        var signer: Signer | undefined;
        if (ethersProvider)
            signer = await ethersProvider.getSigner();
        else console.error("ethersProvider is underfined")
        try {
            if (!signer) {
                throw new Error('Signer is undefined');
            }
            if (!AUSYS_ADDRESS)
                throw new Error("AUSYS_ADDRESS is undefined")
            try {
                contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
            } catch (error) {
                console.error(
                    `failed to instantiate contract object at with Contract Address: ${AUSYS_ADDRESS} contractABI: ${contractABI} signer:${signer}`
                );
                throw error;
            }

            const walletAddress = await signer.getAddress();
            if (!walletAddress) {
                throw new Error('Failed to get wallet address');
            }

            let jobNumber;
            try {
                jobNumber = await contract.numberOfJobsCreatedForCustomer(walletAddress);
            } catch (error) {
                console.log(walletAddress);
                console.error('Error fetching number of jobs created with walletAddress', walletAddress, 'Error:', error);
                throw error;
            }
            contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);

            jobNumber = await contract.numberOfJobsCreatedForCustomer(walletAddress);

            for (let i = 0; i < jobNumber; i++) {
                try {
                    const journeyId = await contract.customerToJobId(walletAddress, i);
                    journeyIds.push(journeyId);
                } catch (err) {
                    console.error(`Error fetching job with index ${i}:`, err);
                }
            }

            for (const journeyId of journeyIds) {
                try {
                    const job = await contract.jobIdToJourney(journeyId);
                    jobs.push(job);
                } catch (err) {
                    console.error(`Error fetching job object with ID ${journeyId}:`, err);
                }
            }
            return jobs;
        } catch (error) {
            console.error('General error in fetchCustomerJobs:', error);
            return []; // Return an empty array in case of an error
        }
    };


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
        <Container styles={{ width: '100%', backgroundColor: backgroundColor }}>
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
                                                {createdJobs.map((journey) => (
                                                    <CustomerJobItem key={journey.jobId} journey={journey} handOn />
                                                ))}
                                            </>
                                        ),
                                    },
                                    {
                                        title: 'Receive Parcels',
                                        content: (
                                            <>
                                                {receiverJobs.map((journey) => (
                                                    <CustomerJobItem key={journey.jobId} journey={journey} handOff />
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
                                                {assignedDriverJobs.map((journey) => (
                                                    <DriverJobItem key={journey.jobId} journey={journey} assigned />
                                                ))}
                                            </>
                                        ),
                                    },
                                    {
                                        title: 'Available Jobs',
                                        content: (
                                            <>
                                                {unassignedDriverJobs.map((journey) => (
                                                    <DriverJobItem key={journey.jobId} journey={journey} available />
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
