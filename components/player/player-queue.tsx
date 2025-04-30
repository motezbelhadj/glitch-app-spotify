"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Clock } from "lucide-react";
import { usePlayer } from "@/contexts/player-context";
import { formatTime } from "@/lib/format";
import { TrackItem } from "@/components/player/track-item";

interface PlayerQueueProps {
  onClose: () => void;
}

export function PlayerQueue({ onClose }: PlayerQueueProps) {
  const { queue, history } = usePlayer();

  return (
    <div className="absolute bottom-full right-0 w-full md:w-96 bg-card rounded-t-lg shadow-lg border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Queue</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="queue" className="h-96">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="queue" className="h-full">
          {queue.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No upcoming tracks</p>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="p-2">
                {queue.map((track, index) => (
                  <TrackItem key={`${track.id}-${index}`} track={track} index={index + 1} />
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
        <TabsContent value="history" className="h-full">
          {history.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No recently played tracks</p>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="p-2">
                {history.map((track, index) => (
                  <TrackItem key={`${track.id}-${index}`} track={track} index={index + 1} />
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}