import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { stores } from '../data/stores';
import { useGame } from '../context/GameContext';

export default function MapScreen({ navigation }) {
  const { route, setRoute, coins } = useGame();

  const toggleStore = (storeId) => {
    setRoute((prev) =>
      prev.includes(storeId) ? prev.filter((id) => id !== storeId) : [...prev, storeId]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🗺️ City Map</Text>
        <Text style={styles.coins}>🪙 {coins}</Text>
      </View>
      <Text style={styles.subtitle}>Select the stores you want to visit</Text>

      <ScrollView contentContainerStyle={styles.storeGrid}>
        {stores.map((store) => {
          const selected = route.includes(store.id);
          return (
            <TouchableOpacity
              key={store.id}
              style={[styles.storeCard, selected && { borderColor: store.color, borderWidth: 3 }]}
              onPress={() => toggleStore(store.id)}>
              <Text style={styles.storeIcon}>{store.icon}</Text>
              <Text style={styles.storeName}>{store.name}</Text>
              {selected && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={[styles.goButton, route.length === 0 && styles.goButtonDisabled]}
        disabled={route.length === 0}
        onPress={() => navigation.navigate('Drive')}>
        <Text style={styles.goButtonText}>Let's Go! 🚗</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: { fontSize: 26, fontWeight: 'bold' },
  coins: { fontSize: 18, fontWeight: '600' },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginTop: 8, marginBottom: 16 },
  storeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16, padding: 16 },
  storeCard: {
    width: 140,
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  storeIcon: { fontSize: 40, marginBottom: 8 },
  storeName: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  checkmark: { position: 'absolute', top: 8, right: 12, fontSize: 20, color: '#4CAF50' },
  goButton: {
    margin: 20,
    backgroundColor: '#FF6F00',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    elevation: 4,
  },
  goButtonDisabled: { backgroundColor: '#ccc' },
  goButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
