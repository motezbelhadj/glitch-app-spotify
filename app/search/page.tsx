"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useMockData } from "@/hooks/use-mock-data";
import { TrackItem } from "@/components/player/track-item";
import { GenreItem } from "@/components/music/genre-item";

export default function SearchPage() {
  const { albums, artists, genres } = useMockData();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter items based on search query
  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredAlbums = albums.filter(album => 
    album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTracks = albums
    .flatMap(album => album.tracks)
    .filter(track => 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  return (
    <div className="px-6 py-6 md:px-8 lg:px-10 pb-32 space-y-6">
      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="What do you want to listen to?"
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {searchQuery ? (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-8">
            {filteredTracks.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Songs</h2>
                <div className="grid gap-1">
                  {filteredTracks.slice(0, 5).map((track, index) => (
                    <TrackItem 
                      key={track.id} 
                      track={track} 
                      index={index + 1} 
                      showAlbum
                    />
                  ))}
                </div>
                {filteredTracks.length > 5 && (
                  <Button variant="ghost" className="mt-2">
                    See all {filteredTracks.length} songs
                  </Button>
                )}
              </div>
            )}
            
            {filteredArtists.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredArtists.slice(0, 6).map((artist) => (
                    <div key={artist.id} className="text-center">
                      <div className="aspect-square rounded-full overflow-hidden mb-2">
                        <img
                          src={artist.imageUrl}
                          alt={artist.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium">{artist.name}</h3>
                      <p className="text-sm text-muted-foreground">Artist</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {filteredAlbums.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredAlbums.slice(0, 6).map((album) => (
                    <div key={album.id}>
                      <div className="aspect-square rounded-md overflow-hidden mb-2">
                        <img
                          src={album.coverUrl}
                          alt={album.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium truncate">{album.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{album.artist.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="songs">
            <h2 className="text-2xl font-bold mb-4">Songs</h2>
            {filteredTracks.length > 0 ? (
              <div className="grid gap-1">
                {filteredTracks.map((track, index) => (
                  <TrackItem 
                    key={track.id} 
                    track={track} 
                    index={index + 1} 
                    showAlbum
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No songs found matching "{searchQuery}"</p>
            )}
          </TabsContent>
          
          <TabsContent value="artists">
            <h2 className="text-2xl font-bold mb-4">Artists</h2>
            {filteredArtists.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredArtists.map((artist) => (
                  <div key={artist.id} className="text-center">
                    <div className="aspect-square rounded-full overflow-hidden mb-3">
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">Artist</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No artists found matching "{searchQuery}"</p>
            )}
          </TabsContent>
          
          <TabsContent value="albums">
            <h2 className="text-2xl font-bold mb-4">Albums</h2>
            {filteredAlbums.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredAlbums.map((album) => (
                  <div key={album.id}>
                    <div className="aspect-square rounded-md overflow-hidden mb-3">
                      <img
                        src={album.coverUrl}
                        alt={album.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium truncate">{album.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{album.artist.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No albums found matching "{searchQuery}"</p>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Browse All</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {genres.map((genre) => (
                <GenreItem key={genre.id} genre={genre} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}