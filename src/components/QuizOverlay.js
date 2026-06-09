import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function QuizOverlay({ quiz, visible, onClose }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const { setCoins } = useGame();

  if (!quiz) return null;

  const handleAnswer = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === quiz.answer) {
      setCoins((c) => c + quiz.reward);
    }
  };

  const handleClose = () => {
    setSelected(null);
    setAnswered(false);
    onClose();
  };

  const correct = answered && selected === quiz.answer;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.badge}>❓ Math Question</Text>
          <Text style={styles.question}>{quiz.question}</Text>
          <View style={styles.options}>
            {quiz.options.map((option, i) => {
              let bg = '#F5F5F5';
              if (answered && i === quiz.answer) bg = '#C8E6C9';
              if (answered && i === selected && selected !== quiz.answer) bg = '#FFCDD2';
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.option, { backgroundColor: bg }]}
                  onPress={() => handleAnswer(i)}>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {answered && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                {correct ? `✅ Correct! You got 🪙 ${quiz.reward}` : '❌ Wrong, try next time!'}
              </Text>
              <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
                <Text style={styles.closeBtnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, gap: 16 },
  badge: { fontSize: 14, fontWeight: 'bold', color: '#1976D2', textAlign: 'center' },
  question: { fontSize: 18, fontWeight: '600', textAlign: 'center', lineHeight: 26 },
  options: { gap: 10 },
  option: { borderRadius: 14, paddingVertical: 14, paddingHorizontal: 20, alignItems: 'center' },
  optionText: { fontSize: 16, fontWeight: '600' },
  result: { alignItems: 'center', gap: 12 },
  resultText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  closeBtn: { backgroundColor: '#1976D2', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 24 },
  closeBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
