import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { stores } from '../data/stores';
import CartModal from '../components/CartModal';

export default function DriveScreen({ navigation }) {
  const { route, setCurrentStore, markStoreVisited, visitedStores, cart } = useGame();
  const carAnim = useRef(new Animated.Value(0)).current;
  const [cartOpen, setCartOpen] = useState(false);

  const routeStores = stores.filter((s) => route.includes(s.id));
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const allVisited = routeStores.every((s) => visitedStores.includes(s.id));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(carAnim, { toValue: 8, duration: 300, useNativeDriver: true }),
        Animated.timing(carAnim, { toValue: -8, duration: 300, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const arriveAtStore = (store) => {
    setCurrentStore(store);
    markStoreVisited(store.id);
    navigation.navigate('Shop');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Splash')}>
          <Text style={styles.homeBtnText}>🏠</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🚗 City Drive</Text>
        <TouchableOpacity style={styles.cartBtn} onPress={() => setCartOpen(true)}>
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Animated.Text style={[styles.car, { transform: [{ translateY: carAnim }] }]}>🚙</Animated.Text>

      <Text style={styles.subtitle}>Tap a store to go shopping:</Text>

      <View style={styles.routeList}>
        {routeStores.map((store, i) => {
          const visited = visitedStores.includes(store.id);
          return (
            <TouchableOpacity
              key={store.id}
              style={[styles.stopCard, visited && styles.stopCardVisited]}
              onPress={() => arriveAtStore(store)}>
              <Text style={styles.stopIndex}>{i + 1}</Text>
              <Text style={styles.stopIcon}>{store.icon}</Text>
              <View style={styles.stopInfo}>
                <Text style={styles.stopName}>{store.name}</Text>
                <Text style={styles.stopStatus}>{visited ? '✓ Visited' : 'Not visited yet'}</Text>
              </View>
              <Text style={styles.arrow}>{visited ? '↩' : '›'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Finish Shopping button */}
      <TouchableOpacity
        style={[styles.finishBtn, !allVisited && styles.finishBtnSoft]}
        onPress={() => navigation.navigate('Results')}>
        <Text style={styles.finishBtnText}>
          {allVisited ? '🏁 Finish Shopping' : '🏁 Finish Early'}
        </Text>
      </TouchableOpacity>

      <CartModal visible={cartOpen} onClose={() => setCartOpen(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  homeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 1px 3px rgba(0,0,0,0.15)',
  },
  homeBtnText: { fontSize: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  cartBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: { fontSize: 28 },
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
  car: { fontSize: 72, textAlign: 'center', marginVertical: 12 },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 12 },
  routeList: { flex: 1, paddingHorizontal: 16, gap: 10 },
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    elevation: 3,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  stopCardVisited: { borderColor: '#4CAF50', backgroundColor: '#F1F8E9' },
  stopIndex: { fontSize: 16, fontWeight: 'bold', color: '#1976D2', marginRight: 10, width: 20 },
  stopIcon: { fontSize: 28, marginRight: 10 },
  stopInfo: { flex: 1 },
  stopName: { fontSize: 16, fontWeight: '600' },
  stopStatus: { fontSize: 12, color: '#888', marginTop: 2 },
  arrow: { fontSize: 22, color: '#aaa' },
  finishBtn: {
    margin: 16,
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    elevation: 4,
  },
  finishBtnSoft: { backgroundColor: '#81C784' },
  finishBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
