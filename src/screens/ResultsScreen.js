import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../context/GameContext';

export default function ResultsScreen({ navigation }) {
  const { cart, coins, setCart, setCoins, setRoute, setCurrentStore, missionItems } = useGame();

  const totalSpent = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const missionComplete = missionItems.every((m) =>
    cart.some((c) => c.id === m.id && c.qty >= m.qty)
  );

  const resetGame = () => {
    setCart([]);
    setCoins(100);
    setRoute([]);
    setCurrentStore(null);
    navigation.navigate('Splash');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{missionComplete ? '🎉 Well Done!' : '🛒 Results'}</Text>
      <Text style={styles.subtitle}>
        {missionComplete ? 'You completed the mission!' : 'Your shopping summary'}
      </Text>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryItem}>🪙 Coins remaining: {coins}</Text>
        <Text style={styles.summaryItem}>💸 Total spent: {totalSpent} coins</Text>
        <Text style={styles.summaryItem}>🛍️ Items in cart: {cart.length}</Text>
      </View>

      <Text style={styles.cartTitle}>What you bought:</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemIcon}>{item.icon}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQty}>×{item.qty}</Text>
            <Text style={styles.itemPrice}>{item.price * item.qty} coins</Text>
          </View>
        )}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.parentButton} onPress={() => navigation.navigate('Parent')}>
          <Text style={styles.parentButtonText}>👨‍👩‍👧 Parents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>New Game 🔄</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E5F5' },
  title: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginTop: 24 },
  subtitle: { fontSize: 18, color: '#555', textAlign: 'center', marginBottom: 16 },
  summaryBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    gap: 8,
    elevation: 3,
    marginBottom: 16,
  },
  summaryItem: { fontSize: 16, fontWeight: '500' },
  cartTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 8 },
  list: { flex: 1, paddingHorizontal: 20 },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  itemIcon: { fontSize: 24, marginRight: 10 },
  itemName: { flex: 1, fontSize: 16 },
  itemQty: { fontSize: 16, color: '#888', marginRight: 8 },
  itemPrice: { fontSize: 16, fontWeight: '700', color: '#F57F17' },
  buttonRow: { flexDirection: 'row', gap: 12, margin: 16 },
  parentButton: {
    flex: 1,
    backgroundColor: '#7B1FA2',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
  },
  parentButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resetButton: {
    flex: 1,
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
  },
  resetButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
