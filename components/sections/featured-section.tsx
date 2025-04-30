"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/contexts/player-context";
import { useMockData } from "@/hooks/use-mock-data";
import { Play, Pause } from "lucide-react";

export function FeaturedSection() {
  const { featuredContent } = useMockData();
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();
  const [gradientColor, setGradientColor] = useState("from-chart-1/30");

  useEffect(() => {
    const colors = [
      "from-chart-1/30",
      "from-chart-2/30",
      "from-chart-3/30",
      "from-chart-4/30",
      "from-chart-5/30",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGradientColor(randomColor);
  }, []);

  if (!featuredContent) return null;

  const isCurrentlyPlaying = 
    isPlaying && 
    currentTrack?.id === featuredContent.topTrack.id;

  const handlePlayPause = () => {
    if (isCurrentlyPlaying) {
      togglePlay();
    } else {
      playTrack(featuredContent.topTrack);
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden bg-gradient-to-r ${gradientColor} to-transparent`}>
      <div className="p-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {featuredContent.greeting}
          </h1>
          <p className="text-xl mb-4">
            {featuredContent.description}
          </p>
          <div className="flex gap-3">
            <Button 
              size="lg" 
              className="rounded-full"
              onClick={handlePlayPause}
            >
              {isCurrentlyPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5 ml-0.5" />}
              {isCurrentlyPlaying ? "Pause" : "Play"}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full"
            >
              Explore
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {featuredContent.featuredAlbums.slice(0, 3).map((album) => (
            <Link 
              key={album.id}
              href={`/album/${album.id}`}
              className="block"
            >
              <Card className="overflow-hidden bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="aspect-square w-full max-w-[160px] rounded-md overflow-hidden mb-3">
                    <img 
                      src={album.coverUrl} 
                      alt={album.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium truncate">{album.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{album.artist.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}