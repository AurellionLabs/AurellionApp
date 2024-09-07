import { SafeAreaView } from "react-native-safe-area-context";
import { useNodeContext } from "@/providers/node.provider";
import { useEffect } from "react";
import NodeOrderItem from "@/components/screens/orders/nodeOrderItem";
import { ScrollView } from "react-native-gesture-handler";
import {ScrollContent, Container} from "@/components/common/StyledComponents";
import { useMainContext } from "@/providers/main.provider";

export default function YourOrders() {
  const { yourOrders, setYourOrders } = useNodeContext();
  const { isDarkMode } = useMainContext();

  useEffect(() => {
    // TODO: load and set your orders from chain
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
    ])
  }, []);

  return (
    <ScrollContent isDarkMode={isDarkMode} scrollIndicator={true}>
      <Container isDarkMode={isDarkMode} styles={{width: "97%"}}>
      {yourOrders.map((order) => (
        <NodeOrderItem key={order.id} order={order} yourOrder/>
      ))}
      </Container>
    </ScrollContent>
  );
}
