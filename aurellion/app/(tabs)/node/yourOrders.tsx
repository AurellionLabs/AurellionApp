import { SafeAreaView } from "react-native-safe-area-context";
import { useNodeContext } from "@/providers/node.provider";
import { useEffect } from "react";
import NodeOrderItem from "@/components/screens/orders/nodeOrderItem";

export default function YourOrders() {
  const { yourOrders, setYourOrders } = useNodeContext();

  useEffect(() => {
    // TODO: load and set your orders from chain
    setYourOrders([
      {
        id: "0",
        buyerName: "German Meat Distributor Ltd.",
        assetClass: "Sheep",
        assetType: "Grade B",
        quantity: 400,
      },
    ]);
  }, []);

  return (
    <SafeAreaView>
      {yourOrders.map((order) => (
        <NodeOrderItem key={order.id} order={order} yourOrder/>
      ))}
    </SafeAreaView>
  );
}
