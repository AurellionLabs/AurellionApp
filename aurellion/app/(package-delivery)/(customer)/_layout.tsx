import { Stack } from "expo-router";

export default function CustomerLayout() {
    <Stack>
        <Stack.Screen name="confirmation" options={{headerShown: false}}/>
        <Stack.Screen name="deliveryOptions" options={{headerShown: false}}/>
        <Stack.Screen name="recepientWalletAddress" options={{headerShown: false}}/>
    </Stack>
}