import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSettingsStore } from '../stores/settingsStore';
import { Card } from '../components/Card';

const SettingsScreen = () => {
  const { theme } = useTheme();
  const settings = useSettingsStore();

  const handleToggle = async (key: keyof typeof settings, value: boolean) => {
    await settings.updateSettings({ [key]: value });
  };

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'auto') => {
    await settings.updateSettings({ theme: newTheme });
  };

  const handleCellSizeChange = async (size: 'S' | 'M' | 'L') => {
    await settings.updateSettings({ cellSize: size });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Sound */}
        <Card style={styles.section}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.colors.textPrimary }]}>
              Sound Effects
            </Text>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => handleToggle('soundEnabled', value)}
              trackColor={{ false: theme.colors.gridLine, true: theme.colors.primary }}
            />
          </View>
        </Card>

        {/* Haptics */}
        <Card style={styles.section}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.colors.textPrimary }]}>
              Haptic Feedback
            </Text>
            <Switch
              value={settings.hapticsEnabled}
              onValueChange={(value) => handleToggle('hapticsEnabled', value)}
              trackColor={{ false: theme.colors.gridLine, true: theme.colors.primary }}
            />
          </View>
        </Card>

        {/* Show Errors */}
        <Card style={styles.section}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.colors.textPrimary }]}>
              Show Errors Live
            </Text>
            <Switch
              value={settings.showErrors}
              onValueChange={(value) => handleToggle('showErrors', value)}
              trackColor={{ false: theme.colors.gridLine, true: theme.colors.primary }}
            />
          </View>
        </Card>

        {/* Theme */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Theme
          </Text>
          <View style={styles.optionsRow}>
            {(['light', 'dark', 'auto'] as const).map((themeOption) => (
              <TouchableOpacity
                key={themeOption}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      settings.theme === themeOption
                        ? theme.colors.primary
                        : theme.colors.background,
                    borderColor: theme.colors.gridLine,
                  },
                ]}
                onPress={() => handleThemeChange(themeOption)}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        settings.theme === themeOption
                          ? '#FFFFFF'
                          : theme.colors.textPrimary,
                    },
                  ]}
                >
                  {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Cell Size */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Cell Size
          </Text>
          <View style={styles.optionsRow}>
            {(['S', 'M', 'L'] as const).map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      settings.cellSize === size
                        ? theme.colors.primary
                        : theme.colors.background,
                    borderColor: theme.colors.gridLine,
                  },
                ]}
                onPress={() => handleCellSizeChange(size)}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        settings.cellSize === size ? '#FFFFFF' : theme.colors.textPrimary,
                    },
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SettingsScreen;
