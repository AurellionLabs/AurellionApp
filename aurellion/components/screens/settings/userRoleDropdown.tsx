import React from "react";
import {
  Container,
  Label,
  Section,
} from "@/components/screens/settings/styledComponents";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { useState } from "react";
import { RoleType } from "@/constants/Types";
import { router } from "expo-router";
import { useMainContext } from "@/providers/main.provider";

type UserRoleDropdownProps = {
  onChangeRoleOpen: () => void;
};

export default function UserRoleDropdown({ onChangeRoleOpen }: UserRoleDropdownProps) {
  const { isDarkMode, role, setRole } = useMainContext();

  const [changeRoleOpen, setChangeRoleOpen] = useState(false);

  const [roleItems, setRoleItems] = useState([
    { label: "Customer", value: RoleType.Customer },
    { label: "Driver", value: RoleType.Driver },
    { label: "Node", value: RoleType.Node },
  ]);

  const onChangeRole = (item: ItemType<RoleType>) => {
    switch (item.value) {
      case RoleType.Customer:
        setRole(RoleType.Customer);
        router.replace("/customer/sendPackage");
        break;
      case RoleType.Driver:
        setRole(RoleType.Driver);
        router.replace("/driver/acceptJourney");
        break;
      case RoleType.Node:
        setRole(RoleType.Node);
        router.replace("/node/addAsset");
        break;
      default:
        console.error("Unknown Role");
    }
  };

  return (
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
            onSelectItem={onChangeRole}
          />
        </Section>
      </Container>
  );
}
