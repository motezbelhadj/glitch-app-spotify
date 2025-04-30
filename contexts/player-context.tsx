"use client";

import { createContext, useContext, useState } from "react";
import { Track } from "@/types/music";
import { useMockData } from "@/hooks/use-mock-data";

interface PlayerContextType {
  currentTrack: Track | null;
  queue: Track[];
  history: Track[];
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  addToQueue: (track: Track) => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  queue: [],
  history: [],
  isPlaying: false,
  playTrack: () => {},
  togglePlay: () => {},
  nextTrack: () => {},
  previousTrack: () => {},
  addToQueue: () => {},
  clearQueue: () => {},
});

export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { recentlyPlayed } = useMockData();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [history, setHistory] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: Track) => {
    if (currentTrack) {
      setHistory((prev) => [currentTrack, ...prev.slice(0, 19)]);
    }
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      const newQueue = queue.slice(1);
      if (currentTrack) {
        setHistory((prev) => [currentTrack, ...prev.slice(0, 19)]);
      }
      setCurrentTrack(nextTrack);
      setQueue(newQueue);
      setIsPlaying(true);
    } else if (recentlyPlayed.tracks.length > 0) {
      // If queue is empty, play a random track from recently played
      const randomIndex = Math.floor(Math.random() * recentlyPlayed.tracks.length);
      playTrack(recentlyPlayed.tracks[randomIndex]);
    }
  };

  const previousTrack = () => {
    if (history.length > 0) {
      const prevTrack = history[0];
      const newHistory = history.slice(1);
      if (currentTrack) {
        setQueue((prev) => [currentTrack, ...prev]);
      }
      setCurrentTrack(prevTrack);
      setHistory(newHistory);
      setIsPlaying(true);
    }
  };

  const addToQueue = (track: Track) => {
    setQueue((prev) => [...prev, track]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        queue,
        history,
        isPlaying,
        playTrack,
        togglePlay,
        nextTrack,
        previousTrack,
        addToQueue,
        clearQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}