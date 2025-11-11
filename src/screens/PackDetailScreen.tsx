import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { RootStackParamList } from '../navigation/types';
import { Card } from '../components/Card';
import { getPackById } from '../data/packs';

type PackDetailScreenRouteProp = RouteProp<RootStackParamList, 'PackDetail'>;
type PackDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PackDetail'>;

const PackDetailScreen = () => {
  const route = useRoute<PackDetailScreenRouteProp>();
  const navigation = useNavigation<PackDetailScreenNavigationProp>();
  const { theme } = useTheme();

  const pack = getPackById(route.params.packId);

  if (!pack) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Pack not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          {pack.description}
        </Text>

        <View style={styles.puzzlesList}>
          {pack.puzzles.map((puzzle, index) => (
            <TouchableOpacity
              key={puzzle.id}
              onPress={() => navigation.navigate('GameBoard', { puzzle })}
            >
              <Card style={styles.puzzleCard}>
                <View style={styles.puzzleHeader}>
                  <View>
                    <Text style={[styles.puzzleNumber, { color: theme.colors.textSecondary }]}>
                      #{index + 1}
                    </Text>
                    <Text style={[styles.puzzleName, { color: theme.colors.textPrimary }]}>
                      {puzzle.name || `Puzzle ${index + 1}`}
                    </Text>
                    <Text style={[styles.puzzleMeta, { color: theme.colors.textSecondary }]}>
                      {puzzle.size}×{puzzle.size} • {puzzle.difficulty}
                    </Text>
                  </View>
                  <View style={[styles.difficultyBadge, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.difficultyText}>{puzzle.difficulty[0]}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
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
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  puzzlesList: {
    gap: 12,
  },
  puzzleCard: {
    marginBottom: 4,
  },
  puzzleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  puzzleNumber: {
    fontSize: 12,
    marginBottom: 2,
  },
  puzzleName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  puzzleMeta: {
    fontSize: 14,
  },
  difficultyBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PackDetailScreen;
