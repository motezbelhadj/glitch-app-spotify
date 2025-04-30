"use client";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMockData } from "@/hooks/use-mock-data";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { usePlayer } from "@/contexts/player-context";

export function NewReleasesSection() {
  const { newReleases } = useMockData();
  const { playTrack, isPlaying, currentTrack, togglePlay } = usePlayer();

  const handlePlayPause = (track: any) => {
    if (isPlaying && currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">New Releases</h2>
        <Button variant="ghost" size="sm">See all</Button>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {newReleases.map((album) => (
            <Link 
              key={album.id}
              href={`/album/${album.id}`}
              className="block shrink-0"
            >
              <div className="w-[180px] space-y-3">
                <div className="overflow-hidden rounded-md relative group">
                  <img
                    src={album.coverUrl}
                    alt={album.name}
                    className="h-auto w-[180px] aspect-square object-cover transition-all group-hover:scale-105 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="icon" 
                      className="rounded-full h-12 w-12"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePlayPause(album.tracks[0]);
                      }}
                    >
                      {isPlaying && currentTrack?.id === album.tracks[0].id ? 
                        <Pause className="h-6 w-6" /> : 
                        <Play className="h-6 w-6 ml-0.5" />
                      }
                    </Button>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <h3 className="font-medium leading-none truncate">{album.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{album.artist.name} • Album</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}