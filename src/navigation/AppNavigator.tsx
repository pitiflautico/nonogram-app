import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/ThemeContext';
import { RootStackParamList, MainTabParamList } from './types';

// Import screens (will be created next)
import HomeScreen from '../screens/HomeScreen';
import PacksScreen from '../screens/PacksScreen';
import StatsScreen from '../screens/StatsScreen';
import NewPuzzleScreen from '../screens/NewPuzzleScreen';
import GameBoardScreen from '../screens/GameBoardScreen';
import PackDetailScreen from '../screens/PackDetailScreen';
import HowToPlayScreen from '../screens/HowToPlayScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.gridLine,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Packs"
        component={PacksScreen}
        options={{
          tabBarLabel: 'Packs',
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: 'Stats',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: theme.colors.textPrimary,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPuzzle"
          component={NewPuzzleScreen}
          options={{ title: 'New Puzzle' }}
        />
        <Stack.Screen
          name="GameBoard"
          component={GameBoardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PackDetail"
          component={PackDetailScreen}
          options={{ title: 'Pack' }}
        />
        <Stack.Screen
          name="HowToPlay"
          component={HowToPlayScreen}
          options={{ title: 'How to Play' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
