import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from 'expo-router';

export default function NodeLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="addAsset"
        options={{
          title: 'Add Asset',
          tabBarIcon: ({ color }) => <AntDesign name="plussquareo" size={24} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="acceptOrder"
        options={{
          title: 'Accept Order',
          tabBarIcon: ({ color }) => <Foundation name="clipboard-notes" size={24} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="yourOrders"
        options={{
          title: 'Your Orders',
          tabBarIcon: ({ color }) => <Octicons name="checklist" size={24} color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}