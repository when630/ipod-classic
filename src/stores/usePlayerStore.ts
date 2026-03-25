import { create } from 'zustand';
import { audioService } from '@/services/audio/AudioService';
import type { Song } from '@/services/music/types';

interface PlayerState {
  currentTrack: Song | null;
  queue: Song[];
  queueIndex: number;
  isPlaying: boolean;
  position: number;
  duration: number;
  volume: number;
  shuffleMode: boolean;
  repeatMode: 'off' | 'one' | 'all';

  // Actions
  playTrack: (song: Song, queue?: Song[], queueIndex?: number) => void;
  togglePlayPause: () => void;
  next: () => void;
  previous: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  adjustVolume: (delta: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => {
  // Listen for audio status updates
  audioService.onStatusUpdate((status) => {
    set({ position: status.positionSeconds, isPlaying: status.isPlaying });

    if (status.didJustFinish) {
      const { repeatMode } = get();
      if (repeatMode === 'one') {
        // Replay current track
        audioService.seekTo(0);
        audioService.play();
      } else {
        // Auto-advance to next
        get().next();
      }
    }
  });

  return {
    currentTrack: null,
    queue: [],
    queueIndex: -1,
    isPlaying: false,
    position: 0,
    duration: 0,
    volume: 0.5,
    shuffleMode: false,
    repeatMode: 'off',

    playTrack: (song, queue, queueIndex) => {
      const q = queue ?? [song];
      const idx = queueIndex ?? 0;
      set({
        currentTrack: song,
        queue: q,
        queueIndex: idx,
        position: 0,
        duration: song.duration,
        isPlaying: true,
      });
      audioService.setDuration(song.duration);
      audioService.load('').then(() => audioService.play());
    },

    togglePlayPause: () => {
      const { isPlaying, currentTrack } = get();
      if (!currentTrack) return;
      if (isPlaying) {
        audioService.pause();
      } else {
        audioService.play();
      }
      set({ isPlaying: !isPlaying });
    },

    next: () => {
      const { queue, queueIndex, repeatMode, shuffleMode } = get();
      if (queue.length === 0) return;

      let nextIndex: number;
      if (shuffleMode) {
        nextIndex = Math.floor(Math.random() * queue.length);
      } else {
        nextIndex = queueIndex + 1;
      }

      if (nextIndex >= queue.length) {
        if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          // Stop at end
          audioService.stop();
          set({ isPlaying: false });
          return;
        }
      }

      const nextSong = queue[nextIndex];
      set({
        currentTrack: nextSong,
        queueIndex: nextIndex,
        position: 0,
        duration: nextSong.duration,
        isPlaying: true,
      });
      audioService.setDuration(nextSong.duration);
      audioService.load('').then(() => audioService.play());
    },

    previous: () => {
      const { queue, queueIndex, position } = get();
      if (queue.length === 0) return;

      // If more than 3 seconds in, restart current track
      if (position > 3) {
        audioService.seekTo(0);
        set({ position: 0 });
        return;
      }

      const prevIndex = Math.max(0, queueIndex - 1);
      const prevSong = queue[prevIndex];
      set({
        currentTrack: prevSong,
        queueIndex: prevIndex,
        position: 0,
        duration: prevSong.duration,
        isPlaying: true,
      });
      audioService.setDuration(prevSong.duration);
      audioService.load('').then(() => audioService.play());
    },

    seekTo: (seconds) => {
      audioService.seekTo(seconds);
      set({ position: seconds });
    },

    setVolume: (volume) => {
      const v = Math.max(0, Math.min(1, volume));
      audioService.setVolume(v);
      set({ volume: v });
    },

    adjustVolume: (delta) => {
      const { volume } = get();
      const v = Math.max(0, Math.min(1, volume + delta));
      audioService.setVolume(v);
      set({ volume: v });
    },

    toggleShuffle: () => {
      set((s) => ({ shuffleMode: !s.shuffleMode }));
    },

    cycleRepeat: () => {
      set((s) => {
        const modes: ('off' | 'one' | 'all')[] = ['off', 'all', 'one'];
        const idx = modes.indexOf(s.repeatMode);
        return { repeatMode: modes[(idx + 1) % modes.length] };
      });
    },
  };
});
