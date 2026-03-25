import { TextStyle } from 'react-native';

// iPod Classic used Chicago (bitmap) and later Podium Sans for menus.
// We approximate with system fonts. On iOS this gives SF Pro, on Android Roboto.

export const typography = {
  statusBar: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  } as TextStyle,
  menuItem: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0.1,
  } as TextStyle,
  menuItemSelected: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.1,
  } as TextStyle,
  title: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  } as TextStyle,
  nowPlayingTitle: {
    fontSize: 14,
    fontWeight: '600',
  } as TextStyle,
  nowPlayingArtist: {
    fontSize: 12,
    fontWeight: '400',
  } as TextStyle,
  nowPlayingTime: {
    fontSize: 10,
    fontWeight: '400',
  } as TextStyle,
  wheelLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,
} as const;
