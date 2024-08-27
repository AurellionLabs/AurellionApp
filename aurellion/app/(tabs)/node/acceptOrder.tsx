import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderItem } from "@/components/screens/orders/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import { router } from "expo-router";
import { useNodeContext } from "@/providers/node.provider";
import { useEffect } from "react";

export default function AcceptOrder() {
  const { isDarkMode } = useMainContext();
  const { availableOrders, setAvailableOrders } = useNodeContext();

  useEffect(() => {
    // TODO: load and set available orders from chain
    setAvailableOrders([
      {
        id: "0",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Goat",
        assetType: "Grade A",
        quantity: 100,
      },
    ]);
  }, []);

  const onPress = () => {
    // pass id as search param to access it in signature screen
    router.push({
      pathname: `/node/acceptOrderSign/${availableOrders[0]?.id}`,
    });
  };

  return (
    <SafeAreaView>
      {/* dummy order item */}
      <OrderItem isDarkMode={isDarkMode} onPress={onPress}>
        <Text>Buyer: {availableOrders[0]?.buyerName}</Text>
        <Text>Asset Type: {availableOrders[0]?.assetType}</Text>
        <Text>Asset Class: {availableOrders[0]?.assetClass}</Text>
        <Text>Quantity: {availableOrders[0]?.quantity}</Text>
      </OrderItem>
    </SafeAreaView>
  );
}
