"use client";

import Link from "next/link";
import { MusicIcon } from "lucide-react";
import { Playlist } from "@/types/music";

interface PlaylistItemProps {
  playlist: Playlist;
}

export function PlaylistItem({ playlist }: PlaylistItemProps) {
  return (
    <Link 
      href={`/playlist/${playlist.id}`}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent/20"
    >
      {playlist.coverUrl ? (
        <img 
          src={playlist.coverUrl} 
          alt={playlist.name} 
          className="h-8 w-8 rounded object-cover"
        />
      ) : (
        <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
          <MusicIcon className="h-4 w-4" />
        </div>
      )}
      <div className="text-sm">
        <p className="font-medium truncate">{playlist.name}</p>
        <p className="text-xs text-muted-foreground">Playlist • {playlist.songCount} songs</p>
      </div>
    </Link>
  );
}