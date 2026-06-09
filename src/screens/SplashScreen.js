import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.emoji}>🛒</Text>
      <Text style={styles.title}>ShopiKid</Text>
      <Text style={styles.subtitle}>The Shopping Game</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
        <Text style={styles.buttonText}>Start Game!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 48,
    paddingVertical: 18,
    borderRadius: 32,
    elevation: 4,
    boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
