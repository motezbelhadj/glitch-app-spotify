"use client";

import { useState, useEffect } from "react";
import { Album, Artist, Track, Genre, Playlist } from "@/types/music";

// Mock data for the application
const MOCK_ARTISTS: Artist[] = [
  { id: "a1", name: "The Weeknd", imageUrl: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: "a2", name: "Dua Lipa", imageUrl: "https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: "a3", name: "Kendrick Lamar", imageUrl: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: "a4", name: "Billie Eilish", imageUrl: "https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: "a5", name: "Taylor Swift", imageUrl: "https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: "a6", name: "Drake", imageUrl: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
];

const MOCK_ALBUMS: Album[] = [
  { 
    id: "al1", 
    name: "After Hours", 
    artist: MOCK_ARTISTS[0], 
    coverUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    releaseDate: "2020-03-20",
    tracks: []
  },
  { 
    id: "al2", 
    name: "Future Nostalgia", 
    artist: MOCK_ARTISTS[1], 
    coverUrl: "https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    releaseDate: "2020-03-27",
    tracks: []
  },
  { 
    id: "al3", 
    name: "DAMN.", 
    artist: MOCK_ARTISTS[2], 
    coverUrl: "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    releaseDate: "2017-04-14",
    tracks: []
  },
  { 
    id: "al4", 
    name: "Happier Than Ever", 
    artist: MOCK_ARTISTS[3], 
    coverUrl: "https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    releaseDate: "2021-07-30",
    tracks: []
  },
  { 
    id: "al5", 
    name: "Evermore", 
    artist: MOCK_ARTISTS[4], 
    coverUrl: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    releaseDate: "2020-12-11",
    tracks: []
  },
  { 
    id: "al6", 
    name: "Certified Lover Boy", 
    artist: MOCK_ARTISTS[5], 
    coverUrl: "https://images.pexels.com/photos/1135995/pexels-photo-1135995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    releaseDate: "2021-09-03",
    tracks: []
  },
];

// Generate mock tracks for each album
MOCK_ALBUMS.forEach((album, albumIndex) => {
  const trackCount = 10;
  const tracks: Track[] = [];
  
  for (let i = 1; i <= trackCount; i++) {
    tracks.push({
      id: `t${albumIndex + 1}-${i}`,
      title: `Track ${i} on ${album.name}`,
      artist: album.artist,
      album: album,
      duration: 180 + Math.floor(Math.random() * 120),
      audioUrl: "",
    });
  }
  
  album.tracks = tracks;
});

const MOCK_GENRES: Genre[] = [
  { id: "g1", name: "Pop" },
  { id: "g2", name: "Hip Hop" },
  { id: "g3", name: "Rock" },
  { id: "g4", name: "R&B" },
  { id: "g5", name: "Electronic" },
  { id: "g6", name: "Indie" },
  { id: "g7", name: "Jazz" },
  { id: "g8", name: "Classical" },
  { id: "g9", name: "Country" },
  { id: "g10", name: "Metal" },
  { id: "g11", name: "Reggae" },
  { id: "g12", name: "Folk" },
];

const MOCK_PLAYLISTS: Playlist[] = [
  { 
    id: "p1", 
    name: "Chill Vibes", 
    coverUrl: "https://images.pexels.com/photos/3651820/pexels-photo-3651820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
    songCount: 25,
    tracks: [],
    createdBy: { id: "1", name: "Demo User" },
  },
  { 
    id: "p2", 
    name: "Workout Mix", 
    coverUrl: "https://images.pexels.com/photos/1179582/pexels-photo-1179582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
    songCount: 18,
    tracks: [],
    createdBy: { id: "1", name: "Demo User" },
  },
  { 
    id: "p3", 
    name: "Party Starters", 
    coverUrl: "https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
    songCount: 32,
    tracks: [],
    createdBy: { id: "1", name: "Demo User" },
  },
  { 
    id: "p4", 
    name: "Focus Session", 
    coverUrl: "", 
    songCount: 15,
    tracks: [],
    createdBy: { id: "1", name: "Demo User" },
  },
  { 
    id: "p5", 
    name: "Road Trip Classics", 
    coverUrl: "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
    songCount: 42,
    tracks: [],
    createdBy: { id: "1", name: "Demo User" },
  },
];

// Add random tracks to each playlist
MOCK_PLAYLISTS.forEach(playlist => {
  const allTracks = MOCK_ALBUMS.flatMap(album => album.tracks);
  const shuffledTracks = [...allTracks].sort(() => 0.5 - Math.random());
  playlist.tracks = shuffledTracks.slice(0, playlist.songCount);
});

export function useMockData() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const recentlyPlayed = {
    tracks: MOCK_ALBUMS.flatMap(album => album.tracks).slice(0, 10),
    albums: MOCK_ALBUMS.slice(0, 8),
    artists: MOCK_ARTISTS.slice(0, 5),
  };
  
  const newReleases = MOCK_ALBUMS.slice(0, 6);
  
  const featuredContent = {
    greeting: "Good evening",
    description: "Listen to your favorite tracks and discover new music",
    featuredAlbums: MOCK_ALBUMS.slice(0, 3),
    topTrack: MOCK_ALBUMS[0].tracks[0],
  };
  
  const forYou = {
    newReleases: MOCK_ALBUMS.slice(2, 8),
    recommendedArtists: MOCK_ARTISTS.slice(1, 7),
  };
  
  return {
    isLoaded,
    artists: MOCK_ARTISTS,
    albums: MOCK_ALBUMS,
    genres: MOCK_GENRES,
    playlists: MOCK_PLAYLISTS,
    recentlyPlayed,
    newReleases,
    featuredContent,
    forYou,
  };
}

export function useMockPlaylists() {
  return { playlists: MOCK_PLAYLISTS };
}

export function useMockArtists() {
  return { artists: MOCK_ARTISTS };
}

export function useMockAlbums() {
  return { albums: MOCK_ALBUMS };
}

export function useMockGenres() {
  return { genres: MOCK_GENRES };
}