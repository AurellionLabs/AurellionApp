import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useCustomerContext } from "@/providers/customer.provider";
import AssetItem from "@/components/screens/assets/assetItem";
import {
    Heading,
    ScrollContent,
} from "@/components/common/StyledComponents";
import { useMainContext } from "@/providers/main.provider";
import { Container } from "@/components/screens/assets/styledComponents";
import { ParcelData } from "@/constants/Types";
import { Signer, ethers } from "ethers";
const NODE_MANAGER_ADDRESS = process.env.EXPO_PUBLIC_NODE_MANAGER_CONTRACT_ADDRESS
import contractABI from '../../../dapp-connectors/aurum-abi.json';
import { loadAvailableOrders } from "@/dapp-connectors/dapp-controller";

export default function MakeOrder() {
    const { availableAssets, setAvailableAssets } = useCustomerContext();
    const { ethersProvider } = useMainContext()
    const { isDarkMode } = useMainContext();

    // TODO: load and set available orders from chain
    useEffect(() => {
        loadAvailableOrders()
        setAvailableAssets([
            {
                id: "0",
                assetClass: "Goat",
                assetType: "Grade A",
                totalQuantity: 100,
                image: require("@/assets/images/goat.png"),
            },
            {
                id: "1",
                assetClass: "Sheep",
                assetType: "Grade A",
                totalQuantity: 100,
                image: require("@/assets/images/sheep.png"),
            },
            {
                id: "2",
                assetClass: "Sheep",
                assetType: "Grade A",
                totalQuantity: 100,
                image: require("@/assets/images/sheep.png"),
            },
            {
                id: "3",
                assetClass: "Sheep",
                assetType: "Grade A",
                totalQuantity: 100,
                image: require("@/assets/images/sheep.png"),
            },
            {
                id: "4",
                assetClass: "Sheep",
                assetType: "Grade A",
                totalQuantity: 100,
                image: require("@/assets/images/sheep.png"),
            },
            {
                id: "5",
                assetClass: "Sheep",
                assetType: "Grade A",
                totalQuantity: 100,
                image: require("@/assets/images/sheep.png"),
            },
            {
                id: "6",
                assetClass: "Sheep",
                assetType: "Grade A",
                totalQuantity: 100,
                image: require("@/assets/images/sheep.png"),
            },
        ]);
    }, []);

    return (
        <SafeAreaView>
            <Container isDarkMode={isDarkMode}>
                <Heading isDarkMode={isDarkMode}>Available Assets</Heading>
                <ScrollContent>
                    {availableAssets.map((asset) => (
                        <AssetItem key={asset.id} asset={asset} />
                    ))}
                </ScrollContent>
            </Container>
        </SafeAreaView>
    );
}
