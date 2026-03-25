import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { usePlayerStore } from '@/stores/usePlayerStore';

function photoColor(i: number): string {
  const hues = [200, 340, 120, 45, 280, 170, 20, 60, 310, 90, 230, 10, 150, 260, 50, 190];
  return `hsl(${hues[i % hues.length]}, 50%, 55%)`;
}

const PHOTOS = Array.from({ length: 16 }, (_, i) => ({ id: `photo-${i}`, color: photoColor(i) }));

export function PhotoLibraryScreen() {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const isModern = uiStyle === 'modern';
  const bg = isModern ? theme.modern.background : theme.screen.background;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <IPodStatusBar title="Photo Library" isPlaying={isPlaying} />
      {!isModern && <View style={styles.divider} />}
      <View style={[styles.grid, isModern && { gap: 2, padding: 2 }]}>
        {PHOTOS.map((photo) => (
          <View key={photo.id} style={[styles.thumb, { backgroundColor: photo.color }, isModern && { borderRadius: 4 }]}>
            <Ionicons name="image-outline" size={14} color="rgba(255,255,255,0.4)" />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.2)' },
  grid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 4, gap: 3, alignContent: 'flex-start' },
  thumb: { width: '23%', aspectRatio: 1, borderRadius: 2, alignItems: 'center', justifyContent: 'center' },
});
