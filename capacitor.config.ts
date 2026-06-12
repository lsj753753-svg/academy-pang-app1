import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bubblepang.game',
  appName: '버블 팡',
  webDir: 'www',
  android: {
    allowMixedContent: true,
    backgroundColor: '#4fc3f7',
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
