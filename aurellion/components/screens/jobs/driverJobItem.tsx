import React from "react";
import { TextRow, StyledSelectedBox } from "./StyledComponents";
import { Journey, JourneyStatus } from "@/constants/Types";
import { StyledText } from "@/components/common/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import { useDeliveryContext } from "@/providers/delivery.provider";
import { SCREEN_TEXT } from "@/constants/ScreenText";
import { router } from "expo-router";

type BoxProps = {
  journey: Journey;
  assigned?: boolean;
  available?: boolean;
};

const CustomerJobItem: React.FC<BoxProps> = ({
  journey,
  assigned,
  available,
}) => {
  const { isDarkMode } = useMainContext();
  // const { setSelectedJourney, setSignatureScreenHeading } =
  //   useDeliveryContext();

  if (!assigned && !available) {
    console.error(
      "At least one of 'assigned' or 'available' prop must be provided"
    );
    return null;
  }

  const onPress = () => {
    // if (available) {
    //   setSelectedJourney(journey);
    //   router.push({ pathname: "/delivery/driver/assignDriver" });
    // } else if (assigned) {
    //   if (journey.currentStatus == JourneyStatus.PENDING) {
    //     setSignatureScreenHeading(SCREEN_TEXT.SIGNATURE.DRIVER_HAND_ON);
    //     router.push({ pathname: "/delivery/signature" });
    //   } else if (journey.currentStatus == JourneyStatus.IN_PROGRESS) {
    //     setSignatureScreenHeading(SCREEN_TEXT.SIGNATURE.DRIVER_HAND_OFF);
    //     router.push({ pathname: "/delivery/signature" });
    //   }
    // }
  };
  return (
    <StyledSelectedBox
      isDarkMode={isDarkMode}
      onPress={onPress}
    >
      <TextRow>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ width: "20%", fontWeight: "bold", marginRight: 8 }}
        >
          Job ID:
        </StyledText>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ width: "80%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {journey.jobId}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ width: "20%", fontWeight: "bold", marginRight: 8 }}
        >
          Status:
        </StyledText>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ width: "80%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {journey.currentStatus == JourneyStatus.PENDING
            ? "Pending"
            : journey.currentStatus == JourneyStatus.IN_PROGRESS
            ? "InProgress"
            : journey.currentStatus == JourneyStatus.COMPLETED
            ? "Completed"
            : journey.currentStatus == JourneyStatus.CANCELED
            ? "Canceled"
            : "Unknown Status"}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ width: "20%", fontWeight: "bold", marginRight: 8 }}
        >
          Start:
        </StyledText>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ width: "80%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {journey.parcelData.startName}
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ width: "20%", fontWeight: "bold", marginRight: 8 }}
        >
          End:
        </StyledText>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ width: "80%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {journey.parcelData.endName}
        </StyledText>
      </TextRow>
    </StyledSelectedBox>
  );
};

export default CustomerJobItem;
