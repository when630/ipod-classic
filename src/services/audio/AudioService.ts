import type { IAudioService, PlaybackStatus } from './types';

/**
 * Web-compatible audio service using HTML5 Audio.
 * Can be replaced with expo-audio for native builds.
 */
class WebAudioService implements IAudioService {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<(status: PlaybackStatus) => void> = new Set();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private _volume = 0.5;

  private getDefaultStatus(): PlaybackStatus {
    return {
      isPlaying: false,
      positionSeconds: 0,
      durationSeconds: 0,
      didJustFinish: false,
    };
  }

  async load(uri: string): Promise<void> {
    this.dispose();

    if (!uri) return;

    this.audio = new Audio(uri);
    this.audio.volume = this._volume;

    this.audio.addEventListener('ended', () => {
      this.notifyListeners({ ...this.getStatus(), didJustFinish: true });
    });

    // Wait for metadata to load
    await new Promise<void>((resolve) => {
      if (!this.audio) return resolve();
      this.audio.addEventListener('loadedmetadata', () => resolve(), { once: true });
      this.audio.addEventListener('error', () => resolve(), { once: true });
    });
  }

  async play(): Promise<void> {
    if (!this.audio) return;
    await this.audio.play();
    this.startPolling();
    this.notifyListeners(this.getStatus());
  }

  async pause(): Promise<void> {
    if (!this.audio) return;
    this.audio.pause();
    this.stopPolling();
    this.notifyListeners(this.getStatus());
  }

  async stop(): Promise<void> {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.stopPolling();
    this.notifyListeners(this.getStatus());
  }

  async seekTo(seconds: number): Promise<void> {
    if (!this.audio) return;
    this.audio.currentTime = seconds;
    this.notifyListeners(this.getStatus());
  }

  setVolume(volume: number): void {
    this._volume = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = this._volume;
    }
  }

  getStatus(): PlaybackStatus {
    if (!this.audio) return this.getDefaultStatus();
    return {
      isPlaying: !this.audio.paused,
      positionSeconds: this.audio.currentTime,
      durationSeconds: this.audio.duration || 0,
      didJustFinish: false,
    };
  }

  onStatusUpdate(callback: (status: PlaybackStatus) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  dispose(): void {
    this.stopPolling();
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }

  private notifyListeners(status: PlaybackStatus) {
    this.listeners.forEach((cb) => cb(status));
  }

  private startPolling() {
    this.stopPolling();
    this.intervalId = setInterval(() => {
      this.notifyListeners(this.getStatus());
    }, 500);
  }

  private stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

/**
 * Dummy audio service for when no real audio is available.
 * Simulates playback with a timer for UI development.
 */
class SimulatedAudioService implements IAudioService {
  private listeners: Set<(status: PlaybackStatus) => void> = new Set();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private _isPlaying = false;
  private _position = 0;
  private _duration = 0;
  private _volume = 0.5;

  async load(_uri: string): Promise<void> {
    this._position = 0;
    this._isPlaying = false;
  }

  setDuration(seconds: number) {
    this._duration = seconds;
  }

  async play(): Promise<void> {
    this._isPlaying = true;
    this.startPolling();
    this.notify();
  }

  async pause(): Promise<void> {
    this._isPlaying = false;
    this.stopPolling();
    this.notify();
  }

  async stop(): Promise<void> {
    this._isPlaying = false;
    this._position = 0;
    this.stopPolling();
    this.notify();
  }

  async seekTo(seconds: number): Promise<void> {
    this._position = Math.max(0, Math.min(seconds, this._duration));
    this.notify();
  }

  setVolume(volume: number): void {
    this._volume = Math.max(0, Math.min(1, volume));
  }

  getStatus(): PlaybackStatus {
    return {
      isPlaying: this._isPlaying,
      positionSeconds: this._position,
      durationSeconds: this._duration,
      didJustFinish: false,
    };
  }

  onStatusUpdate(callback: (status: PlaybackStatus) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  dispose(): void {
    this.stopPolling();
  }

  private notify() {
    const status = this.getStatus();
    this.listeners.forEach((cb) => cb(status));
  }

  private startPolling() {
    this.stopPolling();
    this.intervalId = setInterval(() => {
      if (this._isPlaying) {
        this._position += 0.5;
        if (this._position >= this._duration) {
          this._isPlaying = false;
          this.stopPolling();
          this.listeners.forEach((cb) =>
            cb({ ...this.getStatus(), didJustFinish: true })
          );
          return;
        }
      }
      this.notify();
    }, 500);
  }

  private stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Export a simulated service (works everywhere, no real audio files needed)
export const audioService = new SimulatedAudioService();
