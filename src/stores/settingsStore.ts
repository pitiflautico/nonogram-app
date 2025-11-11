import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '../types';

interface SettingsStore extends Settings {
  loadSettings: () => Promise<void>;
  updateSettings: (settings: Partial<Settings>) => Promise<void>;
}

const defaultSettings: Settings = {
  soundEnabled: true,
  hapticsEnabled: true,
  showErrors: true,
  theme: 'auto',
  cellSize: 'M',
  tutorialCompleted: false,
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...defaultSettings,

  loadSettings: async () => {
    try {
      const stored = await AsyncStorage.getItem('settings');
      if (stored) {
        const settings = JSON.parse(stored);
        set(settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  },

  updateSettings: async (newSettings: Partial<Settings>) => {
    try {
      const currentSettings = get();
      const updatedSettings = { ...currentSettings, ...newSettings };

      // Remove functions before saving
      const { loadSettings, updateSettings, ...settingsToSave } = updatedSettings;

      await AsyncStorage.setItem('settings', JSON.stringify(settingsToSave));
      set(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },
}));
