import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#f4f5f8",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#232323"
    },
    "StatusBar": {
      "style": "LIGHT",
      "backgroundColor": "#33000000"
    }
  }
};

export default config;