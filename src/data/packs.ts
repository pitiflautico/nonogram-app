import { PuzzlePack, Puzzle } from '../types';

// Helper to create a puzzle from a pattern
const createPuzzle = (
  id: string,
  name: string,
  pattern: string[],
  difficulty: 'Easy' | 'Medium' | 'Hard',
  packId: string,
  packName: string
): Puzzle => {
  const size = pattern.length as 5 | 10 | 15 | 20;
  const solution: boolean[][] = pattern.map((row) =>
    row.split('').map((cell) => cell === '1')
  );

  // Calculate row clues
  const rowClues = solution.map((row) => {
    const clues: number[] = [];
    let count = 0;
    for (const cell of row) {
      if (cell) {
        count++;
      } else if (count > 0) {
        clues.push(count);
        count = 0;
      }
    }
    if (count > 0) clues.push(count);
    return clues.length > 0 ? clues : [0];
  });

  // Calculate column clues
  const columnClues: number[][] = [];
  for (let col = 0; col < size; col++) {
    const clues: number[] = [];
    let count = 0;
    for (let row = 0; row < size; row++) {
      if (solution[row][col]) {
        count++;
      } else if (count > 0) {
        clues.push(count);
        count = 0;
      }
    }
    if (count > 0) clues.push(count);
    columnClues.push(clues.length > 0 ? clues : [0]);
  }

  return {
    id,
    name,
    size,
    difficulty,
    solution,
    rowClues,
    columnClues,
    origin: 'pack',
    packId,
    packName,
  };
};

// Basic Pack - Simple shapes
const basicPack: PuzzlePack = {
  id: 'basic',
  name: 'Basic',
  description: 'Simple shapes to get started',
  puzzles: [
    createPuzzle(
      'basic_1',
      'Heart',
      [
        '01010',
        '11111',
        '11111',
        '01110',
        '00100',
      ],
      'Easy',
      'basic',
      'Basic'
    ),
    createPuzzle(
      'basic_2',
      'Diamond',
      [
        '00100',
        '01110',
        '11111',
        '01110',
        '00100',
      ],
      'Easy',
      'basic',
      'Basic'
    ),
    createPuzzle(
      'basic_3',
      'House',
      [
        '00100',
        '01110',
        '11111',
        '10101',
        '10101',
      ],
      'Easy',
      'basic',
      'Basic'
    ),
    createPuzzle(
      'basic_4',
      'Smile',
      [
        '0000000000',
        '0011001100',
        '0011001100',
        '0000000000',
        '0000000000',
        '1000000001',
        '0100000010',
        '0011111100',
        '0000000000',
        '0000000000',
      ],
      'Medium',
      'basic',
      'Basic'
    ),
  ],
};

// Animals Pack
const animalsPack: PuzzlePack = {
  id: 'animals',
  name: 'Animals',
  description: 'Cute pixel animals',
  puzzles: [
    createPuzzle(
      'animals_1',
      'Cat',
      [
        '10001',
        '10001',
        '11111',
        '11111',
        '01110',
      ],
      'Easy',
      'animals',
      'Animals'
    ),
    createPuzzle(
      'animals_2',
      'Fish',
      [
        '00100',
        '01110',
        '11111',
        '01110',
        '00100',
      ],
      'Easy',
      'animals',
      'Animals'
    ),
    createPuzzle(
      'animals_3',
      'Bird',
      [
        '0010000000',
        '0111000000',
        '1111100000',
        '0111110000',
        '0011111000',
        '0001111100',
        '0000111110',
        '0000011111',
        '0000001110',
        '0000000100',
      ],
      'Medium',
      'animals',
      'Animals'
    ),
    createPuzzle(
      'animals_4',
      'Dog',
      [
        '1000000001',
        '1100000011',
        '0110000110',
        '0011111100',
        '0011111100',
        '0011111100',
        '0001111000',
        '0001111000',
        '0000110000',
        '0000110000',
      ],
      'Medium',
      'animals',
      'Animals'
    ),
  ],
};

// Geometric Pack
const geometricPack: PuzzlePack = {
  id: 'geometric',
  name: 'Geometric',
  description: 'Abstract patterns and shapes',
  puzzles: [
    createPuzzle(
      'geometric_1',
      'Triangle',
      [
        '00100',
        '01110',
        '11111',
        '00000',
        '00000',
      ],
      'Easy',
      'geometric',
      'Geometric'
    ),
    createPuzzle(
      'geometric_2',
      'Cross',
      [
        '00100',
        '00100',
        '11111',
        '00100',
        '00100',
      ],
      'Easy',
      'geometric',
      'Geometric'
    ),
    createPuzzle(
      'geometric_3',
      'Checkerboard',
      [
        '0101010101',
        '1010101010',
        '0101010101',
        '1010101010',
        '0101010101',
        '1010101010',
        '0101010101',
        '1010101010',
        '0101010101',
        '1010101010',
      ],
      'Hard',
      'geometric',
      'Geometric'
    ),
    createPuzzle(
      'geometric_4',
      'Spiral',
      [
        '1111111111',
        '0000000001',
        '0111111101',
        '0100000101',
        '0101110101',
        '0101010101',
        '0101011101',
        '0100000001',
        '0111111111',
        '0000000000',
      ],
      'Hard',
      'geometric',
      'Geometric'
    ),
  ],
};

export const allPacks: PuzzlePack[] = [basicPack, animalsPack, geometricPack];

export const getPackById = (id: string): PuzzlePack | undefined => {
  return allPacks.find((pack) => pack.id === id);
};

export const getPuzzleById = (puzzleId: string): Puzzle | undefined => {
  for (const pack of allPacks) {
    const puzzle = pack.puzzles.find((p) => p.id === puzzleId);
    if (puzzle) return puzzle;
  }
  return undefined;
};
