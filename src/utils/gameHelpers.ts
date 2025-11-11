import { Cell, CellState } from '../types';

// Convert Cell grid to boolean grid for validation
export const cellGridToBooleanGrid = (grid: Cell[][]): boolean[][] => {
  return grid.map((row) => row.map((cell) => cell.state === 'filled'));
};

// Format time in MM:SS format
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Calculate errors count
export const calculateErrors = (
  grid: Cell[][],
  solution: boolean[][]
): number => {
  let errors = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j];
      const shouldBeFilled = solution[i][j];

      if (cell.state === 'filled' && !shouldBeFilled) {
        errors++;
      } else if (cell.state === 'empty' && shouldBeFilled) {
        // Don't count empty cells as errors yet
      }
    }
  }

  return errors;
};

// Check if puzzle is complete
export const isPuzzleComplete = (
  grid: Cell[][],
  solution: boolean[][]
): boolean => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j];
      const shouldBeFilled = solution[i][j];

      if (shouldBeFilled && cell.state !== 'filled') {
        return false;
      }
      if (!shouldBeFilled && cell.state === 'filled') {
        return false;
      }
    }
  }

  return true;
};

// Get next cell state when tapping
export const getNextCellState = (currentState: CellState): CellState => {
  switch (currentState) {
    case 'empty':
      return 'filled';
    case 'filled':
      return 'marked';
    case 'marked':
      return 'empty';
  }
};
