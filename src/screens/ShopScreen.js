import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../context/GameContext';
import { products } from '../data/products';

export default function ShopScreen({ navigation }) {
  const { currentStore, cart, setCart, coins, setCoins } = useGame();

  if (!currentStore) return null;

  const storeProducts = products.filter((p) => p.storeId === currentStore.id);

  const addToCart = (product) => {
    if (coins < product.price) return;
    setCoins((c) => c - product.price);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1, addedAt: Date.now() }];
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹ חזור</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{currentStore.icon} {currentStore.name}</Text>
        <Text style={styles.coins}>🪙 {coins}</Text>
      </View>

      <FlatList
        data={storeProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const inCart = cart.find((c) => c.id === item.id);
          return (
            <TouchableOpacity
              style={[styles.productCard, coins < item.price && styles.productDisabled]}
              onPress={() => addToCart(item)}>
              <Text style={styles.productIcon}>{item.icon}</Text>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>🪙 {item.price}</Text>
              {item.survivalTime !== 9999 && (
                <Text style={styles.survivalBadge}>⏱ {item.survivalTime}′</Text>
              )}
              {inCart && <Text style={styles.qtyBadge}>×{inCart.qty}</Text>}
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('Drive')}>
        <Text style={styles.doneText}>סיימתי כאן ✓</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDE7' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { padding: 8 },
  backText: { fontSize: 20, color: '#1976D2', fontWeight: '600' },
  title: { fontSize: 20, fontWeight: 'bold' },
  coins: { fontSize: 18, fontWeight: '600' },
  grid: { padding: 12, gap: 12 },
  productCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  productDisabled: { opacity: 0.4 },
  productIcon: { fontSize: 36, marginBottom: 8 },
  productName: { fontSize: 14, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  productPrice: { fontSize: 14, color: '#F57F17', fontWeight: '700' },
  survivalBadge: { fontSize: 11, color: '#E53935', marginTop: 4 },
  qtyBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  doneButton: {
    margin: 16,
    backgroundColor: '#388E3C',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
  },
  doneText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
