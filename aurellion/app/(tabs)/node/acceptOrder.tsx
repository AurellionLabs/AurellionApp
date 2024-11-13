import { SafeAreaView } from "react-native-safe-area-context";
import { useNodeContext } from "@/providers/node.provider";
import { useEffect } from "react";
import NodeOrderItem from "@/components/screens/orders/nodeOrderItem";
import { Heading, ScrollContent } from "@/components/common/StyledComponents";
import { useMainContext } from "@/providers/main.provider";
import { Container } from "@/components/screens/orders/styledComponents";
import { fetchNodeAvailableOrders } from "@/dapp-connectors/dapp-controller";
import { OrderC } from "@/constants/ChainTypes";
import { Order } from "@/constants/Types";

export default function AcceptOrder() {
  const { availableOrders, setAvailableOrders } = useNodeContext();
  const { isDarkMode } = useMainContext();

  useEffect(() => {
    const getAvailableOrders = async () => {
      const orders: OrderC[] = await fetchNodeAvailableOrders();
      const parsedOrders: Order[] = orders.map((order) => {
        const object: Order = {
          id: order.id,
          assetClass: order.tokenId.toString(),
          assetType: "Grade B", // TODO: blockchain order struct is missing assetType
          buyerName: order.customer,
          quantity: order.requestedTokenQuantity,
          image: require("@/assets/images/sheep.png"),
        };
        return object;
      });
      setAvailableOrders(parsedOrders)
    };
    getAvailableOrders();
    setAvailableOrders([
      {
        id: "0",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Goat",
        assetType: "Grade A",
        quantity: 100,
        image: require("@/assets/images/goat.png"),
      },
      {
        id: "1",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Goat",
        assetType: "Grade B",
        quantity: 100,
        image: require("@/assets/images/goat.png"),
      },
      {
        id: "2",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Goat",
        assetType: "Grade C",
        quantity: 100,
        image: require("@/assets/images/goat.png"),
      },
      {
        id: "3",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Sheep",
        assetType: "Grade A",
        quantity: 100,
        image: require("@/assets/images/sheep.png"),
      },
      {
        id: "4",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Sheep",
        assetType: "Grade B",
        quantity: 100,
        image: require("@/assets/images/sheep.png"),
      },
      {
        id: "5",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Sheep",
        assetType: "Grade C",
        quantity: 100,
        image: require("@/assets/images/sheep.png"),
      },
      {
        id: "6",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Cow",
        assetType: "Grade A",
        quantity: 100,
        image: require("@/assets/images/cow.png"),
      },
      {
        id: "7",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Cow",
        assetType: "Grade B",
        quantity: 100,
        image: require("@/assets/images/cow.png"),
      },
      {
        id: "8",
        buyerName: "Oman Meat Distributor Ltd.",
        assetClass: "Cow",
        assetType: "Grade C",
        quantity: 100,
        image: require("@/assets/images/cow.png"),
      },
    ]);
  }, []);

  return (
    <SafeAreaView>
      <Container isDarkMode={isDarkMode}>
        <Heading isDarkMode={isDarkMode}>Available Orders</Heading>
        <ScrollContent>
          {availableOrders.map((order) => (
            <NodeOrderItem key={order.id} order={order} acceptOrder/>
          ))}
        </ScrollContent>
      </Container>
    </SafeAreaView>
  );
}
