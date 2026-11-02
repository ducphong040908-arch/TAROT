"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TarotCardData } from "@/data/tarot-deck";

export interface DrawnSlotCard {
  slotIndex: number;
  card: TarotCardData;
  isReversed: boolean;
  isFlipped: boolean;
}

interface HoloTarotCardProps {
  card: TarotCardData;
  isReversed?: boolean;
  isFlipped: boolean;
  slotCode?: string;
  slotViLabel?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CyberCardBackSVG({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#070812] p-2 select-none">
      {/* Outer Gold PCB Frame */}
      <div className="relative flex h-full w-full flex-col items-center justify-between rounded-lg border border-amber-500/40 bg-gradient-to-b from-[#0C0E1C] via-[#070810] to-[#0C0E1C] p-2 shadow-inner">
        {/* Corner PCB Mounting Pins */}
        <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full border border-amber-400/70 bg-amber-500/20" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-amber-400/70 bg-amber-500/20" />
        <span className="absolute bottom-1.5 left-1.5 h-2 w-2 rounded-full border border-amber-400/70 bg-amber-500/20" />
        <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full border border-amber-400/70 bg-amber-500/20" />

        {!compact && (
          <div className="w-full text-center font-mono text-[8px] tracking-[0.22em] text-amber-400/75">
            FET 30 NĂM // TAROT
          </div>
        )}

        {/* Sacred Geometry + Circuit Traces SVG */}
        <svg
          viewBox="0 0 120 180"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* PCB Bus Lines */}
          <g stroke="#F59E0B" strokeOpacity="0.35" strokeWidth="0.8" fill="none">
            <path d="M60 8 L60 32" />
            <path d="M60 148 L60 172" />
            <path d="M16 90 L34 90" />
            <path d="M86 90 L104 90" />
            <path d="M24 26 L42 44 L42 62" />
            <path d="M96 26 L78 44 L78 62" />
            <path d="M24 154 L42 136 L42 118" />
            <path d="M96 154 L78 136 L78 118" />
          </g>

          {/* Outer Astrolabe Ring */}
          <circle
            cx="60"
            cy="90"
            r="42"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx="60"
            cy="90"
            r="34"
            fill="none"
            stroke="#06B6D4"
            strokeOpacity="0.5"
            strokeWidth="0.8"
          />

          {/* Hexagram Sacred Geometry */}
          <polygon
            points="60,52 92,109 28,109"
            fill="none"
            stroke="#F59E0B"
            strokeOpacity="0.65"
            strokeWidth="0.9"
          />
          <polygon
            points="60,128 92,71 28,71"
            fill="none"
            stroke="#8B5CF6"
            strokeOpacity="0.65"
            strokeWidth="0.9"
          />

          {/* Central Processor Die */}
          <rect
            x="48"
            y="78"
            width="24"
            height="24"
            rx="3"
            fill="#090B14"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />
          <circle cx="60" cy="90" r="5" fill="#06B6D4" fillOpacity="0.8" />
          <circle cx="60" cy="90" r="2" fill="#FDE68A" />

          {/* Solder Vias */}
          <circle cx="60" cy="32" r="2" fill="#F59E0B" />
          <circle cx="60" cy="148" r="2" fill="#F59E0B" />
          <circle cx="24" cy="26" r="1.8" fill="#06B6D4" />
          <circle cx="96" cy="26" r="1.8" fill="#06B6D4" />
          <circle cx="24" cy="154" r="1.8" fill="#8B5CF6" />
          <circle cx="96" cy="154" r="1.8" fill="#8B5CF6" />
        </svg>

        {!compact && (
          <div className="w-full text-center font-mono text-[8px] tracking-[0.22em] text-cyan-400/75">
            TRỌN BỘ 78 LÁ
          </div>
        )}
      </div>
    </div>
  );
}

function CardArtworkSVG({ card }: { card: TarotCardData }) {
  const accentColor =
    card.element === "FIRE"
      ? "#F59E0B"
      : card.element === "WATER"
      ? "#06B6D4"
      : card.element === "AIR"
      ? "#A78BFA"
      : "#10B981";

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`glow-${card.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.32" />
          <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#05050A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Core Glow */}
      <circle cx="50" cy="50" r="46" fill={`url(#glow-${card.id})`} />

      {/* Precision Telemetry Ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke={accentColor}
        strokeOpacity="0.35"
        strokeWidth="0.7"
        strokeDasharray="4 2"
      />
      <circle
        cx="50"
        cy="50"
        r="28"
        fill="none"
        stroke="#F59E0B"
        strokeOpacity="0.25"
        strokeWidth="0.6"
      />

      {/* PCB Trace Lines from Center */}
      <g stroke={accentColor} strokeOpacity="0.4" strokeWidth="0.75" fill="none">
        <path d="M50 6 L50 18" />
        <path d="M50 82 L50 94" />
        <path d="M6 50 L18 50" />
        <path d="M82 50 L94 50" />
      </g>

      {/* Suit / Glyph Central Geometry */}
      {card.glyphType === "orb" && (
        <g>
          <circle cx="50" cy="50" r="16" fill="none" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="7" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1" />
        </g>
      )}
      {card.glyphType === "circuit" && (
        <g stroke="#F59E0B" strokeWidth="1.1" fill="none">
          <rect x="34" y="34" width="32" height="32" rx="4" />
          <rect x="42" y="42" width="16" height="16" fill={accentColor} fillOpacity="0.25" />
        </g>
      )}
      {card.glyphType === "prism" && (
        <g stroke={accentColor} strokeWidth="1.2" fill="none">
          <polygon points="50,24 74,68 26,68" fill={accentColor} fillOpacity="0.15" />
          <polygon points="50,76 74,32 26,32" stroke="#F59E0B" strokeOpacity="0.6" />
        </g>
      )}
      {card.glyphType === "matrix" && (
        <g stroke={accentColor} strokeWidth="1.1" fill="none">
          <polygon points="50,22 78,50 50,78 22,50" fill="#8B5CF6" fillOpacity="0.15" />
          <rect x="38" y="38" width="24" height="24" stroke="#F59E0B" />
        </g>
      )}
      {card.glyphType === "waveform" && (
        <path
          d="M 20 50 Q 35 20, 50 50 T 80 50"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.8"
        />
      )}
      {card.glyphType === "nexus" && (
        <g stroke="#F59E0B" strokeWidth="1" fill="none">
          <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" fill={accentColor} fillOpacity="0.15" />
          <circle cx="50" cy="50" r="10" stroke={accentColor} />
        </g>
      )}
      {card.glyphType === "flame" && (
        <path
          d="M50 22 C64 38, 70 52, 50 78 C30 52, 36 38, 50 22 Z"
          fill="#F59E0B"
          fillOpacity="0.22"
          stroke="#F59E0B"
          strokeWidth="1.3"
        />
      )}
      {card.glyphType === "chalice" && (
        <g stroke="#06B6D4" strokeWidth="1.3" fill="none">
          <path d="M32 30 H68 C68 52, 58 60, 50 62 C42 60, 32 52, 32 30 Z" fill="#06B6D4" fillOpacity="0.2" />
          <path d="M50 62 V76 M38 76 H62" />
        </g>
      )}
      {card.glyphType === "blade" && (
        <g stroke="#A78BFA" strokeWidth="1.4" fill="none">
          <path d="M50 18 L55 62 L50 70 L45 62 Z" fill="#A78BFA" fillOpacity="0.25" />
          <path d="M34 62 H66 M50 70 V82" stroke="#F59E0B" />
        </g>
      )}
      {card.glyphType === "pentacle" && (
        <g stroke="#10B981" strokeWidth="1.2" fill="none">
          <circle cx="50" cy="50" r="24" fill="#10B981" fillOpacity="0.15" />
          <polygon
            points="50,27 57,43 74,43 60,53 65,70 50,60 35,70 40,53 26,43 43,43"
            stroke="#F59E0B"
            strokeWidth="1"
          />
        </g>
      )}

      {/* Constellation Nodes & Edges */}
      <polyline
        points={card.constellationNodes.map((n) => `${n.x},${n.y}`).join(" ")}
        fill="none"
        stroke="#FDE68A"
        strokeWidth="0.9"
        strokeOpacity="0.85"
      />
      {card.constellationNodes.map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="3" fill={accentColor} fillOpacity="0.35" />
          <circle cx={node.x} cy={node.y} r="1.4" fill="#FEF08A" />
        </g>
      ))}
    </svg>
  );
}

export function HoloTarotCard({
  card,
  isReversed = false,
  isFlipped,
  slotCode,
  slotViLabel,
  onClick,
  size = "md",
  className,
}: HoloTarotCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const rafRef = React.useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 14;
      const rotateX = (0.5 - py) * 14;
      setTilt({
        rotateX,
        rotateY,
        glareX: Math.round(px * 100),
        glareY: Math.round(py * 100),
      });
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const dimensions =
    size === "sm"
      ? "w-36 h-60"
      : size === "lg"
      ? "w-64 sm:w-72 h-[450px] sm:h-[500px]"
      : "w-[216px] sm:w-[236px] h-[375px] sm:h-[410px]";

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Slot Position Header HUD */}
      {slotViLabel && (
        <div className="flex flex-col items-center text-center mb-0.5">
          <span className="font-sans text-xs font-semibold text-amber-200/90 tracking-wide">
            {slotViLabel}
          </span>
        </div>
      )}

      {/* 3D Perspective Container */}
      <div
        role="button"
        tabIndex={0}
        aria-label={
          isFlipped
            ? `Lá bài ${card.name} (${card.viName}) - ${isReversed ? "Chiều ngược" : "Chiều xuôi"}`
            : `Lá bài úp vị trí ${slotViLabel || ""} - Nhấn Enter hoặc Space để lật bài`
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        className={cn(
          "relative cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl transform-gpu",
          dimensions,
          className
        )}
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <motion.div
          className="relative h-full w-full rounded-2xl transform-gpu"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          animate={{
            rotateY: (isFlipped ? 180 : 0) + (isFlipped ? -tilt.rotateY : tilt.rotateY),
            rotateX: tilt.rotateX,
            scale: isHovered ? 1.03 : 1,
          }}
          transition={{
            rotateY: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            rotateX: { type: "spring", stiffness: 260, damping: 24 },
            scale: { duration: 0.2 },
          }}
        >
          {/* ================= CARD BACK (FACE DOWN) ================= */}
          <div
            className="absolute inset-0 h-full w-full rounded-2xl border border-amber-500/40 bg-[#070812] shadow-[0_0_30px_rgba(245,158,11,0.18)] overflow-hidden transform-gpu"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <CyberCardBackSVG />
            {/* Click-to-flip Prompt Badge */}
            <div className="absolute inset-x-3 bottom-4 flex items-center justify-center rounded-lg border border-amber-400/50 bg-[#05050A]/90 py-1.5 backdrop-blur-md">
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-amber-300 animate-pulse">
                [CHẠM ĐỂ MỞ BÀI]
              </span>
            </div>
          </div>

          {/* ================= CARD FRONT (FACE UP) ================= */}
          <div
            className={cn(
              "absolute inset-0 h-full w-full rounded-2xl border p-3 flex flex-col justify-between overflow-hidden bg-[#080914] transform-gpu",
              isReversed
                ? "border-violet-500/70 shadow-[0_0_35px_rgba(139,92,246,0.28)]"
                : "border-amber-400/70 shadow-[0_0_35px_rgba(245,158,11,0.28)]"
            )}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Holographic Silicon Wafer Glare Overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.38 : 0.12,
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(253, 230, 138, 0.35), rgba(6, 182, 212, 0.18) 40%, transparent 70%)`,
              }}
            />

            {/* Top Register Metadata Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-slate-800/90 pb-1.5">
              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-300 border border-amber-500/30">
                {card.hexAddress} • {card.romanNumeral}
              </span>
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 font-sans text-[9px] font-bold border",
                  isReversed
                    ? "border-violet-500/40 bg-violet-500/20 text-violet-300"
                    : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                )}
              >
                {isReversed ? "CHIỀU NGƯỢC" : "CHIỀU XUÔI"}
              </span>
            </div>

            {/* Central Rider-Waite-Smith Artwork Frame */}
            <div className="relative z-10 my-1 flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-amber-500/35 bg-[#05060D] shadow-inner">
              {/* Inner Artwork Container (Rotates 180deg if Reversed) */}
              <div
                className={cn(
                  "h-full w-full flex items-center justify-center transition-transform duration-500",
                  isReversed && "rotate-180"
                )}
              >
                {!imgError && card.image ? (
                  <img
                    src={card.image}
                    alt={`${card.name} - ${card.viName}`}
                    loading="lazy"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105 p-0.5"
                  />
                ) : (
                  <div className="h-full w-full p-2">
                    <CardArtworkSVG card={card} />
                  </div>
                )}
              </div>

              {/* Subtle Vignette & Element Tag (Luôn ở góc dưới phải và hiển thị xuôi cho cả lá xuôi lẫn lá ngược) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060D]/40 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-1.5 right-2 z-20 rounded bg-[#05060D]/90 px-1.5 py-0.5 font-sans text-[9px] font-semibold text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                {card.element}
              </div>
            </div>

            {/* Card Title & Vietnamese Translation (Removed Cyber Metaphor) */}
            <div className="relative z-10 space-y-0.5 pt-1 text-center">
              <div className="font-display text-sm sm:text-base font-bold tracking-wide text-amber-100 leading-tight">
                {card.name}
              </div>
              <div className="font-sans text-xs font-medium text-cyan-300 line-clamp-1">
                {card.viName.split("—")[0].trim()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
