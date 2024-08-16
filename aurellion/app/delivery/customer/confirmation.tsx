import React, { useState } from 'react';
import { useMainContext } from '@/providers/main.provider';
import {
    Container,
    ScrollContent,
    Heading,
    DetailsContainer,
    Section,
    Label,
    Value,
    Separator,
} from '@/components/screens/confirmation/StyledComponents';
import { DeliverySpeedOption, ParcelData } from '@/constants/Types';
import { RedButton, RedButtonText } from '@/components/common/StyledComponents';
import Loader from '@/components/common/loader';
import { router } from 'expo-router';
import { jobCreation } from '@/dapp-connectors/dapp-controller';
import { BrowserProvider, Signer, ethers } from 'ethers';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers-react-native';
const contractABI = require('../../../aurellion-abi.json');
const AUSYS_ADDRESS = process.env.EXPO_PUBLIC_AUSYS_CONTRACT_ADDRESS
const ConfirmationScreen: React.FC = () => {
    const { walletAddress,
        recipientWalletAddress,
        packageDeliveryData,
        universalLink,
        deepLink,
        wcURI,
        deliveryOption,
        ethersProvider 
        } = useMainContext();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    //   const navigation = useNavigation<JobsScreenNavigationProp>();


    var Loc = {
        lat: "1",
        lng: "1"
    };
    var parcel: ParcelData = {
        startLocation: Loc,
        endLocation: Loc,
        startName: "test",
        endName: "test"
    };
    const handleConfirm = () => {
        createJob()
    };

    const createJob = async () => {
        setIsLoading(true);
        // navigateDeepLink(universalLink, deepLink, wcURI);
        var errorState: boolean = false;

        try {
            if (parcel) {
                // await jobCreation(packageDeliveryData, recipientWalletAddress);
                await jobCreation(parcel, "0x97F5Aab4c5D492E22483476446a45C313BE6B3E9")
                router.push({ pathname: '/jobs' })
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage('Error Creating Job');
            errorState = true;
            console.error("error when creating Job", error)
        } finally {
            setIsLoading(false);
        }
    };

    const jobCreation = async (locationData: ParcelData, recipientWalletAddress: string) => {

        console.log("here")
        var signer: Signer | undefined;

        try {
            if (ethersProvider)
                try {
                    signer = await ethersProvider.getSigner();
                } catch (e) {
                    throw new Error("getSigner failed with " + e)
                }
            else console.error("ethersProvider is underfined")
            if (!signer)
                throw new Error('Signer is undefined');
            if (!AUSYS_ADDRESS)
                throw new Error("AUSYS_ADDRESS is undefined")
            const contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
            console.log("Ausys Address", AUSYS_ADDRESS)
            const walletAddress = await signer.getAddress();
            console.log(walletAddress)
            console.log(recipientWalletAddress)
            console.log(locationData)
            console.log("calling function")
            const jobTx = await contract.jobCreation(
                walletAddress,
                recipientWalletAddress,
                locationData,
                1,
                10);
            console.log("called function")
            console.log(jobTx);
            const receipt = await jobTx.wait();
            console.log('Job Creation Transaction Hash:');
            console.log('Transaction Hash:', receipt.transactionHash);
            console.log('Block Number:', receipt.blockNumber);
            console.log('Gas Used:', receipt.gasUsed.toString());
            console.log('success');
        } catch (error) {
            console.error('Error in jobCreation:', error);
            throw error;
        }
    };



    return (
        <>
            {isLoading || isError ? (
                <Loader isLoading={isLoading} isError={isError} setIsError={setIsError} errorText={errorMessage} />
            ) : (
                <Container>
                    <Heading>Confirm Your Delivery</Heading>
                    <ScrollContent>
                        <DetailsContainer>
                            <Section>
                                <Label>Sender Address</Label>
                                <Value>{packageDeliveryData?.startName}</Value>
                            </Section>
                            <Section>
                                <Label>Sender Wallet</Label>
                                <Value>{walletAddress}</Value>
                            </Section>
                            <Separator />
                            <Section>
                                <Label>Recipient Address</Label>
                                <Value>{packageDeliveryData?.endName}</Value>
                            </Section>
                            <Section>
                                <Label>Recipient Wallet</Label>
                                <Value>{recipientWalletAddress}</Value>
                            </Section>
                            <Separator />
                            <Section>
                                <Label>Delivery Option</Label>
                                {deliveryOption?.deliverySpeed == DeliverySpeedOption.FAST && <Value>Fast</Value>}
                                {deliveryOption?.deliverySpeed == DeliverySpeedOption.MEDIUM && <Value>Medium</Value>}
                                {deliveryOption?.deliverySpeed == DeliverySpeedOption.SLOW && <Value>Slow</Value>}
                            </Section>
                            <Separator />
                            <Section>
                                <Label>Pricing</Label>
                                <Value>pricing</Value>
                                <Value>pricing</Value>
                                <Value>pricing</Value>
                            </Section>
                        </DetailsContainer>
                    </ScrollContent>
                    <RedButton onPress={handleConfirm} style={{ alignSelf: 'center', marginBottom: '6%' }}>
                        <RedButtonText>Confirm</RedButtonText>
                    </RedButton>
                </Container>
            )}
        </>
    );
};

export default ConfirmationScreen;
