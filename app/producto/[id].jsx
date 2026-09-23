import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Image, ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
import { products } from '../../data/products';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const producto = products.find((item) => item.id === Number(id));

  if (!producto) {
    return (
      <View style={styles.center}>
        <Text style={styles.name}>Producto no encontrado</Text>
        <Pressable style ={styles.Volver} onPress={() => router.back()}>  
          <Ionicons name= "arrow-back" size={18} color="#0B1F3A" ></Ionicons>
          <Text style={styles.volverTexto}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style ={styles.Volver} onPress={() => router.back()}>
        <Ionicons name= "arrow-back" size={18} color="#0B1F3A" ></Ionicons>
        <Text style={styles.volverTexto}>Volver</Text>
      </Pressable>

      <Image source={producto.imagen} style={styles.image} />
      <Text style={styles.name}>{producto.nombre}</Text>
      <Text style={styles.price}>$ {producto.precio}</Text>
      <Text style={styles.category}>{producto.categoria}</Text>
      <Text style={styles.description}>{producto.descripcion}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 14 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  image: { width: '100%', height: 240, borderRadius: 16 },
  name: { fontSize: 28, fontWeight: '700', color: '#0B1F3A' },
  price: { fontSize: 24, fontWeight: '700', color: '#1357C5' },
  category: { fontSize: 17, color: '#506079' },
  description: { fontSize: 18, lineHeight: 26, color: '#0B1F3A' },
  Volver: { flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'flex-start', 
    backgroundColor: '#619ae6', 
    paddingVertical: 7, 
    paddingHorizontal: 12, 
    borderRadius: 20, 
    gap: 7,},
  volverTexto: {color: '#0B1F3A', fontSize: 16, fontWeight: '600', marginLeft: 8}
});