import type { MusicService, Artist, Album, Song, AudioSource } from './types';
import { mockArtists, mockAlbums, mockSongs } from '@/data/mockData';

export class MockMusicService implements MusicService {
  async getArtists(): Promise<Artist[]> {
    return mockArtists.sort((a, b) => a.name.localeCompare(b.name));
  }

  async getAlbumsByArtist(artistId: string): Promise<Album[]> {
    return mockAlbums
      .filter((a) => a.artistId === artistId)
      .sort((a, b) => a.year - b.year);
  }

  async getAllAlbums(): Promise<Album[]> {
    return mockAlbums.sort((a, b) => a.title.localeCompare(b.title));
  }

  async getSongsByAlbum(albumId: string): Promise<Song[]> {
    return mockSongs
      .filter((s) => s.albumId === albumId)
      .sort((a, b) => a.trackNumber - b.trackNumber);
  }

  async getAllSongs(): Promise<Song[]> {
    return mockSongs.sort((a, b) => a.title.localeCompare(b.title));
  }

  async getAudioSource(_songId: string): Promise<AudioSource> {
    // TODO: Phase 5 — return actual audio file URIs
    return { uri: '', type: 'local' };
  }
}

// Singleton
export const musicService = new MockMusicService();
