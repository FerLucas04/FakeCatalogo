import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Catálogo', 
          tabBarLabel: 'Catálogo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name= "storefront-outline" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen 
        name="favoritos" 
        options={{ 
          title: 'Favoritos', 
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name= "heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: 'Perfil', 
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name= "person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}