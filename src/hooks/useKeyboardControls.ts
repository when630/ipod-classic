import { useEffect } from 'react';
import { Platform } from 'react-native';
import type { WheelTapZone } from '@/types';

interface KeyboardControlsOptions {
  onScroll: (direction: 'up' | 'down') => void;
  onTap: (zone: WheelTapZone) => void;
}

/**
 * Web-only: maps keyboard keys to iPod controls.
 *
 * Arrow Up/Down = scroll
 * Enter/Right   = select (center button)
 * Escape/Left   = menu (back)
 * Space          = play/pause
 */
export function useKeyboardControls({ onScroll, onTap }: KeyboardControlsOptions) {
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
        case 'Enter':
        case 'ArrowRight':
          e.preventDefault();
          onTap('select');
          break;
        case 'Escape':
        case 'ArrowLeft':
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
  }, [onScroll, onTap]);
}
