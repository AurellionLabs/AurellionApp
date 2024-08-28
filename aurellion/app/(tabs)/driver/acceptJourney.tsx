import { Container } from "@/components/screens/jobs/StyledComponents";
import { useMainContext } from "@/providers/main.provider";
import { SafeAreaView } from "react-native-safe-area-context";
import DriverJobItem from "@/components/screens/jobs/driverJobItem";
import { useDriverContext } from "@/providers/driver.provider";
import { useEffect } from "react";
import { JourneyStatus } from "@/constants/Types";
import { Heading } from "@/components/common/styledComponents";
export default function AcceptJourney() {
  const { isDarkMode } = useMainContext();
  const { setAvailableJourneys, availableJourneys } = useDriverContext();

  useEffect(() => {
    // TODO: load and set available orders from chain
    setAvailableJourneys([
      {
        parcelData: {
          startLocation: { lat: 52.397312, lng: -1.505571 },
          endLocation: { lat: 52.404645, lng: -1.520389 },
          startName: "Start Location",
          endName: "End Location",
        },
        bounty: 10,
        currentStatus: JourneyStatus.PENDING,
        customer: "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0B45",
        driver: "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0B56",
        ETA: 100,
        jobId: "123",
        journeyStart: 12,
        journeyEnd: 13,
        reciever: "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0gr4",
      },
      {
        parcelData: {
          startLocation: { lat: 52.397312, lng: -1.505571 },
          endLocation: { lat: 52.404645, lng: -1.520389 },
          startName: "Start Location",
          endName: "End Location",
        },
        bounty: 10,
        currentStatus: JourneyStatus.PENDING,
        customer: "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0B45",
        driver: "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0B56",
        ETA: 100,
        jobId: "124",
        journeyStart: 12,
        journeyEnd: 13,
        reciever: "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0gr4",
      },
    ]);
  }, []);

  return (
    <SafeAreaView>
      <Container isDarkMode={isDarkMode}>
        <Heading isDarkMode={isDarkMode}>Available Journeys</Heading>

        {availableJourneys.map((journey) => (
          <DriverJobItem key={journey.jobId} journey={journey} available />
        ))}
      </Container>
    </SafeAreaView>
  );
}
