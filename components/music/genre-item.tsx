"use client";

import Link from "next/link";
import { Genre } from "@/types/music";

interface GenreItemProps {
  genre: Genre;
}

export function GenreItem({ genre }: GenreItemProps) {
  // Get a random color for the background gradient
  const getRandomColor = () => {
    const colors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const color = getRandomColor();

  return (
    <Link href={`/genre/${genre.id}`}>
      <div 
        className={`h-32 rounded-lg p-4 flex items-end overflow-hidden relative bg-gradient-to-br from-${color} to-${color}/50 hover:from-${color}/80 hover:to-${color}/60 transition-colors`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="font-semibold text-white relative z-10">{genre.name}</h3>
      </div>
    </Link>
  );
}