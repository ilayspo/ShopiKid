import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../context/GameContext';

export default function ParentScreen({ navigation }) {
  const { cart, coins, missionItems, setMissionItems } = useGame();

  const totalSpent = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const toggleMissionItem = (productId) => {
    setMissionItems((prev) =>
      prev.some((m) => m.id === productId)
        ? prev.filter((m) => m.id !== productId)
        : [...prev, { id: productId, qty: 1 }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹ חזור</Text>
        </TouchableOpacity>
        <Text style={styles.title}>👨‍👩‍👧 מסך הורים</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>סיכום המשחק</Text>
          <Text style={styles.stat}>🪙 מטבעות שנותרו: {coins}</Text>
          <Text style={styles.stat}>💸 הוצאות: {totalSpent} ₪</Text>
          <Text style={styles.stat}>🛍️ פריטים שנקנו: {cart.reduce((s, i) => s + i.qty, 0)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>פריטים שנקנו</Text>
          {cart.length === 0 ? (
            <Text style={styles.emptyText}>לא נקנו פריטים</Text>
          ) : (
            cart.map((item) => (
              <View key={item.id} style={styles.cartRow}>
                <Text style={styles.cartIcon}>{item.icon}</Text>
                <Text style={styles.cartName}>{item.name}</Text>
                <Text style={styles.cartQty}>×{item.qty}</Text>
                <Text style={styles.cartPrice}>{item.price * item.qty} ₪</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>הגדר משימה לילד</Text>
          <Text style={styles.hint}>בחר פריטים שהילד צריך לקנות במשחק הבא</Text>
          {cart.map((item) => {
            const inMission = missionItems.some((m) => m.id === item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.missionRow, inMission && styles.missionRowActive]}
                onPress={() => toggleMissionItem(item.id)}>
                <Text style={styles.cartIcon}>{item.icon}</Text>
                <Text style={styles.cartName}>{item.name}</Text>
                {inMission && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EDE7F6' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { padding: 8, marginRight: 8 },
  backText: { fontSize: 20, color: '#7B1FA2', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: 'bold' },
  content: { padding: 20, gap: 20 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#4A148C' },
  stat: { fontSize: 16, marginBottom: 6, fontWeight: '500' },
  emptyText: { fontSize: 14, color: '#aaa', fontStyle: 'italic' },
  hint: { fontSize: 13, color: '#888', marginBottom: 10 },
  cartRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, gap: 8 },
  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: '#F3E5F5',
    gap: 8,
  },
  missionRowActive: { backgroundColor: '#CE93D8' },
  cartIcon: { fontSize: 22 },
  cartName: { flex: 1, fontSize: 16 },
  cartQty: { fontSize: 14, color: '#888' },
  cartPrice: { fontSize: 14, fontWeight: '700', color: '#F57F17' },
  checkmark: { fontSize: 18, color: '#4A148C', fontWeight: 'bold' },
});
