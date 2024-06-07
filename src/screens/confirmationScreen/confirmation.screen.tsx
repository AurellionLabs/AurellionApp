import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useMainContext } from '../main.provider';
import { useNavigation } from '@react-navigation/native';
import { JobsScreenNavigationProp } from '../../navigation/types';
import { DeliverySpeedOption } from '../../common/types/types';
import { RedButton, RedButtonText } from '../../common/components/StyledComponents';
import Loader from '../../common/loader/loader';
import aurellionABI from '../../dapp-connectors/aurellion-abi.json';

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
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { REACT_APP_AUSYS_CONTRACT_ADDRESS } from '@env';

const ConfirmationScreen: React.FC = () => {
  const { walletAddress, recipientWalletAddress, packageDeliveryData, deliveryOption } = useMainContext();
  const navigation = useNavigation<JobsScreenNavigationProp>();

  const { config } = usePrepareContractWrite({
    address: REACT_APP_AUSYS_CONTRACT_ADDRESS as `0x${string}`,
    abi: aurellionABI,
    functionName: 'jobCreation',
    args: [walletAddress, recipientWalletAddress, packageDeliveryData, 1, 10],
  })

  const { isLoading, isError, write, error } = useContractWrite(config)
  
  const handleConfirm = async () => {
    write?.()
  };

  return (
    <>
      {isLoading || isError ? (
        <Loader isLoading={isLoading} isError={isError} setIsError={() => {}} errorText={error?.message || 'Error Creating Job'} />
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
                {deliveryOption?.deliverySpeed === DeliverySpeedOption.FAST && <Value>Fast</Value>}
                {deliveryOption?.deliverySpeed === DeliverySpeedOption.MEDIUM && <Value>Medium</Value>}
                {deliveryOption?.deliverySpeed === DeliverySpeedOption.SLOW && <Value>Slow</Value>}
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