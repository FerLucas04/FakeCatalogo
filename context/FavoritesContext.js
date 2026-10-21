import { createContext, useContext, useState, useEffect } from 'react';
import { cargarFavoritos, guardarFavoritos } from '../utils/storage';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]); // array de ids, EN ORDEN
  const [cargandoFavoritos, setCargandoFavoritos] = useState(true);

  // Carga inicial: una sola vez al montar
  useEffect(() => {
    async function cargar() {
      const data = await cargarFavoritos();
      setFavoritos(data);
      setCargandoFavoritos(false);
    }
    cargar();
  }, []);

  // Persistencia: solo cuando la carga inicial ya terminó
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

  // Eliminación definitiva por id (la usa el swipe)
  function eliminarFavorito(id) {
    setFavoritos((prev) => prev.filter((favId) => favId !== id));
  }

  // Recibe el array de ids ya reordenado (la usa el drag & drop)
  function reordenarFavoritos(nuevosIds) {
    setFavoritos(nuevosIds);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoritos,
        cargandoFavoritos,
        toggleFavorito,
        esFavorito,
        eliminarFavorito,
        reordenarFavoritos
      }}
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