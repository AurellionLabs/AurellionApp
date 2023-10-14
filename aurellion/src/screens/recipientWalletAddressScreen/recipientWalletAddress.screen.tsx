import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useMainContext } from '../main.provider';
import { useNavigation } from '@react-navigation/native';
import { DeliveryOptionsScreenNavigationProp } from '../../navigation/types';
import { RedButton, RedButtonText } from '../../common/components/StyledComponents';
import styled from 'styled-components/native';
import {
  Container,
  Heading,
  DetailsContainer,
  Label,
  Value,
  ConfirmButton,
  ConfirmButtonText,
  Section,
} from './components/StyledComponents';
import { TextInput } from 'react-native-gesture-handler';

const RecipientWalletAddressScreen: React.FC = () => {
  const { recipientWalletAddress, setRecipientWalletAddress } = useMainContext();
  const navigation = useNavigation<DeliveryOptionsScreenNavigationProp>();

  const NewValue = styled(Value)`
    margin-top: 5%;
    padding-horizontal: 1%;
  `;

  const handleConfirm = () => {
    navigation.navigate('DeliveryOptions');
  };

  return (
    <Container>
      <Heading>Confirm Recipient Wallet Address</Heading>
      <DetailsContainer>
        <Section>
          {/* <Label>Recipient Wallet Address</Label> */}
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', borderRadius: 7, padding: 5 }}
            placeholder="Enter Recipient Wallet Address"
            onChangeText={(newText) => setRecipientWalletAddress(newText)}
            defaultValue={recipientWalletAddress}
          />
          <Text style={{ marginTop: '10%', paddingHorizontal: '1%' }}>Confirmed Address : </Text>
          <NewValue>{recipientWalletAddress}</NewValue>
        </Section>
      </DetailsContainer>
      <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <RedButton onPress={handleConfirm}>
          <RedButtonText>Confirm</RedButtonText>
        </RedButton>
      </View>
    </Container>
  );
};

export default RecipientWalletAddressScreen;
