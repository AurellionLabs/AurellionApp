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

const Menu = () => {
  const { userType, setUserType, refetchDataFromAPI, setRefetchDataFromAPI } = useMainContext();
  const [jobIDs, setJobIDs] = useState<string[]>([]);
  const [jobsObjs, setJobsObjs] = useState<Journey[]>([]);

  const options = [
    { label: "Customer", value: "customer", accessibilityLabel: "Customer" },
    { label: "Driver", value: "driver", accessibilityLabel: "Driver" },
  ];

  const fetchAndSetJourneys = async () => {
    let journeys: Journey[] = [];
    if (userType === "customer") {
      journeys = await fetchCustomersJobsObj();
    } else if (userType === "driver") {
      journeys = await fetchDriverUnassignedJourneys();
    }
    setJobsObjs(journeys);
  };

  useEffect(() => {
    fetchAndSetJourneys();
  }, [userType]);

  useEffect(() => {
    if(refetchDataFromAPI){
      fetchAndSetJourneys();
      setRefetchDataFromAPI(false)
    }
  }, [refetchDataFromAPI]);

  useEffect(() => {
    const tempJobIDs = jobsObjs.map((job) => job.jobId);
    setJobIDs(tempJobIDs);
  }, [jobsObjs]);

  return (
    <Container>
      <SwitchSelector
        initial={0}
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
        {jobIDs.length > 0 ? (
          jobIDs.map((job) => <MenuBox key={job} selected={true} jobID={job} />)
        ) : (
          <BoldText>No Jobs Available</BoldText>
        )}
      </ScrollView>
    </Container>
  );
};

export default Menu;
