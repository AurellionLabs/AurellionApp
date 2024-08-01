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
// import { jobCreation } from '../../dapp-connectors/dapp-controller';
import { DeliverySpeedOption, ParcelData } from '@/constants/Types';
import { RedButton, RedButtonText } from '@/components/common/StyledComponents';
import Loader from '@/components/common/loader';
import { router } from 'expo-router';
import { jobCreation } from '@/dapp-connectors/dapp-controller';
import { BrowserProvider, Signer } from 'ethers';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers-react-native';

const ConfirmationScreen: React.FC = () => {
    const { walletAddress, recipientWalletAddress, packageDeliveryData, universalLink, deepLink, wcURI, deliveryOption } =
        useMainContext();

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
                await jobCreation(parcel, recipientWalletAddress)
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
