import { SafeAreaView } from "react-native-safe-area-context";
import { useNodeContext } from "@/providers/node.provider";
import { useEffect } from "react";
import NodeOrderItem from "@/components/screens/orders/nodeOrderItem";
import { Heading, ScrollContent } from "@/components/common/StyledComponents";
import { useMainContext } from "@/providers/main.provider";
import { Container } from "@/components/screens/orders/styledComponents";
import { fetchNodeOrders } from "@/dapp-connectors/dapp-controller";
import { Order } from "@/constants/Types";

export default function YourOrders() {
  const { yourOrders, setYourOrders } = useNodeContext();
  const { isDarkMode } = useMainContext();

  useEffect(() => {
    const getNodeOrders = async () => {
      const orders = await fetchNodeOrders();
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
      setYourOrders(parsedOrders)
    };
    getNodeOrders();
    setYourOrders([
      {
        id: "0",
        buyerName: "German Meat Distributor Ltd.",
        assetClass: "Sheep",
        assetType: "Grade B",
        quantity: 400,
        image: require("@/assets/images/sheep.png"),
      },
      {
        id: "1",
        buyerName: "German Meat Distributor Ltd.",
        assetClass: "Sheep",
        assetType: "Grade A",
        quantity: 200,
        image: require("@/assets/images/sheep.png"),
      },
      {
        id: "2",
        buyerName: "German Meat Distributor Ltd.",
        assetClass: "Sheep",
        assetType: "Grade C",
        quantity: 100,
        image: require("@/assets/images/sheep.png"),
      },
      {
        id: "3",
        buyerName: "German Meat Distributor Ltd.",
        assetClass: "Goat",
        assetType: "Grade A",
        quantity: 100,
        image: require("@/assets/images/goat.png"),
      },
      {
        id: "4",
        buyerName: "German Meat Distributor Ltd.",
        assetClass: "Goat",
        assetType: "Grade B",
        quantity: 100,
        image: require("@/assets/images/goat.png"),
      },
      {
        id: "5",
        buyerName: "German Meat Distributor Ltd.",
        assetClass: "Goat",
        assetType: "Grade C",
        quantity: 100,
        image: require("@/assets/images/goat.png"),
      },
      {
        id: "6",
        buyerName: "German Meat Distributor Ltd.",
        assetClass: "Cow",
        assetType: "Grade A",
        quantity: 100,
        image: require("@/assets/images/cow.png"),
      },
      {
        id: "7",
        buyerName: "German Meat Distributor Ltd.",
        assetClass: "Cow",
        assetType: "Grade B",
        quantity: 100,
        image: require("@/assets/images/cow.png"),
      },
      {
        id: "8",
        buyerName: "German Meat Distributor Ltd.",
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
        <Heading isDarkMode={isDarkMode}>Your Orders</Heading>
        <ScrollContent>
          {yourOrders.map((order) => (
            <NodeOrderItem key={order.id} order={order} yourOrder />
          ))}
        </ScrollContent>
      </Container>
    </SafeAreaView>
  );
}
