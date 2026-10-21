import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function ProductCard({ id, title, price, category, image }) {
  const router = useRouter();
  const { esFavorito, toggleFavorito } = useFavorites();
  const favorito = esFavorito(id);

  function abrirDetalle() {
    router.push({
      pathname: '/producto/[id]',
      params: { id: String(id) }
    });
  }

  function alternarFavorito() {
    toggleFavorito({ id });
  }

  return (
    <View>
      <Pressable style={styles.card} onPress={abrirDetalle}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>{title}</Text>
          <Text style={styles.price}>US$ {Number(price).toFixed(2)}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
      </Pressable>

      {/* Hermano de la tarjeta, no hijo: su tap no dispara abrirDetalle */}
      <Pressable style={styles.heartButton} onPress={alternarFavorito} hitSlop={10}>
        <Ionicons
          name={favorito ? 'heart' : 'heart-outline'}
          size={24}
          color={favorito ? '#E53935' : '#506079'}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#EAF3FF',
    borderRadius: 14,
    overflow: 'hidden'
  },
  image: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    padding: 8
  },
  info: {
    flex: 1,
    padding: 14,
    paddingRight: 44,
    justifyContent: 'center'
  },
  name: { fontSize: 16, fontWeight: '700', color: '#0B1F3A' },
  price: { fontSize: 18, fontWeight: '700', color: '#1357C5', marginTop: 6 },
  category: { color: '#506079', marginTop: 4, textTransform: 'capitalize' },

  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10
  }
});