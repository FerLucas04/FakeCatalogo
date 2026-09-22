import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Catálogo', tabBarLabel: 'Catálogo' }} />
      <Tabs.Screen name="favoritos" options={{ title: 'Favoritos', tabBarLabel: 'Favoritos' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarLabel: 'Perfil' }} />
    </Tabs>
  );
}