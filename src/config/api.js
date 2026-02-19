import { Platform } from 'react-native';

// Node server runs on port 3000
// - Web & iOS Simulator: localhost works
// - Android Emulator: 10.0.2.2 is the host machine
// - Physical device: Use your computer's local IP (e.g., 192.168.1.x)
const getNodeServerUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }
  return 'http://localhost:3000';
};

export const NODE_SERVER_URL = getNodeServerUrl();
