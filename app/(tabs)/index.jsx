import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ProductCard from '../../components/ProductCard';
import useFetch from '../../hooks/useFetch';

export default function Products() {
  const { data: products, loading, error, refetch } = useFetch(
    'https://fakestoreapi.com/products'
  );

  // Estado 1: primera carga, todavía no hay nada para mostrar
  if (loading && products.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1357C5" />
      </View>
    );
  }

  // Estado 2: error y sin datos previos
  if (error && products.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Ups, algo salió mal</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  // Estado 3: hay datos
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductCard {...item} />}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 56 },
  title: { fontSize: 30, fontWeight: '700', paddingHorizontal: 16 },
  list: { padding: 16, gap: 12 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    gap: 12
  },
  errorTitle: { fontSize: 20, fontWeight: '700', color: '#0B1F3A' },
  errorText: { fontSize: 15, color: '#506079', textAlign: 'center' },
  retryButton: {
    backgroundColor: '#1357C5',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 8
  },
  retryText: { color: '#fff', fontWeight: '700' }
});