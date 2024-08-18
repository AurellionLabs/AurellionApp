import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useMainContext } from "@/providers/main.provider";
import { RedButton, RedButtonText } from "@/components/common/styledComponents";
import {
  Container,
  Heading,
  DetailsContainer,
  Section,
  ConfirmedAddr,
} from "@/components/screens/recipientWalletAddress/StyledComponents";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";

const RecipientWalletAddressScreen: React.FC = () => {
  const { recipientWalletAddress, setRecipientWalletAddress } =
    useMainContext();
  //   const navigation = useNavigation<DeliveryOptionsScreenNavigationProp>();

  const handleConfirm = () => {
    router.push({ pathname: "/delivery/customer/deliveryOptions" });
  };

  return (
    <Container>
      <Heading>Confirm Recipient Wallet Address</Heading>
      <DetailsContainer>
        <Section>
          {/* <Label>Recipient Wallet Address</Label> */}
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
  );
};

export default RecipientWalletAddressScreen;
