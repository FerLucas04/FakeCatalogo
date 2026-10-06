import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';
import { useFavorites } from '../../context/FavoritesContext';

export default function Favoritos() {
  const { favoritos, cargandoFavoritos } = useFavorites();
  const favoritosProductos = products.filter((item) => favoritos.includes(item.id));

  if (cargandoFavoritos) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.counter}>{favoritos.length} favorito(s)</Text>

      {favoritosProductos.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={72} color="#9DB4D3" />
          <Text style={styles.emptyTitle}>No tenés productos favoritos todavía.</Text>
        </View>
      ) : (
        <FlatList
          data={favoritosProductos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductCard {...item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 56 },
  title: { fontSize: 30, fontWeight: '700', paddingHorizontal: 16 },
  counter: { fontSize: 14, color: '#506079', paddingHorizontal: 16, marginTop: 4, marginBottom: 12 },
  list: { padding: 16, gap: 12 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B1F3A',
    textAlign: 'center'
  }
});