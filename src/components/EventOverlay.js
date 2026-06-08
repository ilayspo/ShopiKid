import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useGame } from '../context/GameContext';

export default function EventOverlay({ event, visible, onClose }) {
  const { setCoins } = useGame();

  if (!event) return null;

  const handleClose = () => {
    if (event.effect?.coins) {
      setCoins((c) => c + event.effect.coins);
    }
    onClose();
  };

  const isBonus = event.type === 'bonus';

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={[styles.card, isBonus ? styles.bonusCard : styles.penaltyCard]}>
          <Text style={styles.icon}>{event.icon}</Text>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>
          {event.effect?.coins && (
            <Text style={styles.effect}>
              {event.effect.coins > 0 ? `+${event.effect.coins}` : event.effect.coins} 🪙
            </Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>אוקיי!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 32 },
  card: { borderRadius: 24, padding: 28, alignItems: 'center', gap: 12 },
  bonusCard: { backgroundColor: '#FFFDE7', borderWidth: 3, borderColor: '#FFC107' },
  penaltyCard: { backgroundColor: '#FFF3E0', borderWidth: 3, borderColor: '#FF5722' },
  icon: { fontSize: 64 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  description: { fontSize: 16, color: '#555', textAlign: 'center' },
  effect: { fontSize: 28, fontWeight: 'bold', color: '#F57F17' },
  button: {
    backgroundColor: '#FF6F00',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 32,
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
