import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderItem } from "@/components/screens/orders/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import { router } from "expo-router";
import { useNodeContext } from "@/providers/node.provider";
import { useEffect } from "react";

export default function YourOrders() {
  const { isDarkMode } = useMainContext();
  const { yourOrders, setYourOrders } = useNodeContext();

  useEffect(() => {
    // TODO: load and set your orders from chain
    setYourOrders([
      {
        id: "0",
        buyerName: "German Meat Dsitributor Ltd.",
        assetClass: "Sheep",
        assetType: "Grade B",
        quantity: 400,
      },
    ]);
  }, []);

  const onPress = () => {
    // pass id as search param to access it in signature screen
    router.push({
      pathname: `/node/handOffSign/${yourOrders[0]?.id}`,
    });
  };

  return (
    <SafeAreaView>
      {/* dummy order item */}
      <OrderItem isDarkMode={isDarkMode} onPress={onPress}>
        <Text>Buyer: {yourOrders[0]?.buyerName}</Text>
        <Text>Asset Type: {yourOrders[0]?.assetType}</Text>
        <Text>Asset Class: {yourOrders[0]?.assetClass}</Text>
        <Text>Quantity: {yourOrders[0]?.quantity}</Text>
      </OrderItem>
    </SafeAreaView>
  );
}
