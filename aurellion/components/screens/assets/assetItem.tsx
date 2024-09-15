import { View, Image } from "react-native";
import {
  OrderItem,
  TextRow,
} from "@/components/screens/assets/styledComponents";
import { Asset } from "@/constants/Types";
import { useMainContext } from "@/providers/main.provider";
import { router } from "expo-router";
import { StyledText } from "@/components/common/StyledComponents";

type AssetItemProps = {
  asset: Asset;
};

const AssetItem: React.FC<AssetItemProps> = ({ asset }) => {
  const { isDarkMode } = useMainContext();
  const keyWidth = "40%";
  const valueWidth = "60%";

  const onPress = () => {
    // pass id as search param to access it in signature screen
    router.push({
      pathname: `/customer/order/makeOrderSign/${asset?.id}`,
    });
  };

  return (
    <OrderItem isDarkMode={isDarkMode} onPress={onPress}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "70%" }}>
          <TextRow>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: keyWidth, fontWeight: "bold", marginRight: 8 }}
            >
              Asset Type:
            </StyledText>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: valueWidth }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {asset?.assetType}
            </StyledText>
          </TextRow>

          <TextRow>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: keyWidth, fontWeight: "bold", marginRight: 8 }}
            >
              Asset Class:
            </StyledText>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: valueWidth }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {asset?.assetClass}
            </StyledText>
          </TextRow>

          <TextRow>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: keyWidth, fontWeight: "bold", marginRight: 8 }}
            >
              Quantity Available:
            </StyledText>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: valueWidth }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {asset?.totalQuantity}
            </StyledText>
          </TextRow>
        </View>
        {asset?.image && (
          <View
            style={{
              width: "30%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={asset?.image}
              style={{ height: 100, width: 100, borderRadius: 10 }}
            />
          </View>
        )}
      </View>
    </OrderItem>
  );
};

export default AssetItem;
