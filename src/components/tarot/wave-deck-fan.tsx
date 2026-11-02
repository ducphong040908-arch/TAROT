"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type TarotCardData } from "@/data/tarot-deck";
import { CyberCardBackSVG } from "@/components/ui/holo-tarot-card";

export const WAVE_RADIUS_CARDS = 6;
export const WAVE_MAX_LIFT_PX = 44;
export const WAVE_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
  mass: 0.7,
};

export interface ShuffledDeckItem {
  card: TarotCardData;
  isReversed: boolean;
  memOffset: string;
}

interface WaveDeckFanProps {
  availableDeckCards: ShuffledDeckItem[];
  majorOnly: boolean;
  isShuffling: boolean;
  shufflePhase: "idle" | "gather" | "riffle" | "fan";
  drawingCardId: number | null;
  onPickCard: (item: ShuffledDeckItem) => void;
}

const CARD_WIDTH = 96; // w-24 trong Tailwind

export const WaveDeckFan = React.memo(function WaveDeckFan({
  availableDeckCards,
  majorOnly,
  isShuffling,
  shufflePhase,
  drawingCardId,
  onPickCard,
}: WaveDeckFanProps) {
  const [hoveredDeckIdx, setHoveredDeckIdx] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1000);

  // Đo chiều rộng khung hiển thị thực tế để tự động điều chỉnh độ xòe bài
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const updateWidth = () => {
      if (el) setContainerWidth(el.clientWidth);
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const totalCards = availableDeckCards.length;
  const usableWidth = Math.max(340, containerWidth - 80);
  const idealStep =
    totalCards > 1 ? (usableWidth - CARD_WIDTH) / (totalCards - 1) : 0;

  // Tính toán khoảng cách (step) giữa các lá bài:
  // - Nếu 78 lá trên Desktop (width rộng): step tự động co giãn từ 13px - 26px để xòe trọn vẹn 78 lá trước mắt.
  // - Nếu trên Mobile / Tablet: step tối thiểu 15px để dễ chạm ngón tay, đồng thời bắt đầu từ góc trái (justify-start)
  //   tuyệt đối KHÔNG bị xén mất các lá từ 1 đến 28 vào vùng toạ độ âm.
  const isLargeDeck = totalCards > 30;
  const cardStep = isLargeDeck
    ? Math.max(13.5, Math.min(26, idealStep))
    : Math.max(26, Math.min(48, idealStep));

  const totalFanWidth = CARD_WIDTH + Math.max(0, totalCards - 1) * cardStep;
  const isOverflowing = totalFanWidth + 40 > containerWidth;
  const cardOverlapMargin = cardStep - CARD_WIDTH; // Ví dụ: 13.5 - 96 = -82.5px

  const scrollToPosition = useCallback((targetPercent: number) => {
    if (!scrollContainerRef.current) return;
    const maxScroll =
      scrollContainerRef.current.scrollWidth -
      scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: Math.max(0, maxScroll * targetPercent),
      behavior: "smooth",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-2xl border border-slate-800/90 bg-[#070811]/90 p-5 backdrop-blur-xl overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-xs uppercase tracking-wider text-amber-300 font-semibold">
            CHỌN LÁ BÀI BẠN CẢM THẤY THU HÚT NHẤT ({totalCards} LÁ)
          </span>
          {isLargeDeck && !isOverflowing && (
            <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
              TRỌN VẸN 78 LÁ TRÊN MÀN HÌNH
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Navigation Jump khi quạt bài vượt quá màn hình */}
          {isOverflowing && (
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => scrollToPosition(0)}
                className="rounded px-2 py-0.5 bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-slate-700/80 transition-colors"
              >
                ⏮ Lá #1
              </button>
              <button
                type="button"
                onClick={() => scrollToPosition(0.5)}
                className="rounded px-2 py-0.5 bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-slate-700/80 transition-colors"
              >
                ⚡ Giữa bài
              </button>
              <button
                type="button"
                onClick={() => scrollToPosition(1)}
                className="rounded px-2 py-0.5 bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-slate-700/80 transition-colors"
              >
                Lá #{totalCards} ⏭
              </button>
            </div>
          )}

          <span className="font-sans text-xs text-cyan-400 font-medium">
            {hoveredDeckIdx !== null && availableDeckCards[hoveredDeckIdx]
              ? `Đang chạm sóng lá bài #${hoveredDeckIdx + 1} / ${totalCards}`
              : isOverflowing
              ? "Cuộn chuột hoặc lướt sóng để chọn từ lá #1 đến #78"
              : "Rê chuột lướt sóng trên bộ bài để chọn lá"}
          </span>
        </div>
      </div>

      {/* Fan Deck Container with Smooth Wave Ripple & Shuffling Animations */}
      <div
        ref={scrollContainerRef}
        className="relative py-10 overflow-x-auto scroll-smooth [-webkit-overflow-scrolling:touch] select-none"
        onWheel={(e) => {
          if (scrollContainerRef.current && isOverflowing && Math.abs(e.deltaY) > 0) {
            scrollContainerRef.current.scrollLeft += e.deltaY;
          }
        }}
      >
        <div
          className={cn(
            "flex items-center px-10 h-60 pt-8 transition-all",
            isOverflowing ? "justify-start w-max" : "justify-center w-full"
          )}
          onMouseLeave={() => setHoveredDeckIdx(null)}
        >
          {availableDeckCards.map((item, idx) => {
            const mid = (totalCards - 1) / 2;
            const norm = totalCards > 1 ? (idx - mid) / mid : 0; // -1 to 1
            const angle = norm * 22;
            const arcY = Math.abs(norm) * Math.abs(norm) * 26;
            const isHovered = hoveredDeckIdx === idx && !isShuffling;
            const isDrawingThis = drawingCardId === item.card.id;
            const stepDistance = cardStep;

            // Smooth Cosine Wave Ripple calculation around hoveredDeckIdx
            const signedDist =
              hoveredDeckIdx !== null && !isShuffling
                ? idx - hoveredDeckIdx
                : 999;
            const absDist = Math.abs(signedDist);
            const waveFactor =
              absDist < WAVE_RADIUS_CARDS
                ? Math.pow(
                    Math.cos((absDist / WAVE_RADIUS_CARDS) * (Math.PI / 2)),
                    1.55
                  )
                : 0;

            const waveLift = waveFactor * WAVE_MAX_LIFT_PX;
            const waveSpreadX =
              absDist > 0 && absDist < WAVE_RADIUS_CARDS
                ? Math.sign(signedDist) * (12 - absDist * 1.6) * waveFactor
                : 0;

            // Calculate multi-stage physical shuffle & wave transforms
            let animateX = waveSpreadX;
            let animateY = isDrawingThis ? -84 : arcY - waveLift;
            let animateRotate = isDrawingThis
              ? 0
              : angle * (1 - waveFactor * 0.85);
            let animateScale = isDrawingThis ? 1.2 : 1 + waveFactor * 0.18;
            let animateOpacity = 1;

            if (isShuffling) {
              if (shufflePhase === "gather") {
                animateX = -(idx - mid) * stepDistance * 0.94;
                animateY = ((idx % 6) - 3) * 2;
                animateRotate = ((idx % 7) - 3) * 2.2;
                animateScale = 1.05;
              } else if (shufflePhase === "riffle") {
                const isLeft = idx % 2 === 0;
                const stackCenter = -(idx - mid) * stepDistance * 0.94;
                animateX = stackCenter + (isLeft ? -75 : 75);
                animateY = ((idx % 4) - 2) * 5;
                animateRotate = isLeft ? -15 : 15;
                animateScale = 1.08;
              } else if (shufflePhase === "fan") {
                animateX = 0;
                animateY = arcY;
                animateRotate = angle;
                animateScale = 1;
              }
            }

            return (
              <motion.button
                key={item.card.id}
                type="button"
                disabled={isShuffling || drawingCardId !== null}
                onMouseEnter={() => !isShuffling && setHoveredDeckIdx(idx)}
                onFocus={() => !isShuffling && setHoveredDeckIdx(idx)}
                onClick={() => onPickCard(item)}
                style={{
                  marginLeft: idx === 0 ? "0px" : `${cardOverlapMargin}px`,
                  zIndex: isDrawingThis
                    ? 100
                    : waveFactor > 0
                    ? Math.round(80 + waveFactor * 20) - absDist
                    : isShuffling
                    ? 10 + (idx % 20)
                    : idx,
                  touchAction: "manipulation",
                  willChange:
                    isDrawingThis || isHovered || waveFactor > 0
                      ? "transform"
                      : "auto",
                }}
                animate={{
                  x: animateX,
                  y: animateY,
                  rotateZ: animateRotate,
                  scale: animateScale,
                  opacity: animateOpacity,
                }}
                transition={
                  isDrawingThis
                    ? {
                        type: "spring",
                        stiffness: 260,
                        damping: 22,
                      }
                    : isShuffling
                    ? {
                        type: "spring",
                        stiffness: 240,
                        damping: 20,
                        mass: 0.6,
                      }
                    : WAVE_SPRING_CONFIG
                }
                className={cn(
                  "relative h-36 w-24 shrink-0 rounded-xl transition-shadow focus:outline-none cursor-pointer transform-gpu",
                  isDrawingThis
                    ? "shadow-[0_0_35px_rgba(245,158,11,1)] ring-2 ring-amber-300 brightness-125"
                    : isHovered
                    ? "shadow-[0_0_30px_rgba(245,158,11,0.9)] ring-2 ring-amber-400 brightness-110"
                    : waveFactor > 0.35
                    ? "shadow-[0_0_20px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/70"
                    : "shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
                )}
              >
                <CyberCardBackSVG compact />
                {isHovered && !isShuffling && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gradient-to-r from-amber-400 to-amber-300 px-2.5 py-0.5 font-sans text-[11px] font-bold text-slate-950 shadow-lg z-50">
                    Rút lá #{idx + 1}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
});
