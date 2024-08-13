import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function NodeLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="sendPackage"
        options={{
          title: 'Send Package',
          tabBarIcon: ({ color }) => <Feather name="package" size={24} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="makeOrder"
        options={{
          title: 'Make Order',
          tabBarIcon: ({ color }) => <Entypo name="list" size={24} color={color} />,
          headerShown: false
        }}
      />
       <Tabs.Screen
        name="yourPackages"
        options={{
          title: 'Your Packages',
          tabBarIcon: ({ color }) => <Feather name="box" size={24} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="yourOrders"
        options={{
          title: 'Your Orders',
          tabBarIcon: ({ color }) => <FontAwesome name="list-alt" size={24} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={24} color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}