import { SafeAreaView } from "react-native-safe-area-context";
import UserRoleDropdown from "@/components/screens/settings/userRoleDropdown";
import { Container } from "@/components/screens/settings/styledComponents";
import { useMainContext } from "@/providers/main.provider";

export default function Settings() {
  const {isDarkMode} = useMainContext()

  const onChangeRoleOpen = () => {
    console.log("opened");
    // close all other drop downs
  };

  return (
    <SafeAreaView>
      <Container isDarkMode={isDarkMode}>
        <UserRoleDropdown onChangeRoleOpen={onChangeRoleOpen} />
      </Container>
    </SafeAreaView>
  );
}
