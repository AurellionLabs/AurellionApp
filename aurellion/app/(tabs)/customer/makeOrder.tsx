import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useCustomerContext } from "@/providers/customer.provider";
import AssetItem from "@/components/screens/assets/assetItem";
import {
  Container,
  Heading,
  ScrollContent,
} from "@/components/common/StyledComponents";
import { useMainContext } from "@/providers/main.provider";

export default function MakeOrder() {
  const { availableAssets, setAvailableAssets } = useCustomerContext();
  const { isDarkMode } = useMainContext();

  useEffect(() => {
    // TODO: load and set available orders from chain
    setAvailableAssets([
      {
        id: "0",
        assetClass: "Goat",
        assetType: "Grade A",
        totalQuantity: 100,
        image: require("@/assets/images/goat.png"),
      },
      {
        id: "1",
        assetClass: "Sheep",
        assetType: "Grade A",
        totalQuantity: 100,
        image: require("@/assets/images/sheep.png"),
      },
    ]);
  }, []);

  return (
    <SafeAreaView>
      <Heading isDarkMode={isDarkMode} style={{ marginLeft: 15 }}>
        Available Assets
      </Heading>
      <ScrollContent isDarkMode={isDarkMode} scrollIndicator={true}>
        <Container isDarkMode={isDarkMode} styles={{ width: "97%" }}>
          {availableAssets.map((asset) => (
            <AssetItem key={asset.id} asset={asset} />
          ))}
        </Container>
      </ScrollContent>
    </SafeAreaView>
  );
}
