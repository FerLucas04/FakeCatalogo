import { createContext, useContext, useState, useEffect } from 'react';
import { cargarFavoritos, guardarFavoritos } from '../utils/storage';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]); // array de ids
  const [cargandoFavoritos, setCargandoFavoritos] = useState(true);

  // Carga inicial: se ejecuta UNA sola vez al montar el Provider
  useEffect(() => {
    async function cargar() {
      const data = await cargarFavoritos();
      setFavoritos(data);
      setCargandoFavoritos(false);
    }
    cargar();
  }, []);

  // Sincroniza con el storage, pero SOLO después de que terminó la carga inicial
  useEffect(() => {
    if (!cargandoFavoritos) {
      guardarFavoritos(favoritos);
    }
  }, [favoritos, cargandoFavoritos]);

  function toggleFavorito(producto) {
    setFavoritos((prev) =>
      prev.includes(producto.id)
        ? prev.filter((id) => id !== producto.id)
        : [...prev, producto.id]
    );
  }

  function esFavorito(id) {
    return favoritos.includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favoritos, cargandoFavoritos, toggleFavorito, esFavorito }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
  }
  return context;
}