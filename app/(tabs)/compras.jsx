import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../../context/OrdersContext';

export default function ComprasScreen() {
  const { orders, loading, error } = useOrders();

  // Estado 1: cargando
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1357C5" />
      </View>
    );
  }

  // Estado 2: error y sin datos para mostrar
  if (error && orders.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={64} color="#E53935" />
        <Text style={styles.stateTitle}>Ups, algo salió mal</Text>
        <Text style={styles.stateText}>{error}</Text>
      </View>
    );
  }

  function renderPedido({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.product} numberOfLines={2}>{item.producto}</Text>
          <Text style={styles.date}>{item.fecha} · {item.hora}</Text>
        </View>
        <Text style={styles.total}>US$ {Number(item.total).toFixed(2)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Compras</Text>
      <Text style={styles.summary}>Compras realizadas: {orders.length}</Text>

      {/* Error con datos: se avisa sin ocultar la lista */}
      {error && <Text style={styles.errorBanner}>{error}</Text>}

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={72} color="#9DB4D3" />
          <Text style={styles.stateTitle}>Aún no realizaste ninguna compra</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderPedido}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 56 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    gap: 12
  },
  title: { fontSize: 30, fontWeight: '700', paddingHorizontal: 16 },
  summary: { fontSize: 14, color: '#506079', paddingHorizontal: 16, marginTop: 4, marginBottom: 12 },
  errorBanner: { color: '#E53935', paddingHorizontal: 16, marginBottom: 8 },

  list: { padding: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#EAF3FF',
    borderRadius: 14,
    padding: 14
  },
  cardInfo: { flex: 1 },
  product: { fontSize: 16, fontWeight: '700', color: '#0B1F3A' },
  date: { fontSize: 13, color: '#506079', marginTop: 4 },
  total: { fontSize: 18, fontWeight: '700', color: '#1357C5' },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12
  },
  stateTitle: { fontSize: 20, fontWeight: '700', color: '#0B1F3A', textAlign: 'center' },
  stateText: { fontSize: 15, color: '#506079', textAlign: 'center' }
});