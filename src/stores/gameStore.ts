import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, Puzzle, Cell, CellState } from '../types';

interface GameStore {
  currentGame: GameState | null;
  startGame: (puzzle: Puzzle) => void;
  updateCell: (row: number, col: number, state: CellState) => void;
  togglePause: () => void;
  useHint: () => void;
  undo: () => void;
  redo: () => void;
  saveProgress: () => Promise<void>;
  loadProgress: () => Promise<void>;
  completeGame: () => void;
  resetGame: () => void;
}

const createEmptyGrid = (size: number): Cell[][] => {
  return Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => ({ state: 'empty' as CellState }))
    );
};

export const useGameStore = create<GameStore>((set, get) => ({
  currentGame: null,

  startGame: (puzzle: Puzzle) => {
    const grid = createEmptyGrid(puzzle.size);
    const newGame: GameState = {
      puzzle,
      grid,
      status: 'playing',
      startTime: Date.now(),
      elapsedTime: 0,
      errors: 0,
      hintsUsed: 0,
      undoStack: [],
      redoStack: [],
    };
    set({ currentGame: newGame });
    get().saveProgress();
  },

  updateCell: (row: number, col: number, state: CellState) => {
    const { currentGame } = get();
    if (!currentGame || currentGame.status !== 'playing') return;

    const newGrid = currentGame.grid.map((r, i) =>
      i === row
        ? r.map((c, j) => (j === col ? { ...c, state } : c))
        : r
    );

    const undoStack = [...currentGame.undoStack, currentGame.grid];

    set({
      currentGame: {
        ...currentGame,
        grid: newGrid,
        undoStack,
        redoStack: [],
      },
    });

    get().saveProgress();
  },

  togglePause: () => {
    const { currentGame } = get();
    if (!currentGame) return;

    const newStatus = currentGame.status === 'playing' ? 'paused' : 'playing';
    set({
      currentGame: {
        ...currentGame,
        status: newStatus,
      },
    });
  },

  useHint: () => {
    const { currentGame } = get();
    if (!currentGame || currentGame.status !== 'playing') return;

    // Find first empty cell that should be filled
    const solution = currentGame.puzzle.solution;
    for (let i = 0; i < solution.length; i++) {
      for (let j = 0; j < solution[i].length; j++) {
        if (solution[i][j] && currentGame.grid[i][j].state === 'empty') {
          get().updateCell(i, j, 'filled');
          set({
            currentGame: {
              ...currentGame,
              hintsUsed: currentGame.hintsUsed + 1,
            },
          });
          return;
        }
      }
    }
  },

  undo: () => {
    const { currentGame } = get();
    if (!currentGame || currentGame.undoStack.length === 0) return;

    const previousGrid = currentGame.undoStack[currentGame.undoStack.length - 1];
    const newUndoStack = currentGame.undoStack.slice(0, -1);
    const newRedoStack = [...currentGame.redoStack, currentGame.grid];

    set({
      currentGame: {
        ...currentGame,
        grid: previousGrid,
        undoStack: newUndoStack,
        redoStack: newRedoStack,
      },
    });

    get().saveProgress();
  },

  redo: () => {
    const { currentGame } = get();
    if (!currentGame || currentGame.redoStack.length === 0) return;

    const nextGrid = currentGame.redoStack[currentGame.redoStack.length - 1];
    const newRedoStack = currentGame.redoStack.slice(0, -1);
    const newUndoStack = [...currentGame.undoStack, currentGame.grid];

    set({
      currentGame: {
        ...currentGame,
        grid: nextGrid,
        undoStack: newUndoStack,
        redoStack: newRedoStack,
      },
    });

    get().saveProgress();
  },

  saveProgress: async () => {
    const { currentGame } = get();
    if (!currentGame) return;

    try {
      await AsyncStorage.setItem('currentGame', JSON.stringify(currentGame));
    } catch (error) {
      console.error('Error saving game progress:', error);
    }
  },

  loadProgress: async () => {
    try {
      const saved = await AsyncStorage.getItem('currentGame');
      if (saved) {
        const game = JSON.parse(saved);
        set({ currentGame: game });
      }
    } catch (error) {
      console.error('Error loading game progress:', error);
    }
  },

  completeGame: () => {
    const { currentGame } = get();
    if (!currentGame) return;

    set({
      currentGame: {
        ...currentGame,
        status: 'completed',
        elapsedTime: Date.now() - currentGame.startTime,
      },
    });
  },

  resetGame: () => {
    set({ currentGame: null });
    AsyncStorage.removeItem('currentGame');
  },
}));
