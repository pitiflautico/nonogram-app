import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/ThemeContext';
import { useGameStore } from '../stores/gameStore';
import { useSettingsStore } from '../stores/settingsStore';
import { useStatsStore } from '../stores/statsStore';
import { RootStackParamList } from '../navigation/types';
import { CellState } from '../types';
import { cellSizes } from '../theme/tokens';
import { formatTime, isPuzzleComplete, getNextCellState } from '../utils/gameHelpers';
import { Button } from '../components/Button';

type GameBoardScreenRouteProp = RouteProp<RootStackParamList, 'GameBoard'>;
type GameBoardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameBoard'>;

const GameBoardScreen = () => {
  const route = useRoute<GameBoardScreenRouteProp>();
  const navigation = useNavigation<GameBoardScreenNavigationProp>();
  const { theme } = useTheme();
  const { cellSize, hapticsEnabled, showErrors } = useSettingsStore();
  const { addCompletedPuzzle } = useStatsStore();

  const {
    currentGame,
    startGame,
    updateCell,
    togglePause,
    useHint,
    undo,
    redo,
  } = useGameStore();

  const [tool, setTool] = useState<'fill' | 'mark' | 'erase'>('fill');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (route.params?.puzzle && !currentGame) {
      startGame(route.params.puzzle);
    }
  }, [route.params?.puzzle]);

  useEffect(() => {
    if (!currentGame || currentGame.status !== 'playing') return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - currentGame.startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentGame?.status]);

  useEffect(() => {
    if (currentGame && isPuzzleComplete(currentGame.grid, currentGame.puzzle.solution)) {
      handlePuzzleComplete();
    }
  }, [currentGame?.grid]);

  const handlePuzzleComplete = async () => {
    if (!currentGame) return;

    if (hapticsEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    const puzzleStats = {
      id: currentGame.puzzle.id,
      completed: true,
      time: Date.now() - currentGame.startTime,
      errors: currentGame.errors,
      hintsUsed: currentGame.hintsUsed,
      completedAt: Date.now(),
      size: currentGame.puzzle.size,
      difficulty: currentGame.puzzle.difficulty,
    };

    await addCompletedPuzzle(puzzleStats);

    Alert.alert(
      'Puzzle Complete! 🎉',
      `Time: ${formatTime(puzzleStats.time)}\nErrors: ${puzzleStats.errors}\nHints: ${puzzleStats.hintsUsed}`,
      [
        {
          text: 'Continue',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleCellPress = (row: number, col: number) => {
    if (!currentGame || currentGame.status !== 'playing') return;

    if (hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const currentState = currentGame.grid[row][col].state;
    let newState: CellState;

    switch (tool) {
      case 'fill':
        newState = currentState === 'filled' ? 'empty' : 'filled';
        break;
      case 'mark':
        newState = currentState === 'marked' ? 'empty' : 'marked';
        break;
      case 'erase':
        newState = 'empty';
        break;
    }

    updateCell(row, col, newState);
  };

  if (!currentGame) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const gridCellSize = cellSizes[cellSize];
  const { puzzle, grid, status } = currentGame;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.timer, { color: theme.colors.textPrimary }]}>
            {formatTime(elapsedTime)}
          </Text>
          <Text style={[styles.difficulty, { color: theme.colors.textSecondary }]}>
            {puzzle.difficulty} • {puzzle.size}×{puzzle.size}
          </Text>
        </View>
        <TouchableOpacity onPress={togglePause}>
          <Text style={[styles.pauseButton, { color: theme.colors.primary }]}>
            {status === 'playing' ? '⏸' : '▶'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Game Board */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.boardContainer}>
          {/* Column Clues */}
          <View style={styles.columnCluesContainer}>
            <View style={{ width: gridCellSize * 2 }} />
            {puzzle.columnClues.map((clues, colIndex) => (
              <View
                key={colIndex}
                style={[styles.columnClue, { width: gridCellSize }]}
              >
                {clues.map((clue, i) => (
                  <Text
                    key={i}
                    style={[styles.clueText, { color: theme.colors.textPrimary }]}
                  >
                    {clue}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          {/* Grid with Row Clues */}
          {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {/* Row Clue */}
              <View style={[styles.rowClue, { width: gridCellSize * 2 }]}>
                {puzzle.rowClues[rowIndex].map((clue, i) => (
                  <Text
                    key={i}
                    style={[styles.clueText, { color: theme.colors.textPrimary }]}
                  >
                    {clue}
                  </Text>
                ))}
              </View>

              {/* Cells */}
              {row.map((cell, colIndex) => {
                const isThickBorder =
                  (rowIndex + 1) % 5 === 0 || (colIndex + 1) % 5 === 0;

                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.cell,
                      {
                        width: gridCellSize,
                        height: gridCellSize,
                        backgroundColor:
                          cell.state === 'filled'
                            ? theme.colors.cellActive
                            : cell.state === 'marked'
                            ? theme.colors.cellMarked
                            : theme.colors.surface,
                        borderColor: isThickBorder
                          ? theme.colors.gridLineThick
                          : theme.colors.gridLine,
                        borderWidth: isThickBorder ? 2 : 1,
                      },
                    ]}
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                  >
                    {cell.state === 'marked' && (
                      <Text style={[styles.markText, { color: theme.colors.textSecondary }]}>
                        ✕
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.toolsRow}>
          <TouchableOpacity
            style={[
              styles.toolButton,
              { backgroundColor: tool === 'fill' ? theme.colors.primary : 'transparent' },
            ]}
            onPress={() => setTool('fill')}
          >
            <Text style={{ color: tool === 'fill' ? '#FFF' : theme.colors.textPrimary }}>
              ✏️
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toolButton,
              { backgroundColor: tool === 'mark' ? theme.colors.primary : 'transparent' },
            ]}
            onPress={() => setTool('mark')}
          >
            <Text style={{ color: tool === 'mark' ? '#FFF' : theme.colors.textPrimary }}>
              ✕
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toolButton,
              { backgroundColor: tool === 'erase' ? theme.colors.primary : 'transparent' },
            ]}
            onPress={() => setTool('erase')}
          >
            <Text style={{ color: tool === 'erase' ? '#FFF' : theme.colors.textPrimary }}>
              🧽
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.toolButton} onPress={undo}>
            <Text>↩️</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolButton} onPress={redo}>
            <Text>↪️</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.toolButton} onPress={useHint}>
            <Text>💡</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerCenter: {
    alignItems: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: '600',
  },
  difficulty: {
    fontSize: 12,
    marginTop: 2,
  },
  pauseButton: {
    fontSize: 24,
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
  },
  boardContainer: {
    alignItems: 'center',
  },
  columnCluesContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  columnClue: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: 40,
  },
  gridRow: {
    flexDirection: 'row',
  },
  rowClue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 8,
  },
  clueText: {
    fontSize: 12,
    fontWeight: '500',
    marginHorizontal: 2,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  markText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toolbar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  toolButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
});

export default GameBoardScreen;
