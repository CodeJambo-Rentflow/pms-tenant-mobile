import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Payments</Text>
        <Text style={styles.subtitle}>M-Pesa integration is coming soon.</Text>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💳</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#1E3A8A', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  iconContainer: { padding: 40, backgroundColor: '#FFF', borderRadius: 999 },
  icon: { fontSize: 48 },
});
