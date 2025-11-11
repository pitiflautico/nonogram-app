# Nonogram - Pixel Logic Puzzle

A fully functional offline Nonogram/Picross puzzle game built with React Native and Expo.

## Features

- 🎮 **100% Offline** - No internet connection required
- 🧩 **Multiple Grid Sizes** - 5×5, 10×10, 15×15, and 20×20
- 🎯 **4 Difficulty Levels** - Easy, Medium, Hard, and Expert
- 📦 **Local Puzzle Packs** - Basic, Animals, and Geometric themes
- 🎨 **Dark/Light Themes** - Automatic theme switching
- 📊 **Statistics Tracking** - Track your progress and best times
- 💾 **Auto-save** - Never lose your progress
- 💡 **Hint System** - Get help when you're stuck (rewarded ads)
- ↩️ **Undo/Redo** - Unlimited undo and redo
- 📱 **Google Ads Integration** - Banner, Interstitial, and Rewarded ads

## Installation

```bash
npm install
```

## Running the App

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Project Structure

```
nonogram-app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # App screens
│   ├── navigation/      # React Navigation setup
│   ├── services/        # Business logic (game generator, ads)
│   ├── stores/          # Zustand state management
│   ├── theme/           # Design tokens and theme
│   ├── types/           # TypeScript types
│   ├── utils/           # Helper functions
│   └── data/            # Local puzzle packs
├── assets/              # Icons, splash, fonts
├── App.tsx              # App entry point
└── index.js             # Expo entry point
```

## Technologies Used

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **Zustand** - State management
- **AsyncStorage** - Local persistence
- **Google Mobile Ads** - Monetization
- **Expo Haptics** - Haptic feedback

## Configuration

### Google Ads Setup

1. Create a Google AdMob account
2. Create ad units for Banner, Interstitial, and Rewarded ads
3. Replace placeholder IDs in:
   - `src/components/AdBanner.tsx`
   - `src/services/adService.ts`
4. Add your `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)

### Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## Design System

The app follows a minimalist design inspired by apps like Monument Valley and Good Sudoku:

- **Colors**: Soft backgrounds with accent colors (#4C6EF5)
- **Typography**: Inter/SF Pro with weights 400-600
- **Spacing**: Consistent 8px grid system
- **Components**: Card-based UI with rounded corners (12-16px)

## Game Logic

The Nonogram puzzles are generated using:
- Pattern generation based on difficulty
- Automatic clue calculation for rows/columns
- Real-time validation
- Progress tracking

## License

ISC

## Author

Created with React Native and Expo
