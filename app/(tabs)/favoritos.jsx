import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../../components/ProductCard';
import SwipeableFavoriteItem from '../../components/SwipeableFavoriteItem';
import useFetch from '../../hooks/useFetch';
import { useFavorites } from '../../context/FavoritesContext';

export default function Favoritos() {
  const { favoritos, cargandoFavoritos, eliminarFavorito, reordenarFavoritos } =
    useFavorites();
  const { data: products, loading } = useFetch('https://fakestoreapi.com/products');

  if (cargandoFavoritos || (loading && products.length === 0)) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1357C5" />
      </View>
    );
  }

  // Se recorre `favoritos` (no `products`) para respetar el ORDEN guardado
  const favoritosProductos = favoritos
    .map((id) => products.find((item) => item.id === id))
    .filter(Boolean);

  function renderItem({ item, drag, isActive }) {
    return (
      <ScaleDecorator>
        <View style={styles.row}>
          {/* Zona 1: cuerpo del producto → gesto de deslizar */}
          <View style={styles.body}>
            <SwipeableFavoriteItem id={item.id} onDelete={eliminarFavorito}>
              <ProductCard {...item} />
            </SwipeableFavoriteItem>
          </View>

          {/* Zona 2: asa lateral → gesto de arrastrar */}
          <Pressable
            style={styles.handle}
            onLongPress={drag}
            delayLongPress={350}
            disabled={isActive}
          >
            <Ionicons name="reorder-three" size={28} color="#506079" />
          </Pressable>
        </View>
      </ScaleDecorator>
    );
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
        <>
          <Text style={styles.hint}>
            Deslizá hacia la izquierda para eliminar · Mantené presionado ≡ para reordenar
          </Text>
          <DraggableFlatList
            data={favoritosProductos}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            onDragEnd={({ data }) => reordenarFavoritos(data.map((item) => item.id))}
            containerStyle={styles.listContainer}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 56 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 30, fontWeight: '700', paddingHorizontal: 16 },
  counter: { fontSize: 14, color: '#506079', paddingHorizontal: 16, marginTop: 4 },
  hint: { fontSize: 12, color: '#506079', paddingHorizontal: 16, marginTop: 4, marginBottom: 8 },

  listContainer: { flex: 1 },
  list: { padding: 16 },

  // paddingBottom (y no gap/margin) porque DraggableFlatList mide la altura de
  // cada celda; el padding sí se incluye en esa medida, el gap y el margin no.
  row: { flexDirection: 'row', alignItems: 'center', paddingBottom: 12 },
  body: { flex: 1 },
  handle: { paddingHorizontal: 10, paddingVertical: 16 },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12
  },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#0B1F3A', textAlign: 'center' }
});