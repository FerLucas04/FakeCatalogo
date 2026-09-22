import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';

export default function Products() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductCard {...item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 56 },
  title: { fontSize: 30, fontWeight: '700', paddingHorizontal: 16 },
  list: { padding: 16, gap: 12 }
});