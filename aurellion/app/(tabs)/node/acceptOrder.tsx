import { SafeAreaView } from "react-native-safe-area-context";
import { useNodeContext } from "@/providers/node.provider";
import { useEffect } from "react";
import NodeOrderItem from "@/components/screens/orders/nodeOrderItem";

export default function AcceptOrder() {
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

  return (
    <SafeAreaView>
      {availableOrders.map(order => (
        <NodeOrderItem key={order.id} order={order} acceptOrder/>
      ))}
    </SafeAreaView>
  );
}
