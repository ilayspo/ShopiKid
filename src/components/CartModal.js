import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import { useGame } from '../context/GameContext';

export default function CartModal({ visible, onClose }) {
  const { cart, coins, setCart, setCoins } = useGame();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const removeOne = (product) => {
    setCoins((c) => c + product.price);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((i) => i.id !== product.id);
      return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>🛒 Your Cart</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {cart.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🛒</Text>
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          ) : (
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              style={styles.list}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.rowIcon}>{item.icon}</Text>
                  <View style={styles.rowInfo}>
                    <Text style={styles.rowName}>{item.name}</Text>
                    <Text style={styles.rowPrice}>{item.price} coins each</Text>
                  </View>
                  <TouchableOpacity style={styles.removeBtn} onPress={() => removeOne(item)}>
                    <Text style={styles.removeBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.rowQty}>{item.qty}</Text>
                  <Text style={styles.rowTotal}>{item.price * item.qty} 🪙</Text>
                </View>
              )}
            />
          )}

          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <Text style={styles.totalLabel}>Total spent:</Text>
              <Text style={styles.totalAmount}>{total} 🪙</Text>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.balanceLabel}>Coins left:</Text>
              <Text style={styles.balanceAmount}>{coins} 🪙</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { fontSize: 16, color: '#555', fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', paddingVertical: 32 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#aaa' },
  list: { maxHeight: 300 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 8,
  },
  rowIcon: { fontSize: 28 },
  rowInfo: { flex: 1 },
  rowName: { fontSize: 15, fontWeight: '600' },
  rowPrice: { fontSize: 12, color: '#888' },
  removeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: { fontSize: 20, color: '#E53935', lineHeight: 24, fontWeight: 'bold' },
  rowQty: { fontSize: 16, fontWeight: 'bold', minWidth: 24, textAlign: 'center' },
  rowTotal: { fontSize: 15, fontWeight: '700', color: '#F57F17', minWidth: 56, textAlign: 'right' },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
    marginTop: 8,
    gap: 4,
  },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  totalAmount: { fontSize: 16, fontWeight: 'bold', color: '#F57F17' },
  balanceLabel: { fontSize: 14, color: '#888' },
  balanceAmount: { fontSize: 14, fontWeight: '600', color: '#388E3C' },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#1565C0',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
  },
  closeButtonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
