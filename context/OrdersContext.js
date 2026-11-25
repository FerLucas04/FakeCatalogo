import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tienda:orders';

export const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) Carga inicial: una sola vez al montar
  useEffect(() => {
    async function cargar() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setOrders(Array.isArray(parsed) ? parsed : []);
        }
      } catch (e) {
        console.log('Error al cargar las compras:', e);
        setError('No se pudieron cargar tus compras.');
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, []);

  // 2) Guardado automático: bloqueado hasta que termine la carga inicial
  useEffect(() => {
    if (loading) return;
    async function guardar() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      } catch (e) {
        console.log('Error al guardar las compras:', e);
        setError('No se pudieron guardar tus compras.');
      }
    }
    guardar();
  }, [orders, loading]);

  function agregarCompra(producto) {
    const ahora = new Date();
    const nuevoPedido = {
      id: Date.now(),
      producto: producto.title,
      total: producto.price,
      fecha: ahora.toLocaleDateString('es-AR'),
      hora: ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    };
    setOrders((prev) => [nuevoPedido, ...prev]);
  }

  return (
    <OrdersContext.Provider value={{ orders, loading, error, agregarCompra }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders debe usarse dentro de un OrdersProvider');
  }
  return context;
}