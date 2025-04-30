"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMockData } from "@/hooks/use-mock-data";
import { usePlayer } from "@/contexts/player-context";
import { TrackItem } from "@/components/player/track-item";

export function RecentlyPlayedSection() {
  const { recentlyPlayed } = useMockData();
  const { playTrack } = usePlayer();
  const [activeTab, setActiveTab] = useState<'tracks' | 'albums' | 'artists'>('tracks');
  
  const handlePlayAll = () => {
    if (recentlyPlayed.tracks.length > 0) {
      playTrack(recentlyPlayed.tracks[0]);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Recently Played</h2>
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'tracks' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('tracks')}
          >
            Tracks
          </Button>
          <Button 
            variant={activeTab === 'albums' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('albums')}
          >
            Albums
          </Button>
          <Button 
            variant={activeTab === 'artists' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('artists')}
          >
            Artists
          </Button>
        </div>
      </div>

      {activeTab === 'tracks' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" size="sm" onClick={handlePlayAll}>
              <Play className="h-4 w-4 mr-2" />
              Play all
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Duration</span>
            </div>
          </div>
          <div className="grid gap-1">
            {recentlyPlayed.tracks.map((track, index) => (
              <TrackItem 
                key={track.id} 
                track={track} 
                index={index + 1} 
                showAlbum
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'albums' && (
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {recentlyPlayed.albums.map((album) => (
              <Link 
                key={album.id}
                href={`/album/${album.id}`}
                className="block shrink-0"
              >
                <div className="w-[160px] space-y-3">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={album.coverUrl}
                      alt={album.name}
                      className="h-auto w-[160px] aspect-square object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1 text-sm">
                    <h3 className="font-medium leading-none truncate">{album.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{album.artist.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      {activeTab === 'artists' && (
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-6 pb-4">
            {recentlyPlayed.artists.map((artist) => (
              <Link 
                key={artist.id}
                href={`/artist/${artist.id}`}
                className="block shrink-0"
              >
                <div className="w-[140px] space-y-3">
                  <div className="overflow-hidden rounded-full">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="h-[140px] w-[140px] object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1 text-center">
                    <h3 className="font-medium leading-none truncate">{artist.name}</h3>
                    <p className="text-xs text-muted-foreground">Artist</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
}