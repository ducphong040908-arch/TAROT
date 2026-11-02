"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Terminal,
  MessageSquarePlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DrawnSlotCard } from "@/components/ui/holo-tarot-card";
import type { SpreadConfig } from "@/data/tarot-deck";
import { executeTarotOracleClient } from "@/lib/geminiDirectClient";

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-cyan-300">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function ChatMarkdownText({ content }: { content: string }) {
  // Loại bỏ các tiêu đề ### cũ nếu có để giữ giọng văn tự nhiên
  const cleaned = content.replace(/^###\s*[✦•\-*]?\s*/gm, "");
  const paragraphs = cleaned.split(/\n\s*\n/);

  return (
    <div className="space-y-2.5 font-sans text-sm sm:text-base leading-relaxed text-slate-200">
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        const lines = trimmed.split("\n");
        const isList = lines.every((l) => {
          const t = l.trim();
          return t.startsWith("- ") || t.startsWith("* ") || t.startsWith("• ");
        });

        if (isList) {
          return (
            <ul key={pIdx} className="space-y-1.5 pl-1 my-1">
              {lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^[-*•]\s*/, "");
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="text-cyan-400 select-none mt-1 shrink-0 text-xs">◆</span>
                    <span className="flex-1">{renderInlineMarkdown(itemText)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={pIdx} className="leading-relaxed">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface OracleChatTerminalProps {
  drawnCards: DrawnSlotCard[];
  spreadConfig: SpreadConfig;
  initialQuestion: string;
  topicName: string;
}

export function OracleChatTerminal({
  drawnCards,
  spreadConfig,
  initialQuestion,
  topicName,
}: OracleChatTerminalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeModel, setActiveModel] = useState("gemini-3.8-flash");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Generate dynamic follow-up chips based on the actual cards drawn!
  const firstCard = drawnCards[0]?.card;
  const lastCard = drawnCards[drawnCards.length - 1]?.card;
  const hasReversed = drawnCards.some((d) => d.isReversed);

  const dynamicFollowUps = [
    firstCard
      ? `Lá ${firstCard.name} khuyên tôi nên hành động cụ thể gì trong 7 ngày tới?`
      : "Tôi nên hành động cụ thể gì trong 7 ngày tới?",
    hasReversed
      ? "Làm thế nào để hóa giải các thách thức từ lá bài ngược trong trải bài này?"
      : "Đâu là cơ hội vàng lớn nhất tôi cần nắm bắt ngay từ trải bài này?",
    lastCard && drawnCards.length > 1
      ? `Sự kết nối giữa ${firstCard?.name} và ${lastCard.name} báo hiệu bước ngoặt nào sắp tới?`
      : `Dấu hiệu thực tế nào cho thấy tôi đang đi đúng hướng trong chủ đề ${topicName}?`,
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendQuestion = async (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setIsLoading(true);

    try {
      const data = await executeTarotOracleClient({
        mode: "chat",
        question: trimmed,
        initialQuestion,
        topic: topicName,
        spreadName: spreadConfig.viName,
        cards: drawnCards.map((d, idx) => ({
          slotLabel: `Lá ${idx + 1}`,
          slotCode: `LÁ ${idx + 1}`,
          hexAddress: d.card.hexAddress,
          name: d.card.name,
          viName: d.card.viName,
          isReversed: d.isReversed,
          element: d.card.elementVi,
          cyberMetaphor: d.card.cyberMetaphor,
          meaning: d.isReversed ? d.card.meaningReversed : d.card.meaningUpright,
          advice: d.card.advice,
        })),
        messages: nextHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      if (data.model) setActiveModel(data.model);

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          data.answer ||
          data.reply ||
          `Trả lời thẳng vào câu hỏi "${trimmed}" của bạn: trọng tâm hiện tại nằm ngay ở thông điệp thực tế từ lá ${firstCard?.name || "Tarot"} trên bàn trải bài.\n\nBạn hãy dựa vào dữ kiện thực tế đang diễn ra để chủ động đưa ra quyết định dứt khoát và cụ thể nhất cho mình.`,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: data.model || "gemini-2.5-flash",
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: `Trả lời trực diện cho câu hỏi "${trimmed}" của bạn: bản chất sự việc đã được phản ánh rất rõ qua biểu tượng của lá ${firstCard?.name || "Tarot"} — đây là lúc cần đánh giá dựa trên dữ kiện thực tế thay vì suy đoán cảm tính.\n\nĐiều bạn cần làm ngay bây giờ là nắm lại quyền chủ động của mình: ${firstCard?.advice || "hãy ưu tiên hành động thực tế, tập trung vào một mục tiêu cốt lõi và thực hiện dứt khoát."}`,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: "gemini-3.8-flash",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl border border-cyan-500/30 bg-[#080914]/95 p-6 shadow-[0_0_60px_rgba(6,182,212,0.12)] backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <Terminal className="h-5 w-5 text-cyan-400" />
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-100">
              [03] Trò Chuyện &amp; Hỏi Đáp Chuyên Sâu
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
              Ngữ cảnh {drawnCards.length} lá bài vừa rút đã được nạp sẵn. Hãy đặt câu hỏi để đi sâu vào từng khía cạnh!
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Quick Follow-up Chips */}
      <div className="mb-4 space-y-2.5">
        <div className="flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-cyan-300">
          <MessageSquarePlus className="h-3.5 w-3.5" />
          <span>Gợi ý câu hỏi đào sâu theo lá bài vừa mở (Click để hỏi ngay):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dynamicFollowUps.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => sendQuestion(chip)}
              className="rounded-xl border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-2 text-left font-sans text-xs sm:text-sm text-slate-100 transition-all hover:border-cyan-400 hover:bg-cyan-500/20 disabled:opacity-50"
            >
              ⚡ {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Message Stream */}
      <div className="max-h-[450px] min-h-[180px] overflow-y-auto space-y-3.5 rounded-xl border border-slate-800/90 bg-[#05060C] p-4 sm:p-5 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400 space-y-2.5">
            <Sparkles className="h-7 w-7 text-cyan-400/70 animate-pulse" />
            <p className="font-sans text-sm max-w-md leading-relaxed">
              Chọn một câu hỏi gợi ý phía trên hoặc nhập câu hỏi riêng của bạn bên dưới để bắt đầu trò chuyện.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3 rounded-xl p-4 text-sm sm:text-base leading-relaxed",
                msg.role === "user"
                  ? "ml-auto max-w-[85%] border border-cyan-500/30 bg-cyan-950/30 text-slate-100"
                  : "mr-auto max-w-[92%] border border-indigo-500/25 bg-slate-900/80 text-slate-100"
              )}
            >
              <div className="mt-0.5 shrink-0">
                {msg.role === "user" ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/40">
                    <User className="h-4 w-4 text-cyan-300" />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/40">
                    <Bot className="h-4 w-4 text-indigo-300" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between gap-2 font-sans text-xs font-semibold text-slate-400">
                  <span>
                    {msg.role === "user" ? "CÂU HỎI CỦA BẠN" : "LỜI GIẢI ĐÁP"}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>
                {msg.role === "assistant" ? (
                  <ChatMarkdownText content={msg.content} />
                ) : (
                  <div className="whitespace-pre-line font-sans text-sm sm:text-base leading-relaxed">
                    {msg.content}
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2.5 rounded-xl border border-cyan-500/20 bg-slate-900/60 p-3.5 text-xs sm:text-sm font-sans font-medium text-cyan-300">
            <div className="h-4 w-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span>Đang cảm nhận năng lượng và luận giải...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Chat Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendQuestion(input);
        }}
        className="flex items-center gap-2.5"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Đặt câu hỏi tiếp theo về các lá bài vừa mở (VD: Tôi nên bắt đầu từ việc gì?)..."
          className="flex-1 rounded-xl border border-slate-700/80 bg-[#05060C] px-4 py-3 font-sans text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-3 font-sans text-xs sm:text-sm font-bold uppercase text-slate-950 transition-all hover:opacity-95 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">GỬI CÂU HỎI</span>
        </button>
      </form>
    </div>
  );
}
