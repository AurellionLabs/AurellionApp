import { Stack } from "expo-router";

export default function PackageDeliveryLayout() {
    <Stack>
        <Stack.Screen name="(customer)" options={{ headerShown: false }}/>
        <Stack.Screen name="(driver)" options={{ headerShown: false }}/>
        <Stack.Screen name="signature" options={{ headerShown: false }}/>
    </Stack>
}