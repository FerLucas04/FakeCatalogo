import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useFetch from '../../hooks/useFetch';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: producto, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  );

  const BotonVolver = () => (
    <Pressable style={styles.volverBoton} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={18} color="#0B1F3A" />
      <Text style={styles.volverTexto}>Volver</Text>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1357C5" />
      </View>
    );
  }

  // data arranca como [] y la API puede devolver vacío si el id no existe
  if (error || !producto || Array.isArray(producto) || !producto.id) {
    return (
      <View style={styles.center}>
        <Text style={styles.name}>Producto no encontrado</Text>
        <BotonVolver />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BotonVolver />
      <Image
        source={{ uri: producto.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{producto.title}</Text>
      <Text style={styles.price}>US$ {Number(producto.price).toFixed(2)}</Text>
      <Text style={styles.category}>{producto.category}</Text>
      <Text style={styles.description}>{producto.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 14 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: '#fff' },
  volverBoton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EAF3FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6
  },
  volverTexto: { color: '#0B1F3A', fontWeight: '600', fontSize: 14 },
  image: { width: '100%', height: 280, borderRadius: 16, backgroundColor: '#fff' },
  name: { fontSize: 24, fontWeight: '700', color: '#0B1F3A' },
  price: { fontSize: 24, fontWeight: '700', color: '#1357C5' },
  category: { fontSize: 17, color: '#506079', textTransform: 'capitalize' },
  description: { fontSize: 16, lineHeight: 24, color: '#0B1F3A' }
});