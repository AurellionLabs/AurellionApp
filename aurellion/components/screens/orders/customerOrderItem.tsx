import { Text } from "react-native";
import { OrderItem } from "@/components/screens/orders/styledComponents";
import { Order } from "@/constants/Types";
import { useMainContext } from "@/providers/main.provider";
import { router } from "expo-router";

type CustomerOrderProps = {
  order: Order;
  makeOrder?: boolean;
  yourOrder?: boolean;
};

const NodeOrderItem: React.FC<CustomerOrderProps> = ({
  order,
  makeOrder,
  yourOrder,
}) => {
  const { isDarkMode } = useMainContext();

  if (!makeOrder && !yourOrder) {
    console.error(
      "At least one of 'makeOrder' or 'yourOrder' prop must be provided"
    );
    return null;
  }

  const onPress = () => {
    if (makeOrder) {
      // pass id as search param to access it in signature screen
      router.push({
        pathname: `/node/acceptOrderSign/${order?.id}`,
      });
    } else if (yourOrder) {
      // pass id as search param to access it in signature screen
      router.push({
        pathname: `/node/handOffSign/${order?.id}`,
      });
    }
  };
  
  return (
    <OrderItem isDarkMode={isDarkMode} onPress={onPress}>
      <Text>Asset Type: {order?.assetType}</Text>
      <Text>Asset Class: {order?.assetClass}</Text>
      <Text>Quantity: {order?.quantity}</Text>
    </OrderItem>
  );
};

export default NodeOrderItem;
