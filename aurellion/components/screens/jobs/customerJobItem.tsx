import React from "react";
import { TextRow, StyledSelectedBox } from "./StyledComponents";
import { Journey, JourneyStatus } from "@/constants/Types";
import { StyledText } from "@/components/common/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import { router } from "expo-router";
import { SCREEN_TEXT } from "@/constants/ScreenText";

type BoxProps = {
  journey: Journey;
  handOn?: boolean;
  handOff?: boolean;
};

const CustomerJobItem: React.FC<BoxProps> = ({ journey, handOn, handOff }) => {
  const { isDarkMode } = useMainContext();

  if (!handOn && !handOff) {
    console.error(
      "At least one of 'handOn' or 'handOff' prop must be provided"
    );
    return null;
  }

  const onPress = () => {
    if (handOn) {
      router.push({
        pathname: `customer/package/handOnSign/${journey.jobId}`,
      });
    } else if (handOff) {
      router.push({
        pathname: `customer/package/handOffSign/${journey.jobId}`,
      });
    }
  };
  return (
    <StyledSelectedBox isDarkMode={isDarkMode} onPress={onPress}>
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
