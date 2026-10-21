import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FavoritesProvider } from '../context/FavoritesContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="producto/[id]" options={{ headerShown: false }} />
        </Stack>
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}