"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, Pause, Heart, MoreHorizontal,
  Share2, BellPlus, 
} from "lucide-react";
import { useMockData } from "@/hooks/use-mock-data";
import { usePlayer } from "@/contexts/player-context";
import { TrackItem } from "@/components/player/track-item";

export default function ArtistPage({ params }: { params: { id: string } }) {
  const { artists, albums } = useMockData();
  const { playTrack, isPlaying, currentTrack, togglePlay } = usePlayer();
  const [isFollowing, setIsFollowing] = useState(false);
  const [headerBg, setHeaderBg] = useState("transparent");
  
  const artist = artists.find(a => a.id === params.id);
  
  if (!artist) {
    return (
      <div className="px-6 py-6 md:px-8 lg:px-10 pb-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Artist not found</h1>
          <p className="text-muted-foreground">The artist you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  // Get all albums by this artist
  const artistAlbums = albums.filter(album => album.artist.id === artist.id);
  
  // Get all tracks by this artist
  const artistTracks = artistAlbums.flatMap(album => album.tracks).slice(0, 10);
  
  // Handle scroll to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHeaderBg("rgba(0,0,0,0.6)");
      } else {
        setHeaderBg("transparent");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handlePlayPause = () => {
    if (isPlaying && currentTrack?.artist.id === artist.id) {
      togglePlay();
    } else if (artistTracks.length > 0) {
      playTrack(artistTracks[0]);
    }
  };
  
  const isCurrentArtist = currentTrack?.artist.id === artist.id;

  return (
    <div className="pb-32">
      {/* Artist header */}
      <div className="relative">
        <div 
          className="h-80 bg-gradient-to-b from-secondary/50 to-background w-full absolute top-0 left-0 right-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)`,
          }}
        />
        
        <div 
          className="fixed top-0 left-0 right-0 z-20 transition-colors duration-300 h-16"
          style={{ backgroundColor: headerBg }}
        />
        
        <div className="relative z-10 px-6 py-6 md:px-8 lg:px-10 pt-12 md:pt-24 space-y-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="h-40 w-40 rounded-full overflow-hidden mb-4">
              <img 
                src={artist.imageUrl} 
                alt={artist.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-6xl font-bold mb-4">{artist.name}</h1>
              <p className="text-lg mb-6">8.5M monthly listeners</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Button 
                  className="rounded-full" 
                  onClick={handlePlayPause}
                >
                  {isPlaying && isCurrentArtist ? "Pause" : "Play"}
                </Button>
                
                <Button 
                  variant={isFollowing ? "default" : "outline"} 
                  className="rounded-full"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                
                <Button variant="ghost" size="icon" className="rounded-full">
                  <BellPlus className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artist content */}
      <div className="px-6 md:px-8 lg:px-10 space-y-10">
        {/* Popular songs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Popular</h2>
          <div className="space-y-1">
            {artistTracks.slice(0, 5).map((track, index) => (
              <TrackItem 
                key={track.id} 
                track={track} 
                index={index + 1} 
                showAlbum
              />
            ))}
          </div>
        </div>
        
        {/* Discography */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Discography</h2>
          
          <Tabs defaultValue="albums" className="space-y-4">
            <TabsList>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="singles">Singles & EPs</TabsTrigger>
              <TabsTrigger value="compilations">Compilations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="albums" className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {artistAlbums.map((album) => (
                  <div key={album.id} className="group">
                    <div className="aspect-square rounded-md overflow-hidden mb-3 relative">
                      <img
                        src={album.coverUrl}
                        alt={album.name}
                        className="h-full w-full object-cover group-hover:brightness-75 transition-all"
                      />
                    </div>
                    <h3 className="font-medium truncate">{album.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {new Date(album.releaseDate).getFullYear()} • Album
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="singles">
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No singles available</p>
              </div>
            </TabsContent>
            
            <TabsContent value="compilations">
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No compilations available</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Fans also like */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Fans also like</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-6 pb-4">
              {artists.filter(a => a.id !== artist.id).map((similarArtist) => (
                <div key={similarArtist.id} className="w-[140px] space-y-3 text-center">
                  <div className="overflow-hidden rounded-full">
                    <img
                      src={similarArtist.imageUrl}
                      alt={similarArtist.name}
                      className="h-[140px] w-[140px] object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none truncate">{similarArtist.name}</h3>
                    <p className="text-xs text-muted-foreground">Artist</p>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        
        {/* About */}
        <div className="pt-8 pb-20">
          <h2 className="text-2xl font-bold mb-6">About</h2>
          <div className="md:flex gap-8">
            <div className="mb-8 md:mb-0 md:w-2/3">
              <p className="text-lg mb-4">
                {artist.name} is a groundbreaking artist known for pushing boundaries and 
                creating immersive sonic experiences. With multiple hits and a dedicated 
                fanbase, their music continues to inspire listeners worldwide.
              </p>
              <p className="text-muted-foreground">
                8.5 million monthly listeners
              </p>
            </div>
            
            <div className="md:w-1/3">
              <div className="aspect-video rounded-md overflow-hidden">
                <img 
                  src={artist.imageUrl} 
                  alt={artist.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}