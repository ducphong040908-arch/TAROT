"use client";

import React, { useState } from "react";
import { X, Search, BookOpen } from "lucide-react";
import { FULL_TAROT_DECK, type TarotCardData } from "@/data/tarot-deck";
import { getCardDeepMeaning } from "@/data/tarot-meanings";
import { cn } from "@/lib/utils";

interface DeckCodexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeckCodexModal({ isOpen, onClose }: DeckCodexModalProps) {
  const [search, setSearch] = useState("");
  const [filterSuit, setFilterSuit] = useState<string>("ALL");
  const [selectedCard, setSelectedCard] = useState<TarotCardData>(FULL_TAROT_DECK[0]);

  if (!isOpen) return null;

  const filtered = FULL_TAROT_DECK.filter((c) => {
    const matchSuit =
      filterSuit === "ALL" ||
      (filterSuit === "MAJOR" && c.arcana === "MAJOR") ||
      c.suit === filterSuit;
    const q = search.toLowerCase();
    const matchText =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.viName.toLowerCase().includes(q) ||
      c.hexAddress.toLowerCase().includes(q) ||
      c.cyberMetaphor.toLowerCase().includes(q);
    return matchSuit && matchText;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-amber-500/35 bg-[#090A14] shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <div>
              <h2 className="font-display text-lg font-bold text-slate-100">
                TRA CỨU TOÀN BỘ 78 LÁ BÀI TAROT
              </h2>
              <p className="font-sans text-[11px] text-slate-400">
                22 Lá Ẩn Chính + 56 Lá Ẩn Phụ • Chuẩn Rider-Waite-Smith
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-300 hover:border-amber-400 hover:text-amber-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/60 px-5 py-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "ALL", label: "Tất cả (78)" },
              { id: "MAJOR", label: "Ẩn Chính (22)" },
              { id: "WANDS", label: "Gậy / Lửa (14)" },
              { id: "CUPS", label: "Cốc / Nước (14)" },
              { id: "SWORDS", label: "Kiếm / Khí (14)" },
              { id: "PENTACLES", label: "Tiền / Đất (14)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterSuit(tab.id)}
                className={cn(
                  "rounded-lg px-2.5 py-1 font-mono text-xs transition-all border",
                  filterSuit === tab.id
                    ? "border-amber-400 bg-amber-500/20 text-amber-200"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm tên lá, mã Hex (0x0A)..."
              className="w-full rounded-lg border border-slate-800 bg-slate-900 pl-8 pr-3 py-1.5 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Body Split View */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Card List */}
          <div className="md:col-span-5 overflow-y-auto border-r border-slate-800 p-3 space-y-1.5">
            {filtered.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setSelectedCard(card)}
                className={cn(
                  "w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all border",
                  selectedCard.id === card.id
                    ? "border-cyan-400/60 bg-cyan-500/10 text-slate-100"
                    : "border-transparent bg-slate-900/40 text-slate-300 hover:bg-slate-900"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-11 w-8 shrink-0 overflow-hidden rounded border border-amber-500/40 bg-[#05060D]">
                    <img
                      src={card.image}
                      alt={card.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-xs font-bold text-amber-200 truncate">
                      {card.hexAddress} — {card.name}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {card.viName}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-cyan-400 shrink-0 ml-2">
                  {card.element}
                </span>
              </button>
            ))}
          </div>

          {/* Right Selected Card Detail */}
          <div className="md:col-span-7 overflow-y-auto p-6 space-y-4">
            {(() => {
              const deep = getCardDeepMeaning(selectedCard.name);
              return (
                <>
                  <div className="flex flex-col sm:flex-row items-start gap-5 border-b border-slate-800 pb-4">
                    <div className="h-44 w-28 shrink-0 overflow-hidden rounded-xl border border-amber-400/60 bg-[#05060D] shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                      <img
                        src={selectedCard.image}
                        alt={selectedCard.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs text-cyan-400">
                          LÁ BÀI {selectedCard.hexAddress} • {selectedCard.romanNumeral}
                        </span>
                        <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-sans text-xs text-amber-200">
                          Nguyên tố: {selectedCard.elementVi}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-amber-300">
                        {selectedCard.name}
                      </h3>
                      <div className="text-sm text-slate-300 font-medium">
                        {selectedCard.viName}
                      </div>
                      <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/20 p-3 space-y-1.5">
                        <p className="text-xs text-slate-100 leading-relaxed">
                          <strong className="text-cyan-300">Bản chất: </strong>
                          {deep?.essence || selectedCard.cyberSubtext}
                        </p>
                        {deep?.symbols && (
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-amber-300">Biểu tượng: </strong>
                            {deep.symbols}
                          </p>
                        )}
                        {deep?.person && (
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-emerald-300">Hình mẫu nhân vật: </strong>
                            {deep.person}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-3.5 space-y-2">
                      <div className="font-sans text-xs font-bold text-emerald-300">
                        CHIỀU XUÔI (THUẬN)
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {deep?.up.general || selectedCard.meaningUpright}
                      </p>
                      {deep && (
                        <div className="space-y-1 pt-1 border-t border-emerald-500/20 text-[11px] text-slate-300">
                          <div><strong className="text-emerald-300">Tình yêu:</strong> {deep.up.love}</div>
                          <div><strong className="text-emerald-300">Sự nghiệp:</strong> {deep.up.career}</div>
                          <div><strong className="text-emerald-300">Học tập:</strong> {deep.up.study}</div>
                          <div><strong className="text-emerald-300">Tài chính:</strong> {deep.up.finance}</div>
                          <div><strong className="text-emerald-300">Sức khỏe:</strong> {deep.up.health}</div>
                        </div>
                      )}
                    </div>

                    <div className="rounded-xl border border-violet-500/30 bg-violet-950/15 p-3.5 space-y-2">
                      <div className="font-sans text-xs font-bold text-violet-300">
                        CHIỀU NGƯỢC
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {deep?.rev.general || selectedCard.meaningReversed}
                      </p>
                      {deep && (
                        <div className="space-y-1 pt-1 border-t border-violet-500/20 text-[11px] text-slate-300">
                          <div><strong className="text-violet-300">Tình yêu:</strong> {deep.rev.love}</div>
                          <div><strong className="text-violet-300">Sự nghiệp:</strong> {deep.rev.career}</div>
                          <div><strong className="text-violet-300">Học tập:</strong> {deep.rev.study}</div>
                          <div><strong className="text-violet-300">Tài chính:</strong> {deep.rev.finance}</div>
                          <div><strong className="text-violet-300">Sức khỏe:</strong> {deep.rev.health}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-3.5 text-xs text-amber-100">
                    <span className="font-sans font-bold text-amber-300 block mb-1">
                      [LỜI KHUYÊN HÀNH ĐỘNG]:
                    </span>
                    {deep?.advice || selectedCard.advice}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
