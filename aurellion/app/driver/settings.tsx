import { Container, Label, Section } from "@/components/screens/settings/styledComponents";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMainContext } from "@/providers/main.provider";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { RoleType } from "@/constants/Types";
import { router } from 'expo-router';

export default function Settings() {
  const { isDarkMode, role, setRole } = useMainContext();

  const [changeRoleOpen, setChangeRoleOpen] = useState(false)

  const [roleItems, setRoleItems] = useState([
    { label: "Customer", value: RoleType.Customer },
    { label: "Driver", value: RoleType.Driver },
    { label: "Node", value: RoleType.Node },
  ]);


  const onChangeRoleOpen = () => {
    // close all other drop downs
  }
  
  return (
    <SafeAreaView>
      <Container isDarkMode={isDarkMode}>
      <Section>
          <Label isDarkMode={isDarkMode}>User Role</Label>
          <DropDownPicker
            open={changeRoleOpen}
            onOpen={onChangeRoleOpen}
            value={role}
            items={roleItems}
            setOpen={setChangeRoleOpen}
            setValue={setRole}
            style={{ marginBottom: 10 }}
            theme={isDarkMode ? "DARK" : "LIGHT"}
          />
        </Section>
      </Container>
    </SafeAreaView>
  );
}
