# Setup Guide - Nonogram App

## Initial Setup (Completed ✓)

The basic app structure has been completed. All core functionality is implemented and ready to test.

## Next Steps for Development

### 1. Test the Application

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm start

# Test on Android
npm run android

# Test on iOS (macOS only)
npm run ios
```

### 2. Replace Placeholder Assets

Before publishing, replace these files in the `assets/` folder:

- `icon.png` - App icon (1024×1024px, PNG)
- `adaptive-icon.png` - Android adaptive icon (1024×1024px, PNG)
- `splash.png` - Splash screen (1242×2436px, PNG)
- `favicon.png` - Web favicon (48×48px, PNG)

**Design recommendations:**
- Use the app's primary color (#4C6EF5) as the base
- Create a simple, recognizable icon (e.g., a grid pattern or puzzle piece)
- Ensure good contrast for visibility on all backgrounds

### 3. Configure Google Mobile Ads

#### Step 1: Create AdMob Account
1. Go to https://admob.google.com
2. Create a new app
3. Generate ad units for:
   - Banner Ad
   - Interstitial Ad
   - Rewarded Ad

#### Step 2: Update Ad Unit IDs

Edit the following files and replace placeholder IDs:

**src/components/AdBanner.tsx**
```typescript
const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.select({
      ios: 'ca-app-pub-YOUR_IOS_BANNER_ID',
      android: 'ca-app-pub-YOUR_ANDROID_BANNER_ID',
    }) || TestIds.BANNER;
```

**src/services/adService.ts**
```typescript
// Interstitial
const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.select({
      ios: 'ca-app-pub-YOUR_IOS_INTERSTITIAL_ID',
      android: 'ca-app-pub-YOUR_ANDROID_INTERSTITIAL_ID',
    }) || TestIds.INTERSTITIAL;

// Rewarded
const rewardedAdUnitId = __DEV__
  ? TestIds.REWARDED
  : Platform.select({
      ios: 'ca-app-pub-YOUR_IOS_REWARDED_ID',
      android: 'ca-app-pub-YOUR_ANDROID_REWARDED_ID',
    }) || TestIds.REWARDED;
```

#### Step 3: Add Google Services Configuration

**For Android:**
1. Download `google-services.json` from Firebase Console
2. Replace the placeholder file at root directory

**For iOS:**
1. Download `GoogleService-Info.plist` from Firebase Console
2. Add it to your iOS project folder

### 4. Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS Build
eas build:configure

# Build Android APK/AAB
eas build --platform android --profile production

# Build iOS IPA
eas build --platform ios --profile production
```

### 5. Testing Checklist

Before publishing, test the following:

#### Functionality
- [ ] Create new random puzzle (all sizes: 5×5, 10×10, 15×15, 20×20)
- [ ] Complete a puzzle successfully
- [ ] Test all tools (Fill, Mark X, Erase, Undo, Redo)
- [ ] Use hint system (should show rewarded ad)
- [ ] Browse and play pack puzzles
- [ ] Change settings (theme, sound, haptics, cell size)
- [ ] View statistics after completing puzzles
- [ ] Tutorial displays correctly

#### Ads
- [ ] Banner ads display on Home screen
- [ ] Banner ads display on Game Board
- [ ] Interstitial ad shows after completing puzzle
- [ ] Rewarded ad plays when using hint
- [ ] Ads don't block critical UI elements

#### Persistence
- [ ] Settings persist after app restart
- [ ] Game progress saves and restores correctly
- [ ] Statistics accumulate properly
- [ ] Completed puzzles are tracked

#### UI/UX
- [ ] All screens render correctly
- [ ] Navigation works smoothly
- [ ] Theme switching works (light/dark/auto)
- [ ] Haptic feedback works on supported devices
- [ ] Grid is responsive and playable on different screen sizes

#### Performance
- [ ] App runs smoothly in airplane mode (offline)
- [ ] No crashes or freezes
- [ ] Puzzle generation is fast
- [ ] Animations are smooth

### 6. App Store Preparation

#### App Store (iOS)
1. Create app listing in App Store Connect
2. Prepare screenshots (6.5" and 5.5" displays)
3. Write app description highlighting offline functionality
4. Set privacy policy URL
5. Submit for review

#### Google Play (Android)
1. Create app listing in Google Play Console
2. Prepare screenshots and feature graphic
3. Write app description
4. Set content rating
5. Submit for review

### 7. Optional Enhancements

Consider adding these features in future updates:

- **Daily Challenge** - One puzzle per day
- **Color Support** - Multi-color nonograms
- **Cloud Sync** - Sync progress across devices
- **Achievements** - Unlock badges and rewards
- **Leaderboards** - Compare times with other players
- **More Packs** - Add themed puzzle packs as DLC
- **Puzzle Editor** - Let users create custom puzzles
- **Share** - Share completed pixel art on social media

## Support

For issues or questions:
- Check the main README.md for project structure
- Review component documentation in code comments
- Test in Expo Go first before building standalone apps

## License

This project is licensed under ISC.

---

**Note:** The app is fully functional and ready for testing. The main tasks remaining are:
1. Replace placeholder assets
2. Configure real AdMob IDs
3. Test thoroughly on real devices
4. Submit to app stores
