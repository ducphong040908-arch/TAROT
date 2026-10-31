import {
  TAROT_SYSTEM_INSTRUCTION,
  normalizeCardsInput,
  buildTarotUserPrompt,
  buildSynthesisFallback,
  buildContextualChatFallback,
  stripRoleplayGesturesFromModelText,
  type RichCardInput,
} from "@/lib/tarotEngine";

export interface TarotClientQueryParams {
  mode: "synthesis" | "chat";
  question: string;
  topic?: string;
  spreadName?: string;
  cards: Array<string | RichCardInput>;
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
  initialQuestion?: string;
}

export interface TarotClientQueryResponse {
  answer: string;
  reply: string;
  model: string;
  source: "gemini-direct" | "hybrid-fallback";
}

const CANDIDATE_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];

/**
 * Hàm gọi luận giải Tarot trực tiếp từ Client (hoạt động độc lập không cần backend):
 * 1. Gọi trực tiếp Google Gemini REST API qua CORS nếu có API Key
 * 2. Tự động chuyển sang bộ giải nghĩa nội bộ 78 lá (Hybrid Fallback) nếu hết quota hoặc mất mạng
 */
export async function executeTarotOracleClient(
  params: TarotClientQueryParams
): Promise<TarotClientQueryResponse> {
  const normalizedCards = normalizeCardsInput(params.cards);

  let apiKey = "";
  if (typeof window !== "undefined") {
    apiKey =
      localStorage.getItem("tarot_user_gemini_api_key")?.trim() ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() ||
      "";
  } else {
    apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() || "";
  }

  const userPrompt = buildTarotUserPrompt({
    mode: params.mode,
    question: params.question,
    topic: params.topic || "Tổng quan & Định hướng",
    spreadName: params.spreadName || "Trải bài Tarot",
    normalizedCards,
    messages: params.messages,
  });

  if (apiKey) {
    for (const model of CANDIDATE_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: TAROT_SYSTEM_INSTRUCTION }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: userPrompt }],
              },
            ],
            generationConfig: {
              temperature: 0.75,
              topP: 0.95,
              topK: 40,
              maxOutputTokens: 1500,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText && typeof rawText === "string") {
            const cleaned = stripRoleplayGesturesFromModelText(rawText);
            return {
              answer: cleaned,
              reply: cleaned,
              model,
              source: "gemini-direct",
            };
          }
        }
      } catch (err) {
        console.warn(`[TarotClient] Lỗi kết nối đến ${model}:`, err);
      }
    }
  }

  // Fallback nội bộ: tính toán bài luận hoàn chỉnh ngay trên trình duyệt
  const fallback =
    params.mode === "chat"
      ? buildContextualChatFallback(
          params.initialQuestion || params.question,
          params.topic || "Tổng quan & Định hướng",
          normalizedCards,
          params.messages
        )
      : buildSynthesisFallback(
          params.question,
          params.topic || "Tổng quan & Định hướng",
          normalizedCards
        );

  return {
    answer: fallback,
    reply: fallback,
    model: "gemini-2.5-flash",
    source: "hybrid-fallback",
  };
}
