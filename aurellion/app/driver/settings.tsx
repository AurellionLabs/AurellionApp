import { SafeAreaView } from "react-native-safe-area-context";
import UserRoleDropdown from "@/components/screens/settings/userRoleDropdown";
import { Container } from "@/components/screens/settings/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import { useState } from "react";

export default function Settings() {
  const { isDarkMode } = useMainContext();

  const [changeRoleOpen, setChangeRoleOpen] = useState(false);

  const onChangeRoleOpen = () => {
    // close all other drop downs
  };

  return (
    <SafeAreaView>
      <Container isDarkMode={isDarkMode}>
        <UserRoleDropdown
          onChangeRoleOpen={onChangeRoleOpen}
          changeRoleOpen={changeRoleOpen}
          setChangeRoleOpen={setChangeRoleOpen}
        />
      </Container>
    </SafeAreaView>
  );
}
