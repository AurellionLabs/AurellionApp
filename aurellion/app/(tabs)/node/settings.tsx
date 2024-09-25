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
import { useState } from "react";
import { DarkTheme, LightTheme } from "@/constants/Colors";
import { Node, NodeStatus } from "@/constants/Types";
import {
    ImageContainer,
    RedButton,
    RedButtonText,
} from "@/components/common/StyledComponents";
import { registerNode } from "@/dapp-connectors/dapp-controller";

export default function Settings() {
    const { isDarkMode } = useMainContext();

    const [changeRoleOpen, setChangeRoleOpen] = useState(false);

    const [nodeName, setNodeName] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus] = useState("Active");
    const [assets, setAssets] = useState([""]);

    const [statusOpen, setStatusOpen] = useState(false);
    const [assetsOpen, setAssetsOpen] = useState(false);

    const [statusItems, setStatusItems] = useState([
        { label: "Active", value: NodeStatus.Active},
        { label: "Inactive", value: NodeStatus.Inactive},
    ]);

    const [assetItems, setAssetItems] = useState([
    //TODO: instead of switch casing please use this
        { label: "Goat", value: "Goat" },
        { label: "Sheep", value: "Sheep" },
        { label: "Watch", value: "Watch" },
    ]);

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
        // Process the asset data as needed
        var data: Node;
        var supportedAssets: number[] = [];
        for (let i = 0; i < assets.length; i++) {
            //TODO: make an asset name to number finder on smart contract
            switch (assets[i]) {
                case "Goat":
                    supportedAssets.push(1)
            }

            if(status == "Active")[

            ]
        }
        data = {
            location: nodeName,
            owner: walletAddress,
            capacity: [Number(capacity)],
            status,
            supportedAssets,
            validNode: "0x01"
        };
        console.log(data);
        try {
            await registerNode(data)
        } catch (e) {
            console.error("couldnt register node", e)
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
                        <Label isDarkMode={isDarkMode}>Node Name</Label>
                        <Input
                            value={nodeName}
                            onChangeText={setNodeName}
                            placeholder="Enter Node Name"
                            isDarkMode={isDarkMode}
                            placeholderTextColor={
                                isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
                            }
                        />
                    </Section>
                    <Section>
                        <Label isDarkMode={isDarkMode}>Wallet Address</Label>
                        <Input
                            value={walletAddress}
                            onChangeText={setWalletAddress}
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
