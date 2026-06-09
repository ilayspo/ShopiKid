import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { products } from '../data/products';
import CartModal from '../components/CartModal';

export default function ShopScreen({ navigation }) {
  const { currentStore, cart, setCart, coins, setCoins } = useGame();
  const [cartOpen, setCartOpen] = useState(false);

  if (!currentStore) return null;

  const storeProducts = products.filter((p) => p.storeId === currentStore.id);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const getQty = (productId) => {
    const item = cart.find((c) => c.id === productId);
    return item ? item.qty : 0;
  };

  const addOne = (product) => {
    if (coins < product.price) return;
    setCoins((c) => c - product.price);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1, addedAt: Date.now() }];
    });
  };

  const removeOne = (product) => {
    setCoins((c) => c + product.price);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (!existing || existing.qty === 0) return prev;
      if (existing.qty === 1) return prev.filter((i) => i.id !== product.id);
      return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{currentStore.icon} {currentStore.name}</Text>
        <TouchableOpacity style={styles.cartBtn} onPress={() => setCartOpen(true)}>
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Coins bar */}
      <View style={styles.coinsBar}>
        <Text style={styles.coinsText}>🪙 {coins} coins available</Text>
      </View>

      {/* Product grid */}
      <FlatList
        data={storeProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const qty = getQty(item.id);
          const canAfford = coins >= item.price;
          return (
            <View style={[styles.productCard, qty > 0 && styles.productCardActive]}>
              <Text style={styles.productIcon}>{item.icon}</Text>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>🪙 {item.price}</Text>
              {item.survivalTime !== 9999 && (
                <Text style={styles.survivalBadge}>⏱ {item.survivalTime} min</Text>
              )}
              {/* +/- controls */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={[styles.qtyBtn, styles.minusBtn, qty === 0 && styles.qtyBtnDisabled]}
                  onPress={() => removeOne(item)}
                  disabled={qty === 0}>
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyDisplay}>{qty}</Text>
                <TouchableOpacity
                  style={[styles.qtyBtn, styles.plusBtn, !canAfford && styles.qtyBtnDisabled]}
                  onPress={() => addOne(item)}
                  disabled={!canAfford}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Cart summary bar */}
      <TouchableOpacity style={styles.cartBar} onPress={() => setCartOpen(true)}>
        <Text style={styles.cartBarLeft}>
          🛒 {cartCount} item{cartCount !== 1 ? 's' : ''}
        </Text>
        <Text style={styles.cartBarRight}>{cartTotal} coins · View Cart ›</Text>
      </TouchableOpacity>

      {/* Done button */}
      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('Drive')}>
        <Text style={styles.doneText}>Done here — Back to Route ✓</Text>
      </TouchableOpacity>

      <CartModal visible={cartOpen} onClose={() => setCartOpen(false)} />
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
    paddingVertical: 10,
  },
  backBtn: { padding: 8 },
  backText: { fontSize: 18, color: '#1976D2', fontWeight: '600' },
  title: { fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  cartBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  cartIcon: { fontSize: 26 },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E53935',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  coinsBar: {
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE082',
  },
  coinsText: { fontSize: 14, fontWeight: '600', color: '#F57F17' },
  grid: { padding: 10 },
  productCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  productCardActive: { borderColor: '#4CAF50' },
  productIcon: { fontSize: 34, marginBottom: 6 },
  productName: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  productPrice: { fontSize: 13, color: '#F57F17', fontWeight: '700' },
  survivalBadge: { fontSize: 11, color: '#E53935', marginTop: 2 },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusBtn: { backgroundColor: '#FFEBEE' },
  plusBtn: { backgroundColor: '#E8F5E9' },
  qtyBtnDisabled: { opacity: 0.3 },
  qtyBtnText: { fontSize: 20, fontWeight: 'bold', lineHeight: 24 },
  qtyDisplay: { fontSize: 18, fontWeight: 'bold', minWidth: 24, textAlign: 'center' },
  cartBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1565C0',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  cartBarLeft: { color: '#fff', fontSize: 15, fontWeight: '600' },
  cartBarRight: { color: '#BBDEFB', fontSize: 13 },
  doneButton: {
    margin: 12,
    backgroundColor: '#388E3C',
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: 'center',
  },
  doneText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
