import Accordion from "@/components/screens/jobs/accordian";
import CustomerJobItem from "@/components/screens/jobs/customerJobItem";
import { JourneyStatus } from "@/constants/Types";
import { useCustomerContext } from "@/providers/customer.provider";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function YourPackages() {
  const { sendingPackages, receivingPackages, setSendingPackages, setReceivingPackages } = useCustomerContext();

  useEffect(() => {
    // TODO: load and set available orders from chain
    setSendingPackages([
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
        currentStatus: JourneyStatus.IN_PROGRESS,
        customer: "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0B45",
        driver: "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0B56",
        ETA: 100,
        jobId: "124",
        journeyStart: 12,
        journeyEnd: 13,
        reciever: "0x9d4CCf6c3d6a1d5583c2918028c86Cc8267a0gr4",
      },
    ]);

    setReceivingPackages([
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
        currentStatus: JourneyStatus.IN_PROGRESS,
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
      <ScrollView>
        <Accordion
          data={[
            {
              title: "Sending Packages",
              content: (
                <>
                  {sendingPackages.map((journey) => (
                    <CustomerJobItem key={journey.jobId} journey={journey} handOn />
                  ))}
                </>
              ),
            },
            {
              title: "Receiving Packages",
              content: (
                <>
                  {receivingPackages.map((journey) => (
                    <CustomerJobItem key={journey.jobId} journey={journey} handOff />
                  ))}
                </>
              ),
            },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
