import { SafeAreaView } from "react-native-safe-area-context";
import { useMainContext } from "@/providers/main.provider";
import UserRoleDropdown from "@/components/screens/settings/userRoleDropdown";

export default function Settings() {
  const { isDarkMode, role, setRole } = useMainContext();

  const onChangeRoleOpen = () => {
    console.log("opened")
    // close all other drop downs
  };

  return (
    <SafeAreaView>
      <UserRoleDropdown onChangeRoleOpen={onChangeRoleOpen}/>
    </SafeAreaView>
  );
}
