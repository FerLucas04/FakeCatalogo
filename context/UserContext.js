import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tienda:profile';

const initialUser = {
  name: 'Lucas Aquino',
  email: 'lucas@example.com',
  avatarUri: null
};

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [ready, setReady] = useState(false);

  // 1) Carga inicial: una sola vez al montar
  useEffect(() => {
    async function cargar() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          // Se mezcla con initialUser por si faltara algún campo guardado
          setUser({ ...initialUser, ...JSON.parse(stored) });
        }
      } catch (error) {
        console.log('Error al cargar el perfil:', error);
      } finally {
        setReady(true);
      }
    }
    cargar();
  }, []);

  // 2) Guardado automático: solo cuando la carga inicial terminó
  useEffect(() => {
    if (!ready) return;
    async function guardar() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (error) {
        console.log('Error al guardar el perfil:', error);
      }
    }
    guardar();
  }, [user, ready]);

  // Actualiza solo los campos recibidos: updateProfile({ name: 'Otro nombre' })
  function updateProfile(patch) {
    setUser((prev) => ({ ...prev, ...patch }));
  }

  function changePhoto(avatarUri) {
    setUser((prev) => ({ ...prev, avatarUri }));
  }

  return (
    <UserContext.Provider value={{ user, ready, updateProfile, changePhoto }}>
      {children}
    </UserContext.Provider>
  );
}

// Atajo opcional: useUser() equivale a useContext(UserContext)
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
}