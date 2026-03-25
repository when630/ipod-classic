import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { VolumeBar } from '@/components/ui/VolumeBar';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { usePlayerStore } from '@/stores/usePlayerStore';

export function NowPlayingScreen() {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const { currentTrack, isPlaying, position, duration, volume, shuffleMode, repeatMode } =
    usePlayerStore();

  if (!currentTrack) {
    const bg = uiStyle === 'modern' ? theme.modern.background : theme.screen.background;
    const textColor = uiStyle === 'modern' ? theme.modern.secondaryText : theme.screen.text;
    return (
      <View style={[styles.container, { backgroundColor: bg }]}>
        <IPodStatusBar title="Now Playing" />
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: textColor }]}>No track selected</Text>
        </View>
      </View>
    );
  }

  if (uiStyle === 'modern') {
    const m = theme.modern;
    return (
      <View style={[styles.container, { backgroundColor: m.background }]}>
        <IPodStatusBar title="Now Playing" isPlaying={isPlaying} />

        <View style={styles.modernContent}>
          {/* Album art — centered, takes up space */}
          <View style={styles.modernArtArea}>
            <View style={[styles.modernAlbumArt, { backgroundColor: m.secondaryBackground }]}>
              <Ionicons name="musical-notes" size={36} color={m.accent + '40'} />
            </View>
          </View>

          {/* Track info + progress + volume stacked at bottom */}
          <View style={styles.modernBottom}>
            <View style={styles.modernTrackInfo}>
              <Text style={[styles.modernTitle, { color: m.text }]} numberOfLines={1}>
                {currentTrack.title}
              </Text>
              <Text style={[styles.modernArtist, { color: m.secondaryText }]} numberOfLines={1}>
                {currentTrack.artistName} — {currentTrack.albumTitle}
              </Text>
            </View>
            <ProgressBar position={position} duration={duration} />
            {(shuffleMode || repeatMode !== 'off') && (
              <View style={styles.modernIcons}>
                {shuffleMode && <Ionicons name="shuffle" size={11} color={m.accent} />}
                {repeatMode !== 'off' && <Ionicons name="repeat" size={11} color={m.accent} />}
              </View>
            )}
            <VolumeBar volume={volume} />
          </View>
        </View>
      </View>
    );
  }

  // Classic style
  return (
    <View style={[styles.container, { backgroundColor: theme.screen.background }]}>
      <IPodStatusBar title="Now Playing" isPlaying={isPlaying} />
      <View style={styles.divider} />

      <View style={styles.content}>
        {/* Top: album art + track info */}
        <View style={styles.topSection}>
          <Text style={[styles.trackCount, { color: theme.screen.text }]}>
            {currentTrack.trackNumber} of {usePlayerStore.getState().queue.length}
          </Text>
          <View style={[styles.albumArt, { backgroundColor: theme.screen.text + '15' }]}>
            <Ionicons name="musical-notes" size={28} color={theme.screen.text + '40'} />
          </View>
          <Text style={[styles.title, { color: theme.screen.text }]} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={[styles.artist, { color: theme.screen.text }]} numberOfLines={1}>
            {currentTrack.artistName} — {currentTrack.albumTitle}
          </Text>
        </View>

        {/* Bottom: progress + indicators + volume packed tight */}
        <View style={styles.classicBottom}>
          <ProgressBar position={position} duration={duration} />
          {(shuffleMode || repeatMode !== 'off') && (
            <View style={styles.indicators}>
              {shuffleMode && <Ionicons name="shuffle" size={10} color={theme.screen.text} />}
              {repeatMode === 'one' && (
                <View style={styles.indicatorRow}>
                  <Ionicons name="repeat" size={10} color={theme.screen.text} />
                  <Text style={[styles.indicatorText, { color: theme.screen.text }]}>1</Text>
                </View>
              )}
              {repeatMode === 'all' && <Ionicons name="repeat" size={10} color={theme.screen.text} />}
            </View>
          )}
          <VolumeBar volume={volume} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.2)' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 12, opacity: 0.5 },

  // Classic
  content: { flex: 1, paddingTop: 3, paddingBottom: 5, justifyContent: 'space-between' },
  topSection: { alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' },
  trackCount: { fontSize: 9, opacity: 0.6 },
  albumArt: { width: 55, height: 55, borderRadius: 3, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 12, fontWeight: '700', textAlign: 'center', paddingHorizontal: 10 },
  artist: { fontSize: 10, opacity: 0.7, textAlign: 'center', paddingHorizontal: 10 },
  classicBottom: { gap: 3 },
  indicators: { flexDirection: 'row', justifyContent: 'center', gap: 8, height: 12, alignItems: 'center' },
  indicatorRow: { flexDirection: 'row', alignItems: 'center', gap: 1 },
  indicatorText: { fontSize: 8, fontWeight: '600' },

  // Modern
  modernContent: { flex: 1, paddingBottom: 5 },
  modernArtArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modernAlbumArt: {
    width: 100,
    height: 100,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modernTrackInfo: { alignItems: 'center', paddingHorizontal: 10, marginBottom: 2 },
  modernTitle: { fontSize: 13, fontWeight: '700', letterSpacing: -0.3, textAlign: 'center' },
  modernArtist: { fontSize: 10, textAlign: 'center' },
  modernBottom: {
    gap: 3,
  },
  modernIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 14,
  },
});
