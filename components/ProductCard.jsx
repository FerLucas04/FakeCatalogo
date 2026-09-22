import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProductCard({ id, nombre, precio, categoria, imagen }) {
  const router = useRouter();

  function abrirDetalle() {
    router.push({
      pathname: '/producto/[id]',
      params: { id: String(id) }
    });
  }

  return (
    <Pressable style={styles.card} onPress={abrirDetalle}>
      <Image source={imagen} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{nombre}</Text>
        <Text style={styles.price}>$ {precio}</Text>
        <Text style={styles.category}>{categoria}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#EAF3FF', borderRadius: 14, overflow: 'hidden' },
  image: { width: 120, height: 120 },
  info: { flex: 1, padding: 14, justifyContent: 'center' },
  name: { fontSize: 20, fontWeight: '700', color: '#0B1F3A' },
  price: { fontSize: 18, fontWeight: '700', color: '#1357C5', marginTop: 6 },
  category: { color: '#506079', marginTop: 4 }
});