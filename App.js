import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

const productos = [
  { id: '1', nombre: 'Pelota', descripcion: 'Edición Hincha - River Plate', precio: '$45.999',
    imagen: 'https://acdn-us.mitiendanube.com/stores/001/219/670/products/dfpvdl302wr-5-pelota-de-futbol-mundial-2-0-river-_licencia-clubes-n5-1690e79735855f584417302151735323-1024-1024.webp' },
  { id: '2', nombre: 'Botines', descripcion: 'Legend 10', precio: '$114.199',
    imagen: 'https://imgs.search.brave.com/Ac_Tr87sPhhBfrGpLPOVIX3nOBR-MiusBxpngpuYdTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGlnaXRhbHNwb3J0/LmNvbS5hci9maWxl/cy9wcm9kdWN0cy82/OTk4MDU5MmQ5ZWUy/LTY4NjUyMi0yODB4/MjgwLmpwZw' },
  { id: '3', nombre: 'Mochila Adidas', descripcion: 'Mochila impermeable para actividades al aire libre', precio: '$35.00',
    imagen: 'https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw926ba6ce/products/ADHT4746/ADHT4746-1.JPG' },
  { id: '4', nombre: 'Reloj Inteligente', descripcion: 'Reloj inteligente con funciones de salud y fitness', precio: '$80.00',
    imagen: 'https://acdn-us.mitiendanube.com/stores/951/243/products/gorra-adidas-e8a33aac3a68a16d9017353195060724-1024-1024.webp' },
];

export default function App() {

  const renderProducto = ({ item }) => (
    <View style={styles.tarjeta}>
      <Text style={styles.tituloTarjeta}>{item.nombre}</Text>
      <Image style={styles.foto} source={{ uri: item.imagen }} resizeMode="cover" />
      <Text style={styles.desc}>{item.descripcion}</Text>
      <Text style={styles.precio}>{item.precio}</Text>
    </View>
  );

  return (
    <View style={styles.box}>
      <Text style={styles.tituloPantalla}>Bienvenido a nuestra tienda</Text>
      <Image
        source={{ uri: 'https://imgs.search.brave.com/y79hnIpTBhWTyDGfqf8hO938nWYW2HrmFLdm__jWxYk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vbWVsbnlrNTgv/bWVsbnlrNTgyNTAx/L21lbG55azU4MjUw/MTAxNjI0LzI0MDcx/MTc5My1kZWNpc2l2/ZS1hdHRhY2stY2xv/c2UtdXAtb2Ytc29j/Y2VyLXBsYXllcnMt/aW4tbW90aW9uLWJh/bGwtYmV0d2Vlbi10/aGVtLXRlbnNpb24t/aW4tdGhlLWFpci0z/ZC1zdGFkaXVtLmpw/Zz92ZXI9Ng' }}
        style={styles.fotoPortada}
        resizeMode="contain"
      />

      <Text style={styles.textoH1}>Productos</Text>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderProducto}
        contentContainerStyle={styles.pantallaContenido}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  //------Cuerpo completo---------
  box: { flex: 1, padding: 16, backgroundColor: '#E8F1FA' },
  tituloPantalla: { fontSize: 20, fontWeight: 'bold' },
  fotoPortada: { width: '100%', height: 160, marginTop: 12, marginBottom: 20, borderRadius: 12 },
  textoH1: { fontSize: 17, marginBottom: 20, fontWeight: 'bold', fontFamily: 'Arial', color: '#0F3D6E' },

  //------Contenedor de la lista---------
  pantallaContenido: {
    alignItems: 'center',
    gap: 16,
    paddingBottom: 24,
  },

  //------Tarjeta---------
  tarjeta: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000',
    padding: 16,
    overflow: 'hidden',
  },
  foto: { width: '100%', height: 190, borderRadius: 8, marginTop: 8 },
  tituloTarjeta: { fontSize: 18, fontWeight: 'bold', color: '#0F3D6E' },
  desc: { fontSize: 13, color: '#5A6B84', marginTop: 4 },
  precio: { fontSize: 16, marginTop: 4, color: '#080808', fontWeight: 'bold' },
});