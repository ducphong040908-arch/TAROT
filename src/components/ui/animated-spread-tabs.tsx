"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Heart,
  Sparkles,
  GitBranch,
  Layers,
  Terminal,
  Shuffle,
  Sliders,
  Zap,
  RotateCcw,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SPREAD_CONFIGS,
  TOPIC_PRESETS,
  type SpreadConfig,
  type TopicPreset,
} from "@/data/tarot-deck";

interface AnimatedSpreadTabsProps {
  selectedSpreadId: "single" | "three" | "five" | "custom";
  customCardCount: number;
  onSelectSpread: (id: "single" | "three" | "five" | "custom", customCount?: number) => void;
  selectedTopic: TopicPreset;
  onSelectTopic: (topic: TopicPreset) => void;
  question: string;
  onChangeQuestion: (q: string) => void;
  allowReversed: boolean;
  onToggleReversed: () => void;
  majorOnly: boolean;
  onToggleMajorOnly: () => void;
  flipImmediately: boolean;
  onToggleFlipMode: () => void;
  skipQuestionMode: boolean;
  onToggleSkipQuestion: () => void;
  entropyHash: string;
  onLockAndStart: () => void;
}

export function AnimatedSpreadTabs({
  selectedSpreadId,
  customCardCount,
  onSelectSpread,
  selectedTopic,
  onSelectTopic,
  question,
  onChangeQuestion,
  allowReversed,
  onToggleReversed,
  majorOnly,
  onToggleMajorOnly,
  flipImmediately,
  onToggleFlipMode,
  skipQuestionMode,
  onToggleSkipQuestion,
  entropyHash,
  onLockAndStart,
}: AnimatedSpreadTabsProps) {
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case "Heart":
        return <Heart className="h-4 w-4 text-rose-400" />;
      case "Cpu":
        return <Cpu className="h-4 w-4 text-cyan-400" />;
      case "Sparkles":
        return <Sparkles className="h-4 w-4 text-amber-400" />;
      default:
        return <GitBranch className="h-4 w-4 text-violet-400" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 1. Domain Topic Selector */}
      <div className="rounded-2xl border border-amber-500/20 bg-[#0B0C14]/90 p-5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.65)]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-amber-300">
              BƯỚC 1: CHỌN CHỦ ĐỀ
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TOPIC_PRESETS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => onSelectTopic(topic)}
                className={cn(
                  "relative flex flex-col items-start rounded-xl p-3.5 text-left transition-all duration-200 border",
                  isSelected
                    ? "border-amber-400/60 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.15)]"
                    : "border-slate-800/80 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/60"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-topic-pill"
                    className="absolute inset-0 rounded-xl border border-amber-400/50 pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  />
                )}
                <div className="flex items-center justify-between w-full mb-1.5">
                  <div className="flex items-center gap-2 font-medium text-sm text-slate-100">
                    {getTopicIcon(topic.iconName)}
                    <span>{topic.name}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Spread Architecture Tabs */}
      <div className="rounded-2xl border border-cyan-500/20 bg-[#0B0C14]/90 p-5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.65)]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-cyan-300">
              BƯỚC 2: CHỌN SỐ LÁ BÀI
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {SPREAD_CONFIGS.map((spread: SpreadConfig) => {
            const active = selectedSpreadId === spread.id;
            return (
              <button
                key={spread.id}
                type="button"
                onClick={() => onSelectSpread(spread.id)}
                className={cn(
                  "relative flex flex-col justify-between rounded-xl p-4 text-left transition-all border",
                  active
                    ? "border-cyan-400/70 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.18)]"
                    : "border-slate-800/80 bg-slate-950/60 hover:border-slate-700"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="active-spread-border"
                    className="absolute inset-0 rounded-xl border-2 border-cyan-400/60 pointer-events-none"
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  />
                )}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center rounded-md bg-cyan-500/15 px-2 py-0.5 font-sans text-[11px] font-semibold text-cyan-300 border border-cyan-500/30">
                      {spread.badge}
                    </span>
                    <span className="font-sans text-xs text-amber-400 font-semibold">
                      {spread.cardCount} Lá
                    </span>
                  </div>
                  <h3 className="font-sans text-base font-bold text-slate-100 mb-1">
                    {spread.viName}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {spread.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Deck Options & Question Prompt Input */}
      <div className="rounded-2xl border border-violet-500/25 bg-[#0B0C14]/90 p-5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.65)] space-y-5">
        {/* Hardware Switches Row (3 columns, removed skipQuestion) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={onToggleReversed}
            className={cn(
              "flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-all",
              allowReversed
                ? "border-violet-500/50 bg-violet-500/10 text-violet-200"
                : "border-slate-800 bg-slate-950/60 text-slate-400"
            )}
          >
            <div className="flex items-center gap-2">
              <RotateCcw className="h-3.5 w-3.5 text-violet-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold">Lá Bài Ngược</div>
                <div className="text-[10px] opacity-80">
                  {allowReversed ? "Xoay một xấp khi tráo (như bài thật)" : "Chỉ bốc bài xuôi"}
                </div>
              </div>
            </div>
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                allowReversed ? "bg-violet-400 shadow-[0_0_8px_#a78bfa]" : "bg-slate-600"
              )}
            />
          </button>

          <button
            type="button"
            onClick={onToggleMajorOnly}
            className={cn(
              "flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-all",
              majorOnly
                ? "border-amber-500/50 bg-amber-500/10 text-amber-200"
                : "border-slate-800 bg-slate-950/60 text-slate-400"
            )}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold">Kho Bài Sử Dụng</div>
                <div className="text-[10px] opacity-80">
                  {majorOnly ? "22 Lá Ẩn Chính" : "Trọn bộ 78 lá Tarot"}
                </div>
              </div>
            </div>
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                majorOnly ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]" : "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
              )}
            />
          </button>

          <button
            type="button"
            onClick={onToggleFlipMode}
            className={cn(
              "flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-all",
              flipImmediately
                ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-200"
                : "border-slate-800 bg-slate-950/60 text-slate-400"
            )}
          >
            <div className="flex items-center gap-2">
              <Eye className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold">Chế Độ Lật Bài</div>
                <div className="text-[10px] opacity-80">
                  {flipImmediately ? "Lật ngay khi bốc" : "Lật sau khi chọn đủ"}
                </div>
              </div>
            </div>
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                flipImmediately ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-amber-400"
              )}
            />
          </button>
        </div>

        {/* Question Prompt Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="oracle-question-input"
              className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-amber-300"
            >
              <Terminal className="h-4 w-4 text-amber-400" />
              <span>BƯỚC 3: CÒN ĐIỀU GÌ NÓI ĐÊ ?</span>
            </label>
          </div>

          <div className="relative group">
            <div className=" -inset-0.5 rounded-xl bg-gradient-to-r from-amber-500/30 via-violet-500/30 to-cyan-500/30 opacity-60 blur transition duration-500 group-focus-within:opacity-100 absolute" />
            <div className="relative flex flex-col rounded-xl border border-amber-500/30 bg-[#07080F] p-3">
              <textarea
                id="oracle-question-input"
                rows={2}
                value={question}
                onChange={(e) => onChangeQuestion(e.target.value)}
                placeholder="Nhập câu hỏi hoặc chia sẻ điều bạn đang trăn trở (hoặc chọn câu hỏi gợi ý bên dưới)..."
                className="w-full resize-none bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none leading-relaxed"
              />
              {question.trim().length > 0 && (
                <div className="mt-2 flex justify-end pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onChangeQuestion("")}
                    className="text-[11px] text-slate-400 hover:text-amber-300 font-medium"
                  >
                    [Xóa câu hỏi]
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-400">
              Gợi ý câu hỏi theo chủ đề ({selectedTopic.name}):
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedTopic.sampleQuestions.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChangeQuestion(sample)}
                  className="rounded-lg border border-slate-800 bg-slate-900/75 px-3 py-1.5 text-left text-xs text-slate-300 transition-all hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-200"
                >
                  “{sample}”
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Launch Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" />
            <span>
              Kho bài: <strong>{majorOnly ? "22 Lá Ẩn Chính" : "78 Lá Đầy Đủ"}</strong> • Số lá rút:{" "}
              <strong className="text-amber-300">
                {SPREAD_CONFIGS.find((s) => s.id === selectedSpreadId)?.cardCount} Lá
              </strong>
            </span>
          </div>

          <button
            type="button"
            onClick={onLockAndStart}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 p-[1.5px] font-sans text-xs font-bold uppercase tracking-wider text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all hover:shadow-[0_0_40px_rgba(6,182,212,0.45)]"
          >
            <span className="flex items-center gap-2.5 rounded-[10px] bg-[#090A12] px-6 py-3 text-amber-300 transition-all group-hover:bg-transparent group-hover:text-slate-950">
              <Zap className="h-4 w-4" />
              <span>BẮT ĐẦU RÚT BÀI →</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
