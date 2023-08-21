import React, { useEffect, useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { ScrollView } from "react-native";
import { LightTheme } from "../../../common/constants/Colors";
import { fetchCustomersJobsObj } from "../../../dapp-connectors/dapp-controller";
import { useMainContext } from "../../main.provider";
import { Journey } from "../../../common/types/types";
import MenuBox from "./menuBox";
import { Container } from "../../../common/components/StyledComponents";
import { UserType } from "../../../common/types/types";
import Wrapper from "../../../common/wrapper";

const Menu = () => {
  const { setUserType } = useMainContext();
  const [jobIDs, setJobIDs] = useState<string[]>([]);
  const [jobsObjs, setJobsObjs] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const options = [
    { label: "Customer", value: "customer", accessibilityLabel: "Customer" },
    { label: "Driver", value: "driver", accessibilityLabel: "Driver" },
  ];

  useEffect(() => {
    const fetchJourneys = async () => {
      const journeys = await fetchCustomersJobsObj();
      setJobsObjs(journeys);
    };
    fetchJourneys();
  }, []);

  useEffect(() => {
    if (jobsObjs.length > 0) {
      const tempJobIDs: string[] = [];
      {
        jobsObjs.map((job) => {
          tempJobIDs.push(job.jobId);
        });
        setJobIDs(tempJobIDs);
      }
    }
  }, [jobsObjs]);

  return (
    <Wrapper
      isLoading={isLoading}
      isError={isError}
      setIsError={setIsError}
      errorText={errorMessage}
    >
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
        {jobIDs.map((job) => (
          <MenuBox key={job} selected={true} jobID={job} />
        ))}
      </ScrollView>
    </Wrapper>
  );
};

export default Menu;
