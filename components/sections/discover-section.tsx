"use client";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause } from "lucide-react";
import { useMockData } from "@/hooks/use-mock-data";
import { usePlayer } from "@/contexts/player-context";
import { GenreItem } from "@/components/music/genre-item";

export function DiscoverSection() {
  const { genres, forYou } = useMockData();
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Discover</h2>
      </div>

      <Tabs defaultValue="genres" className="space-y-4">
        <TabsList>
          <TabsTrigger value="genres">Browse Genres</TabsTrigger>
          <TabsTrigger value="for-you">For You</TabsTrigger>
        </TabsList>
        
        <TabsContent value="genres" className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {genres.slice(0, 12).map((genre) => (
              <GenreItem key={genre.id} genre={genre} />
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline">View All Genres</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="for-you" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">New Releases For You</h3>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-4 pb-4">
                  {forYou.newReleases.map((album) => (
                    <Link 
                      key={album.id}
                      href={`/album/${album.id}`}
                      className="block shrink-0"
                    >
                      <div className="w-[140px] space-y-3">
                        <div className="overflow-hidden rounded-md relative group">
                          <img
                            src={album.coverUrl}
                            alt={album.name}
                            className="h-auto w-[140px] aspect-square object-cover transition-all group-hover:scale-105 group-hover:brightness-75"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              size="icon" 
                              className="rounded-full h-10 w-10"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePlayPause(album.tracks[0]);
                              }}
                            >
                              {isPlaying && currentTrack?.id === album.tracks[0].id ? 
                                <Pause className="h-5 w-5" /> : 
                                <Play className="h-5 w-5 ml-0.5" />
                              }
                            </Button>
                          </div>
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
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recommended Artists</h3>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-4 pb-4">
                  {forYou.recommendedArtists.map((artist) => (
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
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}