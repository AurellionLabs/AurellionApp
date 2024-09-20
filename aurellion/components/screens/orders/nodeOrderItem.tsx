import { Text, View, Image } from "react-native";
import { OrderItem, TextRow } from "@/components/screens/orders/styledComponents";
import { Journey, JourneyStatus } from "@/constants/Types";
import { StyledText } from "@/components/common/StyledComponents";
import { Order } from "@/constants/Types";
import { useMainContext } from "@/providers/main.provider";
import { router } from "expo-router";

type NodeOrderProps = {
  order: Order;
  acceptOrder?: boolean;
  yourOrder?: boolean;
};

const NodeOrderItem: React.FC<NodeOrderProps> = ({
  order,
  acceptOrder,
  yourOrder,
}) => {
  const { isDarkMode } = useMainContext();
  const keyWidth = "40%";
  const valueWidth = "60%";

  if (!acceptOrder && !yourOrder) {
    console.error(
      "At least one of 'acceptOrder' or 'yourOrder' prop must be provided"
    );
    return null;
  }

  const onPress = () => {
    if (acceptOrder) {
      // pass id as search param to access it in signature screen
      router.push({
        pathname: `/node/acceptOrderSign/${order?.id}`,
      });
    } else if (yourOrder) {
      // pass id as search param to access it in signature screen
      router.push({
        pathname: `/node/handOffSign/${order?.id}`,
      });
    }
  };
  return (
    <OrderItem isDarkMode={isDarkMode} onPress={onPress}>
      <View style={{display:'flex', flexDirection:'row'}}>
        <View style={{width:'70%'}}>
          <TextRow>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: keyWidth, fontWeight: "bold", marginRight: 8 }}
            >
              Buyer:
            </StyledText>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: valueWidth }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {order?.buyerName}
            </StyledText>
          </TextRow>

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
              {order?.assetType}
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
              style={{ width: valueWidth}}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {order?.assetClass}
            </StyledText>
          </TextRow>

          <TextRow>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: keyWidth, fontWeight: "bold", marginRight: 8 }}
            >
              Quantity:
            </StyledText>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ width: valueWidth}}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {order?.quantity}
            </StyledText>
          </TextRow>
        </View>
        {order?.image && (
          <View style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Image
            source={order?.image}
            style={{ height: 100, width: 100, borderRadius: 10 }}
          />
          </View>)
        }
      </View>
    </OrderItem>
  );
};

export default NodeOrderItem;