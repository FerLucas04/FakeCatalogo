import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_FAVORITOS = 'favoritos';

export async function cargarFavoritos() {
  try {
    const data = await AsyncStorage.getItem(CLAVE_FAVORITOS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Error al cargar favoritos:', error);
    return [];
  }
} //cargarFavoritos: si no hay nada guardado (getItem devuelve null), 
// retorna []. Si algo falla, también [] — nunca deja a la app sin poder renderizar.

export async function guardarFavoritos(favoritos) {
  try {
    await AsyncStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
  } catch (error) {
    console.log('Error al guardar favoritos:', error);
  }
} //guardarFavoritos: convierte el array a texto con JSON.stringify 
//antes de guardarlo, porque AsyncStorage solo acepta strings.