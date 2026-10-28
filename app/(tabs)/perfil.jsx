import { useContext } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../../context/UserContext';

export default function PerfilScreen() {
  const { user, ready, changePhoto } = useContext(UserContext);

  async function elegirDeGaleria() {
    try {
      const r = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8
      });

      // Si cancela, no se toca nada: queda la foto anterior
      if (r.canceled) return;

      changePhoto(r.assets[0].uri);
    } catch (error) {
      console.log('Error al abrir la galería:', error);
      Alert.alert('Error', 'No se pudo abrir la galería.');
    }
  }

  async function tomarFoto() {
    try {
      const p = await ImagePicker.requestCameraPermissionsAsync();

      if (!p.granted) {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos acceso a la cámara para tomar tu foto de perfil.',
          p.canAskAgain
            ? [{ text: 'Entendido' }]
            : [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Abrir ajustes', onPress: () => Linking.openSettings() }
              ]
        );
        return;
      }

      const r = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8
      });

      // Si cierra la cámara sin sacar foto, se conserva la anterior
      if (r.canceled) return;

      changePhoto(r.assets[0].uri);
    } catch (error) {
      console.log('Error al abrir la cámara:', error);
      Alert.alert('Error', 'No se pudo abrir la cámara.');
    }
  }

  // Evita mostrar un instante el usuario por defecto antes de cargar el guardado
  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1357C5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.card}>
        {user.avatarUri ? (
          <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Ionicons name="person" size={72} color="#9DB4D3" />
          </View>
        )}

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.actions}>
          <Pressable style={styles.buttonPrimary} onPress={elegirDeGaleria}>
            <Ionicons name="images-outline" size={20} color="#fff" />
            <Text style={styles.buttonPrimaryText}>Elegir de galería</Text>
          </Pressable>

          <Pressable style={styles.buttonSecondary} onPress={tomarFoto}>
            <Ionicons name="camera-outline" size={20} color="#1357C5" />
            <Text style={styles.buttonSecondaryText}>Tomar foto</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 56 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 30, fontWeight: '700', paddingHorizontal: 16 },

  card: { alignItems: 'center', padding: 24, gap: 8 },
  avatar: { width: 140, height: 140, borderRadius: 70, marginBottom: 8 },
  avatarPlaceholder: {
    backgroundColor: '#EAF3FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: { fontSize: 24, fontWeight: '700', color: '#0B1F3A' },
  email: { fontSize: 16, color: '#506079' },

  actions: { width: '100%', gap: 12, marginTop: 24 },
  buttonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1357C5',
    paddingVertical: 12,
    borderRadius: 24
  },
  buttonPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  buttonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EAF3FF',
    paddingVertical: 12,
    borderRadius: 24
  },
  buttonSecondaryText: { color: '#1357C5', fontWeight: '700', fontSize: 16 }
});