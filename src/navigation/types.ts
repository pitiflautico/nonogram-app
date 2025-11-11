import { Puzzle } from '../types';

export type RootStackParamList = {
  MainTabs: undefined;
  NewPuzzle: undefined;
  GameBoard: { puzzle: Puzzle };
  PackDetail: { packId: string };
  HowToPlay: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Packs: undefined;
  Stats: undefined;
};
