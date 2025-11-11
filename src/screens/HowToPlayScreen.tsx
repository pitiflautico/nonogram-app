import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const HowToPlayScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            What is Nonogram?
          </Text>
          <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
            Nonogram is a logic puzzle where you fill cells in a grid to reveal a hidden
            picture. The numbers on the sides tell you how many cells to fill in each row
            and column.
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            How to Read Clues
          </Text>
          <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
            • Each number represents a group of consecutive filled cells{'\n'}
            • Multiple numbers mean multiple groups with at least one empty cell between
            them{'\n'}
            • A "0" means the entire row or column is empty{'\n'}
            • Example: "3 1" means a group of 3 filled cells, then at least one empty
            cell, then 1 filled cell
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Tools
          </Text>
          <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
            ✏️ <Text style={{ fontWeight: '600' }}>Fill:</Text> Mark cells as filled{'\n'}
            ✕ <Text style={{ fontWeight: '600' }}>Mark:</Text> Mark cells you know are
            empty{'\n'}
            🧽 <Text style={{ fontWeight: '600' }}>Erase:</Text> Clear a cell{'\n'}
            ↩️ <Text style={{ fontWeight: '600' }}>Undo:</Text> Undo your last move{'\n'}
            ↪️ <Text style={{ fontWeight: '600' }}>Redo:</Text> Redo a move{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Hint:</Text> Reveal one correct cell
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Tips
          </Text>
          <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
            • Start with rows and columns that have larger numbers{'\n'}
            • Look for rows/columns where the numbers add up close to the grid size{'\n'}
            • Use the X tool to mark cells you know are empty{'\n'}
            • Work systematically - complete one area before moving to another{'\n'}
            • Take your time - it's about logic, not speed!
          </Text>
        </Card>

        <Button
          title="Got it!"
          onPress={() => navigation.goBack()}
          size="large"
          style={styles.button}
        />
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
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 16,
  },
});

export default HowToPlayScreen;
