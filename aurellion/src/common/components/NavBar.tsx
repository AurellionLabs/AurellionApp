import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import {
  HomeStackNavigatorParamList,
  JobsScreenNavigationProp,
  LocationsScreenNavigationProp,
} from "../../navigation/types";

const NavbarWrapper = styled.View`
  flex-direction: row;
  background-color: white;
  height: 60px;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: space-around;
`;

const NavItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-color: rgba(0, 0, 0, 0.2);
  border-right-width: 2px;
`;

const NavText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Navbar = () => {
  // add functions here
  //type NavigateToScreen = | { screen: "Locations"; params?: HomeStackNavigatorParamList['Locations'] } | { screen: "Jobs"; params?: HomeStackNavigatorParamList['Jobs'] };
  const navigation = useNavigation<JobsScreenNavigationProp>();
  return (
    <NavbarWrapper>
      <NavItem onPress={() => navigation.navigate("Locations")}>
        <Image
          source={require("../assets/images/home.png")}
          style={{ height: 24, width: 24 }}
        />
      </NavItem>
      <NavItem>
        <Image
          source={require("../assets/images/user-profile.png")}
          style={{ height: 24, width: 24 }}
        />
      </NavItem>
      <NavItem onPress={() => navigation.navigate("Jobs")}>
        <Image
          source={require("../assets/images/parcel.png")}
          style={{ height: 24, width: 24 }}
        />
      </NavItem>
    </NavbarWrapper>
  );
};

export default Navbar;
