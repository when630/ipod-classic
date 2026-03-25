import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';

export function ScreenLockScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.screen.background }]}>
      <View style={styles.content}>
        <Ionicons name="lock-closed" size={32} color={theme.screen.text + '40'} />
        <Text style={[styles.text, { color: theme.screen.text }]}>Screen Locked</Text>
        <Text style={[styles.hint, { color: theme.screen.text }]}>
          Press MENU to unlock
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  text: { fontSize: 16, fontWeight: '600' },
  hint: { fontSize: 10, opacity: 0.4 },
});
