import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useStatsStore } from '../stores/statsStore';
import { Card } from '../components/Card';
import { formatTime } from '../utils/gameHelpers';

const StatsScreen = () => {
  const { theme } = useTheme();
  const stats = useStatsStore();

  useEffect(() => {
    stats.loadStats();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Statistics</Text>

        {/* Overview */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Overview
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                {stats.totalCompleted}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Completed
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                {stats.averageAccuracy.toFixed(0)}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Accuracy
              </Text>
            </View>
          </View>
        </Card>

        {/* Best Times */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Best Times
          </Text>
          {[5, 10, 15, 20].map((size) => {
            const time = stats.bestTimeBySize[size as 5 | 10 | 15 | 20];
            const displayTime = time === Infinity ? '--:--' : formatTime(time);

            return (
              <View key={size} style={styles.bestTimeRow}>
                <Text style={[styles.sizeLabel, { color: theme.colors.textPrimary }]}>
                  {size}×{size}
                </Text>
                <Text style={[styles.timeValue, { color: theme.colors.primary }]}>
                  {displayTime}
                </Text>
              </View>
            );
          })}
        </Card>

        {/* Recent Puzzles */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Recent Puzzles
          </Text>
          {stats.recentPuzzles.length === 0 ? (
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No puzzles completed yet
            </Text>
          ) : (
            stats.recentPuzzles.slice(0, 10).map((puzzle, index) => (
              <View key={index} style={styles.recentPuzzleRow}>
                <View>
                  <Text style={[styles.puzzleSize, { color: theme.colors.textPrimary }]}>
                    {puzzle.size}×{puzzle.size} • {puzzle.difficulty}
                  </Text>
                  <Text style={[styles.puzzleTime, { color: theme.colors.textSecondary }]}>
                    {formatTime(puzzle.time)} • {puzzle.errors} errors
                  </Text>
                </View>
                <Text style={[styles.checkmark, { color: theme.colors.success }]}>✓</Text>
              </View>
            ))
          )}
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
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  bestTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  recentPuzzleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  puzzleSize: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  puzzleTime: {
    fontSize: 14,
  },
  checkmark: {
    fontSize: 20,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default StatsScreen;
