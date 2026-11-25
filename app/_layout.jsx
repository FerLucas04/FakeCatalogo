import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FavoritesProvider } from '../context/FavoritesContext';
import { UserProvider } from '../context/UserContext';
import { OrdersProvider } from '../context/OrdersContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritesProvider>
        <UserProvider>
          <OrdersProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="producto/[id]" options={{ headerShown: false }} />
            </Stack>
          </OrdersProvider>
        </UserProvider>
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}