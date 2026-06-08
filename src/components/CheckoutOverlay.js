import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';

export default function CheckoutOverlay({ visible, onConfirm, onCancel }) {
  const { cart, coins } = useGame();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>🧾 חשבון</Text>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {cart.map((item) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.rowIcon}>{item.icon}</Text>
                <Text style={styles.rowName}>{item.name}</Text>
                <Text style={styles.rowQty}>×{item.qty}</Text>
                <Text style={styles.rowPrice}>{item.price * item.qty} ₪</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>סך הכל:</Text>
            <Text style={styles.totalAmount}>{total} ₪</Text>
          </View>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>מטבעות שיישארו:</Text>
            <Text style={[styles.balanceAmount, coins - total < 0 && { color: '#E53935' }]}>
              {coins - total} 🪙
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>ביטול</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>שלם! ✓</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '80%',
  },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  scroll: { maxHeight: 200 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 8 },
  rowIcon: { fontSize: 22 },
  rowName: { flex: 1, fontSize: 15 },
  rowQty: { fontSize: 14, color: '#888' },
  rowPrice: { fontSize: 15, fontWeight: '700', color: '#F57F17', minWidth: 48, textAlign: 'right' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#F57F17' },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  balanceLabel: { fontSize: 15, color: '#888' },
  balanceAmount: { fontSize: 15, fontWeight: '600', color: '#388E3C' },
  buttonRow: { flexDirection: 'row', gap: 12 },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#EEE',
    alignItems: 'center',
  },
  cancelText: { fontSize: 17, color: '#555', fontWeight: '600' },
  confirmButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#388E3C',
    alignItems: 'center',
  },
  confirmText: { fontSize: 17, color: '#fff', fontWeight: 'bold' },
});
