import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStats, PuzzleStats, GridSize } from '../types';

interface StatsStore extends UserStats {
  loadStats: () => Promise<void>;
  addCompletedPuzzle: (stats: PuzzleStats) => Promise<void>;
}

const defaultStats: UserStats = {
  totalCompleted: 0,
  bestTimeBySize: {
    5: Infinity,
    10: Infinity,
    15: Infinity,
    20: Infinity,
  },
  averageAccuracy: 100,
  recentPuzzles: [],
};

export const useStatsStore = create<StatsStore>((set, get) => ({
  ...defaultStats,

  loadStats: async () => {
    try {
      const stored = await AsyncStorage.getItem('stats');
      if (stored) {
        const stats = JSON.parse(stored);
        set(stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  },

  addCompletedPuzzle: async (puzzleStats: PuzzleStats) => {
    try {
      const current = get();
      const newTotalCompleted = current.totalCompleted + 1;

      // Update best time for this size
      const currentBest = current.bestTimeBySize[puzzleStats.size];
      const newBestTime = Math.min(currentBest, puzzleStats.time);

      const updatedBestTimes = {
        ...current.bestTimeBySize,
        [puzzleStats.size]: newBestTime,
      };

      // Add to recent puzzles (keep last 20)
      const newRecentPuzzles = [puzzleStats, ...current.recentPuzzles].slice(0, 20);

      // Calculate average accuracy
      const totalErrors = newRecentPuzzles.reduce((sum, p) => sum + p.errors, 0);
      const totalCells = newRecentPuzzles.reduce((sum, p) => sum + p.size * p.size, 0);
      const newAverageAccuracy = 100 - (totalErrors / totalCells) * 100;

      const newStats = {
        totalCompleted: newTotalCompleted,
        bestTimeBySize: updatedBestTimes,
        averageAccuracy: newAverageAccuracy,
        recentPuzzles: newRecentPuzzles,
      };

      await AsyncStorage.setItem('stats', JSON.stringify(newStats));
      set(newStats);
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  },
}));
