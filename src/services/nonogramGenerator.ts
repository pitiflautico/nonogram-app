import { Puzzle, GridSize, Difficulty } from '../types';

// Generate random pattern based on difficulty
const generatePattern = (size: GridSize, difficulty: Difficulty): boolean[][] => {
  const fillRates = {
    Easy: 0.3,
    Medium: 0.45,
    Hard: 0.6,
    Expert: 0.7,
  };

  const fillRate = fillRates[difficulty];
  const pattern: boolean[][] = [];

  for (let i = 0; i < size; i++) {
    pattern[i] = [];
    for (let j = 0; j < size; j++) {
      pattern[i][j] = Math.random() < fillRate;
    }
  }

  return pattern;
};

// Calculate clues for a row or column
const calculateClues = (line: boolean[]): number[] => {
  const clues: number[] = [];
  let count = 0;

  for (let i = 0; i < line.length; i++) {
    if (line[i]) {
      count++;
    } else if (count > 0) {
      clues.push(count);
      count = 0;
    }
  }

  if (count > 0) {
    clues.push(count);
  }

  return clues.length > 0 ? clues : [0];
};

// Calculate all row clues
const calculateRowClues = (pattern: boolean[][]): number[][] => {
  return pattern.map((row) => calculateClues(row));
};

// Calculate all column clues
const calculateColumnClues = (pattern: boolean[][]): number[][] => {
  const size = pattern.length;
  const columnClues: number[][] = [];

  for (let col = 0; col < size; col++) {
    const column = pattern.map((row) => row[col]);
    columnClues.push(calculateClues(column));
  }

  return columnClues;
};

// Generate unique puzzle ID
const generatePuzzleId = (): string => {
  return `puzzle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Main generator function
export const generateNonogram = (
  size: GridSize,
  difficulty: Difficulty
): Puzzle => {
  const solution = generatePattern(size, difficulty);
  const rowClues = calculateRowClues(solution);
  const columnClues = calculateColumnClues(solution);

  return {
    id: generatePuzzleId(),
    size,
    difficulty,
    solution,
    rowClues,
    columnClues,
    origin: 'generated',
  };
};

// Validate if current grid matches solution
export const validateGrid = (
  grid: boolean[][],
  solution: boolean[][]
): boolean => {
  if (grid.length !== solution.length) return false;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== solution[i][j]) return false;
    }
  }

  return true;
};

// Check if a specific cell is correct
export const isCellCorrect = (
  row: number,
  col: number,
  filled: boolean,
  solution: boolean[][]
): boolean => {
  return filled === solution[row][col];
};

// Get progress percentage
export const getProgress = (grid: boolean[][], solution: boolean[][]): number => {
  let correct = 0;
  let total = 0;

  for (let i = 0; i < solution.length; i++) {
    for (let j = 0; j < solution[i].length; j++) {
      total++;
      if (grid[i][j] === solution[i][j]) {
        correct++;
      }
    }
  }

  return Math.round((correct / total) * 100);
};
