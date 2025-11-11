import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { RootStackParamList } from '../navigation/types';
import { Card } from '../components/Card';
import { AdBanner } from '../components/AdBanner';
import { allPacks } from '../data/packs';

type PacksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const PacksScreen = () => {
  const navigation = useNavigation<PacksScreenNavigationProp>();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Puzzle Packs</Text>

        {allPacks.map((pack) => (
          <TouchableOpacity
            key={pack.id}
            onPress={() => navigation.navigate('PackDetail', { packId: pack.id })}
          >
            <Card style={styles.packCard}>
              <View style={styles.packHeader}>
                <View>
                  <Text style={[styles.packName, { color: theme.colors.textPrimary }]}>
                    {pack.name}
                  </Text>
                  <Text style={[styles.packDescription, { color: theme.colors.textSecondary }]}>
                    {pack.description}
                  </Text>
                </View>
                <View style={[styles.packBadge, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.packBadgeText}>{pack.puzzles.length}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        <AdBanner />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
  },
  packCard: {
    marginBottom: 16,
  },
  packHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  packDescription: {
    fontSize: 14,
  },
  packBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PacksScreen;
