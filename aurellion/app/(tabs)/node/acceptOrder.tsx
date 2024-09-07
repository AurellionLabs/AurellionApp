import { SafeAreaView } from "react-native-safe-area-context";
import { useNodeContext } from "@/providers/node.provider";
import { useEffect } from "react";
import NodeOrderItem from "@/components/screens/orders/nodeOrderItem";
import { Container, ScrollContent } from "@/components/common/StyledComponents";
import { useMainContext } from "@/providers/main.provider";
import { LightTheme, DarkTheme } from "@/constants/Colors";

export default function AcceptOrder() {
  const { availableOrders, setAvailableOrders } = useNodeContext();
  const { isDarkMode } = useMainContext();

  useEffect(() => {
    // TODO: load and set available orders from chain
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
      <ScrollContent isDarkMode={isDarkMode} scrollIndicator={true}>
        <Container isDarkMode={isDarkMode} styles={{width: "97%"}}>
            {availableOrders.map(order => (
              <NodeOrderItem key={order.id} order={order} acceptOrder/>
            ))}
        </Container>
      </ScrollContent>
  );
}
