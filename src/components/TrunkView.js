import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';

export default function TrunkView() {
  const { cart } = useGame();

  const expired = cart.filter((item) => {
    if (item.survivalTime === 9999) return false;
    const elapsed = (Date.now() - item.addedAt) / 1000 / 60;
    return elapsed > item.survivalTime;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Trunk</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Cart is empty</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cart.map((item) => {
            const isExpired = expired.some((e) => e.id === item.id);
            return (
              <View key={item.id} style={[styles.item, isExpired && styles.itemExpired]}>
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.qty}>×{item.qty}</Text>
                {isExpired && <Text style={styles.expiredBadge}>⚠️ Spoiled</Text>}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8EAF6',
    borderRadius: 16,
    padding: 12,
    margin: 12,
    elevation: 2,
  },
  title: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#3949AB' },
  empty: { fontSize: 14, color: '#aaa', fontStyle: 'italic', textAlign: 'center', padding: 8 },
  item: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 8,
    minWidth: 64,
    borderWidth: 2,
    borderColor: '#C5CAE9',
  },
  itemExpired: { borderColor: '#E53935', backgroundColor: '#FFEBEE' },
  icon: { fontSize: 24, marginBottom: 4 },
  name: { fontSize: 11, textAlign: 'center', fontWeight: '500' },
  qty: { fontSize: 12, color: '#888' },
  expiredBadge: { fontSize: 12, color: '#E53935', marginTop: 2 },
});
