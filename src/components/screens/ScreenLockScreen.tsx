import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';

export function ScreenLockScreen() {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const isModern = uiStyle === 'modern';
  const m = theme.modern;

  const bg = isModern ? m.background : theme.screen.background;
  const textColor = isModern ? m.text : theme.screen.text;
  const subColor = isModern ? m.secondaryText : theme.screen.text;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.content}>
        <Ionicons name="lock-closed" size={32} color={isModern ? m.accent + '50' : textColor + '40'} />
        <Text style={[styles.text, { color: textColor }]}>Screen Locked</Text>
        <Text style={[styles.hint, { color: subColor }]}>Press MENU to unlock</Text>
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
