export type Route =
  | 'MainMenu'
  | 'Music'
  | 'Artists'
  | 'Albums'
  | 'Songs'
  | 'NowPlaying'
  | 'CoverFlow'
  | 'Photos'
  | 'PhotoLibrary'
  | 'Slideshows'
  | 'SlideshowPlay'
  | 'Videos'
  | 'MoviesList'
  | 'MusicVideosList'
  | 'TVShowsList'
  | 'VideoPlaylists'
  | 'VideoPlayer'
  | 'Extras'
  | 'Clock'
  | 'Stopwatch'
  | 'Games'
  | 'Contacts'
  | 'ScreenLock'
  | 'Settings'
  | 'ThemeSelect'
  | 'UIStyleSelect'
  | 'About';

export interface RouteEntry {
  route: Route;
  params?: Record<string, unknown>;
  key: string;
  selectedIndex: number;
}

export interface NavigationState {
  stack: RouteEntry[];
  currentRoute: RouteEntry;
  push: (route: Route, params?: Record<string, unknown>) => void;
  pop: () => void;
  popToRoot: () => void;
  setSelectedIndex: (index: number) => void;
}
