import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated as RNAnimated } from 'react-native';
import { useNavigation } from './NavigationContext';
import { useLibraryStore } from '@/stores/useLibraryStore';
import { dimensions } from '@/theme/dimensions';
import { formatTime } from '@/utils/formatTime';
import { MenuScreen, MAIN_MENU_ITEMS } from '@/components/screens/MenuScreen';
import { NowPlayingScreen } from '@/components/screens/NowPlayingScreen';
import { CoverFlowScreen } from '@/components/screens/CoverFlowScreen';
import { AboutScreen } from '@/components/screens/AboutScreen';
import { themes } from '@/theme/colors';
import { usePlayerStore } from '@/stores/usePlayerStore';
import type { MenuItemData } from '@/components/screens/MenuScreen';
import type { Route } from './types';

const MUSIC_MENU_ITEMS: MenuItemData[] = [
  { id: 'cover_flow', label: 'Cover Flow' },
  { id: 'artists', label: 'Artists' },
  { id: 'albums', label: 'Albums' },
  { id: 'songs', label: 'Songs' },
  { id: 'now_playing', label: 'Now Playing' },
];

function getSettingsItems(): MenuItemData[] {
  const { shuffleMode, repeatMode } = usePlayerStore.getState();
  return [
    { id: 'about', label: 'About' },
    { id: 'theme', label: 'Theme' },
    { id: 'shuffle', label: 'Shuffle', value: shuffleMode ? 'On' : 'Off', hasChildren: false },
    { id: 'repeat', label: 'Repeat', value: repeatMode === 'off' ? 'Off' : repeatMode === 'all' ? 'All' : 'One', hasChildren: false },
  ];
}

/** Get menu items for a given route (used by IPodApp to know item count) */
export function getMenuItemsForRoute(
  route: Route,
  params?: Record<string, unknown>
): MenuItemData[] {
  const { artists, albums, songs, getAlbumsByArtist, getSongsByAlbum } =
    useLibraryStore.getState();

  switch (route) {
    case 'MainMenu':
      return MAIN_MENU_ITEMS;
    case 'Music':
      return MUSIC_MENU_ITEMS;
    case 'Settings':
      return getSettingsItems();
    case 'Artists':
      return artists.map((a) => ({
        id: a.id,
        label: a.name,
        value: `${a.albumCount}`,
      }));
    case 'Albums': {
      const artistId = params?.artistId as string | undefined;
      const list = artistId ? getAlbumsByArtist(artistId) : albums;
      return list.map((a) => ({
        id: a.id,
        label: a.title,
        value: `${a.year}`,
      }));
    }
    case 'Songs': {
      const albumId = params?.albumId as string | undefined;
      const list = albumId ? getSongsByAlbum(albumId) : songs;
      return list.map((s) => ({
        id: s.id,
        label: s.title,
        value: formatTime(s.duration),
        hasChildren: false,
      }));
    }
    case 'CoverFlow':
      // Return albums so IPodApp knows the item count for scroll bounds
      return albums.map((a) => ({
        id: a.id,
        label: a.title,
        hasChildren: true,
      }));
    case 'ThemeSelect':
      return Object.entries(themes).map(([key, t]) => ({
        id: key,
        label: t.name,
        hasChildren: false,
      }));
    default:
      return [];
  }
}

function getScreenTitle(route: Route, params?: Record<string, unknown>): string {
  const { artists, albums } = useLibraryStore.getState();

  switch (route) {
    case 'MainMenu':
      return 'iPod';
    case 'Music':
      return 'Music';
    case 'Settings':
      return 'Settings';
    case 'Artists':
      return 'Artists';
    case 'Albums': {
      const artistId = params?.artistId as string | undefined;
      if (artistId) {
        const artist = artists.find((a) => a.id === artistId);
        return artist?.name ?? 'Albums';
      }
      return 'Albums';
    }
    case 'Songs': {
      const albumId = params?.albumId as string | undefined;
      if (albumId) {
        const album = albums.find((a) => a.id === albumId);
        return album?.title ?? 'Songs';
      }
      return 'Songs';
    }
    case 'NowPlaying':
      return 'Now Playing';
    case 'CoverFlow':
      return 'Cover Flow';
    case 'ThemeSelect':
      return 'Theme';
    case 'About':
      return 'About';
    default:
      return '';
  }
}

function renderScreen(
  route: Route,
  title: string,
  items: MenuItemData[],
  selectedIndex: number,
) {
  switch (route) {
    case 'NowPlaying':
      return <NowPlayingScreen />;
    case 'CoverFlow':
      return <CoverFlowScreen selectedIndex={selectedIndex} />;
    case 'About':
      return <AboutScreen />;
    default:
      return <MenuScreen title={title} items={items} selectedIndex={selectedIndex} />;
  }
}

export function NavigationStack() {
  const { currentRoute, direction } = useNavigation();
  const slideAnim = useRef(new RNAnimated.Value(0)).current;
  const prevRouteRef = useRef(currentRoute.key);

  // Load library on mount
  const loadLibrary = useLibraryStore((s) => s.loadLibrary);
  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  useEffect(() => {
    if (prevRouteRef.current !== currentRoute.key) {
      const fromValue = direction === 'push' ? 1 : -1;
      slideAnim.setValue(fromValue);
      RNAnimated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
      prevRouteRef.current = currentRoute.key;
    }
  }, [currentRoute.key, direction, slideAnim]);

  const items = getMenuItemsForRoute(currentRoute.route, currentRoute.params);
  const title = getScreenTitle(currentRoute.route, currentRoute.params);

  const translateX = slideAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-dimensions.lcd.width, 0, dimensions.lcd.width],
  });

  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.screen,
          { transform: [{ translateX }] },
        ]}
      >
        {renderScreen(currentRoute.route, title, items, currentRoute.selectedIndex)}
      </RNAnimated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  screen: {
    flex: 1,
  },
});
