import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../src/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { promptAsync } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>PMS</Text>
          <Text style={styles.logoSub}>Tenant Portal</Text>
        </View>

        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subheading}>
          Log in to view your lease, pay rent, and manage your account.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
          <Text style={styles.buttonText}>Log in with Keycloak</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E3A8A' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  logoContainer: { marginBottom: 60, alignItems: 'center' },
  logoText: { fontSize: 48, fontWeight: '800', color: '#FFF', letterSpacing: -1 },
  logoSub: { fontSize: 18, color: '#93C5FD', fontWeight: '500', marginTop: -4 },
  heading: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 12 },
  subheading: { fontSize: 16, color: '#BFDBFE', marginBottom: 40, lineHeight: 24 },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
