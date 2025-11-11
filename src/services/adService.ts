import { Platform } from 'react-native';
import {
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

// Ad Unit IDs (replace with your own when publishing)
const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.select({
      ios: 'ca-app-pub-XXXXX/XXXXX',
      android: 'ca-app-pub-XXXXX/XXXXX',
    }) || TestIds.INTERSTITIAL;

const rewardedAdUnitId = __DEV__
  ? TestIds.REWARDED
  : Platform.select({
      ios: 'ca-app-pub-XXXXX/XXXXX',
      android: 'ca-app-pub-XXXXX/XXXXX',
    }) || TestIds.REWARDED;

// Create ad instances
let interstitialAd: InterstitialAd | null = null;
let rewardedAd: RewardedAd | null = null;

// Initialize Interstitial Ad
export const initInterstitialAd = () => {
  interstitialAd = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
    console.log('Interstitial ad loaded');
  });

  interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
    console.log('Interstitial ad closed');
    // Reload the ad
    interstitialAd?.load();
  });

  interstitialAd.load();
};

// Show Interstitial Ad
export const showInterstitialAd = async (): Promise<void> => {
  if (interstitialAd?.loaded) {
    try {
      await interstitialAd.show();
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
    }
  } else {
    console.log('Interstitial ad not ready');
    interstitialAd?.load();
  }
};

// Initialize Rewarded Ad
export const initRewardedAd = () => {
  rewardedAd = RewardedAd.createForAdRequest(rewardedAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
    console.log('Rewarded ad loaded');
  });

  rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
    console.log('User earned reward:', reward);
  });

  rewardedAd.load();
};

// Show Rewarded Ad
export const showRewardedAd = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!rewardedAd?.loaded) {
      console.log('Rewarded ad not ready');
      rewardedAd?.load();
      resolve(false);
      return;
    }

    let rewarded = false;

    const earnedListener = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        rewarded = true;
      }
    );

    const closedListener = rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      earnedListener();
      closedListener();
      rewardedAd?.load(); // Reload for next time
      resolve(rewarded);
    });

    rewardedAd.show().catch((error) => {
      console.error('Error showing rewarded ad:', error);
      earnedListener();
      closedListener();
      resolve(false);
    });
  });
};

// Initialize all ads
export const initializeAds = () => {
  initInterstitialAd();
  initRewardedAd();
};
