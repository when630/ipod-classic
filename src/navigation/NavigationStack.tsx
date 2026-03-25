import React, { useEffect, useRef, useState } from 'react';
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
import type { Route, RouteEntry } from './types';

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
  const { useUIStore } = require('@/stores/useUIStore');
  const uiStyle = useUIStore.getState().uiStyle;
  return [
    { id: 'about', label: 'About' },
    { id: 'theme', label: 'Theme' },
    { id: 'ui_style', label: 'UI Style', value: uiStyle === 'modern' ? 'Modern' : 'Classic' },
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
    case 'UIStyleSelect':
      return [
        { id: 'classic', label: 'Classic', hasChildren: false },
        { id: 'modern', label: 'Modern iOS', hasChildren: false },
      ];
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
    case 'UIStyleSelect':   return 'UI Style';
    case 'About':           return 'About';
    default:                return '';
  }
}

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

function renderRouteEntry(entry: RouteEntry) {
  const items = getMenuItemsForRoute(entry.route, entry.params);
  const title = getScreenTitle(entry.route, entry.params);
  return renderScreen(entry.route, title, items, entry.selectedIndex, entry.params);
}

const ANIM_DURATION = 280;
const lcdWidth = dimensions.lcd.width;

export function NavigationStack() {
  const { currentRoute, direction, prevRoute, clearPrevRoute } = useNavigation();
  const slideAnim = useRef(new RNAnimated.Value(1)).current;
  const lastKeyRef = useRef(currentRoute.key);
  const frozenPrevRef = useRef<RouteEntry | null>(null);
  const frozenDirRef = useRef<'push' | 'pop'>('push');
  const [, forceRender] = useState(0);

  const loadLibrary = useLibraryStore((s) => s.loadLibrary);
  useEffect(() => { loadLibrary(); }, [loadLibrary]);

  // Detect route change DURING RENDER — before JSX is returned
  // This ensures the first frame already has the transition set up
  if (lastKeyRef.current !== currentRoute.key && prevRoute) {
    slideAnim.stopAnimation();
    frozenPrevRef.current = prevRoute;
    frozenDirRef.current = direction;
    lastKeyRef.current = currentRoute.key;
    slideAnim.setValue(0);
  } else if (lastKeyRef.current !== currentRoute.key) {
    lastKeyRef.current = currentRoute.key;
  }

  // Start the animation after render (useEffect), but the visual state
  // is already correct from the synchronous setup above
  useEffect(() => {
    if (frozenPrevRef.current !== null) {
      RNAnimated.timing(slideAnim, {
        toValue: 1,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        frozenPrevRef.current = null;
        clearPrevRoute();
        forceRender((n) => n + 1);
      });
    }
  }, [currentRoute.key]);

  const frozenPrev = frozenPrevRef.current;
  const isPush = frozenDirRef.current === 'push';
  const isTransitioning = frozenPrev !== null;

  // Push: new screen slides in from right, old slides slightly left
  // Pop: old screen slides out to right, new revealed from slight left
  const incomingTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [lcdWidth, 0],
  });
  const outgoingTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -lcdWidth * 0.3],
  });
  const popOutTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, lcdWidth],
  });
  const popRevealTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-lcdWidth * 0.3, 0],
  });

  return (
    <View style={styles.container}>
      {/* Bottom layer */}
      {isTransitioning && (
        <RNAnimated.View
          style={[
            styles.screenAbsolute,
            { transform: [{ translateX: isPush ? outgoingTranslateX : popRevealTranslateX }] },
          ]}
        >
          {renderRouteEntry(isPush ? frozenPrev : currentRoute)}
        </RNAnimated.View>
      )}

      {/* Top layer — always rendered, always absolute */}
      <RNAnimated.View
        style={[
          styles.screenAbsolute,
          isTransitioning
            ? { transform: [{ translateX: isPush ? incomingTranslateX : popOutTranslateX }] }
            : undefined,
        ]}
      >
        {renderRouteEntry(isTransitioning && !isPush ? frozenPrev : currentRoute)}
      </RNAnimated.View>
    </View>
  );
}

export { findVideo };

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  screenAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
