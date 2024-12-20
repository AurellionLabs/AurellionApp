import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMainContext } from "@/providers/main.provider";
import { RedButton, RedButtonText } from "@/components/common/StyledComponents";
import {
  Container,
  Heading,
  DetailsContainer,
  Section,
  ConfirmedAddr,
  Label,
} from "@/components/screens/recipientWalletAddress/StyledComponents";
import { router } from "expo-router";

const RecipientWalletAddressScreen: React.FC = () => {
  const { recipientWalletAddress, setRecipientWalletAddress } =
    useMainContext();

  const handleConfirm = () => {
    router.push({ pathname: "customer/package/deliveryOptions" });
  };

  return (
    <SafeAreaView>
      <Container>
        <Heading>Confirm Recipient Wallet Address</Heading>
        <DetailsContainer>
          <Section>
            <Label>Recipient Wallet Address</Label>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                width: "100%",
                borderRadius: 7,
                padding: 5,
              }}
              placeholder="Enter Recipient Wallet Address"
              onChangeText={(newText) => setRecipientWalletAddress(newText)}
            />
            <Text style={{ marginTop: "10%", paddingHorizontal: "1%" }}>
              Confirmed Address :{" "}
            </Text>
            <ConfirmedAddr>{recipientWalletAddress}</ConfirmedAddr>
          </Section>
        </DetailsContainer>
        <View
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RedButton onPress={handleConfirm}>
            <RedButtonText>Confirm</RedButtonText>
          </RedButton>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default RecipientWalletAddressScreen;
