import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';
import { ThemeProvider } from './src/theme/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useSettingsStore } from './src/stores/settingsStore';
import { useStatsStore } from './src/stores/statsStore';
import { useGameStore } from './src/stores/gameStore';
import { initializeAds } from './src/services/adService';

const AppContent = () => {
  const [isReady, setIsReady] = useState(false);
  const loadSettings = useSettingsStore((state) => state.loadSettings);
  const loadStats = useStatsStore((state) => state.loadStats);
  const loadProgress = useGameStore((state) => state.loadProgress);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize Google Mobile Ads
        await mobileAds().initialize();

        // Initialize ad instances
        initializeAds();

        // Load persisted data
        await Promise.all([loadSettings(), loadStats(), loadProgress()]);

        setIsReady(true);
      } catch (error) {
        console.error('Initialization error:', error);
        setIsReady(true); // Continue even if ads fail
      }
    };

    initialize();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4C6EF5" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
});
