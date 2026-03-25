import { create } from 'zustand';
import { musicService } from '@/services/music/MockMusicService';
import type { Artist, Album, Song } from '@/services/music/types';

interface LibraryState {
  artists: Artist[];
  albums: Album[];
  songs: Song[];
  isLoaded: boolean;

  loadLibrary: () => Promise<void>;
  getAlbumsByArtist: (artistId: string) => Album[];
  getSongsByAlbum: (albumId: string) => Song[];
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  artists: [],
  albums: [],
  songs: [],
  isLoaded: false,

  loadLibrary: async () => {
    if (get().isLoaded) return;
    const [artists, albums, songs] = await Promise.all([
      musicService.getArtists(),
      musicService.getAllAlbums(),
      musicService.getAllSongs(),
    ]);
    set({ artists, albums, songs, isLoaded: true });
  },

  getAlbumsByArtist: (artistId: string) => {
    return get().albums.filter((a) => a.artistId === artistId).sort((a, b) => a.year - b.year);
  },

  getSongsByAlbum: (albumId: string) => {
    return get().songs.filter((s) => s.albumId === albumId).sort((a, b) => a.trackNumber - b.trackNumber);
  },
}));
