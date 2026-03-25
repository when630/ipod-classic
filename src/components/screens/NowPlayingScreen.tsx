import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { VolumeBar } from '@/components/ui/VolumeBar';
import { useTheme } from '@/theme/ThemeContext';
import { usePlayerStore } from '@/stores/usePlayerStore';

export function NowPlayingScreen() {
  const { theme } = useTheme();
  const { currentTrack, isPlaying, position, duration, volume, shuffleMode, repeatMode } =
    usePlayerStore();

  if (!currentTrack) {
    return (
      <View style={[styles.container, { backgroundColor: theme.screen.background }]}>
        <IPodStatusBar title="Now Playing" />
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: theme.screen.text }]}>
            No track selected
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.screen.background }]}>
      <IPodStatusBar title="Now Playing" isPlaying={isPlaying} />
      <View style={styles.divider} />

      <View style={styles.content}>
        {/* Track number & count */}
        <Text style={[styles.trackCount, { color: theme.screen.text }]}>
          {currentTrack.trackNumber} of {usePlayerStore.getState().queue.length}
        </Text>

        {/* Album art placeholder */}
        <View style={[styles.albumArt, { backgroundColor: theme.screen.text + '15' }]}>
          <Ionicons name="musical-notes" size={36} color={theme.screen.text + '40'} />
        </View>

        {/* Track info */}
        <Text style={[styles.title, { color: theme.screen.text }]} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text style={[styles.artist, { color: theme.screen.text }]} numberOfLines={1}>
          {currentTrack.artistName}
        </Text>
        <Text style={[styles.album, { color: theme.screen.text }]} numberOfLines={1}>
          {currentTrack.albumTitle}
        </Text>

        {/* Progress bar */}
        <ProgressBar position={position} duration={duration} />

        {/* Shuffle/Repeat indicators */}
        <View style={styles.indicators}>
          {shuffleMode && (
            <Ionicons name="shuffle" size={10} color={theme.screen.text} />
          )}
          {repeatMode === 'one' && (
            <View style={styles.indicatorRow}>
              <Ionicons name="repeat" size={10} color={theme.screen.text} />
              <Text style={[styles.indicatorText, { color: theme.screen.text }]}>1</Text>
            </View>
          )}
          {repeatMode === 'all' && (
            <Ionicons name="repeat" size={10} color={theme.screen.text} />
          )}
        </View>

        {/* Volume bar */}
        <VolumeBar volume={volume} />
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
    flex: 1,
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 6,
    justifyContent: 'space-between',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 12,
    opacity: 0.5,
  },
  trackCount: {
    fontSize: 9,
    opacity: 0.6,
  },
  albumArt: {
    width: 80,
    height: 80,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  artist: {
    fontSize: 11,
    opacity: 0.8,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginTop: -2,
  },
  album: {
    fontSize: 10,
    opacity: 0.6,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginTop: -2,
  },
  indicators: {
    flexDirection: 'row',
    gap: 8,
    height: 12,
    alignItems: 'center',
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  indicatorText: {
    fontSize: 8,
    fontWeight: '600',
  },
});
