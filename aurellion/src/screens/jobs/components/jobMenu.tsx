import React, { useEffect, useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  Dimensions,
  Text,
  useColorScheme,
  View,
  Image,
  ScrollView,
} from "react-native";
import {
  SelectedBox,
  BoxHeadingText,
  AnimatedRoot,
  Box,
} from "./StyledComponents";

import { LightTheme } from "../../../common/constants/Colors";
import { fetchCustomersJobsObj } from "../../../dapp-connectors/dapp-controller";
import { UserType, useMainContext } from "../../main.provider";
import { Journey } from "../../../navigation/types";
import MenuBox from "./menuBox";
import { Container } from "../../../common/components/StyledComponents";

const Menu = () => {
  const { setUserType } = useMainContext();
  const [selectedBox, setSelectedBox] = useState<boolean>(true);
  const [selectedBox2, setSelectedBox2] = useState<boolean>(false);
  const [selectedBox3, setSelectedBox3] = useState<boolean>(false);
  const [jobIDs, setJobIDs] = useState<string[]>([]);
  const [jobsObjs, setJobsObjs] = useState<Journey[]>([]);

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
        {jobIDs.map((job) => (
          <MenuBox key={job} selected={selectedBox} jobID={job} />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Menu;
