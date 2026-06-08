import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { stores } from '../data/stores';

export default function DriveScreen({ navigation }) {
  const { route, setCurrentStore } = useGame();
  const carAnim = useRef(new Animated.Value(0)).current;

  const routeStores = stores.filter((s) => route.includes(s.id));
  const currentIndex = useRef(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(carAnim, { toValue: 10, duration: 200, useNativeDriver: true }),
        Animated.timing(carAnim, { toValue: -10, duration: 200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const arriveAtStore = (store) => {
    setCurrentStore(store);
    navigation.navigate('Shop');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🚗 בדרך לחנות...</Text>
      <Animated.Text style={[styles.car, { transform: [{ translateY: carAnim }] }]}>🚙</Animated.Text>
      <Text style={styles.subtitle}>המסלול שלך:</Text>
      <View style={styles.routeList}>
        {routeStores.map((store, i) => (
          <TouchableOpacity
            key={store.id}
            style={styles.stopCard}
            onPress={() => arriveAtStore(store)}>
            <Text style={styles.stopIndex}>{i + 1}</Text>
            <Text style={styles.stopIcon}>{store.icon}</Text>
            <Text style={styles.stopName}>{store.name}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
  car: { fontSize: 80, marginVertical: 24 },
  subtitle: { fontSize: 18, color: '#555', marginBottom: 12 },
  routeList: { width: '90%', gap: 12 },
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  stopIndex: { fontSize: 18, fontWeight: 'bold', color: '#1976D2', marginRight: 12, width: 24 },
  stopIcon: { fontSize: 28, marginRight: 12 },
  stopName: { fontSize: 18, fontWeight: '600', flex: 1 },
  arrow: { fontSize: 24, color: '#aaa' },
});
