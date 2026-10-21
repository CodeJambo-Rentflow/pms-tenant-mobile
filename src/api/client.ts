import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const apiClient = axios.create({
  // Replace localhost with your PC's IP address if testing on a real phone
  baseURL: 'http://192.168.1.151:8081', 
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
