import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useCustomerContext } from "@/providers/customer.provider";
import AssetItem from "@/components/screens/assets/assetItem";

export default function MakeOrder() {
  const { availableAssets, setAvailableAssets } = useCustomerContext();

  useEffect(() => {
    // TODO: load and set available orders from chain
    setAvailableAssets([
      {
        id: "0",
        assetClass: "Goat",
        assetType: "Grade A",
        totalQuantity: 100,
      },
    ]);
  }, []);

  return (
    <SafeAreaView>
      {availableAssets.map((asset) => (
        <AssetItem key={asset.id} asset={asset} />
      ))}
    </SafeAreaView>
  );
}
