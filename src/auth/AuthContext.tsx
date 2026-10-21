import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

// Replace localhost with your PC's IP (e.g. 192.168.1.50) if testing on a physical phone
const ISSUER = 'http://192.168.1.151:8088/realms/pms-kenya';
const CLIENT_ID = 'pms-tenant-mobile';
const REDIRECT_URI = AuthSession.makeRedirectUri({ scheme: 'pmstenant', path: 'redirect' });

const discovery = {
  authorizationEndpoint: `${ISSUER}/protocol/openid-connect/auth`,
  tokenEndpoint: `${ISSUER}/protocol/openid-connect/token`,
};

interface AuthContextType {
  token: string | null;
  user: any | null;
  promptAsync: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      scopes: ['openid', 'profile', 'email', 'profile:read', 'tenant:read'],
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
    },
    discovery
  );

  useEffect(() => {
    async function loadToken() {
      const storedToken = await SecureStore.getItemAsync('auth_token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const payload = JSON.parse(atob(storedToken.split('.')[1]));
          setUser(payload);
        } catch (e) {}
      }
      setIsLoading(false);
    }
    loadToken();
  }, []);

  useEffect(() => {
    if (response?.type === 'success' && request?.codeVerifier) {
      const { code } = response.params;
      fetch(discovery.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: request.codeVerifier,
        }).toString(),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.access_token) {
            await SecureStore.setItemAsync('auth_token', data.access_token);
            setToken(data.access_token);
            const payload = JSON.parse(atob(data.access_token.split('.')[1]));
            setUser(payload);
          }
        })
        .catch(console.error);
    }
  }, [response]);

  const logout = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, promptAsync, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
