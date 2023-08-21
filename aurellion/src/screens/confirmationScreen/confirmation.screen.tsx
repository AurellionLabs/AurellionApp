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

const ConfirmationScreen: React.FC = () => {
    const { walletAddress, packageDeliveryData } = useMainContext();

    const handleConfirm = () => {
        // Handle confirmation logic here
    };

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
                        <Value>recipient address</Value>
                    </Section>
                    <Separator />
                    <Section>
                        <Label>Delivery Option</Label>
                        <Value>chosen option</Value>
                        <Value>chosen option</Value>
                        <Value>chosen option</Value>
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
