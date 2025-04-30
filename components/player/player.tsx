"use client";

import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Repeat, Repeat1, Shuffle, Heart, MoreHorizontal, Maximize2,
  ListMusic, Mic2
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { usePlayer } from "@/contexts/player-context";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/format";
import { VolumeControl } from "@/components/player/volume-control";
import { PlayerQueue } from "@/components/player/player-queue";

export function Player() {
  const { 
    currentTrack,
    isPlaying, 
    togglePlay,
    nextTrack,
    previousTrack
  } = usePlayer();
  
  const [showQueue, setShowQueue] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat one

  const toggleRepeat = () => {
    setRepeatMode((repeatMode + 1) % 3);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Simulate progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  // Update progress based on currentTime
  useEffect(() => {
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  // Set duration when track changes
  useEffect(() => {
    if (currentTrack) {
      setDuration(currentTrack.duration);
      setCurrentTime(0);
    }
  }, [currentTrack]);

  // Skip to position when clicking on progress bar
  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    setCurrentTime(newTime);
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-card backdrop-blur-md z-50">
      <div className="flex items-center justify-between px-4 h-20">
        {/* Current track info */}
        <div className="flex items-center gap-3 w-[30%]">
          <div className="relative h-12 w-12 rounded overflow-hidden">
            <img 
              src={currentTrack.album.coverUrl} 
              alt={currentTrack.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium truncate">{currentTrack.title}</span>
            <span className="text-xs text-muted-foreground truncate">{currentTrack.artist.name}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "text-muted-foreground hover:text-primary ml-2", 
              isLiked && "text-destructive hover:text-destructive"
            )}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          </Button>
        </div>

        {/* Player controls */}
        <div className="flex flex-col items-center max-w-[40%] w-full">
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("text-muted-foreground hover:text-primary", shuffle && "text-primary")}
                    onClick={() => setShuffle(!shuffle)}
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shuffle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary"
              onClick={previousTrack}
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button 
              onClick={togglePlay}
              className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 flex items-center justify-center"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary"
              onClick={nextTrack}
            >
              <SkipForward className="h-5 w-5" />
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "text-muted-foreground hover:text-primary", 
                      repeatMode > 0 && "text-primary"
                    )}
                    onClick={toggleRepeat}
                  >
                    {repeatMode === 2 ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {repeatMode === 0 && "Repeat Off"}
                    {repeatMode === 1 && "Repeat All"}
                    {repeatMode === 2 && "Repeat One"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-2 w-full mt-2">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              className="flex-1"
              onValueChange={handleProgressChange}
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 w-[30%] justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-primary"
                >
                  <Mic2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Lyrics</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "text-muted-foreground hover:text-primary",
                    showQueue && "text-primary"
                  )}
                  onClick={() => setShowQueue(!showQueue)}
                >
                  <ListMusic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Queue</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <VolumeControl 
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onMuteToggle={toggleMute}
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-primary"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Full Screen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Queue panel */}
      {showQueue && <PlayerQueue onClose={() => setShowQueue(false)} />}
    </div>
  );
}