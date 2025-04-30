"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Play, Pause } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Track } from "@/types/music";
import { formatTime } from "@/lib/format";
import { usePlayer } from "@/contexts/player-context";

interface TrackItemProps {
  track: Track;
  index: number;
  showAlbum?: boolean;
  inPlaylist?: boolean;
}

export function TrackItem({ track, index, showAlbum = false, inPlaylist = false }: TrackItemProps) {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);
  
  const isCurrentTrack = currentTrack?.id === track.id;

  const handlePlay = () => {
    playTrack(track);
  };

  return (
    <div 
      className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/20 transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-6 flex items-center justify-center text-muted-foreground">
        {isCurrentTrack ? (
          <div className="h-3 w-3 bg-primary rounded-full animate-pulse" />
        ) : isHovered ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 p-0"
            onClick={handlePlay}
          >
            <Play className="h-3 w-3" />
          </Button>
        ) : (
          <span className="text-xs">{index}</span>
        )}
      </div>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
          <img 
            src={track.album.coverUrl} 
            alt={track.album.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className={`text-sm font-medium truncate ${isCurrentTrack ? 'text-primary' : ''}`}>
            {track.title}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {track.artist.name}
          </span>
        </div>
      </div>

      {showAlbum && (
        <div className="text-sm text-muted-foreground truncate hidden md:block md:w-1/4">
          {track.album.name}
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {formatTime(track.duration)}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Add to queue</DropdownMenuItem>
            <DropdownMenuItem>Save to your Liked Songs</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Add to playlist</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Share</DropdownMenuItem>
            {inPlaylist && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  Remove from this playlist
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}