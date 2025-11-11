import { Theme } from '../types';

export const lightTheme: Theme = {
  colors: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    primary: '#4C6EF5',
    secondary: '#7C3AED',
    textPrimary: '#212529',
    textSecondary: '#6C757D',
    cellActive: '#212529',
    cellMarked: '#DEE2E6',
    gridLine: '#CED4DA',
    gridLineThick: '#ADB5BD',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    title: {
      fontSize: 28,
      fontWeight: '600',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '500',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
    },
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#181A1B',
    surface: '#2D3135',
    primary: '#5C7CFA',
    secondary: '#9575FA',
    textPrimary: '#E9ECEF',
    textSecondary: '#ADB5BD',
    cellActive: '#E9ECEF',
    cellMarked: '#495057',
    gridLine: '#343A40',
    gridLineThick: '#495057',
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    title: {
      fontSize: 28,
      fontWeight: '600',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '500',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
    },
  },
};

export const cellSizes = {
  S: 28,
  M: 36,
  L: 44,
};
