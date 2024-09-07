import { Text } from "react-native";
import { OrderItem } from "@/components/screens/orders/styledComponents";
import { Asset } from "@/constants/Types";
import { useMainContext } from "@/providers/main.provider";
import { router } from "expo-router";

type AssetItemProps = {
  asset: Asset;
};

const AssetItem: React.FC<AssetItemProps> = ({ asset }) => {
  const { isDarkMode } = useMainContext();

  const onPress = () => {
    // pass id as search param to access it in signature screen
    router.push({
      pathname: `/customer/order/makeOrderSign/${asset?.id}`,
    });
  };

  return (
    <OrderItem isDarkMode={isDarkMode} onPress={onPress}>
      <Text>Asset Type: {asset?.assetType}</Text>
      <Text>Asset Class: {asset?.assetClass}</Text>
      <Text>Total Quantity: {asset?.totalQuantity}</Text>
    </OrderItem>
  );
};

export default AssetItem;
