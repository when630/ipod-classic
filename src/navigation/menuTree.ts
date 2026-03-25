import type { Route } from './types';

/**
 * Maps a menu item ID to the route it should navigate to.
 * Items with dynamic IDs (artist IDs, album IDs) are handled in getRouteForItem.
 */
const staticRouteMap: Record<string, Route> = {
  // Main Menu
  music: 'Music',
  settings: 'Settings',
  now_playing: 'NowPlaying',

  // Music sub-menu
  cover_flow: 'CoverFlow',
  artists: 'Artists',
  albums: 'Albums',
  songs: 'Songs',

  // Settings sub-menu
  about: 'About',
  theme: 'ThemeSelect',
};

/**
 * Given a menu item ID and the current route, determine the target route and params.
 * Returns null if the item doesn't navigate anywhere.
 */
export function getRouteForItem(
  itemId: string,
  currentRoute: Route
): { route: Route; params?: Record<string, unknown> } | null {
  // Static routes
  if (staticRouteMap[itemId]) {
    return { route: staticRouteMap[itemId] };
  }

  // Dynamic routes based on context
  switch (currentRoute) {
    case 'Artists':
      // Item ID is an artist ID → show their albums
      return { route: 'Albums', params: { artistId: itemId } };
    case 'Albums':
      // Item ID is an album ID → show its songs
      return { route: 'Songs', params: { albumId: itemId } };
    default:
      return null;
  }
}
