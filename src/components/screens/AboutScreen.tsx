import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { useLibraryStore } from '@/stores/useLibraryStore';

export function AboutScreen() {
  const { theme } = useTheme();
  const { artists, albums, songs } = useLibraryStore();

  const rows = [
    { label: 'Songs', value: `${songs.length}` },
    { label: 'Albums', value: `${albums.length}` },
    { label: 'Artists', value: `${artists.length}` },
    { label: 'Version', value: '1.0.0' },
    { label: 'Model', value: 'iPod Classic' },
    { label: 'Serial', value: 'RN-2026-EXPO' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.screen.background }]}>
      <IPodStatusBar title="About" />
      <View style={styles.divider} />
      <View style={styles.content}>
        {rows.map((row) => (
          <View key={row.label} style={styles.row}>
            <Text style={[styles.label, { color: theme.screen.text }]}>{row.label}</Text>
            <Text style={[styles.value, { color: theme.screen.text }]}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  content: {
    padding: 10,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    opacity: 0.7,
  },
});
