"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Home, Search, Library, Heart, Bookmark } from "lucide-react";
import { PlaylistItem } from "@/components/sidebar/playlist-item";
import { useMockPlaylists } from "@/hooks/use-mock-data";
import { Logo } from "@/components/logo";

export function MobileSidebar() {
  const { playlists } = useMockPlaylists();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center">
          <Logo className="h-8 w-8 mr-2" />
          <span className="text-lg font-bold">GLITCH</span>
        </div>
        <SheetClose>
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </SheetClose>
      </div>

      <div className="mt-2">
        <nav className="grid gap-1 px-2">
          <Link 
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary-foreground transition-all hover:text-primary"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link 
            href="/search"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </Link>
          <Link 
            href="/library"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Library className="h-5 w-5" />
            <span>Your Library</span>
          </Link>
        </nav>
      </div>

      <div className="mt-6">
        <div className="px-4 mb-2">
          <h2 className="mb-2 text-lg font-semibold">Your Collections</h2>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            <span>Create Playlist</span>
          </Button>
        </div>
        
        <div className="grid gap-1 px-2">
          <Link 
            href="/liked"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Heart className="h-5 w-5" />
            <span>Liked Songs</span>
          </Link>
          <Link 
            href="/saved"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Bookmark className="h-5 w-5" />
            <span>Saved Albums</span>
          </Link>
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-hidden">
        <h2 className="px-4 mb-2 text-lg font-semibold">Your Playlists</h2>
        <ScrollArea className="h-full">
          <div className="grid gap-1 px-2 pb-20">
            {playlists.map((playlist) => (
              <PlaylistItem key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function SheetClose({ children }: { children: React.ReactNode }) {
  return <div className="close-button">{children}</div>;
}