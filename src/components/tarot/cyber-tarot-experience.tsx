"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shuffle,
  Scissors,
  RotateCcw,
  BookOpen,
  Eye,
  Wand2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FULL_TAROT_DECK,
  SPREAD_CONFIGS,
  TOPIC_PRESETS,
  buildCustomSpread,
  type SpreadConfig,
  type TopicPreset,
} from "@/data/tarot-deck";
import { CosmicCircuitBg } from "@/components/ui/cosmic-circuit-bg";
import { AnimatedSpreadTabs } from "@/components/ui/animated-spread-tabs";
import {
  HoloTarotCard,
  type DrawnSlotCard,
} from "@/components/ui/holo-tarot-card";
import { StreamingOracleText } from "@/components/ui/streaming-oracle-text";
import { OracleChatTerminal } from "@/components/ui/oracle-chat-terminal";
import { DeckCodexModal } from "@/components/tarot/deck-codex-modal";
import {
  WaveDeckFan,
  type ShuffledDeckItem,
} from "@/components/tarot/wave-deck-fan";
import {
  physicalShuffleSession,
  cutDeck,
  loadPhysicalDeck,
  savePhysicalDeck,
  extractSubset,
  mergeSubsetBack,
  type PhysicalCardState,
} from "@/lib/physicalDeck";
import { executeTarotOracleClient } from "@/lib/geminiDirectClient";

type OracleStage = "STAGE_CONFIG" | "STAGE_DRAW" | "STAGE_SYNTHESIS";

const SESSION_STORAGE_KEY = "tarot_active_session_v1";

const ALL_CARD_IDS = FULL_TAROT_DECK.map((c) => c.id);
const CARD_BY_ID = new Map(FULL_TAROT_DECK.map((c) => [c.id, c]));
const MAJOR_CARD_IDS = new Set(
  FULL_TAROT_DECK.filter((c) => c.arcana === "MAJOR").map((c) => c.id)
);

/** Chuyển trạng thái bộ bài vật lý thành danh sách hiển thị trên quạt bài */
function toDeckPool(
  cards: PhysicalCardState[],
  useReversed: boolean
): ShuffledDeckItem[] {
  return cards.flatMap((c, idx) => {
    const card = CARD_BY_ID.get(c.id);
    if (!card) return [];
    return [
      {
        card,
        isReversed: useReversed && c.reversed,
        memOffset: `0x${(0x1000 + idx * 8).toString(16).toUpperCase()}`,
      },
    ];
  });
}

function cryptoRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 1) return 0;
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % maxExclusive;
  }
  return Math.floor(Math.random() * maxExclusive);
}

function cryptoShuffle<T>(items: T[]): T[] {
  const copy = [...items];
  if (typeof window !== "undefined" && window.crypto?.getRandomValues && copy.length > 1) {
    const randBuf = new Uint32Array(copy.length);
    window.crypto.getRandomValues(randBuf);
    for (let i = copy.length - 1; i > 0; i--) {
      const j = randBuf[i] % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateEntropyHash(): string {
  const chars = "0123456789ABCDEF";
  let out = "0x";
  for (let i = 0; i < 16; i++) {
    out += chars[cryptoRandomInt(chars.length)];
  }
  return out;
}

export function CyberTarotExperience() {
  // FSM Stage
  const [stage, setStage] = useState<OracleStage>("STAGE_CONFIG");

  // Configuration State
  const [selectedSpreadId, setSelectedSpreadId] = useState<
    "single" | "three" | "five" | "custom"
  >("three");
  const [customCardCount, setCustomCardCount] = useState<number>(3);
  const [selectedTopic, setSelectedTopic] = useState<TopicPreset>(
    TOPIC_PRESETS[0]
  );
  const [question, setQuestion] = useState<string>("");

  // Tarotap Hardware Switches
  const [allowReversed, setAllowReversed] = useState<boolean>(true);
  const [majorOnly, setMajorOnly] = useState<boolean>(false);
  const [flipImmediately, setFlipImmediately] = useState<boolean>(false);
  const [skipQuestionMode, setSkipQuestionMode] = useState<boolean>(false);

  // Deck & Table State
  const [entropyHash, setEntropyHash] = useState<string>("0x7F4A9C2E1B80D3A5");
  const [deckPool, setDeckPool] = useState<ShuffledDeckItem[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnSlotCard[]>([]);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [shufflePhase, setShufflePhase] = useState<
    "idle" | "gather" | "riffle" | "fan"
  >("idle");
  const [drawingCardId, setDrawingCardId] = useState<number | null>(null);
  const [isCutting, setIsCutting] = useState<boolean>(false);
  const [cutNotice, setCutNotice] = useState<string | null>(null);

  // Synthesis & Codex State
  const [synthesisText, setSynthesisText] = useState<string>("");
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [activeModelBadge, setActiveModelBadge] =
    useState<string>("GEMINI-3.8-FLASH");
  const [isCodexOpen, setIsCodexOpen] = useState<boolean>(false);

  const synthesisSectionRef = useRef<HTMLDivElement>(null);
  const shuffleTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const hasRestoredSessionRef = useRef<boolean>(false);

  const clearShuffleTimers = useCallback(() => {
    shuffleTimersRef.current.forEach((timerId) => clearTimeout(timerId));
    shuffleTimersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearShuffleTimers();
    };
  }, [clearShuffleTimers]);

  // Active Spread Config
  const activeSpread: SpreadConfig =
    selectedSpreadId === "custom"
      ? buildCustomSpread(customCardCount)
      : SPREAD_CONFIGS.find((s) => s.id === selectedSpreadId) ||
        SPREAD_CONFIGS[1];

  /**
   * Nạp bộ bài vật lý (thứ tự + chiều được lưu giữa các lần bói).
   * shuffle = true: người đọc thực hiện một lượt tráo bài thật (chia - xoay một xấp - riffle - cắt).
   */
  const initializeDeck = useCallback(
    (useMajorOnly: boolean, useReversed: boolean, shuffle = true) => {
      let fullDeck = loadPhysicalDeck(ALL_CARD_IDS);
      let working = useMajorOnly
        ? extractSubset(fullDeck, MAJOR_CARD_IDS)
        : fullDeck;

      if (shuffle) {
        working = physicalShuffleSession(working, useReversed);
        fullDeck = useMajorOnly ? mergeSubsetBack(fullDeck, working) : working;
        savePhysicalDeck(fullDeck);
      }

      setDeckPool(toDeckPool(working, useReversed));
      setEntropyHash(generateEntropyHash());
    },
    []
  );

  // Khi mở trang hoặc đổi tùy chọn: chỉ nhìn bộ bài đang nằm trên bàn, chưa tráo
  useEffect(() => {
    initializeDeck(majorOnly, allowReversed, false);
  }, [initializeDeck, majorOnly, allowReversed]);

  // Restore active reading from sessionStorage on initial mount (safe try/catch)
  useEffect(() => {
    if (hasRestoredSessionRef.current) return;
    hasRestoredSessionRef.current = true;
    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.drawnCards) && parsed.drawnCards.length > 0) {
        if (parsed.selectedSpreadId) setSelectedSpreadId(parsed.selectedSpreadId);
        if (typeof parsed.customCardCount === "number") {
          setCustomCardCount(parsed.customCardCount);
        }
        if (parsed.selectedTopicId) {
          const foundTopic = TOPIC_PRESETS.find((t) => t.id === parsed.selectedTopicId);
          if (foundTopic) setSelectedTopic(foundTopic);
        }
        if (typeof parsed.question === "string") setQuestion(parsed.question);
        setDrawnCards(parsed.drawnCards);
        if (typeof parsed.synthesisText === "string") {
          setSynthesisText(parsed.synthesisText);
        }
        if (parsed.stage === "STAGE_DRAW" || parsed.stage === "STAGE_SYNTHESIS") {
          setStage(parsed.stage);
        }
      }
    } catch {
      // Ignore storage access or JSON parse errors
    }
  }, []);

  // Persist active reading into sessionStorage with QuotaExceededError guard
  useEffect(() => {
    if (!hasRestoredSessionRef.current) return;
    try {
      if (stage === "STAGE_CONFIG" && drawnCards.length === 0) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        return;
      }
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          stage,
          selectedSpreadId,
          customCardCount,
          selectedTopicId: selectedTopic.id,
          question,
          drawnCards,
          synthesisText,
        })
      );
    } catch {
      // Safe fallback for Safari Private Mode / QuotaExceededError
    }
  }, [
    stage,
    selectedSpreadId,
    customCardCount,
    selectedTopic.id,
    question,
    drawnCards,
    synthesisText,
  ]);

  // Trigger AI Synthesis when all drawn cards are flipped
  const triggerSynthesis = useCallback(
    async (cardsToDecode: DrawnSlotCard[]) => {
      if (cardsToDecode.length === 0) return;
      setIsSynthesizing(true);
      setSynthesisText("");

      try {
        const data = await executeTarotOracleClient({
          mode: "synthesis",
          question,
          topic: selectedTopic.name,
          spreadName: activeSpread.viName,
          cards: cardsToDecode.map((d, idx) => ({
            slotLabel:
              activeSpread.slots[idx]?.viLabel || `Lá thứ ${idx + 1}`,
            slotCode: activeSpread.slots[idx]?.code || `REG_0${idx}`,
            hexAddress: d.card.hexAddress,
            name: d.card.name,
            viName: d.card.viName,
            isReversed: d.isReversed,
            element: d.card.elementVi,
            cyberMetaphor: d.card.cyberMetaphor,
            meaning: d.isReversed
              ? d.card.meaningReversed
              : d.card.meaningUpright,
            advice: d.card.advice,
          })),
        });

        setSynthesisText(data.answer || data.reply || "");
        if (data.model) {
          setActiveModelBadge(String(data.model).toUpperCase());
        }
      } catch (err) {
        console.error("Lỗi luận giải:", err);
        setSynthesisText(
          "Hệ thống đã giải mã các thanh ghi bài. Xem chi tiết từng lá bài phía trên và đặt câu hỏi trực tiếp ở khung Chat bên dưới."
        );
      } finally {
        setIsSynthesizing(false);
      }
    },
    [question, selectedTopic.name, activeSpread, entropyHash]
  );

  // Watch if all required slots are drawn and flipped -> transition to STAGE_SYNTHESIS
  useEffect(() => {
    if (
      drawnCards.length === activeSpread.cardCount &&
      drawnCards.every((c) => c.isFlipped) &&
      stage === "STAGE_DRAW"
    ) {
      setStage("STAGE_SYNTHESIS");
      if (!skipQuestionMode && !synthesisText) {
        triggerSynthesis(drawnCards);
      }
      const scrollTimer = setTimeout(() => {
        synthesisSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 350);
      return () => clearTimeout(scrollTimer);
    }
  }, [
    drawnCards,
    activeSpread.cardCount,
    stage,
    skipQuestionMode,
    synthesisText,
    triggerSynthesis,
  ]);

  // Handlers
  const handleSelectSpread = (
    id: "single" | "three" | "five" | "custom",
    customCount?: number
  ) => {
    setSelectedSpreadId(id);
    if (customCount) setCustomCardCount(customCount);
    setDrawnCards([]);
    setSynthesisText("");
  };

  const handleLockAndStart = () => {
    setDrawnCards([]);
    setSynthesisText("");
    initializeDeck(majorOnly, allowReversed);
    setStage("STAGE_DRAW");
  };

  const handleShuffleDeck = () => {
    if (isShuffling) return;
    clearShuffleTimers();
    setIsShuffling(true);
    setDrawnCards([]);
    setSynthesisText("");
    setStage("STAGE_DRAW");
    setCutNotice("Đang gom toàn bộ lá bài về trung tâm...");
    setShufflePhase("gather");

    // Phase 2: Riffle shuffle weave
    const t1 = setTimeout(() => {
      setShufflePhase("riffle");
      setCutNotice("Đang tráo và đan bài...");
    }, 450);

    // Phase 3: Fan back out smoothly
    const t2 = setTimeout(() => {
      initializeDeck(majorOnly, allowReversed);
      setEntropyHash(generateEntropyHash());
      setShufflePhase("fan");
      setCutNotice("Đang xòe lại bộ bài...");
    }, 950);

    // Phase 4: Settle & Ready
    const t3 = setTimeout(() => {
      setShufflePhase("idle");
      setIsShuffling(false);
      setCutNotice(
        "Đã tráo bài xong! Hãy chọn những lá bài bạn cảm thấy thu hút nhất."
      );
      const t4 = setTimeout(() => setCutNotice(null), 2500);
      shuffleTimersRef.current.push(t4);
    }, 1450);

    shuffleTimersRef.current.push(t1, t2, t3);
  };

  const handleCutDeck = () => {
    if (isCutting || deckPool.length < 4) return;
    setIsCutting(true);
    // Cắt bài vật lý: nhấc xấp trên đặt xuống dưới, không làm đổi chiều lá nào
    const fullDeck = loadPhysicalDeck(ALL_CARD_IDS);
    const working = majorOnly ? extractSubset(fullDeck, MAJOR_CARD_IDS) : fullDeck;
    const { deck: cutWorking, cutAt: pivot } = cutDeck(working);
    savePhysicalDeck(majorOnly ? mergeSubsetBack(fullDeck, cutWorking) : cutWorking);
    setDeckPool(toDeckPool(cutWorking, allowReversed));
    setEntropyHash(generateEntropyHash());
    setCutNotice(`Đã cắt bài thành công tại vị trí lá thứ #${pivot}!`);
    const t1 = setTimeout(() => {
      setIsCutting(false);
      const t2 = setTimeout(() => setCutNotice(null), 2000);
      shuffleTimersRef.current.push(t2);
    }, 350);
    shuffleTimersRef.current.push(t1);
  };

  const handlePickCardFromFan = useCallback(
    (deckItem: ShuffledDeckItem) => {
      if (drawnCards.length >= activeSpread.cardCount) return;
      if (drawnCards.some((d) => d.card.id === deckItem.card.id)) return;
      if (drawingCardId !== null) return;

      setDrawingCardId(deckItem.card.id);

      const nextSlotIndex = drawnCards.length;
      const newDrawn: DrawnSlotCard = {
        slotIndex: nextSlotIndex,
        card: deckItem.card,
        isReversed: deckItem.isReversed,
        isFlipped: flipImmediately,
      };

      // Graceful spring float into slot
      const t = setTimeout(() => {
        setDrawnCards((prev) => [...prev, newDrawn]);
        setDrawingCardId(null);
      }, 180);
      shuffleTimersRef.current.push(t);
    },
    [drawnCards, activeSpread.cardCount, drawingCardId, flipImmediately]
  );

  const handleAutoDrawRemaining = () => {
    const remainingNeeded = activeSpread.cardCount - drawnCards.length;
    if (remainingNeeded <= 0) return;

    const available = deckPool.filter(
      (item) => !drawnCards.some((d) => d.card.id === item.card.id)
    );
    const shuffledAvailable = cryptoShuffle(available);
    const picked = shuffledAvailable.slice(0, remainingNeeded);

    const newEntries: DrawnSlotCard[] = picked.map((item, idx) => ({
      slotIndex: drawnCards.length + idx,
      card: item.card,
      isReversed: item.isReversed,
      isFlipped: flipImmediately,
    }));

    setDrawnCards((prev) => [...prev, ...newEntries]);
    setCutNotice(`Đã rút ngẫu nhiên ${remainingNeeded} lá bài!`);
    const t = setTimeout(() => setCutNotice(null), 2200);
    shuffleTimersRef.current.push(t);
  };

  const handleFlipSlotCard = (slotIdx: number) => {
    setDrawnCards((prev) =>
      prev.map((item, i) =>
        i === slotIdx ? { ...item, isFlipped: true } : item
      )
    );
  };

  const handleFlipAllCards = () => {
    setDrawnCards((prev) => prev.map((item) => ({ ...item, isFlipped: true })));
  };

  const handleResetAll = () => {
    clearShuffleTimers();
    setDrawnCards([]);
    setSynthesisText("");
    setStage("STAGE_CONFIG");
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const availableDeckCards = deckPool.filter(
    (item) => !drawnCards.some((d) => d.card.id === item.card.id)
  );

  const allSlotsFilled = drawnCards.length === activeSpread.cardCount;
  const allSlotsFlipped =
    allSlotsFilled && drawnCards.every((c) => c.isFlipped);

  return (
    <div className="relative min-h-screen w-full text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient Cosmic & PCB Background */}
      <CosmicCircuitBg />

      {/* 78-Card Codex Lookup Modal */}
      <DeckCodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
      />

      {/* ================= TOP TELEMETRY HUD HEADER ================= */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#05050A]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:py-3">
          {/* Left: 30 Years FET Brand Logo */}
          <div className="flex items-center shrink-0">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/image_3.png`}
              alt="Logo 30 Năm FET UET (1996 - 2026) - Pioneering Creative"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_24px_rgba(245,158,11,0.25)]"
              loading="eager"
            />
          </div>

          {/* Center: Stepper 1, 2, 3 (CHỌN BÀI -> RÚT BÀI -> PHÂN TÍCH CHUYÊN SÂU) */}
          <div className="flex items-center justify-center flex-1 overflow-x-auto py-1">
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-slate-800/90 bg-[#0A0B14] p-1.5 text-xs font-semibold shadow-inner shrink-0">
              <button
                type="button"
                onClick={() => setStage("STAGE_CONFIG")}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 sm:py-2 transition-all font-sans whitespace-nowrap",
                  stage === "STAGE_CONFIG"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)] font-bold"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. CHỌN BÀI
              </button>
              <span className="text-slate-600 px-0.5">→</span>
              <button
                type="button"
                onClick={() => setStage("STAGE_DRAW")}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 sm:py-2 transition-all font-sans whitespace-nowrap",
                  stage === "STAGE_DRAW"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-bold"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. RÚT BÀI ({drawnCards.length}/{activeSpread.cardCount})
              </button>
              <span className="text-slate-600 px-0.5">→</span>
              <button
                type="button"
                disabled={!allSlotsFlipped}
                onClick={() => {
                  if (allSlotsFlipped) setStage("STAGE_SYNTHESIS");
                }}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 sm:py-2 transition-all font-sans whitespace-nowrap disabled:opacity-40",
                  stage === "STAGE_SYNTHESIS"
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] font-bold"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. PHÂN TÍCH CHUYÊN SÂU
              </button>
            </div>
          </div>

          {/* Right: 78 Lá Bài Codex Button */}
          <div className="flex items-center justify-end shrink-0">
            <button
              type="button"
              onClick={() => setIsCodexOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-amber-200 transition-all hover:border-amber-400 hover:bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)] whitespace-nowrap"
            >
              <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-300" />
              <span>78 LÁ BÀI</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN WORKSPACE CONTAINER ================= */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-4 pb-12 space-y-6 sm:space-y-7">
        {/* Hero Title Banner (Lexend Font) */}
        <section className="text-center max-w-5xl mx-auto pt-2 pb-1 space-y-1 sm:space-y-1.5">
          <h1
            className="hero-title text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-normal select-none"
            style={{ fontFamily: "var(--font-lexend), system-ui, sans-serif" }}
          >
            <span className="inline-block py-0.5 bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(245,158,11,0.22)]">
              LẮNG NGHE VŨ TRỤ, HIỂU RÕ CHÍNH MÌNH
            </span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-amber-200/80 tracking-wider font-medium">
            Khám phá bản thân qua lá bài tarot
          </p>
        </section>

        {/* ================= STATE 1: QUERY & SPREAD CONFIGURATION ================= */}
        {stage === "STAGE_CONFIG" && (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
          >
            <AnimatedSpreadTabs
              selectedSpreadId={selectedSpreadId}
              customCardCount={customCardCount}
              onSelectSpread={handleSelectSpread}
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic}
              question={question}
              onChangeQuestion={setQuestion}
              allowReversed={allowReversed}
              onToggleReversed={() => setAllowReversed((v) => !v)}
              majorOnly={majorOnly}
              onToggleMajorOnly={() => setMajorOnly((v) => !v)}
              flipImmediately={flipImmediately}
              onToggleFlipMode={() => setFlipImmediately((v) => !v)}
              skipQuestionMode={skipQuestionMode}
              onToggleSkipQuestion={() => setSkipQuestionMode((v) => !v)}
              entropyHash={entropyHash}
              onLockAndStart={handleLockAndStart}
            />
          </motion.section>
        )}

        {/* ================= STATE 2 & 3: INTERACTIVE 78-CARD DECK & 3D TABLE ================= */}
        {(stage === "STAGE_DRAW" || stage === "STAGE_SYNTHESIS") && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Deck Manipulation & Telemetry Control Bar (Tarotap Controls) */}
            <div className="rounded-2xl border border-amber-500/25 bg-[#0B0C14]/90 p-4 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 font-mono text-xs text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>ĐỔI CẤU HÌNH</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShuffleDeck}
                    disabled={isShuffling}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/15 px-3.5 py-2 font-sans text-xs font-semibold text-amber-200 transition-all hover:bg-amber-500/25"
                  >
                    <Shuffle
                      className={cn("h-3.5 w-3.5", isShuffling && "animate-spin")}
                    />
                    <span>XÀO BÀI</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCutDeck}
                    disabled={isCutting}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-3.5 py-2 font-sans text-xs font-semibold text-cyan-200 transition-all hover:bg-cyan-500/25 disabled:opacity-50"
                  >
                    <Scissors className="h-3.5 w-3.5" />
                    <span>CẮT BÀI</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {!allSlotsFilled && (
                    <button
                      type="button"
                      onClick={handleAutoDrawRemaining}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-2 font-sans text-xs font-semibold text-emerald-200 hover:bg-emerald-500/25"
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                      <span>
                        NGẪU NHIÊN ({activeSpread.cardCount - drawnCards.length} LÁ CÒN LẠI)
                      </span>
                    </button>
                  )}

                  {allSlotsFilled && !allSlotsFlipped && (
                    <button
                      type="button"
                      onClick={handleFlipAllCards}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-400 px-4 py-2 font-sans text-xs font-bold uppercase text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] animate-pulse"
                    >
                      <Eye className="h-4 w-4" />
                      <span>LẬT TẤT CẢ ({activeSpread.cardCount} LÁ)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-2.5 text-xs text-slate-300">
                <div>
                  {cutNotice ? (
                    <span className="text-amber-300 font-semibold">
                      ⚡ {cutNotice}
                    </span>
                  ) : !allSlotsFilled ? (
                    <span>
                      👉 Hãy chạm vào{" "}
                      <strong className="text-amber-300">
                        {activeSpread.cardCount - drawnCards.length} lá bài
                      </strong>{" "}
                      bạn cảm thấy thu hút nhất từ bộ bài bên dưới.
                    </span>
                  ) : !allSlotsFlipped ? (
                    <span className="text-cyan-300">
                      ✨ Đã rút đủ {activeSpread.cardCount} lá! Hãy chạm vào từng lá bài trên bàn (hoặc bấm nút Lật Tất Cả) để mở bài.
                    </span>
                  ) : (
                    <span className="text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Toàn bộ lá bài đã mở! Xem bản phân tích và hỏi đáp chuyên sâu phía dưới.
                    </span>
                  )}
                </div>

                <div className="text-slate-400 text-[11px]">
                  Bộ bài còn lại:{" "}
                  <strong className="text-amber-300">{availableDeckCards.length} lá</strong>
                </div>
              </div>
            </div>

            {/* Interactive 78-Card Fan / Wave Deck (Memoized Component) */}
            <AnimatePresence>
              {!allSlotsFilled && (
                <WaveDeckFan
                  availableDeckCards={availableDeckCards}
                  majorOnly={majorOnly}
                  isShuffling={isShuffling}
                  shufflePhase={shufflePhase}
                  drawingCardId={drawingCardId}
                  onPickCard={handlePickCardFromFan}
                />
              )}
            </AnimatePresence>

            {/* ================= 3D SPREAD TABLE & CARD SLOTS ================= */}
            <div className="rounded-3xl border border-cyan-500/25 bg-[#090B15]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_70px_rgba(0,0,0,0.75)]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-slate-100 tracking-wide">
                    Bàn trải bài {activeSpread.cardCount} lá
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-sans text-xs text-amber-300 font-semibold">
                    ĐÃ RÚT: {drawnCards.length} / {activeSpread.cardCount} LÁ
                  </span>
                  {drawnCards.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setDrawnCards([]);
                        setSynthesisText("");
                        setStage("STAGE_DRAW");
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-sans text-xs text-slate-300 hover:border-rose-400 hover:text-rose-300"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>RÚT LẠI</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Slots Grid */}
              <div
                className={cn(
                  "grid gap-6 justify-items-center",
                  activeSpread.cardCount === 1
                    ? "grid-cols-1"
                    : activeSpread.cardCount === 2
                    ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                    : activeSpread.cardCount === 3
                    ? "grid-cols-1 md:grid-cols-3"
                    : activeSpread.cardCount === 4
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                )}
              >
                {activeSpread.slots.map((slotMeta, idx) => {
                  const drawn = drawnCards[idx];
                  return (
                    <div
                      key={slotMeta.index}
                      className="flex flex-col items-center space-y-2"
                    >
                      {drawn ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.84, y: 32 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 280, damping: 22 }}
                          className="flex flex-col items-center"
                        >
                          <HoloTarotCard
                            card={drawn.card}
                            isReversed={drawn.isReversed}
                            isFlipped={drawn.isFlipped}
                            slotViLabel={`Lá ${idx + 1}`}
                            onClick={() => handleFlipSlotCard(idx)}
                            size={activeSpread.cardCount === 1 ? "lg" : "md"}
                          />
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex flex-col items-center text-center">
                            <span className="font-sans text-xs font-semibold text-slate-300">
                              Lá {idx + 1}
                            </span>
                          </div>
                          <div
                            className={cn(
                              "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/40 p-4 text-center transition-all",
                              activeSpread.cardCount === 1
                                ? "w-64 sm:w-72 h-[450px] sm:h-[500px]"
                                : "w-[216px] sm:w-[236px] h-[375px] sm:h-[410px]"
                            )}
                          >
                            <div className="h-12 w-12 rounded-full border border-slate-800 bg-slate-900/60 flex items-center justify-center font-mono text-sm text-slate-400 mb-2 font-bold">
                              0{idx + 1}
                            </div>
                            <span className="font-sans text-xs text-slate-400 font-medium">
                              Vị trí lá thứ {idx + 1}
                            </span>
                            <p className="text-[11px] text-slate-500 mt-1">
                              Chạm lá bài bất kỳ ở trên để rút vào đây
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= STATE 3: AI ORACLE SYNTHESIS & DEEP-DIVE CHAT ================= */}
            {allSlotsFlipped && !skipQuestionMode && (
              <div ref={synthesisSectionRef} className="space-y-8 pt-4">
                <StreamingOracleText
                  drawnCards={drawnCards}
                  spreadConfig={activeSpread}
                  question={question}
                  topicName={selectedTopic.name}
                  synthesisText={synthesisText}
                  isSynthesizing={isSynthesizing}
                  activeModelBadge={activeModelBadge}
                  onRegenerateSynthesis={() => triggerSynthesis(drawnCards)}
                />

                <OracleChatTerminal
                  drawnCards={drawnCards}
                  spreadConfig={activeSpread}
                  initialQuestion={question}
                  topicName={selectedTopic.name}
                />
              </div>
            )}
          </motion.section>
        )}
      </main>
    </div>
  );
}
