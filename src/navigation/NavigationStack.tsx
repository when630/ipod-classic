import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated as RNAnimated, Easing } from 'react-native';
import { useNavigation } from './NavigationContext';
import { useLibraryStore } from '@/stores/useLibraryStore';
import { dimensions } from '@/theme/dimensions';
import { formatTime } from '@/utils/formatTime';
import { MenuScreen, MAIN_MENU_ITEMS } from '@/components/screens/MenuScreen';
import { NowPlayingScreen } from '@/components/screens/NowPlayingScreen';
import { CoverFlowScreen } from '@/components/screens/CoverFlowScreen';
import { AboutScreen } from '@/components/screens/AboutScreen';
import { ClockScreen } from '@/components/screens/ClockScreen';
import { StopwatchScreen } from '@/components/screens/StopwatchScreen';
import { GamesScreen } from '@/components/screens/GamesScreen';
import { ContactsScreen, CONTACTS_LIST } from '@/components/screens/ContactsScreen';
import { PhotoLibraryScreen } from '@/components/screens/PhotoLibraryScreen';
import { SlideshowScreen } from '@/components/screens/SlideshowScreen';
import {
  VideoListScreen,
  MOCK_MOVIES,
  MOCK_MUSIC_VIDEOS,
  MOCK_TV_SHOWS,
} from '@/components/screens/VideoListScreen';
import { VideoPlayerScreen } from '@/components/screens/VideoPlayerScreen';
import { ScreenLockScreen } from '@/components/screens/ScreenLockScreen';
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

const PHOTOS_MENU_ITEMS: MenuItemData[] = [
  { id: 'slideshows', label: 'Slideshows' },
  { id: 'photo_library', label: 'Photo Library' },
];

const SLIDESHOWS_ITEMS: MenuItemData[] = [
  { id: 'slideshow_all', label: 'All Photos' },
  { id: 'slideshow_albums', label: 'Albums' },
];

const VIDEOS_MENU_ITEMS: MenuItemData[] = [
  { id: 'movies', label: 'Movies' },
  { id: 'music_videos', label: 'Music Videos' },
  { id: 'tv_shows', label: 'TV Shows' },
  { id: 'video_playlists', label: 'Video Playlists', hasChildren: false },
];

const VIDEO_PLAYLISTS_ITEMS: MenuItemData[] = [
  { id: 'vp1', label: 'Recently Added', hasChildren: false },
  { id: 'vp2', label: 'Favorites', hasChildren: false },
];

const EXTRAS_MENU_ITEMS: MenuItemData[] = [
  { id: 'clock', label: 'Clock' },
  { id: 'stopwatch', label: 'Stopwatch' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'games', label: 'Games' },
  { id: 'screen_lock', label: 'Screen Lock' },
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
    case 'Photos':
      return PHOTOS_MENU_ITEMS;
    case 'Slideshows':
      return SLIDESHOWS_ITEMS;
    case 'Videos':
      return VIDEOS_MENU_ITEMS;
    case 'MoviesList':
      return MOCK_MOVIES.map((v) => ({ id: v.id, label: v.title, value: v.duration, hasChildren: false }));
    case 'MusicVideosList':
      return MOCK_MUSIC_VIDEOS.map((v) => ({ id: v.id, label: v.title, value: v.duration, hasChildren: false }));
    case 'TVShowsList':
      return MOCK_TV_SHOWS.map((v) => ({ id: v.id, label: v.title, value: v.duration, hasChildren: false }));
    case 'VideoPlaylists':
      return VIDEO_PLAYLISTS_ITEMS;
    case 'Extras':
      return EXTRAS_MENU_ITEMS;
    case 'Settings':
      return getSettingsItems();
    case 'Artists':
      return artists.map((a) => ({ id: a.id, label: a.name, value: `${a.albumCount}` }));
    case 'Albums': {
      const artistId = params?.artistId as string | undefined;
      const list = artistId ? getAlbumsByArtist(artistId) : albums;
      return list.map((a) => ({ id: a.id, label: a.title, value: `${a.year}` }));
    }
    case 'Songs': {
      const albumId = params?.albumId as string | undefined;
      const list = albumId ? getSongsByAlbum(albumId) : songs;
      return list.map((s) => ({ id: s.id, label: s.title, value: formatTime(s.duration), hasChildren: false }));
    }
    case 'CoverFlow':
      return albums.map((a) => ({ id: a.id, label: a.title, hasChildren: true }));
    case 'Contacts':
      return CONTACTS_LIST.map((c) => ({ id: c.id, label: c.name, hasChildren: false }));
    case 'ThemeSelect':
      return Object.entries(themes).map(([key, t]) => ({ id: key, label: t.name, hasChildren: false }));
    default:
      return [];
  }
}

function getScreenTitle(route: Route, params?: Record<string, unknown>): string {
  const { artists, albums } = useLibraryStore.getState();

  switch (route) {
    case 'MainMenu':        return 'iPod';
    case 'Music':           return 'Music';
    case 'Photos':          return 'Photos';
    case 'PhotoLibrary':    return 'Photo Library';
    case 'Slideshows':      return 'Slideshows';
    case 'SlideshowPlay':   return 'Slideshow';
    case 'Videos':          return 'Videos';
    case 'MoviesList':      return 'Movies';
    case 'MusicVideosList': return 'Music Videos';
    case 'TVShowsList':     return 'TV Shows';
    case 'VideoPlaylists':  return 'Video Playlists';
    case 'VideoPlayer':     return 'Now Playing';
    case 'Extras':          return 'Extras';
    case 'Settings':        return 'Settings';
    case 'Artists':         return 'Artists';
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
    case 'NowPlaying':      return 'Now Playing';
    case 'CoverFlow':       return 'Cover Flow';
    case 'Clock':           return 'Clock';
    case 'Stopwatch':       return 'Stopwatch';
    case 'Games':           return 'Games';
    case 'Contacts':        return 'Contacts';
    case 'ScreenLock':      return 'Screen Lock';
    case 'ThemeSelect':     return 'Theme';
    case 'About':           return 'About';
    default:                return '';
  }
}

// Helper to find a video by ID across all lists
function findVideo(id: string) {
  return [...MOCK_MOVIES, ...MOCK_MUSIC_VIDEOS, ...MOCK_TV_SHOWS].find((v) => v.id === id);
}

function renderScreen(
  route: Route,
  title: string,
  items: MenuItemData[],
  selectedIndex: number,
  params?: Record<string, unknown>,
) {
  switch (route) {
    case 'NowPlaying':
      return <NowPlayingScreen />;
    case 'CoverFlow':
      return <CoverFlowScreen selectedIndex={selectedIndex} />;
    case 'Clock':
      return <ClockScreen />;
    case 'Stopwatch':
      return <StopwatchScreen />;
    case 'Games':
      return <GamesScreen />;
    case 'About':
      return <AboutScreen />;
    case 'PhotoLibrary':
      return <PhotoLibraryScreen />;
    case 'SlideshowPlay':
      return <SlideshowScreen />;
    case 'ScreenLock':
      return <ScreenLockScreen />;
    case 'VideoPlayer': {
      const videoTitle = (params?.videoTitle as string) ?? 'Video';
      const videoDuration = (params?.videoDuration as string) ?? '0:00';
      return <VideoPlayerScreen title={videoTitle} duration={videoDuration} />;
    }
    case 'MoviesList':
      return <VideoListScreen title="Movies" videos={MOCK_MOVIES} selectedIndex={selectedIndex} />;
    case 'MusicVideosList':
      return <VideoListScreen title="Music Videos" videos={MOCK_MUSIC_VIDEOS} selectedIndex={selectedIndex} />;
    case 'TVShowsList':
      return <VideoListScreen title="TV Shows" videos={MOCK_TV_SHOWS} selectedIndex={selectedIndex} />;
    default:
      return <MenuScreen title={title} items={items} selectedIndex={selectedIndex} />;
  }
}

export function NavigationStack() {
  const { currentRoute, direction } = useNavigation();
  const slideAnim = useRef(new RNAnimated.Value(0)).current;
  const prevRouteRef = useRef(currentRoute.key);

  const loadLibrary = useLibraryStore((s) => s.loadLibrary);
  useEffect(() => { loadLibrary(); }, [loadLibrary]);

  useEffect(() => {
    if (prevRouteRef.current !== currentRoute.key) {
      const fromValue = direction === 'push' ? 1 : -1;
      slideAnim.setValue(fromValue);
      RNAnimated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
        mass: 0.8,
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
      <RNAnimated.View style={[styles.screen, { transform: [{ translateX }] }]}>
        {renderScreen(currentRoute.route, title, items, currentRoute.selectedIndex, currentRoute.params)}
      </RNAnimated.View>
    </View>
  );
}

export { findVideo };

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  screen: { flex: 1 },
});
