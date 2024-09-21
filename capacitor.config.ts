import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duración en milisegundos (3 segundos)
      launchAutoHide: true,
      backgroundColor: "#f4f5f8", // Color de fondo
      androidScaleType: "CENTER_CROP", // Ajusta el logo en Android
      showSpinner: true, // Si deseas mostrar un spinner
      spinnerColor: "#232323" // Color del spinner
    }
  }
};

export default config;
