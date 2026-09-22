import { StyleSheet, Text, View } from 'react-native';

export default function Favoritos() {
  return <View style={styles.page}><Text>Favoritos</Text></View>;
}

const styles = StyleSheet.create({
  page: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }
});