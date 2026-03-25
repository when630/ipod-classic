export interface PlaybackStatus {
  isPlaying: boolean;
  positionSeconds: number;
  durationSeconds: number;
  didJustFinish: boolean;
}

export interface IAudioService {
  load(uri: string): Promise<void>;
  play(): Promise<void>;
  pause(): Promise<void>;
  stop(): Promise<void>;
  seekTo(seconds: number): Promise<void>;
  setVolume(volume: number): void;
  getStatus(): PlaybackStatus;
  onStatusUpdate(callback: (status: PlaybackStatus) => void): () => void;
  dispose(): void;
}
