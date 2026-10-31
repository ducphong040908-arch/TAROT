"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StarPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  delay: number;
  duration: number;
}

export function CosmicCircuitBg({ className }: { className?: string }) {
  const [stars, setStars] = useState<StarPoint[]>([]);
  const [meteors, setMeteors] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const palette = ["#F59E0B", "#06B6D4", "#8B5CF6", "#F8FAFC", "#FDE68A"];
    const generatedStars: StarPoint[] = Array.from({ length: 72 }, (_, i) => ({
      id: i,
      x: (i * 19.7 + ((i * 31) % 97)) % 100,
      y: (i * 13.3 + ((i * 17) % 89)) % 100,
      size: (i % 3) + 1,
      opacity: 0.25 + ((i * 7) % 65) / 100,
      duration: 2.5 + (i % 5),
      delay: (i % 7) * 0.4,
      color: palette[i % palette.length],
    }));

    const generatedMeteors: ShootingStar[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startX: 15 + i * 18,
      startY: 5 + (i % 3) * 14,
      angle: 215,
      delay: i * 3.2,
      duration: 4.5 + (i % 3),
    }));

    setStars(generatedStars);
    setMeteors(generatedMeteors);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05050A]",
        className
      )}
      aria-hidden="true"
    >
      {/* Deep Cosmic Nebula Gradients */}
      <div
        className="absolute -top-48 left-1/4 h-[560px] w-[560px] rounded-full opacity-20 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(6,182,212,0.15) 55%, transparent 80%)",
        }}
      />
      <div
        className="absolute -bottom-48 right-1/4 h-[520px] w-[520px] rounded-full opacity-15 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.45) 0%, rgba(139,92,246,0.2) 55%, transparent 80%)",
        }}
      />

      {/* Silicon Wafer & PCB Trace Grid Overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.11]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="pcb-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="0.6"
              strokeOpacity="0.45"
            />
            <path
              d="M 0 40 L 24 40 L 34 30 L 56 30 L 66 40 L 80 40"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
            <path
              d="M 40 0 L 40 20 L 50 30 M 40 80 L 40 60 L 30 50"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="0.65"
              strokeOpacity="0.4"
            />
            <circle cx="24" cy="40" r="1.8" fill="#F59E0B" fillOpacity="0.65" />
            <circle cx="66" cy="40" r="1.8" fill="#06B6D4" fillOpacity="0.65" />
            <circle cx="40" cy="40" r="2.2" fill="none" stroke="#F59E0B" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb-grid)" />
      </svg>

      {/* Sacred Geometry Astrolabe Ring in Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
        <svg width="860" height="860" viewBox="0 0 860 860" className="animate-spin-slow">
          <circle
            cx="430"
            cy="430"
            r="390"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          <circle
            cx="430"
            cy="430"
            r="310"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="1"
            strokeDasharray="20 8 4 8"
          />
          <polygon
            points="430,70 742,610 118,610"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1"
          />
          <polygon
            points="430,790 742,250 118,250"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Starfield Layer (21st.dev bundui/stars adaptation) */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Shooting Stars Layer (21st.dev manuarora700/shooting-stars adaptation) */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute h-[1px] w-28 bg-gradient-to-r from-amber-400 via-cyan-400 to-transparent opacity-40"
          style={{
            left: `${meteor.startX}%`,
            top: `${meteor.startY}%`,
            transform: `rotate(${meteor.angle}deg)`,
            animation: `pulse ${meteor.duration}s ease-in-out ${meteor.delay}s infinite`,
          }}
        />
      ))}

      {/* Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, transparent 30%, rgba(5, 5, 10, 0.85) 100%)",
        }}
      />
    </div>
  );
}
