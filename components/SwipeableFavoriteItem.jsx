import { useRef } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Ionicons } from '@expo/vector-icons';

export default function SwipeableFavoriteItem({ id, onDelete, children }) {
  const swipeableRef = useRef(null);

  function confirmarEliminar() {
    Alert.alert(
      'Eliminar favorito',
      '¿Querés quitar este producto de tus favoritos?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => swipeableRef.current?.close()
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete(id)
        }
      ],
      { cancelable: true, onDismiss: () => swipeableRef.current?.close() }
    );
  }

  function renderRightActions() {
    return (
      <Pressable style={styles.deleteAction} onPress={confirmarEliminar}>
        <Ionicons name="trash-outline" size={24} color="#fff" />
        <Text style={styles.deleteText}>Eliminar</Text>
      </Pressable>
    );
  }

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      rightThreshold={40}
    >
      {children}
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    width: 96,
    marginLeft: 8,
    backgroundColor: '#E53935',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },
  deleteText: { color: '#fff', fontWeight: '700', fontSize: 13 }
});