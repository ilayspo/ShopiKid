import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

export default function StorePopup({ store, visible, onEnter, onSkip }) {
  if (!store) return null;

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.storeIcon}>{store.icon}</Text>
          <Text style={styles.storeName}>{store.name}</Text>
          <Text style={styles.question}>רוצה להיכנס לחנות?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
              <Text style={styles.skipText}>דלג</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.enterButton} onPress={onEnter}>
              <Text style={styles.enterText}>כנס לחנות!</Text>
            </TouchableOpacity>
          </View>
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
  popup: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  storeIcon: { fontSize: 64 },
  storeName: { fontSize: 24, fontWeight: 'bold' },
  question: { fontSize: 16, color: '#555', marginBottom: 8 },
  buttonRow: { flexDirection: 'row', gap: 16, width: '100%' },
  skipButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#EEE',
    alignItems: 'center',
  },
  skipText: { fontSize: 18, color: '#555', fontWeight: '600' },
  enterButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  enterText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});
