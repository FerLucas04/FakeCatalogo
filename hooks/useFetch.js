import { useState, useEffect, useCallback } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error del servidor (${response.status})`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'No se pudo cargar la información');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { data, loading, error, refetch: cargar };
}