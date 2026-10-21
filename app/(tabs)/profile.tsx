import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../src/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user?.name || user?.preferred_username}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || 'N/A'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>Tenant</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 24, paddingBottom: 8 },
  title: { fontSize: 28, fontWeight: '700', color: '#1E3A8A' },
  card: { backgroundColor: '#FFF', margin: 24, marginTop: 16, borderRadius: 16, padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  label: { fontSize: 16, color: '#6B7280' },
  value: { fontSize: 16, fontWeight: '500', color: '#1F2937' },
  divider: { height: 1, backgroundColor: '#F3F4F6' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 24, padding: 16, backgroundColor: '#FEF2F2', borderRadius: 12, gap: 8 },
  logoutText: { color: '#EF4444', fontSize: 16, fontWeight: '600' },
});
