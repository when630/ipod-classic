import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useTheme } from '@/theme/ThemeContext';
import { usePlayerStore } from '@/stores/usePlayerStore';

interface VideoPlayerScreenProps {
  title: string;
  duration: string;
}

function parseDuration(d: string): number {
  const parts = d.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

export function VideoPlayerScreen({ title, duration }: VideoPlayerScreenProps) {
  const { theme } = useTheme();
  const isPlayingMusic = usePlayerStore((s) => s.isPlaying);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(true);
  const totalSeconds = parseDuration(duration);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setPosition((p) => {
        if (p >= totalSeconds) { setPlaying(false); return p; }
        return p + 0.5;
      });
    }, 500);
    return () => clearInterval(timer);
  }, [playing, totalSeconds]);

  // Expose toggle for Play/Pause button
  useEffect(() => {
    (globalThis as any).__videoPlayer = {
      toggle: () => setPlaying((p) => !p),
    };
    return () => { delete (globalThis as any).__videoPlayer; };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: '#1A1A1A' }]}>
      <IPodStatusBar title="Now Playing" isPlaying={isPlayingMusic} />
      <View style={styles.content}>
        <View style={styles.videoArea}>
          <Ionicons
            name={playing ? 'film-outline' : 'pause-circle-outline'}
            size={40}
            color="rgba(255,255,255,0.2)"
          />
        </View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <ProgressBar position={position} duration={totalSeconds} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 6, paddingBottom: 8 },
  videoArea: {
    width: '85%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: '#fff', fontSize: 11, fontWeight: '600', paddingHorizontal: 10 },
});
