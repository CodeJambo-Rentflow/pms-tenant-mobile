import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../src/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuth();
  const firstName = user?.given_name || user?.preferred_username || 'Tenant';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {firstName} 👋</Text>
          <Text style={styles.subtitle}>Welcome to your tenant portal</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Lease</Text>
          <Text style={styles.cardSub}>You have no active lease right now.</Text>
        </View>

        <View style={styles.actionGrid}>
          <View style={styles.actionCard}>
            <Text style={styles.actionIcon}>💳</Text>
            <Text style={styles.actionText}>Pay Rent</Text>
            <Text style={styles.actionSub}>Coming soon</Text>
          </View>
          <View style={styles.actionCard}>
            <Text style={styles.actionIcon}>🔧</Text>
            <Text style={styles.actionText}>Maintenance</Text>
            <Text style={styles.actionSub}>Coming soon</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: 24 },
  header: { marginBottom: 32, marginTop: 16 },
  greeting: { fontSize: 28, fontWeight: '700', color: '#1E3A8A' },
  subtitle: { fontSize: 16, color: '#6B7280', marginTop: 4 },
  card: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 8 },
  cardSub: { fontSize: 14, color: '#6B7280' },
  actionGrid: { flexDirection: 'row', gap: 16 },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionIcon: { fontSize: 32, marginBottom: 12 },
  actionText: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  actionSub: { fontSize: 12, color: '#F59E0B', marginTop: 4, fontWeight: '500' },
});
