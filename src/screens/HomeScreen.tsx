import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { RootStackParamList } from '../navigation/types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { AdBanner } from '../components/AdBanner';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.logo, { color: theme.colors.textPrimary }]}>
            NONOGRAM
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Pixel Logic Puzzle
          </Text>
        </View>

        {/* Main Actions */}
        <View style={styles.mainActions}>
          <Button
            title="New Puzzle"
            onPress={() => navigation.navigate('NewPuzzle')}
            size="large"
            style={styles.mainButton}
          />

          <View style={styles.secondaryActions}>
            <TouchableOpacity
              style={[styles.secondaryButton, { backgroundColor: theme.colors.surface }]}
              onPress={() => navigation.navigate('HowToPlay')}
            >
              <Text style={[styles.secondaryButtonText, { color: theme.colors.primary }]}>
                How to Play
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { backgroundColor: theme.colors.surface }]}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={[styles.secondaryButtonText, { color: theme.colors.primary }]}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ad Banner */}
        <AdBanner />

        {/* Quick Stats Card */}
        <Card style={styles.statsCard}>
          <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>
            Quick Stats
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>0</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Completed
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>--:--</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Best Time
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>100%</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Accuracy
              </Text>
            </View>
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
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    letterSpacing: 1,
  },
  mainActions: {
    marginBottom: 24,
  },
  mainButton: {
    marginBottom: 16,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  statsCard: {
    marginTop: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
});

export default HomeScreen;
