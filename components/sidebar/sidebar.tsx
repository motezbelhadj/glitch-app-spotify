"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, Search, Library, PlusCircle, Heart, Bookmark, 
  Music, Radio, Layers, Compass, LayoutGrid, 
  ChevronLeft, ChevronRight
} from "lucide-react";
import { PlaylistItem } from "@/components/sidebar/playlist-item";
import { useMockPlaylists } from "@/hooks/use-mock-data";
import { Logo } from "@/components/logo";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { playlists } = useMockPlaylists();

  return (
    <div 
      className={cn(
        "bg-card border-r border-border transition-all duration-300 h-full flex flex-col",
        isCollapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className="p-4 flex justify-between items-center">
        <div className={cn("flex items-center", isCollapsed && "justify-center w-full")}>
          <Logo className={cn("h-8 w-8", !isCollapsed && "mr-2")} />
          {!isCollapsed && <span className="text-lg font-bold">GLITCH</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("text-muted-foreground hover:text-primary", isCollapsed && "hidden")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-muted-foreground hover:text-primary absolute -right-4 top-8 bg-card border border-border rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="mt-2">
        <nav className="grid gap-1 px-2">
          <Link 
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-primary-foreground transition-all hover:text-primary",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <Home className="h-5 w-5" />
            {!isCollapsed && <span>Home</span>}
          </Link>
          <Link 
            href="/search"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <Search className="h-5 w-5" />
            {!isCollapsed && <span>Search</span>}
          </Link>
          <Link 
            href="/library"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <Library className="h-5 w-5" />
            {!isCollapsed && <span>Your Library</span>}
          </Link>
        </nav>
      </div>

      <div className="mt-6">
        <div className={cn("px-4 mb-2", isCollapsed && "text-center")}>
          {!isCollapsed && <h2 className="mb-2 text-lg font-semibold">Your Collections</h2>}
          <Button variant="outline" size={isCollapsed ? "icon" : "sm"} className="w-full justify-start">
            <PlusCircle className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Create Playlist</span>}
          </Button>
        </div>
        
        <div className={cn("grid gap-1 px-2", isCollapsed && "px-0")}>
          <Link 
            href="/liked"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <Heart className="h-5 w-5" />
            {!isCollapsed && <span>Liked Songs</span>}
          </Link>
          <Link 
            href="/saved"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <Bookmark className="h-5 w-5" />
            {!isCollapsed && <span>Saved Albums</span>}
          </Link>
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-hidden">
        {!isCollapsed && <h2 className="px-4 mb-2 text-lg font-semibold">Your Playlists</h2>}
        <ScrollArea className="h-full">
          <div className="grid gap-1 px-2 pb-4">
            {!isCollapsed && playlists.map((playlist) => (
              <PlaylistItem key={playlist.id} playlist={playlist} />
            ))}
            {isCollapsed && (
              <div className="flex flex-col items-center gap-3 py-2">
                <Radio className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Music className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Layers className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Compass className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <LayoutGrid className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}