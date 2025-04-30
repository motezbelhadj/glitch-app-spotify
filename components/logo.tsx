"use client";

import { ZapIcon } from "lucide-react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <ZapIcon className="text-primary w-full h-full" />
      <div className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10"></div>
    </div>
  );
}