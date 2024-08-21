import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderItem } from "@/components/screens/orders/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import { router } from "expo-router";

export default function AddAsset() {
  const { isDarkMode } = useMainContext();

  const onPress = () => {
    router.push({ pathname: "/node/acceptOrderSign" })
  }

  return (
    <SafeAreaView>
      {/* dummy order item */}
      <OrderItem isDarkMode={isDarkMode} onPress={onPress}>
        <Text>Order 1</Text>
      </OrderItem>
    </SafeAreaView>
  );
}
