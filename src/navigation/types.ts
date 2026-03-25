export type Route =
  | 'MainMenu'
  | 'Music'
  | 'Artists'
  | 'Albums'
  | 'Songs'
  | 'NowPlaying'
  | 'CoverFlow'
  | 'Photos'
  | 'Slideshows'
  | 'Videos'
  | 'Extras'
  | 'Clock'
  | 'Stopwatch'
  | 'Games'
  | 'Contacts'
  | 'Settings'
  | 'ThemeSelect'
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
