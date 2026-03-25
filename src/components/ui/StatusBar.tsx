import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { typography } from '@/theme/typography';

interface StatusBarProps {
  title: string;
  isPlaying?: boolean;
  batteryLevel?: number;
}

export function IPodStatusBar({ title, isPlaying = false, batteryLevel = 100 }: StatusBarProps) {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);

  if (uiStyle === 'modern') {
    const m = theme.modern;
    return (
      <View style={[styles.modernContainer, { backgroundColor: m.secondaryBackground }]}>
        <View style={styles.modernLeft}>
          {isPlaying && (
            <Ionicons name="play" size={9} color={m.accent} />
          )}
        </View>
        <Text style={[styles.modernTitle, { color: m.text }]} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.modernRight}>
          <Ionicons
            name={batteryLevel! > 50 ? 'battery-full' : 'battery-half'}
            size={16}
            color={m.secondaryText}
          />
        </View>
      </View>
    );
  }

  // Classic style
  return (
    <View style={[styles.container, { backgroundColor: theme.screen.statusBar }]}>
      <View style={styles.left}>
        {isPlaying && (
          <Ionicons name="play" size={8} color={theme.screen.statusBarText} />
        )}
      </View>
      <Text style={[styles.title, { color: theme.screen.statusBarText }]} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.right}>
        <Ionicons
          name={batteryLevel! > 50 ? 'battery-full' : 'battery-half'}
          size={14}
          color={theme.screen.statusBarText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Classic
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    height: 18,
  },
  left: { width: 14, alignItems: 'flex-start' },
  title: { ...typography.statusBar, flex: 1, textAlign: 'center' },
  right: { width: 20, alignItems: 'flex-end' },
  // Modern
  modernContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 22,
  },
  modernLeft: { width: 16, alignItems: 'flex-start' },
  modernTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  modernRight: { width: 22, alignItems: 'flex-end' },
});
