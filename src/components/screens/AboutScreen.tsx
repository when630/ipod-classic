import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { useLibraryStore } from '@/stores/useLibraryStore';
import { usePlayerStore } from '@/stores/usePlayerStore';

export function AboutScreen() {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const { artists, albums, songs } = useLibraryStore();
  const isModern = uiStyle === 'modern';
  const m = theme.modern;

  const bg = isModern ? m.background : theme.screen.background;
  const textColor = isModern ? m.text : theme.screen.text;
  const secondaryColor = isModern ? m.secondaryText : theme.screen.text;

  const rows = [
    { label: 'Songs', value: `${songs.length}` },
    { label: 'Albums', value: `${albums.length}` },
    { label: 'Artists', value: `${artists.length}` },
    { label: 'Version', value: '1.0.0' },
    { label: 'Model', value: 'iPod Classic' },
    { label: 'Serial', value: 'RN-2026-EXPO' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <IPodStatusBar title="About" isPlaying={isPlaying} />
      {!isModern && <View style={styles.divider} />}
      <View style={[styles.content, isModern && styles.modernContent]}>
        {rows.map((row) => (
          <View key={row.label} style={[styles.row, isModern && { backgroundColor: m.groupedBackground, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 }]}>
            <Text style={[styles.label, { color: textColor }, isModern && { fontSize: 13 }]}>{row.label}</Text>
            <Text style={[styles.value, { color: secondaryColor }, isModern && { fontSize: 13 }]}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.2)' },
  content: { padding: 10, gap: 6 },
  modernContent: { padding: 8, gap: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 12, fontWeight: '600' },
  value: { fontSize: 12, opacity: 0.7 },
});
