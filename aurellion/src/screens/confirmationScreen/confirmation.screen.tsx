import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useMainContext } from '../main.provider';
import {
    Container,
    ScrollContent,
    Heading,
    DetailsContainer,
    Section,
    Label,
    Value,
    Separator,
    ConfirmButton,
    ConfirmButtonText,
} from './components/StyledComponents';
import { navigateDeepLink } from '../../utils/ExplorerUtils';
import { jobCreation } from '../../dapp-connectors/dapp-controller';
import { useNavigation } from '@react-navigation/native';
import { JobsScreenNavigationProp } from '../../navigation/types';
import { DeliverySpeedOption } from '../../common/types/types';


const ConfirmationScreen: React.FC = () => {
    const { walletAddress,recipientWalletAddress ,packageDeliveryData, universalLink, deepLink, wcURI, deliveryOption} = useMainContext();
    const navigation = useNavigation<JobsScreenNavigationProp>()

    const handleConfirm = () => {
        createJob();
    };

    const createJob = async () => {
        navigateDeepLink(universalLink, deepLink, wcURI)
        if (packageDeliveryData != undefined){
        await jobCreation(packageDeliveryData)}
        navigation.navigate('Jobs') 
    }
      

    return (
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
                        {deliveryOption?.deliverySpeed==DeliverySpeedOption.FAST && <Value>Fast</Value>}
                        {deliveryOption?.deliverySpeed==DeliverySpeedOption.MEDIUM && <Value>Medium</Value>}
                        {deliveryOption?.deliverySpeed==DeliverySpeedOption.SLOW && <Value>Slow</Value>}
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
            <ConfirmButton onPress={handleConfirm}>
                <ConfirmButtonText>Confirm</ConfirmButtonText>
            </ConfirmButton>
        </Container>
    );
};

export default ConfirmationScreen;
