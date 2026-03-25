import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { IPodShell } from '@/components/hardware/IPodShell';
import { LCDScreen } from '@/components/hardware/LCDScreen';
import { ClickWheel } from '@/components/hardware/ClickWheel';
import { ClickWheelGesture } from '@/components/hardware/ClickWheelGesture';
import { NavigationProvider, useNavigation } from '@/navigation/NavigationContext';
import { NavigationStack, getMenuItemsForRoute } from '@/navigation/NavigationStack';
import { getRouteForItem } from '@/navigation/menuTree';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useLibraryStore } from '@/stores/useLibraryStore';
import { useTheme } from '@/theme/ThemeContext';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { findVideo } from '@/navigation/NavigationStack';
import type { WheelTapZone } from '@/types';

function IPodDevice() {
  const { currentRoute, push, pop, popToRoot, setSelectedIndex } = useNavigation();
  const { togglePlayPause, next, previous, adjustVolume, currentTrack } = usePlayerStore();
  const { setThemeKey } = useTheme();

  const handleScroll = useCallback(
    (direction: 'up' | 'down') => {
      // On NowPlaying screen, scroll = volume
      if (currentRoute.route === 'NowPlaying') {
        adjustVolume(direction === 'up' ? 0.05 : -0.05);
        return;
      }

      // Games: scroll = change snake direction
      if (currentRoute.route === 'Games') {
        if (direction === 'up') (globalThis as any).__snake?.up();
        else (globalThis as any).__snake?.down();
        return;
      }

      const items = getMenuItemsForRoute(currentRoute.route, currentRoute.params);
      const count = items.length;
      if (count === 0) return;
      setSelectedIndex(
        direction === 'up'
          ? Math.max(0, currentRoute.selectedIndex - 1)
          : Math.min(count - 1, currentRoute.selectedIndex + 1)
      );
    },
    [currentRoute, setSelectedIndex, adjustVolume]
  );

  const handleTap = useCallback(
    (zone: WheelTapZone) => {
      switch (zone) {
        case 'select': {
          // Stopwatch: select = lap/reset
          if (currentRoute.route === 'Stopwatch') {
            (globalThis as any).__stopwatch?.lapOrReset();
            return;
          }
          // Games: select = restart when game over
          if (currentRoute.route === 'Games') {
            (globalThis as any).__snake?.restart();
            return;
          }

          // Video lists: select = play video
          if (currentRoute.route === 'MoviesList' || currentRoute.route === 'MusicVideosList' || currentRoute.route === 'TVShowsList') {
            const items = getMenuItemsForRoute(currentRoute.route, currentRoute.params);
            const selected = items[currentRoute.selectedIndex];
            if (selected) {
              const video = findVideo(selected.id);
              if (video) {
                push('VideoPlayer', { videoTitle: video.title, videoDuration: video.duration });
              }
            }
            return;
          }

          // Settings toggles (shuffle, repeat)
          if (currentRoute.route === 'Settings') {
            const items = getMenuItemsForRoute(currentRoute.route, currentRoute.params);
            const selected = items[currentRoute.selectedIndex];
            if (!selected) return;
            if (selected.id === 'shuffle') {
              usePlayerStore.getState().toggleShuffle();
              return;
            }
            if (selected.id === 'repeat') {
              usePlayerStore.getState().cycleRepeat();
              return;
            }
          }

          // Main menu special items
          if (currentRoute.route === 'MainMenu') {
            const items = getMenuItemsForRoute(currentRoute.route, currentRoute.params);
            const selected = items[currentRoute.selectedIndex];
            if (selected?.id === 'shuffle') {
              // Shuffle all songs and start playing
              const allSongs = useLibraryStore.getState().songs;
              if (allSongs.length > 0) {
                const shuffled = [...allSongs].sort(() => Math.random() - 0.5);
                usePlayerStore.getState().playTrack(shuffled[0], shuffled, 0);
                push('NowPlaying');
              }
              return;
            }
            if (selected?.id === 'now_playing') {
              if (currentTrack) {
                push('NowPlaying');
              }
              return;
            }
          }

          // Music menu "Now Playing"
          if (currentRoute.route === 'Music') {
            const items = getMenuItemsForRoute(currentRoute.route, currentRoute.params);
            const selected = items[currentRoute.selectedIndex];
            if (selected?.id === 'now_playing') {
              if (currentTrack) {
                push('NowPlaying');
              }
              return;
            }
          }

          // ThemeSelect → apply theme
          if (currentRoute.route === 'ThemeSelect') {
            const items = getMenuItemsForRoute(currentRoute.route, currentRoute.params);
            const selected = items[currentRoute.selectedIndex];
            if (selected) {
              setThemeKey(selected.id);
            }
            return;
          }

          // On CoverFlow, select → album songs
          if (currentRoute.route === 'CoverFlow') {
            const albums = useLibraryStore.getState().albums;
            const album = albums[currentRoute.selectedIndex];
            if (album) {
              push('Songs', { albumId: album.id });
            }
            return;
          }

          // On Songs screen, selecting a song starts playback
          if (currentRoute.route === 'Songs') {
            const items = getMenuItemsForRoute(currentRoute.route, currentRoute.params);
            const selected = items[currentRoute.selectedIndex];
            if (!selected) return;

            // Get the full song list for the queue
            const albumId = currentRoute.params?.albumId as string | undefined;
            const songs = albumId
              ? useLibraryStore.getState().getSongsByAlbum(albumId)
              : useLibraryStore.getState().songs;
            const songIndex = songs.findIndex((s) => s.id === selected.id);
            if (songIndex >= 0) {
              usePlayerStore.getState().playTrack(songs[songIndex], songs, songIndex);
              push('NowPlaying');
            }
            return;
          }

          const items = getMenuItemsForRoute(currentRoute.route, currentRoute.params);
          const selected = items[currentRoute.selectedIndex];
          if (!selected) return;
          const target = getRouteForItem(selected.id, currentRoute.route);
          if (target) {
            push(target.route, target.params);
          }
          break;
        }
        case 'menu':
          pop();
          break;
        case 'play_pause':
          if (currentRoute.route === 'VideoPlayer') {
            (globalThis as any).__videoPlayer?.toggle();
          } else if (currentRoute.route === 'Stopwatch') {
            (globalThis as any).__stopwatch?.toggle();
          } else if (currentRoute.route === 'Games') {
            (globalThis as any).__snake?.togglePause();
          } else if (currentTrack) {
            togglePlayPause();
          }
          break;
        case 'forward':
          if (currentRoute.route === 'Games') {
            (globalThis as any).__snake?.right();
          } else if (currentTrack) {
            next();
          }
          break;
        case 'back':
          if (currentRoute.route === 'Games') {
            (globalThis as any).__snake?.left();
          } else if (currentTrack) {
            previous();
          }
          break;
      }
    },
    [currentRoute, push, pop, currentTrack, togglePlayPause, next, previous]
  );

  const handleHold = useCallback(
    (zone: WheelTapZone) => {
      if (zone === 'menu') {
        popToRoot();
      }
    },
    [popToRoot]
  );

  // Web: keyboard arrow keys / Enter / Escape / Space
  useKeyboardControls({ onScroll: handleScroll, onTap: handleTap });

  return (
    <View style={styles.container}>
      <IPodShell>
        <LCDScreen>
          <NavigationStack />
        </LCDScreen>
        <ClickWheel />
        <ClickWheelGesture
          onScroll={handleScroll}
          onTap={handleTap}
          onHold={handleHold}
        />
      </IPodShell>
    </View>
  );
}

export function IPodApp() {
  return (
    <NavigationProvider>
      <IPodDevice />
    </NavigationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A2E',
  },
});
