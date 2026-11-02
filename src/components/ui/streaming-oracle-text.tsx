"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Compass,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SpreadConfig } from "@/data/tarot-deck";
import type { DrawnSlotCard } from "@/components/ui/holo-tarot-card";
import {
  getCardDeepMeaning,
  getDomainKeyFromTopic,
} from "@/data/tarot-meanings";

interface StreamingOracleTextProps {
  drawnCards: DrawnSlotCard[];
  spreadConfig: SpreadConfig;
  question: string;
  topicName: string;
  synthesisText: string;
  isSynthesizing: boolean;
  activeModelBadge: string;
  onRegenerateSynthesis: () => void;
}

export function StreamingOracleText({
  drawnCards,
  spreadConfig,
  question,
  topicName,
  synthesisText,
  isSynthesizing,
  activeModelBadge,
  onRegenerateSynthesis,
}: StreamingOracleTextProps) {
  const [displayedChars, setDisplayedChars] = useState(0);

  useEffect(() => {
    if (!synthesisText) {
      setDisplayedChars(0);
      return;
    }
    if (displayedChars >= synthesisText.length) return;

    const timer = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= synthesisText.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 14;
      });
    }, 18);

    return () => clearInterval(timer);
  }, [synthesisText, displayedChars]);

  // Compute Telemetry Metrics
  const total = drawnCards.length || 1;
  const fireCount = drawnCards.filter((d) => d.card.element === "FIRE").length;
  const waterCount = drawnCards.filter((d) => d.card.element === "WATER").length;
  const airCount = drawnCards.filter((d) => d.card.element === "AIR").length;
  const earthCount = drawnCards.filter((d) => d.card.element === "EARTH").length;
  const majorCount = drawnCards.filter((d) => d.card.arcana === "MAJOR").length;
  const uprightCount = drawnCards.filter((d) => !d.isReversed).length;

  const visibleText = synthesisText.slice(0, displayedChars);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* 1. Bento Telemetry Summary Grid (21st.dev designali-in/bento-grid adaptation) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Elemental Bus Distribution */}
        <div className="rounded-2xl border border-cyan-500/25 bg-[#0B0C14]/90 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              PHÂN BỔ 4 NGUYÊN TỐ
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="flex items-center justify-between rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2">
              <span className="flex items-center gap-1.5 text-rose-300">
                <Flame className="h-3.5 w-3.5" /> Lửa
              </span>
              <span className="font-mono font-bold text-rose-200">
                {Math.round((fireCount / total) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Droplets className="h-3.5 w-3.5" /> Nước
              </span>
              <span className="font-mono font-bold text-cyan-200">
                {Math.round((waterCount / total) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-2">
              <span className="flex items-center gap-1.5 text-violet-300">
                <Wind className="h-3.5 w-3.5" /> Khí
              </span>
              <span className="font-mono font-bold text-violet-200">
                {Math.round((airCount / total) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <Mountain className="h-3.5 w-3.5" /> Đất
              </span>
              <span className="font-mono font-bold text-emerald-200">
                {Math.round((earthCount / total) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Logic Polarity & Arcana Density */}
        <div className="rounded-2xl border border-indigo-500/25 bg-[#0B0C14]/90 p-4 backdrop-blur-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5" />
              TỶ LỆ XUÔI / NGƯỢC
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Chiều Xuôi (Logic Thuận)</span>
                <span className="font-mono text-emerald-300">
                  {Math.round((uprightCount / total) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${Math.round((uprightCount / total) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Tỷ Lệ Lá Ẩn Chính</span>
                <span className="font-mono text-indigo-300">
                  {majorCount}/{drawnCards.length} Lá ({Math.round((majorCount / total) * 100)}%)
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                  style={{ width: `${Math.round((majorCount / total) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Query & Oracle Engine Status */}
        <div className="rounded-2xl border border-violet-500/25 bg-[#0B0C14]/90 p-4 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                THÔNG TIN TRẢI BÀI
              </span>
            </div>
            <div className="text-xs text-slate-400 mb-1">
              Chủ đề: <span className="text-cyan-300 font-medium">{topicName}</span> •{" "}
              <span className="text-violet-300 font-mono">{spreadConfig.badge}</span>
            </div>
            <p className="text-xs text-slate-200 italic line-clamp-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
              “{question || "Truy vấn năng lượng tổng quát"}”
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end text-[11px] font-mono text-slate-400">
            <button
              type="button"
              onClick={onRegenerateSynthesis}
              disabled={isSynthesizing}
              className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 disabled:opacity-50"
            >
              <RefreshCw className={cn("h-3 w-3", isSynthesizing && "animate-spin")} />
              <span>[LUẬN GIẢI LẠI]</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Per-Card Register Breakdown Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="font-mono text-sm text-cyan-400">[01]</span>
            Phân Tích Chi Tiết Từng Lá Bài
          </h3>
          <span className="font-mono text-xs text-slate-400">
            {drawnCards.length} LÁ BÀI TRÊN BÀN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {drawnCards.map((item, idx) => {
            const deep = getCardDeepMeaning(item.card.name);
            const domainKey = getDomainKeyFromTopic(`${topicName} ${question}`);
            const rawDomainMeaning = deep
              ? item.isReversed
                ? deep.rev[domainKey] || deep.rev.general
                : deep.up[domainKey] || deep.up.general
              : item.isReversed
              ? item.card.meaningReversed
              : item.card.meaningUpright;
            const cleanAdvice = cleanCardReferenceText(deep?.advice || item.card.advice);
            const domainMeaning = stripTrailingAdvice(
              cleanCardReferenceText(rawDomainMeaning),
              cleanAdvice
            );
            const viDisplaySubtitle = formatCleanViSubtitle(item.card.name, item.card.viName);

            return (
              <motion.div
                key={`${item.card.id}-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={cn(
                  "rounded-2xl border p-5 bg-[#0B0C14]/95 flex flex-col justify-between shadow-lg",
                  item.isReversed
                    ? "border-violet-500/35 shadow-[0_0_25px_rgba(139,92,246,0.12)]"
                    : "border-cyan-500/35 shadow-[0_0_25px_rgba(6,182,212,0.12)]"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div className="text-sm sm:text-base font-bold text-slate-100">
                      Lá thứ {idx + 1}
                    </div>
                    <span
                      className={cn(
                        "rounded-md px-2.5 py-1 font-mono text-xs font-bold border",
                        item.isReversed
                          ? "border-violet-500/40 bg-violet-500/15 text-violet-300"
                          : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                      )}
                    >
                      {item.isReversed ? "CHIỀU NGƯỢC" : "CHIỀU XUÔI"}
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div
                      className={cn(
                        "relative h-28 w-20 shrink-0 overflow-hidden rounded-xl border bg-[#05060D] shadow-md",
                        item.isReversed
                          ? "border-violet-500/50"
                          : "border-cyan-500/50"
                      )}
                    >
                      <img
                        src={item.card.image}
                        alt={item.card.name}
                        loading="lazy"
                        className={cn(
                          "h-full w-full object-contain p-0.5 transition-transform duration-300",
                          item.isReversed && "rotate-180"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-display text-base sm:text-lg font-bold text-slate-100 truncate">
                          {item.card.hexAddress} — {item.card.name}
                        </h4>
                      </div>
                      <div className="font-display text-sm font-semibold text-cyan-300 mt-1 line-clamp-1">
                        {viDisplaySubtitle}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-sans">
                        Nguyên tố:{" "}
                        <span className="text-indigo-300 font-medium">
                          {item.card.elementVi}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chi tiết ý nghĩa luận giải theo chủ đề */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                      {domainMeaning}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="font-mono text-xs uppercase text-cyan-400 font-bold block mb-1">
                    [LỜI KHUYÊN HÀNH ĐỘNG]:
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    {cleanAdvice}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Synthesis Terminal */}
      <div className="rounded-2xl border border-cyan-500/35 bg-[#080912]/95 p-6 sm:p-7 shadow-[0_0_60px_rgba(6,182,212,0.12)] backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-100">
                [02] Phân Tích Chuyên Sâu &amp; Liên Kết Toàn Bộ Trải Bài
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-normal">
                Xâu chuỗi nhân quả, giải mã sự va chạm năng lượng và đúc kết chiến lược hành động dứt khoát
              </p>
            </div>
          </div>
          <span className="font-sans text-xs font-semibold text-cyan-400">
            {isSynthesizing
              ? "TRẠNG THÁI: ĐANG LUẬN GIẢI..."
              : "TRẠNG THÁI: HOÀN TẤT LUẬN GIẢI"}
          </span>
        </div>

        {isSynthesizing && !synthesisText ? (
          <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
            <div className="h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <div className="font-sans text-xs sm:text-sm font-medium text-cyan-300 animate-pulse">
              ĐANG ĐỐI CHIẾU TÀI LIỆU &amp; PHÂN TÍCH {drawnCards.length} LÁ BÀI...
            </div>
          </div>
        ) : (
          <TarotTwoBlockReading
            text={visibleText}
            isTyping={displayedChars < synthesisText.length}
          />
        )}
      </div>
    </div>
  );
}

const MINOR_RANK_VI_SUBTITLE: Record<string, string> = {
  ace: "Át",
  two: "Hai",
  three: "Ba",
  four: "Bốn",
  five: "Năm",
  six: "Sáu",
  seven: "Bảy",
  eight: "Tám",
  nine: "Chín",
  ten: "Mười",
  page: "Tiểu Đồng",
  knight: "Hiệp Sĩ",
  queen: "Nữ Hoàng",
  king: "Nhà Vua",
};

const MINOR_SUIT_VI_SUBTITLE: Record<string, string> = {
  wands: "Gậy",
  cups: "Cốc",
  swords: "Kiếm",
  pentacles: "Tiền",
};

function formatCleanViSubtitle(cardName: string, rawViName: string): string {
  const parts = rawViName.split("—").map((s) => s.trim());
  const suffix = parts.length > 1 ? parts.slice(1).join(" — ") : "";
  const minorMatch = cardName
    .trim()
    .match(
      /^(Ace|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Page|Knight|Queen|King)\s+of\s+(Wands|Cups|Swords|Pentacles)$/i
    );
  if (minorMatch) {
    const rankVi = MINOR_RANK_VI_SUBTITLE[minorMatch[1].toLowerCase()];
    const suitVi = MINOR_SUIT_VI_SUBTITLE[minorMatch[2].toLowerCase()];
    if (rankVi && suitVi) {
      return suffix ? `${rankVi} ${suitVi} — ${suffix}` : `${rankVi} ${suitVi}`;
    }
  }
  return rawViName;
}

function cleanCardReferenceText(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/\s*\([^)]*\)/g, "")
    .replace(
      /^(Trong\s+(chuyện\s+)?tình\s+cảm|Trong\s+công\s+việc(\s*&\s*sự\s+nghiệp)?|Trong\s+học\s+tập(\s*&\s*nghiên\s+cứu)?|Về\s+tài\s+chính(\s*&\s*nguồn\s+lực)?|Về\s+sức\s+khỏe(\s*&\s*tinh\s+thần)?)\s*[:,]\s*/i,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
}

function stripTrailingAdvice(meaning: string, advice: string): string {
  if (!meaning || !advice) return meaning;
  if (meaning.length > advice.length + 10 && meaning.endsWith(advice)) {
    return meaning.slice(0, meaning.length - advice.length).trim();
  }
  return meaning;
}

const ROLEPLAY_GESTURE_PATTERN =
  /\(\s*(?:gõ nhẹ|khẽ\s|nghiêng đầu|dùng đầu ngón tay|chạm nhẹ|ngả lưng|xếp các lá bài|đan hai bàn tay|ánh mắt|nhìn thẳng|nhìn bạn|giọng nói|thở ra|đặt nhẹ|lật nhẹ|xoay nhẹ|mỉm cười|quan sát kỹ)[^)]*\)\s*/gi;

/**
 * Làm sạch văn bản luận giải:
 * - Tự động lọc bỏ (strip) các câu mô tả hành động/cử chỉ nhập vai trong ngoặc đơn (...) nếu LLM hoặc dữ liệu cũ sinh ra.
 * - Khử lỗi lặp tên lá bài dạng "Four of Wands (Four of Wands)".
 * - Giữ nguyên định dạng văn bản thuần khiết, đồng nhất một màu chữ sáng dễ đọc, tuyệt đối không gắn badge màu vàng hay tô chữ vàng.
 */
export function parseParentheticalGestures(
  paragraph: string,
  _isAdviceBlock?: boolean
): string {
  return paragraph
    .replace(ROLEPLAY_GESTURE_PATTERN, " ")
    .replace(/\b([A-Za-z][A-Za-z\s]+?)\s*\(\1\)/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

/**
 * Helper render text có chứa Markdown in đậm **text** thành React Element thuần túy
 */
function renderFormattedMarkdownText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-white font-bold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

interface ParsedReadingSection {
  key: string;
  type: "verdict" | "connection" | "action" | "quote" | "generic";
  badge: string;
  title: string;
  body: string;
  doList: string[];
  dontList: string[];
}

function parseReadingSections(text: string): ParsedReadingSection[] {
  const clean = parseParentheticalGestures(text);
  if (!clean.includes("###")) {
    const paras = clean
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    return paras.map((p, idx) => {
      const isFirst = idx === 0;
      return {
        key: `para-${idx}`,
        type: isFirst ? "verdict" : idx === 1 ? "action" : "generic",
        badge: isFirst
          ? "THÔNG ĐIỆP CỐT LÕI"
          : idx === 1
          ? "CHIẾN LƯỢC HÀNH ĐỘNG"
          : `LUẬN GIẢI BỔ SUNG ${idx + 1}`,
        title: isFirst ? "Phán Quyết & Trọng Tâm" : "Định Hướng Thực Tế",
        body: p,
        doList: [],
        dontList: [],
      };
    });
  }

  const rawSections = clean.split(/(?=###\s+)/g);
  const blocks: ParsedReadingSection[] = [];

  rawSections.forEach((sec, idx) => {
    const trimmed = sec.trim();
    if (!trimmed) return;

    const lines = trimmed.split("\n");
    const headerLine = lines[0].replace(/^###\s*✦?\s*/, "").trim();
    const contentLines = lines.slice(1).map((l) => l.trim()).filter(Boolean);

    const headerUpper = headerLine.toUpperCase();
    let type: ParsedReadingSection["type"] = "generic";
    let badge = headerLine;

    if (
      headerUpper.includes("THÔNG ĐIỆP") ||
      headerUpper.includes("PHÁN QUYẾT") ||
      headerUpper.includes("TRỌNG TÂM")
    ) {
      type = "verdict";
      badge = "THÔNG ĐIỆP CỐT LÕI & PHÁN QUYẾT";
    } else if (
      headerUpper.includes("BỨC TRANH") ||
      headerUpper.includes("LIÊN KẾT") ||
      headerUpper.includes("KẾT NỐI") ||
      headerUpper.includes("XÂU CHUỖI")
    ) {
      type = "connection";
      badge = "SỢI DÂY LIÊN KẾT BỘ BÀI";
    } else if (
      headerUpper.includes("HÀNH ĐỘNG") ||
      headerUpper.includes("CHIẾN LƯỢC") ||
      headerUpper.includes("LỘ TRÌNH") ||
      headerUpper.includes("THỰC THI") ||
      headerUpper.includes("HÓA GIẢI")
    ) {
      type = "action";
      badge = "CHIẾN LƯỢC HÀNH ĐỘNG DỨT KHOÁT";
    } else if (
      headerUpper.includes("ĐÚC KẾT") ||
      headerUpper.includes("THỨC TỈNH") ||
      headerUpper.includes("LỜI KẾT")
    ) {
      type = "quote";
      badge = "ĐÚC KẾT THỨC TỈNH";
    }

    const doList: string[] = [];
    const dontList: string[] = [];
    const remainingLines: string[] = [];

    contentLines.forEach((line) => {
      const cleanLine = line.replace(/^[-*•]\s*/, "").trim();
      const lower = cleanLine.toLowerCase();
      if (
        lower.startsWith("**việc cần làm") ||
        lower.startsWith("**việc nên làm") ||
        lower.startsWith("**giai đoạn") ||
        lower.startsWith("**bước") ||
        lower.startsWith("**trọng tâm hành động")
      ) {
        doList.push(cleanLine);
      } else if (
        lower.startsWith("**điều tuyệt đối nên tránh") ||
        lower.startsWith("**điều cần tránh") ||
        lower.startsWith("**điều nên tránh") ||
        lower.startsWith("**cạm bẫy") ||
        lower.startsWith("**nguyên tắc cốt tử")
      ) {
        dontList.push(cleanLine);
      } else {
        remainingLines.push(line);
      }
    });

    blocks.push({
      key: `sec-${idx}`,
      type,
      badge,
      title: headerLine,
      body: remainingLines.join("\n"),
      doList,
      dontList,
    });
  });

  return blocks;
}

/**
 * Component hiển thị kết quả đọc bài Tarot có cấu trúc phân đoạn trực quan:
 * - Khối 1: Thông điệp cốt lõi & Phán quyết dứt khoát
 * - Khối 2: Bức tranh toàn cảnh & Sợi dây liên kết bộ bài (xâu chuỗi nhân quả)
 * - Khối 3: Chiến lược hành động (Việc Nên Làm / Điều Cần Tránh tách bạch)
 * - Khối 4: Lời đúc kết thức tỉnh
 */
export function TarotTwoBlockReading({
  text,
  isTyping = false,
  compact = false,
}: {
  text: string;
  isTyping?: boolean;
  compact?: boolean;
}) {
  const sections = parseReadingSections(text);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", compact && "space-y-3")}>
      {sections.map((sec, idx) => {
        const isLast = idx === sections.length - 1;

        if (sec.type === "verdict") {
          return (
            <div
              key={sec.key}
              className={cn(
                "rounded-2xl border transition-all",
                compact ? "p-3.5 sm:p-4" : "p-4 sm:p-5",
                "border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-[#0A0B14] shadow-[0_0_30px_rgba(245,158,11,0.08)]"
              )}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  {sec.badge}
                </span>
              </div>
              <p
                className={cn(
                  "font-sans text-slate-100 leading-relaxed whitespace-pre-line font-medium",
                  compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
                )}
              >
                {renderFormattedMarkdownText(sec.body)}
                {isTyping && isLast && (
                  <span className="inline-block h-4 w-2 ml-1 bg-amber-400 animate-pulse align-middle" />
                )}
              </p>
            </div>
          );
        }

        if (sec.type === "connection") {
          return (
            <div
              key={sec.key}
              className={cn(
                "rounded-2xl border transition-all",
                compact ? "p-3.5 sm:p-4" : "p-4 sm:p-5",
                "border-indigo-500/35 bg-gradient-to-br from-indigo-500/10 via-slate-900/90 to-[#0A0B14] shadow-[0_0_30px_rgba(99,102,241,0.08)]"
              )}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  <Activity className="h-3.5 w-3.5 text-indigo-300" />
                  {sec.badge}
                </span>
              </div>
              <p
                className={cn(
                  "font-sans text-slate-200 leading-relaxed whitespace-pre-line font-normal",
                  compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
                )}
              >
                {renderFormattedMarkdownText(sec.body)}
                {isTyping && isLast && (
                  <span className="inline-block h-4 w-2 ml-1 bg-indigo-400 animate-pulse align-middle" />
                )}
              </p>
            </div>
          );
        }

        if (sec.type === "action") {
          return (
            <div
              key={sec.key}
              className={cn(
                "rounded-2xl border transition-all space-y-3.5",
                compact ? "p-3.5 sm:p-4" : "p-4 sm:p-5",
                "border-emerald-500/35 bg-gradient-to-br from-emerald-500/10 via-slate-900/90 to-[#0A0B14] shadow-[0_0_30px_rgba(16,185,129,0.08)]"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <Compass className="h-3.5 w-3.5 text-emerald-300" />
                  {sec.badge}
                </span>
              </div>

              {sec.body && (
                <p
                  className={cn(
                    "font-sans text-slate-200 leading-relaxed whitespace-pre-line",
                    compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
                  )}
                >
                  {renderFormattedMarkdownText(sec.body)}
                </p>
              )}

              {sec.doList.length > 0 && (
                <div className="space-y-2">
                  {sec.doList.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 sm:p-3.5 text-sm sm:text-base text-emerald-100"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="flex-1 leading-relaxed">
                        {renderFormattedMarkdownText(item)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {sec.dontList.length > 0 && (
                <div className="space-y-2 pt-1">
                  {sec.dontList.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-rose-500/35 bg-rose-950/40 p-3 sm:p-3.5 text-sm sm:text-base text-rose-100"
                    >
                      <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                      <div className="flex-1 leading-relaxed">
                        {renderFormattedMarkdownText(item)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isTyping && isLast && (
                <span className="inline-block h-4 w-2 ml-1 bg-emerald-400 animate-pulse align-middle" />
              )}
            </div>
          );
        }

        if (sec.type === "quote") {
          return (
            <div
              key={sec.key}
              className={cn(
                "rounded-2xl border transition-all text-center",
                compact ? "p-3 sm:p-4" : "p-4 sm:p-5",
                "border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-slate-900/80 to-[#0A0B14]"
              )}
            >
              <div className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-2">
                <Flame className="h-3.5 w-3.5 text-cyan-300" />
                {sec.badge}
              </div>
              <p
                className={cn(
                  "font-display italic text-cyan-100 leading-relaxed font-medium max-w-3xl mx-auto",
                  compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"
                )}
              >
                {renderFormattedMarkdownText(sec.body)}
                {isTyping && isLast && (
                  <span className="inline-block h-4 w-2 ml-1 bg-cyan-400 animate-pulse align-middle" />
                )}
              </p>
            </div>
          );
        }

        // Generic block
        return (
          <div
            key={sec.key}
            className={cn(
              "rounded-2xl border-l-4 transition-all border-l-slate-400 border border-slate-700/60 bg-slate-900/60",
              compact ? "p-3.5 sm:p-4" : "p-4 sm:p-5"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-md px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                {sec.badge}
              </span>
            </div>
            <p
              className={cn(
                "font-sans text-slate-100 leading-relaxed whitespace-pre-line font-normal",
                compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
              )}
            >
              {renderFormattedMarkdownText(sec.body)}
              {isTyping && isLast && (
                <span className="inline-block h-4 w-2 ml-1 bg-cyan-400 animate-pulse align-middle" />
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
