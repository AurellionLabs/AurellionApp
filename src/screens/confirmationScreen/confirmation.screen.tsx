import React, { useState } from 'react';
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
// import { navigateDeepLink } from '../../utils/ExplorerUtils';
import { jobCreation } from '../../dapp-connectors/dapp-controller';
import { useNavigation } from '@react-navigation/native';
import { JobsScreenNavigationProp } from '../../navigation/types';
import { DeliverySpeedOption } from '../../common/types/types';
import { RedButton, RedButtonText } from '../../common/components/StyledComponents';
import Loader from '../../common/loader/loader';

const ConfirmationScreen: React.FC = () => {
  const { walletAddress, recipientWalletAddress, packageDeliveryData, universalLink, deepLink, wcURI, deliveryOption } =
    useMainContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigation = useNavigation<JobsScreenNavigationProp>();

  const handleConfirm = () => {
    createJob();
  };

  const createJob = async () => {
    setIsLoading(true);
    // navigateDeepLink(universalLink, deepLink, wcURI);
    var errorState: boolean = false;

    try {
      if (packageDeliveryData != undefined) {
        await jobCreation(packageDeliveryData, recipientWalletAddress);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Error Creating Job');
      errorState = true;
    } finally {
      setIsLoading(false);
    }

    if (errorState === false) {
      navigation.navigate('Jobs');
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