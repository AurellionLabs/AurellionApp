import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="createDelivery"
        options={{
          title: 'Create Delivery',
          tabBarIcon: ({ color }) => <FontAwesome5 name="box-open" size={28} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="truck-delivery" size={28} color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}