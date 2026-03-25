import type { Route } from './types';

const staticRouteMap: Record<string, Route> = {
  // Main Menu
  music: 'Music',
  photos: 'Photos',
  videos: 'Videos',
  extras: 'Extras',
  settings: 'Settings',
  now_playing: 'NowPlaying',

  // Music sub-menu
  cover_flow: 'CoverFlow',
  artists: 'Artists',
  albums: 'Albums',
  songs: 'Songs',

  // Photos sub-menu
  slideshows: 'Slideshows',

  // Extras sub-menu
  clock: 'Clock',
  stopwatch: 'Stopwatch',
  contacts: 'Contacts',
  games: 'Games',

  // Settings sub-menu
  about: 'About',
  theme: 'ThemeSelect',
};

export function getRouteForItem(
  itemId: string,
  currentRoute: Route
): { route: Route; params?: Record<string, unknown> } | null {
  if (staticRouteMap[itemId]) {
    return { route: staticRouteMap[itemId] };
  }

  switch (currentRoute) {
    case 'Artists':
      return { route: 'Albums', params: { artistId: itemId } };
    case 'Albums':
      return { route: 'Songs', params: { albumId: itemId } };
    default:
      return null;
  }
}
