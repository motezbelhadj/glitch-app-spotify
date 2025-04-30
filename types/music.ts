export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Album {
  id: string;
  name: string;
  artist: Artist;
  coverUrl: string;
  releaseDate: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  artist: Artist;
  album: Album;
  duration: number;
  audioUrl: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Playlist {
  id: string;
  name: string;
  coverUrl: string;
  songCount: number;
  tracks: Track[];
  createdBy: {
    id: string;
    name: string;
  };
}