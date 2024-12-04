import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView } from "react-native";
import UserRoleDropdown from "@/components/screens/settings/userRoleDropdown";
import {
  Container,
  Input,
  Label,
  Section,
} from "@/components/screens/settings/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { DarkTheme, LightTheme } from "@/constants/Colors";
import {
  ImageContainer,
  RedButton,
  RedButtonText,
} from "@/components/common/StyledComponents";
import {
  getNode,
  getOwnedNodeAddressList,
  updateLocation,
  updateOwner,
  updateSupportedAssets,
} from "@/dapp-connectors/dapp-controller";
import { Node, NodeStatus } from "@/constants/ChainTypes";
import { useNodeContext } from "@/providers/node.provider";

export default function Settings() {
  const { isDarkMode } = useMainContext();
  const { selectedNodeAddress, setSelectedNodeAddress } = useNodeContext();

  const [changeRoleOpen, setChangeRoleOpen] = useState(false);

  const [location, setLocation] = useState("");
  const [ownerWalletAddress, setOwnerWalletAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("Active");
  const [assets, setAssets] = useState([""]);

  const [statusOpen, setStatusOpen] = useState(false);
  const [assetsOpen, setAssetsOpen] = useState(false);

  const [statusItems, setStatusItems] = useState([
    { label: "Active", value: NodeStatus.Active },
    { label: "Inactive", value: NodeStatus.Inactive },
  ]);

  const [assetItems, setAssetItems] = useState([
    //TODO: instead of switch casing please use this
    { label: "Goat", value: "Goat" },
    { label: "Sheep", value: "Sheep" },
    { label: "Watch", value: "Watch" },
  ]);

  useEffect(() => {
    const getNodeData = async () => {
      // current implementation one wallet address only owns one node
      const nodeAddressList = await getOwnedNodeAddressList();
      console.log(">>>>>>node address list", nodeAddressList)
      console.log(">>>>>>selected node address", nodeAddressList[0])
      setSelectedNodeAddress(nodeAddressList[0]);
      const node = await getNode(selectedNodeAddress);
      setLocation(node.location);
      setOwnerWalletAddress(node.owner);
      setStatus(node.status);
      setAssets(node.supportedAssets.map((asset) => asset.toString()));
      setCapacity(node.capacity[0].toString());
    };
    getNodeData();
  }, []);

  const onChangeRoleOpen = () => {
    setAssetsOpen(false);
    setStatusOpen(false);
  };

  const onStatusOpen = () => {
    setChangeRoleOpen(false);
    setAssetsOpen(false);
  };

  const onAssetsOpen = () => {
    setChangeRoleOpen(false);
    setStatusOpen(false);
  };

  const handleSubmit = async () => {
    try {
      let supportedAssets: number[] = [];
      let assetCapacities: number[] = [];
      let capacityInt = Number(capacity);
      for (let i = 0; i < assets.length; i++) {
        //TODO: make an asset name to number finder on smart contract
        switch (assets[i]) {
          case "Goat":
            supportedAssets.push(1);
          case "Sheep":
            supportedAssets.push(2);
          case "Watch":
            supportedAssets.push(3);
        }
        assetCapacities.push(capacityInt);
      }

      await updateOwner(selectedNodeAddress); //TODO: shouldn't we have to pass the new wallet address?
      await updateLocation(location, selectedNodeAddress);
      await updateSupportedAssets(
        supportedAssets,
        assetCapacities,
        selectedNodeAddress
      );
    } catch (e) {
      console.error("Couldn't update node details", e);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container isDarkMode={isDarkMode}>
          <UserRoleDropdown
            onChangeRoleOpen={onChangeRoleOpen}
            changeRoleOpen={changeRoleOpen}
            setChangeRoleOpen={setChangeRoleOpen}
          />
          <ImageContainer style={{ marginTop: 10 }}>
            <Image
              source={require("@/assets/images/user.png")}
              style={{ height: 100, width: 100 }}
            />
          </ImageContainer>
          <Section>
            <Label isDarkMode={isDarkMode}>Node Location</Label>
            <Input
              value={location}
              onChangeText={setLocation}
              placeholder="Enter Node Location"
              isDarkMode={isDarkMode}
              placeholderTextColor={
                isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
              }
            />
          </Section>
          <Section>
            <Label isDarkMode={isDarkMode}>Wallet Address</Label>
            <Input
              value={ownerWalletAddress}
              onChangeText={setOwnerWalletAddress}
              placeholder="Enter Wallet Address"
              isDarkMode={isDarkMode}
              placeholderTextColor={
                isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
              }
            />
          </Section>
          <Section>
            <Label isDarkMode={isDarkMode}>Supported Assets</Label>
            <DropDownPicker
              open={assetsOpen}
              onOpen={onAssetsOpen}
              value={assets}
              items={assetItems}
              setOpen={setAssetsOpen}
              setValue={setAssets}
              setItems={setAssetItems}
              theme={isDarkMode ? "DARK" : "LIGHT"}
              multiple={true}
              min={1}
              mode="BADGE"
              placeholder="Select Assets"
              listMode="SCROLLVIEW"
              searchable={true}
              zIndex={2}
            />
          </Section>
          <Section>
            <Label isDarkMode={isDarkMode}>Capacity</Label>
            <Input
              value={capacity}
              onChangeText={setCapacity}
              placeholder="Enter Node Capacity"
              isDarkMode={isDarkMode}
              placeholderTextColor={
                isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
              }
            />
          </Section>
          <Section>
            <Label isDarkMode={isDarkMode}>Status</Label>
            <DropDownPicker
              open={statusOpen}
              onOpen={onStatusOpen}
              value={status}
              items={statusItems}
              setOpen={setStatusOpen}
              setValue={setStatus}
              style={{ marginBottom: 10 }}
              theme={isDarkMode ? "DARK" : "LIGHT"}
              listMode="SCROLLVIEW"
              zIndex={1}
            />
          </Section>
          <RedButton
            onPress={handleSubmit}
            style={{ alignSelf: "center", marginTop: "7%" }}
          >
            <RedButtonText>Save</RedButtonText>
          </RedButton>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
