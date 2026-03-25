export interface Artist {
  id: string;
  name: string;
  albumCount: number;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  year: number;
  songCount: number;
}

export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId: string;
  albumTitle: string;
  trackNumber: number;
  duration: number; // seconds
}

export interface AudioSource {
  uri: string;
  type: 'local' | 'remote';
}

export interface MusicService {
  getArtists(): Promise<Artist[]>;
  getAlbumsByArtist(artistId: string): Promise<Album[]>;
  getAllAlbums(): Promise<Album[]>;
  getSongsByAlbum(albumId: string): Promise<Song[]>;
  getAllSongs(): Promise<Song[]>;
  getAudioSource(songId: string): Promise<AudioSource>;
}
