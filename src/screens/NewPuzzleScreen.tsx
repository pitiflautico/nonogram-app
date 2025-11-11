import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { RootStackParamList } from '../navigation/types';
import { GridSize, Difficulty } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { generateNonogram } from '../services/nonogramGenerator';

type NewPuzzleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewPuzzle'>;

const NewPuzzleScreen = () => {
  const navigation = useNavigation<NewPuzzleScreenNavigationProp>();
  const { theme } = useTheme();

  const [selectedSize, setSelectedSize] = useState<GridSize>(10);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Medium');

  const sizes: GridSize[] = [5, 10, 15, 20];
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Expert'];

  const handleStart = () => {
    const puzzle = generateNonogram(selectedSize, selectedDifficulty);
    navigation.navigate('GameBoard', { puzzle });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Size Selection */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Grid Size
          </Text>
          <View style={styles.optionsGrid}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      selectedSize === size ? theme.colors.primary : theme.colors.surface,
                    borderColor: theme.colors.gridLine,
                  },
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        selectedSize === size ? '#FFFFFF' : theme.colors.textPrimary,
                    },
                  ]}
                >
                  {size}×{size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Difficulty Selection */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Difficulty
          </Text>
          <View style={styles.optionsList}>
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.difficultyButton,
                  {
                    backgroundColor:
                      selectedDifficulty === difficulty
                        ? theme.colors.primary
                        : theme.colors.surface,
                    borderColor: theme.colors.gridLine,
                  },
                ]}
                onPress={() => setSelectedDifficulty(difficulty)}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    {
                      color:
                        selectedDifficulty === difficulty
                          ? '#FFFFFF'
                          : theme.colors.textPrimary,
                    },
                  ]}
                >
                  {difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Start Button */}
        <Button
          title="Start Puzzle"
          onPress={handleStart}
          size="large"
          style={styles.startButton}
        />
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    width: '47%',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
  },
  optionsList: {
    gap: 12,
  },
  difficultyButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  difficultyText: {
    fontSize: 16,
    fontWeight: '500',
  },
  startButton: {
    marginTop: 16,
  },
});

export default NewPuzzleScreen;
