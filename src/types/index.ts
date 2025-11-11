// Core Types
export type GridSize = 5 | 10 | 15 | 20;
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
export type CellState = 'empty' | 'filled' | 'marked';
export type GameStatus = 'playing' | 'paused' | 'completed';
export type PuzzleOrigin = 'generated' | 'pack';

// Puzzle Data
export interface Cell {
  state: CellState;
  isCorrect?: boolean;
}

export interface Puzzle {
  id: string;
  size: GridSize;
  difficulty: Difficulty;
  solution: boolean[][];
  rowClues: number[][];
  columnClues: number[][];
  origin: PuzzleOrigin;
  packId?: string;
  packName?: string;
  name?: string;
}

export interface GameState {
  puzzle: Puzzle;
  grid: Cell[][];
  status: GameStatus;
  startTime: number;
  elapsedTime: number;
  errors: number;
  hintsUsed: number;
  undoStack: Cell[][][];
  redoStack: Cell[][][];
}

export interface PuzzlePack {
  id: string;
  name: string;
  description: string;
  puzzles: Puzzle[];
  thumbnail?: string;
}

// Stats
export interface PuzzleStats {
  id: string;
  completed: boolean;
  time: number;
  errors: number;
  hintsUsed: number;
  completedAt?: number;
  size: GridSize;
  difficulty: Difficulty;
}

export interface UserStats {
  totalCompleted: number;
  bestTimeBySize: Record<GridSize, number>;
  averageAccuracy: number;
  recentPuzzles: PuzzleStats[];
}

// Settings
export interface Settings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  showErrors: boolean;
  theme: 'light' | 'dark' | 'auto';
  cellSize: 'S' | 'M' | 'L';
  tutorialCompleted: boolean;
}

// Theme
export interface Theme {
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    textPrimary: string;
    textSecondary: string;
    cellActive: string;
    cellMarked: string;
    gridLine: string;
    gridLineThick: string;
    error: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    title: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700';
    };
    subtitle: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700';
    };
    body: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700';
    };
    caption: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700';
    };
  };
}
