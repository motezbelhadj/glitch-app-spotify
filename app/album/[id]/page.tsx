"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Play, Pause, Heart, MoreHorizontal, Clock,
  Share2, Plus
} from "lucide-react";
import { useMockAlbums } from "@/hooks/use-mock-data";
import { usePlayer } from "@/contexts/player-context";
import { TrackItem } from "@/components/player/track-item";
import { formatDate, formatTime } from "@/lib/format";

export default function AlbumPage({ params }: { params: { id: string } }) {
  const { albums } = useMockAlbums();
  const { playTrack, isPlaying, currentTrack, togglePlay } = usePlayer();
  const [isLiked, setIsLiked] = useState(false);
  
  const album = albums.find(a => a.id === params.id);
  
  if (!album) {
    return (
      <div className="px-6 py-6 md:px-8 lg:px-10 pb-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Album not found</h1>
          <p className="text-muted-foreground">The album you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  const handlePlayPause = () => {
    if (isPlaying && currentTrack?.album.id === album.id) {
      togglePlay();
    } else if (album.tracks.length > 0) {
      playTrack(album.tracks[0]);
    }
  };
  
  const isCurrentAlbum = currentTrack?.album.id === album.id;
  
  // Calculate total duration
  const totalDuration = album.tracks.reduce((acc, track) => acc + track.duration, 0);
  const totalDurationFormatted = formatTime(totalDuration);

  return (
    <div className="px-6 py-6 md:px-8 lg:px-10 pb-32 space-y-6">
      <div 
        className="flex flex-col md:flex-row md:items-end gap-6 mb-8 bg-gradient-to-b from-secondary/50 to-background p-6 rounded-b-lg"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)`,
        }}
      >
        <div className="flex-shrink-0 h-52 w-52 rounded-md overflow-hidden shadow-lg">
          <img 
            src={album.coverUrl} 
            alt={album.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <p className="text-sm uppercase tracking-widest mb-2">Album</p>
          <h1 className="text-5xl font-bold mb-4">{album.name}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img 
                src={album.artist.imageUrl} 
                alt={album.artist.name}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-medium">{album.artist.name}</span>
            <span>•</span>
            <span>{formatDate(album.releaseDate)}</span>
            <span>•</span>
            <span>{album.tracks.length} songs</span>
            <span>•</span>
            <span>about {totalDurationFormatted}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Button 
          className="rounded-full h-14 w-14 flex items-center justify-center" 
          onClick={handlePlayPause}
        >
          {isPlaying && isCurrentAlbum ? (
            <Pause className="h-7 w-7" />
          ) : (
            <Play className="h-7 w-7 ml-1" />
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={isLiked ? "text-destructive" : "text-muted-foreground"}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={isLiked ? "h-5 w-5 fill-current" : "h-5 w-5"} />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Plus className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Share2 className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="grid grid-cols-[auto_1fr_auto] w-full gap-4">
          <span className="text-muted-foreground font-medium text-sm">#</span>
          <span className="text-muted-foreground font-medium text-sm">Title</span>
          <span className="text-muted-foreground font-medium text-sm text-right flex items-center justify-end">
            <Clock className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="space-y-1">
        {album.tracks.map((track, index) => (
          <TrackItem 
            key={track.id} 
            track={track} 
            index={index + 1} 
          />
        ))}
      </div>

      <div className="pt-8 text-sm text-muted-foreground">
        <p className="mb-2">Released: {formatDate(album.releaseDate)}</p>
        <p>© 2025 {album.artist.name}</p>
      </div>
    </div>
  );
}