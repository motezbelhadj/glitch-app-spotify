"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, Clock, MoreHorizontal } from "lucide-react";
import { useMockPlaylists } from "@/hooks/use-mock-data";
import { usePlayer } from "@/contexts/player-context";
import { TrackItem } from "@/components/player/track-item";
import { formatTime } from "@/lib/format";

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const { playlists } = useMockPlaylists();
  const { playTrack } = usePlayer();
  const [searchQuery, setSearchQuery] = useState("");
  
  const playlist = playlists.find(p => p.id === params.id);
  
  if (!playlist) {
    return (
      <div className="px-6 py-6 md:px-8 lg:px-10 pb-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Playlist not found</h1>
          <p className="text-muted-foreground">The playlist you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  const filteredTracks = playlist.tracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handlePlayAll = () => {
    if (filteredTracks.length > 0) {
      playTrack(filteredTracks[0]);
    }
  };
  
  // Calculate total duration
  const totalDuration = filteredTracks.reduce((acc, track) => acc + track.duration, 0);
  const totalDurationFormatted = formatTime(totalDuration);

  return (
    <div className="px-6 py-6 md:px-8 lg:px-10 pb-32 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
        <div className="flex-shrink-0 h-52 w-52 rounded-md overflow-hidden">
          {playlist.coverUrl ? (
            <img 
              src={playlist.coverUrl} 
              alt={playlist.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-secondary flex items-center justify-center">
              <div className="text-6xl font-bold text-muted-foreground">
                {playlist.name.substring(0, 1)}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <p className="text-sm uppercase tracking-widest mb-2">Playlist</p>
          <h1 className="text-5xl font-bold mb-4">{playlist.name}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{playlist.createdBy.name}</span>
            <span>•</span>
            <span>{filteredTracks.length} songs</span>
            <span>•</span>
            <span>about {totalDurationFormatted}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Button className="rounded-full h-14 w-14 flex items-center justify-center" onClick={handlePlayAll}>
          <Play className="h-7 w-7 ml-1" />
        </Button>
        
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={`Search in ${playlist.name}`}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="grid grid-cols-[auto_1fr_1fr] md:grid-cols-[auto_1fr_1fr_auto] w-full gap-4">
          <span className="text-muted-foreground font-medium text-sm">#</span>
          <span className="text-muted-foreground font-medium text-sm">Title</span>
          <span className="text-muted-foreground font-medium text-sm hidden md:block">Album</span>
          <span className="text-muted-foreground font-medium text-sm text-right flex items-center justify-end">
            <Clock className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="space-y-1">
        {filteredTracks.length > 0 ? (
          filteredTracks.map((track, index) => (
            <TrackItem 
              key={track.id} 
              track={track} 
              index={index + 1} 
              showAlbum
              inPlaylist
            />
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No songs found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}