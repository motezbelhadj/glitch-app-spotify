"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, GridIcon, ListIcon } from "lucide-react";
import { useMockData } from "@/hooks/use-mock-data";
import { useMockPlaylists } from "@/hooks/use-mock-data";
import { TrackItem } from "@/components/player/track-item";

export default function LibraryPage() {
  const { albums, artists } = useMockData();
  const { playlists } = useMockPlaylists();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPlaylists = playlists.filter(playlist => 
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredAlbums = albums.filter(album => 
    album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 py-6 md:px-8 lg:px-10 pb-32 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setView('grid')}>
            <GridIcon className={`h-5 w-5 ${view === 'grid' ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setView('list')}>
            <ListIcon className={`h-5 w-5 ${view === 'list' ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search your library"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="hidden md:flex">
          <Plus className="h-4 w-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      <Tabs defaultValue="playlists" className="space-y-4">
        <TabsList>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playlists">
          {view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredPlaylists.map((playlist) => (
                <div key={playlist.id} className="group">
                  <div className="aspect-square rounded-md overflow-hidden mb-3 relative">
                    {playlist.coverUrl ? (
                      <img
                        src={playlist.coverUrl}
                        alt={playlist.name}
                        className="h-full w-full object-cover group-hover:brightness-75 transition-all"
                      />
                    ) : (
                      <div className="h-full w-full bg-secondary flex items-center justify-center group-hover:brightness-75 transition-all">
                        <div className="text-4xl font-bold text-muted-foreground">
                          {playlist.name.substring(0, 1)}
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        className="rounded-full shadow-lg"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-medium truncate">{playlist.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    Playlist • {playlist.tracks.length} songs
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPlaylists.map((playlist) => (
                <div key={playlist.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-accent/10">
                  <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                    {playlist.coverUrl ? (
                      <img
                        src={playlist.coverUrl}
                        alt={playlist.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-secondary flex items-center justify-center">
                        <div className="text-xl font-bold text-muted-foreground">
                          {playlist.name.substring(0, 1)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{playlist.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      Playlist • {playlist.tracks.length} songs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="albums">
          {view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredAlbums.map((album) => (
                <div key={album.id} className="group">
                  <div className="aspect-square rounded-md overflow-hidden mb-3 relative">
                    <img
                      src={album.coverUrl}
                      alt={album.name}
                      className="h-full w-full object-cover group-hover:brightness-75 transition-all"
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        className="rounded-full shadow-lg"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-medium truncate">{album.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    Album • {album.artist.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredAlbums.map((album) => (
                <div key={album.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-accent/10">
                  <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={album.coverUrl}
                      alt={album.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{album.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      Album • {album.artist.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="artists">
          {view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredArtists.map((artist) => (
                <div key={artist.id} className="text-center group">
                  <div className="aspect-square rounded-full overflow-hidden mb-3 relative">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="h-full w-full object-cover group-hover:brightness-75 transition-all"
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        className="rounded-full shadow-lg"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-medium truncate">{artist.name}</h3>
                  <p className="text-sm text-muted-foreground">Artist</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredArtists.map((artist) => (
                <div key={artist.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-accent/10">
                  <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">Artist</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}