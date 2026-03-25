import { useEffect } from 'react';
import { Platform } from 'react-native';
import type { WheelTapZone } from '@/types';

interface KeyboardControlsOptions {
  onScroll: (direction: 'up' | 'down') => void;
  onTap: (zone: WheelTapZone) => void;
  /** When true, arrow left/right map to back/forward instead of menu/select */
  gameMode?: boolean;
}

export function useKeyboardControls({ onScroll, onTap, gameMode }: KeyboardControlsOptions) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          onScroll('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          onScroll('down');
          break;
        case 'ArrowRight':
          e.preventDefault();
          onTap(gameMode ? 'forward' : 'select');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onTap(gameMode ? 'back' : 'menu');
          break;
        case 'Enter':
          e.preventDefault();
          onTap('select');
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          onTap('menu');
          break;
        case ' ':
          e.preventDefault();
          onTap('play_pause');
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onScroll, onTap, gameMode]);
}
