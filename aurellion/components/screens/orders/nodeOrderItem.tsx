import { Text } from "react-native";
import { OrderItem } from "@/components/screens/orders/styledComponents";
import { Order } from "@/constants/Types";
import { useMainContext } from "@/providers/main.provider";
import { router } from "expo-router";

type NodeOrderProps = {
  order: Order;
  acceptOrder?: boolean;
  yourOrder?: boolean;
};

const NodeOrderItem: React.FC<NodeOrderProps> = ({
  order,
  acceptOrder,
  yourOrder,
}) => {
  const { isDarkMode } = useMainContext();

  if (!acceptOrder && !yourOrder) {
    console.error(
      "At least one of 'acceptOrder' or 'yourOrder' prop must be provided"
    );
    return null;
  }

  const onPress = () => {
    if (acceptOrder) {
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
      <Text>Buyer: {order?.buyerName}</Text>
      <Text>Asset Type: {order?.assetType}</Text>
      <Text>Asset Class: {order?.assetClass}</Text>
      <Text>Quantity: {order?.quantity}</Text>
    </OrderItem>
  );
};

export default NodeOrderItem;
