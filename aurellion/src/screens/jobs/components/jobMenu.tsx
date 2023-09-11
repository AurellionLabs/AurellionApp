import React, { useEffect, useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { ScrollView } from "react-native";
import { LightTheme } from "../../../common/constants/Colors";
import {
  fetchDriverUnassignedJourneys,
  fetchCustomersJobsObj,
} from "../../../dapp-connectors/dapp-controller";
import { useMainContext } from "../../main.provider";
import { Journey } from "../../../common/types/types";
import MenuBox from "./menuBox";
import {
  BoldText,
  Container,
} from "../../../common/components/StyledComponents";
import { UserType } from "../../../common/types/types";
import Wrapper from "../../../common/wrapper";

const Menu = () => {
  const { userType, setUserType, refetchDataFromAPI, setRefetchDataFromAPI } =
    useMainContext();
  const [switchOption, setSwitchOption] = useState(0);
  const [jobIDs, setJobIDs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const options = [
    { label: "Customer", value: "customer", accessibilityLabel: "Customer" },
    { label: "Driver", value: "driver", accessibilityLabel: "Driver" },
  ];

  const fetchAndSetJourneys = async () => {
    let journeys: Journey[] = [];
    setIsLoading(true);
    try {
      if (userType === "customer") {
        setSwitchOption(0);
        journeys = await fetchCustomersJobsObj();
      } else if (userType === "driver") {
        setSwitchOption(1);
        journeys = await fetchDriverUnassignedJourneys();
      }
      const tempJobIDs = journeys.map((job) => job.jobId);
      setJobIDs(tempJobIDs);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error Fetching Jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const refetchAndSetJourneys = async () => {
    let journeys: Journey[] = [];
    try {
      if (userType === "customer") {
        setSwitchOption(0);
        journeys = await fetchCustomersJobsObj();
      } else if (userType === "driver") {
        setSwitchOption(1);
        journeys = await fetchDriverUnassignedJourneys();
      }
      const tempJobIDs = journeys.map((job) => job.jobId);
      setJobIDs(tempJobIDs);
    } catch (error) {
      console.log("Error Fetching Jobs");
    }
  };

  useEffect(() => {
    fetchAndSetJourneys();
  }, [userType]);

  useEffect(() => {
    if (refetchDataFromAPI) {
      refetchAndSetJourneys();
      setRefetchDataFromAPI(false);
    }
  }, [refetchDataFromAPI]);

  return (
    <Container>
      {isError || isLoading ? (
        <Wrapper
          isLoading={isLoading}
          isError={isError}
          setIsError={setIsError}
          errorText={errorMessage}
        />
      ) : (
        <>
          <SwitchSelector
            initial={switchOption}
            onPress={(value: UserType) => setUserType(value)}
            textColor={LightTheme.foreground1}
            selectedColor={LightTheme.accent}
            buttonColor={LightTheme.background2}
            borderColor={LightTheme.accent}
            hasPadding
            options={options}
            accessibilityLabel="user-type-switch-selector"
          />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
            style={{ width: "100%" }}
          >
            {jobIDs.map((job) => (
              <MenuBox key={job} selected={true} jobID={job} />
            ))}
          </ScrollView>
        </>
      )}
    </Container>
  );
};

export default Menu;
