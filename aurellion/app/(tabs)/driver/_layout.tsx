import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
import { Tabs } from 'expo-router';

export default function NodeLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="acceptJourney"
        options={{
          title: 'Accept Journey',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="yourJourneys"
        options={{
          title: 'Your Journeys',
          tabBarIcon: ({ color }) => <Foundation name="clipboard-notes" size={24} color={color} />,
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