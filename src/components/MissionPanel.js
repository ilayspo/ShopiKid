import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';
import { products } from '../data/products';

export default function MissionPanel() {
  const { missionItems, cart } = useGame();

  if (missionItems.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 המשימה שלך</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {missionItems.map((mission) => {
          const product = products.find((p) => p.id === mission.id);
          const inCart = cart.find((c) => c.id === mission.id);
          const done = inCart && inCart.qty >= mission.qty;
          if (!product) return null;
          return (
            <View key={mission.id} style={[styles.item, done && styles.itemDone]}>
              <Text style={styles.icon}>{product.icon}</Text>
              <Text style={styles.name}>{product.name}</Text>
              {done && <Text style={styles.check}>✓</Text>}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 12,
    margin: 12,
    elevation: 2,
  },
  title: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#F57F17' },
  scroll: { flexDirection: 'row' },
  item: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 8,
    minWidth: 64,
    borderWidth: 2,
    borderColor: '#FFE082',
  },
  itemDone: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  icon: { fontSize: 24, marginBottom: 4 },
  name: { fontSize: 11, textAlign: 'center', fontWeight: '500' },
  check: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold' },
});
