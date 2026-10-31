import { FULL_TAROT_DECK } from "@/data/tarot-deck";
import {
  getCardDeepMeaning,
  getDomainKeyFromTopic,
  type TarotDomainMeanings,
} from "@/data/tarot-meanings";

export interface RichCardInput {
  slotLabel?: string;
  slotCode?: string;
  hexAddress?: string;
  name: string;
  viName?: string;
  isReversed?: boolean;
  element?: string;
  meaning?: string;
  advice?: string;
}

export const TAROT_SYSTEM_INSTRUCTION = `### 1. VAI TRÒ & NGUYÊN TẮC THAM KHẢO TÀI LIỆU (PERSONA & GROUNDING)
Bạn là một chuyên gia luận giải Tarot từng trải, điềm tĩnh, sắc sảo và thấu hiểu quy luật thực tế.
- TÀI LIỆU THAM KHẢO NỀN TẢNG: Dựa trên nguồn tri thức chuẩn Rider-Waite-Smith và ý nghĩa biểu tượng, chiều xuôi/ngược cùng thông điệp cốt lõi của các lá bài được cung cấp, kết hợp linh hoạt với câu hỏi và hoàn cảnh thực tế của người xem.
- THẲNG THẮN & DỨT KHOÁT: Nhìn thẳng vào bản chất sự việc, trả lời trực diện vào đúng trọng tâm câu hỏi của người xem. Tuyệt đối KHÔNG nói nước đôi, không vòng vo, không ru ngủ hay gieo hy vọng giả tạo. Xưng "tôi" và gọi người hỏi là "bạn".

### 2. BỘ NGUYÊN TẮC VĂN PHONG & ẨN DỤ ĐỘNG (DYNAMIC VOICE & TONE)
- Văn phong đanh thép, mạch lạc, giàu sức nặng thực tế và chiều sâu tâm lý.
- Mọi hình ảnh liên hệ phải được xây dựng tự nhiên dựa trực tiếp vào chi tiết biểu tượng, nhân vật, cấp độ số học và nguyên tố (Lửa, Nước, Khí, Đất) của chính các lá bài đã rút kết hợp với câu hỏi thực tế của người dùng.

### 3. CẤU TRÚC PHẢN HỒI 2 ĐOẠN RÕ RỆT (BẮT BUỘC)
Chia câu trả lời thành đúng 2 đoạn văn xuôi tách biệt nhau bằng 1 dòng trống (\\n\\n):
- Đoạn 1 (Giải đáp & Phân tích trực diện): Trả lời thẳng vào đúng loại câu hỏi của người xem ngay từ câu đầu tiên (Nếu là câu hỏi Có/Không thì đưa ra phán quyết Có, Không hoặc Cần điều kiện; nếu là câu hỏi Làm thế nào, Hành động gì trong 7 ngày tới, Hóa giải lá bài ngược hay Phân tích kết nối thì đi thẳng vào giải đáp trọng tâm đó, tuyệt đối không mở đầu bằng Có/Không vô lý). Phân tích sự kết nối giữa các lá bài dựa trên tài liệu tham khảo để làm rõ bản chất vấn đề.
- Đoạn 2 (Định hướng & Hành động thực tế): Đưa ra lộ trình hành động cụ thể, thực tế và khả thi để người hỏi làm chủ cục diện.

### 4. RÀO CHẮN PHỦ ĐỊNH & DANH SÁCH CẤM (NEGATIVE CONSTRAINTS & BLACKLIST)
- CẤM CỬ CHỈ NHẬP VAI & NGOẶC ĐƠN THỪA: Tuyệt đối CẤM viết các câu mô tả hành động, biểu cảm hay cử chỉ nhập vai của Tarot Reader như "(gõ nhẹ...)", "(khẽ chạm...)", "(ánh mắt...)", "(nghiêng đầu...)", "(đan hai bàn tay...)". Cấm dùng ngoặc đơn thừa thãi trong bài viết.
- ĐỊNH DẠNG: Chỉ viết văn xuôi tự nhiên gồm 2 đoạn. Tuyệt đối KHÔNG dùng gạch đầu dòng (bullet points), KHÔNG đánh số thứ tự rời rạc, KHÔNG dùng tiêu đề Markdown (#, ##, **Đoạn 1**, **Phần 1**).
- DANH SÁCH CẤM (BLACKLIST PHRASES): Tuyệt đối CẤM sử dụng hoặc biến tấu các cụm từ khuôn mẫu sau trong mọi trường hợp:
  + "mảnh vỡ", "những mảnh vỡ không còn khớp"
  + "chương cũ", "cuốn sách mới", "khép lại chương cũ để mở ra cuốn sách mới"
  + "bước ra ánh sáng", "bước ra ngoài ánh sáng"
  + "tác phẩm dang dở"
  + "người bạn của tôi"`;

export const MINOR_RANK_VI_MAP: Record<string, string> = {
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

export const MINOR_SUIT_VI_MAP: Record<string, string> = {
  wands: "Gậy",
  cups: "Cốc",
  swords: "Kiếm",
  pentacles: "Tiền",
};

export function getCleanVietnameseCardTitle(card: {
  name: string;
  viName?: string;
}): string {
  const rawName = (card.name || "").trim();
  if (!rawName) return "Lá bài Tarot";

  const minorMatch = rawName.match(
    /^(Ace|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Page|Knight|Queen|King)\s+of\s+(Wands|Cups|Swords|Pentacles)$/i
  );
  if (minorMatch) {
    const rankVi = MINOR_RANK_VI_MAP[minorMatch[1].toLowerCase()];
    const suitVi = MINOR_SUIT_VI_MAP[minorMatch[2].toLowerCase()];
    if (rankVi && suitVi) {
      return `${rawName} (${rankVi} ${suitVi})`;
    }
  }

  const matchedDeckCard = FULL_TAROT_DECK.find(
    (c) => c.name.toLowerCase() === rawName.toLowerCase()
  );
  const rawVi = (card.viName || matchedDeckCard?.viName || "").trim();
  const viPrefix = rawVi.split(/[—–-]/)[0].trim();

  if (viPrefix && viPrefix.toLowerCase() !== rawName.toLowerCase()) {
    return `${rawName} (${viPrefix})`;
  }

  return rawName;
}

export function getVietnameseShortLabel(card: { name: string; viName?: string }): string {
  const rawName = (card.name || "").trim();
  const minorMatch = rawName.match(
    /^(Ace|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Page|Knight|Queen|King)\s+of\s+(Wands|Cups|Swords|Pentacles)$/i
  );
  if (minorMatch) {
    const rankVi = MINOR_RANK_VI_MAP[minorMatch[1].toLowerCase()];
    const suitVi = MINOR_SUIT_VI_MAP[minorMatch[2].toLowerCase()];
    if (rankVi && suitVi) return `${rankVi} ${suitVi}`;
  }
  const matchedDeckCard = FULL_TAROT_DECK.find(
    (c) => c.name.toLowerCase() === rawName.toLowerCase()
  );
  const rawVi = (card.viName || matchedDeckCard?.viName || "").trim();
  const viPrefix = rawVi.split(/[—–-]/)[0].trim();
  return viPrefix || rawName;
}

export function sanitizeTarotText(raw?: string): string {
  if (!raw) return "";
  let cleaned = raw
    .replace(/мозговой штурм\s*\(brainstorm\)/gi, "thảo luận chuyên sâu")
    .replace(/критический/gi, "khắt khe")
    .replace(/\s*\([^)]*\)/g, "")
    .replace(
      /^(Trong\s+(chuyện\s+)?tình\s+cảm|Trong\s+công\s+việc(\s*&\s*sự\s+nghiệp)?|Trong\s+học\s+tập(\s*&\s*nghiên\s+cứu)?|Về\s+tài\s+chính(\s*&\s*nguồn\s+lực)?|Về\s+sức\s+khỏe(\s*&\s*tinh\s+thần)?)\s*[:,]\s*/i,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned && !/[.!?]$/.test(cleaned)) {
    cleaned += ".";
  }
  return cleaned;
}

export function lowerFirstForClause(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  const startsWithCardName = FULL_TAROT_DECK.some((c) =>
    trimmed.toLowerCase().startsWith(c.name.toLowerCase())
  );
  if (startsWithCardName) return trimmed;
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

export function stripRoleplayGesturesFromModelText(text: string): string {
  return text
    .replace(
      /\((?:[^)]*(?:gõ nhẹ|khẽ chạm|chạm nhẹ|ánh mắt|ánh nhìn|nghiêng đầu|đan hai bàn tay|xoay nhẹ|xoay ngay ngắn|đẩy nhẹ|thở dài|thở ra|nhìn thẳng|nhìn bạn|giọng nói|ngả lưng|xếp các lá bài|mặt bàn|bàn trải bài)[^)]*)\)\s*/gi,
      ""
    )
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function normalizeCardsInput(cards: Array<string | RichCardInput>): Required<RichCardInput>[] {
  return (cards || []).map((item, idx) => {
    if (typeof item === "string") {
      const raw = item.trim();
      const lower = raw.toLowerCase();
      const isRev =
        lower.includes("ngược") ||
        lower.includes("reversed") ||
        lower.includes("(r)") ||
        lower.includes("rev");
      const cleanName = raw
        .replace(/\(?\b(ngược|xuôi|reversed|upright|rev)\b\)?/gi, "")
        .replace(/[-–—:]/g, " ")
        .trim();

      const matched = FULL_TAROT_DECK.find(
        (c) =>
          c.name.toLowerCase() === cleanName.toLowerCase() ||
          raw.toLowerCase().includes(c.name.toLowerCase()) ||
          c.viName.toLowerCase().includes(cleanName.toLowerCase())
      );

      if (matched) {
        return {
          slotLabel: `Lá thứ ${idx + 1}`,
          slotCode: `SLOT_${idx + 1}`,
          hexAddress: matched.hexAddress,
          name: matched.name,
          viName: matched.viName,
          isReversed: isRev,
          element: matched.elementVi,
          meaning: isRev ? matched.meaningReversed : matched.meaningUpright,
          advice: matched.advice,
        };
      }

      return {
        slotLabel: `Lá thứ ${idx + 1}`,
        slotCode: `SLOT_${idx + 1}`,
        hexAddress: `0x0${idx + 1}`,
        name: cleanName || raw,
        viName: cleanName || raw,
        isReversed: isRev,
        element: "Tự nhiên",
        meaning: `Biểu tượng của lá ${cleanName || raw} phản ánh trực diện trạng thái năng lượng hiện tại.`,
        advice: "Hãy nhìn thẳng vào dữ kiện thực tế trên bàn trải bài để đưa ra quyết định dứt khoát.",
      };
    }

    const matchedDeck = FULL_TAROT_DECK.find(
      (c) => c.name.toLowerCase() === (item.name || "").trim().toLowerCase()
    );

    return {
      slotLabel: item.slotLabel || `Lá thứ ${idx + 1}`,
      slotCode: item.slotCode || `SLOT_${idx + 1}`,
      hexAddress: item.hexAddress || matchedDeck?.hexAddress || `0x0${idx + 1}`,
      name: item.name,
      viName: item.viName || matchedDeck?.viName || item.name,
      isReversed: Boolean(item.isReversed),
      element: item.element || matchedDeck?.elementVi || "Tự nhiên",
      meaning:
        item.meaning ||
        (item.isReversed
          ? matchedDeck?.meaningReversed
          : matchedDeck?.meaningUpright) ||
        `Thông điệp cốt lõi từ lá ${item.name}.`,
      advice:
        item.advice ||
        matchedDeck?.advice ||
        "Hãy hành động dựa trên dữ kiện thực tế và giữ vững sự tự chủ.",
    };
  });
}

export function buildDynamicSymbolMetaphor(
  card: Required<RichCardInput>,
  topic: string
): string {
  const deep = getCardDeepMeaning(card.name);
  const topicLower = topic.toLowerCase();
  const cardTitle = getCleanVietnameseCardTitle(card);

  if (deep?.symbols) {
    const cleanSymbol = sanitizeTarotText(deep.symbols).replace(/\.$/, "");
    const firstSentence = cleanSymbol.split(".")[0]?.trim() || cleanSymbol;
    return card.isReversed
      ? `biểu tượng của lá ${cardTitle} với ${lowerFirstForClause(firstSentence)} đang ở thế đảo chiều, phơi bày những điểm nghẽn và sự lệch nhịp trong câu chuyện ${topicLower} của bạn`
      : `biểu tượng của lá ${cardTitle} với ${lowerFirstForClause(firstSentence)} đang hiện lên rất rõ nét, phản chiếu trực diện thực tại của vấn đề ${topicLower}`;
  }

  const name = card.name.toLowerCase();
  const el = card.element.toLowerCase();

  if (name.includes("swords") || el.includes("khí")) {
    return card.isReversed
      ? `lưỡi kiếm tư duy trong ${cardTitle} đang bị lệch mũi, khiến những suy tính xoay quanh ${topicLower} dễ tự tạo áp lực tâm lý hơn là giải quyết được gốc rễ`
      : `sự sắc bén và minh bạch của lưỡi kiếm ${cardTitle} đòi hỏi bạn phải dùng lý trí tỉnh táo để làm rõ những phần nhập nhằng trong chuyện ${topicLower}`;
  }
  if (name.includes("cups") || el.includes("nước")) {
    return card.isReversed
      ? `dòng chảy cảm xúc trên lá ${cardTitle} đang nghiêng đổ, báo hiệu nguồn năng lượng nuôi dưỡng cho câu chuyện ${topicLower} này đang hao hụt và thiếu điểm tựa thực tế`
      : `chiếc cốc cảm xúc của ${cardTitle} đang dâng đầy, phản chiếu sự đồng điệu và trực giác rất rõ nét xoay quanh chuyện ${topicLower}`;
  }
  if (name.includes("wands") || el.includes("lửa")) {
    return card.isReversed
      ? `ngọn lửa nhiệt huyết của ${cardTitle} đang bị dồn nén, tạo ra sức ép nôn nóng hoặc tiêu hao sức lực chưa đúng chỗ cho bài toán ${topicLower}`
      : `ngọn đuốc hành động trên lá ${cardTitle} đang bùng lên mạnh mẽ, mở ra lực đẩy thực tế để bạn bứt tốc trong chuyện ${topicLower}`;
  }
  if (name.includes("pentacles") || el.includes("đất")) {
    return card.isReversed
      ? `nền tảng thực tế của ${cardTitle} đang lung lay khỏi quỹ đạo ổn định, cảnh báo những rủi ro về mặt nguồn lực, công sức hoặc sự thiếu chắc chắn trong vấn đề ${topicLower}`
      : `khối giá trị hữu hình trên lá ${cardTitle} đang cắm rễ vững vàng, cho thấy mọi công sức bạn đầu tư vào chuyện ${topicLower} đều có cơ sở thực tế để sinh lời`;
  }
  return card.isReversed
    ? `trục năng lượng của lá ${cardTitle} đang xoay ngược, phơi bày những góc khuất chưa được giải quyết triệt để trong câu chuyện ${topicLower}`
    : `hình tượng trung tâm của lá ${cardTitle} đang đứng vững, xác lập một quy luật nhân quả rất rõ ràng cho hướng đi của bạn`;
}

export function isYesNoQuestion(query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  if (
    /\b(làm thế nào|làm sao|hành động cụ thể gì|hành động gì|bắt đầu từ việc gì|bắt đầu từ đâu|bước ngoặt nào|đâu là|như thế nào|ra sao|nghĩ gì|cảm nhận thế nào|tại sao|vì sao|khi nào|bao giờ)\b/i.test(
      q
    )
  ) {
    return false;
  }
  return (
    /\bcó\b[\s\S]{1,60}\bkhông\b/i.test(q) ||
    /\bliệu\b/i.test(q) ||
    /\bnên\b[\s\S]{1,50}\bhay không\b/i.test(q) ||
    /\b(được không|thành công không|quay lại không|ổn không|tốt không|đúng không|phải không|khả thi không|hợp không)\b/i.test(
      q
    )
  );
}

export function findMentionedCards(
  query: string,
  normalizedCards: Required<RichCardInput>[]
): Required<RichCardInput>[] {
  const qLower = query.toLowerCase();
  const hits: Array<{ card: Required<RichCardInput>; pos: number }> = [];

  normalizedCards.forEach((card, idx) => {
    const enLower = card.name.toLowerCase();
    const viShortLower = getVietnameseShortLabel(card).toLowerCase();
    let pos = qLower.indexOf(enLower);

    if (pos === -1 && viShortLower.length > 2) {
      pos = qLower.indexOf(viShortLower);
    }
    if (pos === -1) {
      const slotPatterns = [
        `lá ${idx + 1}`,
        `lá thứ ${idx + 1}`,
        idx === 0 ? "lá đầu tiên" : "",
        idx === 0 ? "lá mở đầu" : "",
        idx === normalizedCards.length - 1 && normalizedCards.length > 1
          ? "lá cuối"
          : "",
      ].filter(Boolean);
      for (const pat of slotPatterns) {
        const p = qLower.indexOf(pat);
        if (p !== -1) {
          pos = p;
          break;
        }
      }
    }

    if (pos !== -1) {
      hits.push({ card, pos });
    }
  });

  hits.sort((a, b) => a.pos - b.pos);
  return hits.map((h) => h.card);
}

export type ChatQuestionIntent =
  | "card_connection_turning_point"
  | "reversed_remedy"
  | "action_7_days"
  | "feelings_mindset"
  | "yes_no"
  | "open_custom";

export function detectChatQuestionIntent(
  query: string,
  mentionedCards: Required<RichCardInput>[]
): ChatQuestionIntent {
  const q = query.toLowerCase().trim();

  if (
    /\b(kết nối giữa|liên kết giữa|tương tác giữa|sự chuyển dịch giữa|mối liên hệ giữa)\b/i.test(
      q
    ) ||
    (/\b(bước ngoặt|chuyển biến)\b/i.test(q) && mentionedCards.length >= 2) ||
    (mentionedCards.length >= 2 && /\b(giữa|và|báo hiệu|kết nối)\b/i.test(q))
  ) {
    return "card_connection_turning_point";
  }

  if (
    /\b(lá bài ngược|lá ngược|chiều ngược)\b/i.test(q) ||
    (/\b(hóa giải|tháo gỡ|khắc phục|vượt qua|xử lý)\b/i.test(q) &&
      /\b(thách thức|khó khăn|điểm nghẽn|rủi ro|bế tắc|ngược|cản trở)\b/i.test(q))
  ) {
    return "reversed_remedy";
  }

  if (
    /\b(7 ngày|bảy ngày|tuần tới|hành động cụ thể|hành động gì|bắt đầu từ việc gì|bắt đầu từ đâu|nên làm gì|cần làm gì|làm gì ngay|khuyên tôi|lời khuyên|lộ trình)\b/i.test(
      q
    )
  ) {
    return "action_7_days";
  }

  if (
    /\b(nghĩ gì|suy nghĩ gì|cảm nhận|tình cảm của|người ấy|đối phương|họ đang nghĩ|thái độ của|trong lòng họ|thật lòng)\b/i.test(
      q
    )
  ) {
    return "feelings_mindset";
  }

  if (isYesNoQuestion(q)) {
    return "yes_no";
  }

  return "open_custom";
}

export function getCleanAdviceForCard(card: Required<RichCardInput>): string {
  const deep = getCardDeepMeaning(card.name);
  return sanitizeTarotText(deep?.advice || card.advice);
}

export function getCleanDomainMeaningForCard(
  card: Required<RichCardInput>,
  domainKey: keyof TarotDomainMeanings
): string {
  const deep = getCardDeepMeaning(card.name);
  const rawMeaning = deep
    ? card.isReversed
      ? deep.rev[domainKey] || deep.rev.general
      : deep.up[domainKey] || deep.up.general
    : card.meaning;
  let cleaned = sanitizeTarotText(rawMeaning);
  const adviceClean = getCleanAdviceForCard(card);
  if (
    adviceClean &&
    cleaned.length > adviceClean.length + 10 &&
    cleaned.endsWith(adviceClean)
  ) {
    cleaned = cleaned.slice(0, cleaned.length - adviceClean.length).trim();
  }
  return cleaned;
}

export function getCleanEssenceForCard(card: Required<RichCardInput>): string {
  const deep = getCardDeepMeaning(card.name);
  return sanitizeTarotText(deep?.essence || card.meaning);
}

export function analyzeElementTransition(elA: string, elB: string): string {
  const a = elA.toLowerCase();
  const b = elB.toLowerCase();
  if (a === b) {
    return `sự cộng hưởng cùng nguyên tố ${elA} tạo ra dòng năng lượng tập trung cao độ, đẩy nhanh tốc độ kết tinh từ khởi phát đến cao trào`;
  }
  if (
    (a.includes("lửa") && b.includes("khí")) ||
    (a.includes("khí") && b.includes("lửa"))
  ) {
    return `sự kết hợp giữa nguyên tố ${elA} và ${elB} tạo thành luồng gia tốc mạnh mẽ, nơi ý chí hành động và tư duy chiến lược kích hoạt lẫn nhau`;
  }
  if (
    (a.includes("nước") && b.includes("đất")) ||
    (a.includes("đất") && b.includes("nước"))
  ) {
    return `sự giao thoa giữa nguyên tố ${elA} và ${elB} giúp chuyển hóa những cảm nhận nội tâm thành nền tảng thực tế vững chắc và bền bỉ`;
  }
  if (
    (a.includes("lửa") && b.includes("nước")) ||
    (a.includes("nước") && b.includes("lửa"))
  ) {
    return `sự dịch chuyển giữa hai cực nguyên tố ${elA} và ${elB} đòi hỏi bạn phải dung hòa giữa nhiệt huyết hành động và chiều sâu cảm xúc để giữ vững cân bằng`;
  }
  if (
    (a.includes("lửa") && b.includes("đất")) ||
    (a.includes("đất") && b.includes("lửa"))
  ) {
    return `quá trình chuyển pha từ nguyên tố ${elA} sang ${elB} báo hiệu ngọn lửa ý tưởng đang được đúc kết thành kết quả vật chất và kỷ luật thực thi`;
  }
  return `sự chuyển tiếp từ nguyên tố ${elA} sang nguyên tố ${elB} đánh dấu bước dịch chuyển từ nhận thức sang hành động thực tiễn`;
}

export function buildSynthesisFallback(
  question: string,
  topic: string,
  normalizedCards: Required<RichCardInput>[]
): string {
  const trimmedQuestion = question?.trim() || "";
  const effectiveQuestion =
    trimmedQuestion || `bản chất thực tế của vấn đề ${topic.toLowerCase()} lúc này`;

  const domainKey = getDomainKeyFromTopic(`${topic} ${effectiveQuestion}`);
  const revCount = normalizedCards.filter((c) => c.isReversed).length;
  const totalTone = normalizedCards.reduce((acc, c) => {
    const d = getCardDeepMeaning(c.name);
    const baseTone = d?.tone ?? 1;
    return acc + (c.isReversed ? -Math.abs(baseTone || 1) : baseTone);
  }, 0);
  const isChallenging =
    revCount >= Math.ceil(normalizedCards.length / 2) || totalTone < 0;

  const firstCard = normalizedCards[0];
  const lastCard = normalizedCards[normalizedCards.length - 1] || firstCard;
  const middleCards = normalizedCards.slice(1, -1);

  const dynamicMetaphor = firstCard
    ? buildDynamicSymbolMetaphor(firstCard, topic)
    : `trạng thái các lá bài hiện tại đang phản ánh trực diện thực tế của bạn`;

  const cardsAnalysis = normalizedCards
    .map((c, idx) => {
      const cardTitle = getCleanVietnameseCardTitle(c);
      const pos = c.isReversed ? "lật ngược" : "mở xuôi";
      const domainMeaning = getCleanDomainMeaningForCard(c, domainKey);

      if (idx === 0) {
        return `Ngay từ vị trí mở đầu, lá ${cardTitle} ${pos} đã chỉ thẳng vào gốc rễ vấn đề: ${lowerFirstForClause(domainMeaning)}`;
      }
      if (idx === normalizedCards.length - 1 && normalizedCards.length > 1) {
        return `Điểm hội tụ ở lá ${cardTitle} ${pos} khép lại mạch diễn biến bằng một thực tế rõ ràng: ${lowerFirstForClause(domainMeaning)}`;
      }
      return `Sự chuyển tiếp sang lá ${cardTitle} ${pos} làm sáng tỏ thêm cục diện hiện tại: ${lowerFirstForClause(domainMeaning)}`;
    })
    .join(" ");

  const concreteAdvice = getCleanAdviceForCard(lastCard || firstCard);
  const firstAdvice = firstCard ? getCleanAdviceForCard(firstCard) : "";
  const middleAdvice =
    middleCards.length > 0 ? getCleanAdviceForCard(middleCards[0]) : "";
  const askIsYesNo = isYesNoQuestion(trimmedQuestion);

  if (isChallenging) {
    const openingVerdict = askIsYesNo
      ? `Trả lời thẳng vào câu hỏi "${effectiveQuestion}" của bạn: Không, ở thời điểm hiện tại mọi thứ chưa thể vận hành theo chiều hướng bạn mong muốn, bởi đang tồn tại độ lệch rõ rệt giữa kỳ vọng chủ quan và điều kiện thực tế.`
      : `Đi thẳng vào trọng tâm câu hỏi "${effectiveQuestion}" của bạn: trải bài đang phát đi tín hiệu cảnh báo về những lực cản thực tế và điểm nghẽn năng lượng cần được tháo gỡ tận gốc trước khi muốn tiến xa hơn.`;

    const part1 = `${openingVerdict} Nhìn lên bàn trải bài, ${dynamicMetaphor}. ${cardsAnalysis}`;

    const part2 = `Để xoay chuyển cục diện này, bạn cần dừng ngay việc tiêu hao tâm sức vào những yếu tố nằm ngoài tầm kiểm soát và rà soát lại toàn bộ kế hoạch một cách thực tế nhất. Trọng tâm hành động lúc này từ lá ${getCleanVietnameseCardTitle(lastCard || firstCard)} là ${lowerFirstForClause(concreteAdvice)}${
      middleCards.length > 0 && middleAdvice
        ? ` Đồng thời, xét từ vị trí của lá ${getCleanVietnameseCardTitle(middleCards[0])}, ${lowerFirstForClause(middleAdvice)}`
        : ""
    } Khi bạn nhìn thẳng vào sự thật hiển hiện trên bàn bài và chủ động điều chỉnh chiến lược, bạn sẽ từng bước lấy lại quyền làm chủ tình thế.`;

    return `${part1}\n\n${part2}`;
  } else {
    const openingVerdict = askIsYesNo
      ? `Trả lời trực diện cho câu hỏi "${effectiveQuestion}" của bạn: Có, tín hiệu từ trải bài xác nhận hướng đi này hoàn toàn có cơ sở thực tế để đạt được kết quả tích cực, với điều kiện bạn chủ động nắm quyền thực thi.`
      : `Đi thẳng vào trọng tâm câu hỏi "${effectiveQuestion}" của bạn: các lá bài mở ra một cục diện thuận lợi, xác nhận bạn đang có đủ nền tảng và thời cơ thực tế để hiện thực hóa mục tiêu trong chủ đề ${topic.toLowerCase()}.`;

    const part1 = `${openingVerdict} Trên mặt bàn lúc này, ${dynamicMetaphor}. ${cardsAnalysis}`;

    const part2 = `Tuy nhiên, một trải bài thuận lợi chỉ thực sự kết tinh thành quả khi đi kèm kỷ luật hành động cụ thể. Để chuyển hóa tiềm năng của lá ${getCleanVietnameseCardTitle(lastCard || firstCard)} thành giá trị thực tế, bạn hãy thực hiện ngay: ${lowerFirstForClause(concreteAdvice)}${
      firstCard && firstCard.name !== lastCard?.name && firstAdvice
        ? ` Bên cạnh đó, hãy giữ vững nguyên tắc từ lá mở đầu ${getCleanVietnameseCardTitle(firstCard)}: ${lowerFirstForClause(firstAdvice)}`
        : ""
    } Hãy giữ cái đầu tỉnh táo, đôi chân bám sát thực tại và dứt khoát triển khai kế hoạch của bạn.`;

    return `${part1}\n\n${part2}`;
  }
}

export function buildContextualChatFallback(
  initialQuestion: string,
  topic: string,
  normalizedCards: Required<RichCardInput>[],
  messages?: Array<{ role: "user" | "assistant"; content: string }>
): string {
  const latestUserMsg =
    messages && messages.length > 0
      ? [...messages].reverse().find((m) => m.role === "user")?.content?.trim()
      : "";
  const activeQuery =
    latestUserMsg ||
    initialQuestion?.trim() ||
    `Xin lời khuyên hành động thực tế cho chủ đề ${topic}`;

  const domainKey = getDomainKeyFromTopic(`${topic} ${initialQuestion} ${activeQuery}`);
  const mentionedCards = findMentionedCards(activeQuery, normalizedCards);
  const intent = detectChatQuestionIntent(activeQuery, mentionedCards);

  const firstCard = normalizedCards[0];
  const lastCard = normalizedCards[normalizedCards.length - 1] || firstCard;

  if (intent === "action_7_days") {
    const targetCard = mentionedCards[0] || firstCard;
    const supportCard =
      normalizedCards.find((c) => c.name !== targetCard.name) || lastCard;
    const targetTitle = getCleanVietnameseCardTitle(targetCard);
    const supportTitle = getCleanVietnameseCardTitle(supportCard);
    const targetPos = targetCard.isReversed ? "đang lật ngược" : "đang mở xuôi";
    const targetMeaning = getCleanDomainMeaningForCard(targetCard, domainKey);
    const targetAdvice = getCleanAdviceForCard(targetCard);
    const supportAdvice = getCleanAdviceForCard(supportCard);
    const deckCard = FULL_TAROT_DECK.find(
      (c) => c.name.toLowerCase() === targetCard.name.toLowerCase()
    );
    const keywords = targetCard.isReversed
      ? deckCard?.keywordsReversed || []
      : deckCard?.keywordsUpright || [];
    const focusKw =
      keywords.length > 0
        ? keywords.map((k) => k.toLowerCase()).join(", ")
        : "tập trung thực thi";

    const part1 = `Đi thẳng vào lộ trình hành động 7 ngày tới theo chỉ dẫn của lá ${targetTitle} ${targetPos}: từ khóa trọng tâm bạn cần bám sát trong tuần này là ${focusKw} xoay quanh vấn đề ${topic.toLowerCase()}. Lá bài chỉ rõ rằng ${lowerFirstForClause(targetMeaning)} Do đó, trong Giai đoạn Ngày 1 - Ngày 2 về Nhận diện và Dọn dẹp nền tảng, việc đầu tiên bạn phải làm ngay là rà soát lại toàn bộ hiện trạng: ${
      targetCard.isReversed
        ? `khoanh vùng những điểm đang gây trì trệ, cắt bỏ các tác vụ hoặc kỳ vọng lan man đang làm phân tán năng lượng nguyên tố ${targetCard.element} của bạn.`
        : `xác lập mục tiêu ưu tiên số một dựa trên nguồn lực nguyên tố ${targetCard.element} sẵn có và chuẩn bị đầy đủ các điều kiện thực tế trước khi tăng tốc.`
    }`;

    const part2 = `Bước sang Giai đoạn Ngày 3 - Ngày 5 về Hành động trọng tâm, bạn hãy thực thi dứt khoát thông điệp cốt lõi từ lá ${targetTitle}: ${lowerFirstForClause(targetAdvice)}${
      supportCard && supportCard.name !== targetCard.name
        ? ` Đồng thời, kết hợp thêm nhịp điều phối từ lá ${supportTitle} trên bàn bài: ${lowerFirstForClause(supportAdvice)}`
        : ""
    } Đến Giai đoạn Ngày 6 - Ngày 7 về Củng cố và Đánh giá thực tế, hãy nghiệm thu kết quả dựa trên những chuyển biến đo đếm được thay vì cảm tính, khóa lại các hạng mục đã hoàn tất và chuẩn bị nền tảng vững chắc cho chu kỳ tiếp theo.`;

    return `${part1}\n\n${part2}`;
  }

  if (intent === "reversed_remedy") {
    const reversedCards = normalizedCards.filter((c) => c.isReversed);
    const uprightCards = normalizedCards.filter((c) => !c.isReversed);

    if (reversedCards.length === 0) {
      const watchCard = lastCard || firstCard;
      const watchTitle = getCleanVietnameseCardTitle(watchCard);
      const watchMeaning = getCleanDomainMeaningForCard(watchCard, domainKey);
      const watchAdvice = getCleanAdviceForCard(watchCard);

      const part1 = `Quan sát trực diện trên bàn trải bài hiện tại, toàn bộ ${normalizedCards.length} lá bài của bạn đều đang mở xuôi và không có lá bài nào nằm ngược. Điều này khẳng định dòng chảy năng lượng trong chuyện ${topic.toLowerCase()} không bị tắc nghẽn ngầm hay đảo chiều. Tuy nhiên, điểm bạn cần lưu tâm nhất để phòng ngừa rủi ro nằm ở lá ${watchTitle}: ${lowerFirstForClause(watchMeaning)}`;

      const part2 = `Cách tốt nhất để giữ vững thế chủ động và ngăn năng lượng thuận lợi này chuyển hóa thành sự chủ quan là thực hiện nghiêm túc lời khuyên từ lá ${watchTitle}: ${lowerFirstForClause(watchAdvice)} Hãy duy trì kỷ luật kiểm tra thực tế định kỳ để bảo toàn trọn vẹn thành quả của bạn.`;

      return `${part1}\n\n${part2}`;
    }

    const revNamesList = reversedCards
      .map((c) => `${getCleanVietnameseCardTitle(c)} ở vị trí ${c.slotLabel.toLowerCase()}`)
      .join(", ");

    const blockageDetails = reversedCards
      .map((c) => {
        const title = getCleanVietnameseCardTitle(c);
        const revMeaning = getCleanDomainMeaningForCard(c, domainKey);
        return `Tại lá ${title} đang lật ngược, nguyên nhân nghẽn năng lượng nguyên tố ${c.element} xuất phát từ việc ${lowerFirstForClause(revMeaning)}`;
      })
      .join(" ");

    const remedyDetails = reversedCards
      .map((c) => {
        const title = getCleanVietnameseCardTitle(c);
        const advice = getCleanAdviceForCard(c);
        return `Để hóa giải trực tiếp nút thắt của lá ${title}, bạn cần chỉnh lại trục hành động bằng cách: ${lowerFirstForClause(advice)}`;
      })
      .join(" ");

    const anchorSupport =
      uprightCards.length > 0
        ? ` Đặc biệt, hãy tận dụng điểm tựa vững chắc từ lá bài mở xuôi ${getCleanVietnameseCardTitle(uprightCards[0])} trên bàn làm đòn bẩy cân bằng: ${lowerFirstForClause(getCleanAdviceForCard(uprightCards[0]))}`
        : ` Khi bạn chủ động tháo gỡ từng điểm nghẽn theo đúng thứ tự ưu tiên thay vì ôm đồm cùng lúc, dòng năng lượng trên bàn bài sẽ tự khắc thông suốt trở lại.`;

    const part1 = `Trong trải bài này, thách thức cần hóa giải nằm đích danh ở ${reversedCards.length} lá bài đang lật ngược gồm: ${revNamesList}. Bản chất của lá bài ngược không phải là vận xui bất biến, mà là tín hiệu báo động năng lượng đang bị dùng quá đà hoặc bị kìm nén sai cách. ${blockageDetails}`;

    const part2 = `Phác đồ hóa giải thực tế cho bạn bắt đầu từ việc điều chỉnh lại chính các mắt xích đang lệch nhịp đó. ${remedyDetails}${anchorSupport}`;

    return `${part1}\n\n${part2}`;
  }

  if (intent === "card_connection_turning_point") {
    const cardA = mentionedCards[0] || firstCard;
    const cardB =
      mentionedCards[1] ||
      normalizedCards.find((c) => c.name !== cardA.name) ||
      lastCard;
    const titleA = getCleanVietnameseCardTitle(cardA);
    const titleB = getCleanVietnameseCardTitle(cardB);
    const posA = cardA.isReversed ? "đang lật ngược" : "đang mở xuôi";
    const posB = cardB.isReversed ? "đang lật ngược" : "đang mở xuôi";
    const meaningA = getCleanDomainMeaningForCard(cardA, domainKey);
    const meaningB = getCleanDomainMeaningForCard(cardB, domainKey);
    const adviceA = getCleanAdviceForCard(cardA);
    const adviceB = getCleanAdviceForCard(cardB);
    const elementShift = analyzeElementTransition(cardA.element, cardB.element);

    const middleBridge =
      normalizedCards.length > 2
        ? normalizedCards.find(
            (c) => c.name !== cardA.name && c.name !== cardB.name
          )
        : undefined;

    const part1 = `Sự kết nối giữa lá ${titleA} ${posA} và lá ${titleB} ${posB} phác họa một bước ngoặt chuyển pha rất rõ nét trong câu chuyện ${topic.toLowerCase()} của bạn: đó là ${elementShift}. Nếu ở chặng đầu, lá ${titleA} phản ánh trạng thái ${lowerFirstForClause(meaningA)} Thì khi dịch chuyển sang lá ${titleB}, cục diện sẽ xoay sang một ngưỡng mới nơi ${lowerFirstForClause(meaningB)}${
      middleBridge
        ? ` Quá trình chuyển giao này đi qua cầu nối là lá ${getCleanVietnameseCardTitle(middleBridge)}, đòi hỏi bạn không được đốt cháy giai đoạn.`
        : ""
    }`;

    const part2 = `Để đón đầu bước ngoặt từ lá ${titleA} sang lá ${titleB} một cách chủ động nhất, bạn cần kết hợp nhịp nhàng hai bước chiến lược. Trước hết, hãy hoàn tất bài học nền tảng tại ${titleA}: ${lowerFirstForClause(adviceA)} Ngay khi tín hiệu chuyển dịch xuất hiện, hãy lập tức áp dụng nguyên tắc hành động của ${titleB}: ${lowerFirstForClause(adviceB)} Sự chuẩn bị sẵn sàng về cả tâm thế lẫn phương án thực thi sẽ giúp bạn biến bước ngoặt này thành bàn đạp bứt phá thực sự.`;

    return `${part1}\n\n${part2}`;
  }

  if (intent === "feelings_mindset") {
    const primaryCard = mentionedCards[0] || firstCard;
    const secondaryCard =
      normalizedCards.find((c) => c.name !== primaryCard.name) || lastCard;
    const primaryDeep = getCardDeepMeaning(primaryCard.name);
    const secondaryDeep = getCardDeepMeaning(secondaryCard.name);

    const personTrait = sanitizeTarotText(
      primaryDeep?.person ||
        `Người mang năng lượng nguyên tố ${primaryCard.element} với nội tâm thể hiện qua lá ${primaryCard.name}`
    );
    const loveMeaningPrimary = getCleanDomainMeaningForCard(primaryCard, "love");
    const loveMeaningSecondary = getCleanDomainMeaningForCard(
      secondaryCard,
      "love"
    );
    const advicePrimary = getCleanAdviceForCard(primaryCard);

    const part1 = `Giải mã chiều sâu tâm lý cho câu hỏi "${activeQuery}" của bạn: hình ảnh lá ${getCleanVietnameseCardTitle(primaryCard)} ${primaryCard.isReversed ? "đang lật ngược" : "đang mở xuôi"} cho thấy trạng thái nội tâm hiện tại của đối phương gắn liền với hình mẫu ${lowerFirstForClause(personTrait)} Trong suy nghĩ thực sự dành cho mối quan hệ này, ${lowerFirstForClause(loveMeaningPrimary)}${
      secondaryCard && secondaryCard.name !== primaryCard.name
        ? ` Hơn nữa, lá ${getCleanVietnameseCardTitle(secondaryCard)} ${secondaryCard.isReversed ? "đang lật ngược" : "đang mở xuôi"} tiết lộ thêm tầng cảm xúc sâu bên trong: ${lowerFirstForClause(loveMeaningSecondary)}`
        : ""
    }`;

    const part2 = `Trước thái độ và tần số cảm xúc đó, điều quan trọng nhất là bạn phải giữ được trục giá trị độc lập của chính mình thay vì đoán già đoán non. Cách ứng xử thông minh và thực tế nhất lúc này theo chỉ dẫn của lá ${getCleanVietnameseCardTitle(primaryCard)} là: ${lowerFirstForClause(advicePrimary)}${
      secondaryDeep && secondaryCard.name !== primaryCard.name
        ? ` Đồng thời, hãy lưu ý thêm thông điệp từ lá ${getCleanVietnameseCardTitle(secondaryCard)}: ${lowerFirstForClause(getCleanAdviceForCard(secondaryCard))}`
        : ""
    } Sự rõ ràng, thẳng thắn và tôn trọng ranh giới thực tế sẽ giúp bạn nhìn thấu thiện chí thực sự từ phía bên kia.`;

    return `${part1}\n\n${part2}`;
  }

  if (intent === "yes_no") {
    const revCount = normalizedCards.filter((c) => c.isReversed).length;
    const totalTone = normalizedCards.reduce((acc, c) => {
      const d = getCardDeepMeaning(c.name);
      const baseTone = d?.tone ?? 1;
      return acc + (c.isReversed ? -Math.abs(baseTone || 1) : baseTone);
    }, 0);
    const isChallenging =
      revCount >= Math.ceil(normalizedCards.length / 2) || totalTone < 0;

    const focusCard = mentionedCards[0] || firstCard;
    const outcomeCard = lastCard || focusCard;
    const focusTitle = getCleanVietnameseCardTitle(focusCard);
    const outcomeTitle = getCleanVietnameseCardTitle(outcomeCard);

    if (isChallenging) {
      const part1 = `Phán quyết trực diện cho câu hỏi "${activeQuery}" của bạn: Không, ở thời điểm hiện tại các điều kiện thực tế chưa ủng hộ để việc này diễn ra trôi chảy như kỳ vọng. Căn cứ trực tiếp nằm ở lá ${focusTitle} ${focusCard.isReversed ? "đang lật ngược" : "đang mở xuôi"}: ${lowerFirstForClause(getCleanDomainMeaningForCard(focusCard, domainKey))}${
        outcomeCard.name !== focusCard.name
          ? ` Kết hợp với lá đích ${outcomeTitle} ${outcomeCard.isReversed ? "đang lật ngược" : "đang mở xuôi"}, bài cảnh báo rõ: ${lowerFirstForClause(getCleanDomainMeaningForCard(outcomeCard, domainKey))}`
          : ""
      }`;

      const part2 = `Thay vì cố thúc ép một quyết định khi nền tảng còn nhiều rủi ro, bạn cần ưu tiên bảo toàn nguồn lực và xử lý dứt điểm nguyên nhân gốc rễ. Lời khuyên thiết thực nhất từ lá ${outcomeTitle} lúc này là: ${lowerFirstForClause(getCleanAdviceForCard(outcomeCard))} Chỉ khi bạn tháo gỡ xong các điều kiện bất lợi trên bàn bài, câu trả lời mới có thể xoay chuyển sang hướng tích cực.`;

      return `${part1}\n\n${part2}`;
    }

    const isConditional = revCount > 0 || totalTone === 0;
    const verdictPrefix = isConditional
      ? `Phán quyết trực diện cho câu hỏi "${activeQuery}" của bạn: Có, nhưng đi kèm điều kiện tiên quyết là bạn phải kiểm soát chặt các biến số thực tế.`
      : `Phán quyết trực diện cho câu hỏi "${activeQuery}" của bạn: Có, tổ hợp bài trên bàn xác nhận tín hiệu rất khả quan và có đầy đủ cơ sở để thành công.`;

    const part1 = `${verdictPrefix} Lá ${focusTitle} ${focusCard.isReversed ? "đang lật ngược" : "đang mở xuôi"} cho thấy ${lowerFirstForClause(getCleanDomainMeaningForCard(focusCard, domainKey))}${
      outcomeCard.name !== focusCard.name
        ? ` Và tại điểm kết, lá ${outcomeTitle} ${outcomeCard.isReversed ? "đang lật ngược" : "đang mở xuôi"} củng cố thêm triển vọng này: ${lowerFirstForClause(getCleanDomainMeaningForCard(outcomeCard, domainKey))}`
        : ""
    }`;

    const part2 = `Để khóa chặt kết quả tích cực này vào thực tế, bạn không được phép chủ quan mà cần bắt tay thực hiện ngay chỉ dẫn của lá ${outcomeTitle}: ${lowerFirstForClause(getCleanAdviceForCard(outcomeCard))}${
      focusCard.name !== outcomeCard.name
        ? ` Đồng thời, duy trì sự nhất quán từ lá ${focusTitle}: ${lowerFirstForClause(getCleanAdviceForCard(focusCard))}`
        : ""
    }`;

    return `${part1}\n\n${part2}`;
  }

  const targetCard = mentionedCards[0] || firstCard;
  const secondCard =
    mentionedCards[1] ||
    normalizedCards.find((c) => c.name !== targetCard.name) ||
    lastCard;
  const targetTitle = getCleanVietnameseCardTitle(targetCard);
  const secondTitle = getCleanVietnameseCardTitle(secondCard);
  const targetEssence = getCleanEssenceForCard(targetCard);
  const targetMeaning = getCleanDomainMeaningForCard(targetCard, domainKey);
  const secondMeaning = getCleanDomainMeaningForCard(secondCard, domainKey);
  const targetAdvice = getCleanAdviceForCard(targetCard);
  const secondAdvice = getCleanAdviceForCard(secondCard);

  const part1 = `Giải đáp trực diện câu hỏi "${activeQuery}" của bạn dựa trên các lá bài đang mở: trọng tâm câu trả lời nằm ở lá ${targetTitle} ${targetCard.isReversed ? "đang lật ngược" : "đang mở xuôi"} thuộc nguyên tố ${targetCard.element}. Về mặt bản chất, ${lowerFirstForClause(targetEssence)} Đặt trực tiếp vào góc độ bạn đang truy vấn, lá bài chỉ rõ: ${lowerFirstForClause(targetMeaning)}${
    secondCard && secondCard.name !== targetCard.name
      ? ` Bên cạnh đó, sự hiện diện của lá ${secondTitle} ${secondCard.isReversed ? "đang lật ngược" : "đang mở xuôi"} bổ sung thêm một dữ kiện quan trọng: ${lowerFirstForClause(secondMeaning)}`
      : ""
  }`;

  const part2 = `Từ những dữ kiện thực tế đó, hướng xử lý tối ưu dành cho bạn lúc này được đúc kết rất rõ ràng. Hãy ưu tiên áp dụng ngay thông điệp hành động từ lá ${targetTitle}: ${lowerFirstForClause(targetAdvice)}${
    secondCard && secondCard.name !== targetCard.name
      ? ` Kết hợp song song với nguyên tắc của lá ${secondTitle}: ${lowerFirstForClause(secondAdvice)}`
      : ""
  } Việc bám sát từng bước thực tế và đánh giá dựa trên kết quả cụ thể sẽ giúp bạn làm chủ hoàn toàn tình huống này.`;

  return `${part1}\n\n${part2}`;
}

export function buildTarotUserPrompt(params: {
  mode: "synthesis" | "chat";
  question: string;
  topic: string;
  spreadName: string;
  normalizedCards: Required<RichCardInput>[];
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
}): string {
  const { mode, question, topic, spreadName, normalizedCards, messages = [] } = params;
  const latestChatQuestion =
    mode === "chat" && messages.length > 0
      ? [...messages].reverse().find((m) => m.role === "user")?.content || question
      : question;
  const domainKey = getDomainKeyFromTopic(`${topic} ${question} ${latestChatQuestion}`);

  const cardsSummary = normalizedCards
    .map((c, idx) => {
      const deep = getCardDeepMeaning(c.name);
      const cleanTitle = getCleanVietnameseCardTitle(c);
      const domainSpecific = getCleanDomainMeaningForCard(c, domainKey);
      const cleanEssence = getCleanEssenceForCard(c);
      const cleanSymbols = sanitizeTarotText(
        deep?.symbols || "Biểu tượng chuẩn Rider-Waite"
      );
      const cleanPerson = deep?.person ? sanitizeTarotText(deep.person) : "";
      const cleanAdvice = getCleanAdviceForCard(c);

      return `${idx + 1}. Vị trí [${c.slotLabel}]: Lá ${cleanTitle} - Chiều: ${
        c.isReversed ? "NGƯỢC (Reversed)" : "XUÔI (Upright)"
      } | Nguyên tố: ${c.element} | Bản chất: ${cleanEssence} | Biểu tượng hình vẽ: ${cleanSymbols}${
        cleanPerson ? ` | Hình mẫu nhân vật: ${cleanPerson}` : ""
      } | Luận giải theo chủ đề (${domainKey}): ${domainSpecific} | Lời khuyên gốc: ${cleanAdvice}`;
    })
    .join("\n");

  if (mode === "chat" && messages.length > 0) {
    const detectedIntent = detectChatQuestionIntent(
      latestChatQuestion,
      findMentionedCards(latestChatQuestion, normalizedCards)
    );

    return `THÔNG TIN TRẢI BÀI & NGỮ CẢNH HỎI ĐÁP CHUYÊN SÂU:
- Chủ đề: ${topic}
- Kiểu trải bài: ${spreadName}
- Câu hỏi gốc ban đầu: "${question || "Trải bài định hướng"}"
- Danh sách lá bài trên bàn:
${cardsSummary}

LỊCH SỬ HỘI THOẠI (Tối đa 10 lượt gần nhất):
${messages
  .slice(-10)
  .map((m) => `${m.role === "user" ? "Người hỏi" : "Tarot Reader"}: ${m.content}`)
  .join("\n")}

CÂU HỎI MỚI NHẤT CẦN TRẢ LỜI TRỰC DIỆN: "${latestChatQuestion}"
PHÂN LOẠI TRỌNG TÂM CÂU HỎI (INTENT): ${detectedIntent}

YÊU CẦU BẮT BUỘC CHO CHẾ ĐỘ HỎI ĐÁP (CHAT):
- Sử dụng tri thức chuẩn Tarot kết hợp dữ liệu các lá bài trên bàn để giải đáp TRỰC DIỆN câu hỏi mới nhất "${latestChatQuestion}".
- TUYỆT ĐỐI KHÔNG lặp lại bản phân tích tổng quát của toàn bộ trải bài.
- Tùy theo loại câu hỏi mới nhất:
  + Nếu hỏi về hành động cụ thể / 7 ngày tới / lời khuyên của 1 lá bài: Phân tích đúng lá bài được nhắc tới và chia lộ trình hành động rõ ràng cho Giai đoạn Ngày 1-2 (Nhận diện & Dọn dẹp), Ngày 3-5 (Hành động trọng tâm) và Ngày 6-7 (Củng cố & Đánh giá).
  + Nếu hỏi về cách hóa giải thách thức từ lá bài ngược: Chỉ đích danh từng lá bài ngược trên bàn, phân tích nguyên nhân nghẽn năng lượng và đưa ra cách hóa giải thực tế cho từng lá.
  + Nếu hỏi về sự kết nối giữa 2 lá bài & bước ngoặt sắp tới: Phân tích sự dịch chuyển năng lượng nguyên tố, cấp độ số học và ý nghĩa từ lá trước sang lá sau để chỉ rõ bước ngoặt và cách đón đầu.
  + Nếu hỏi về tâm tư / suy nghĩ / tình cảm của một người: Khai thác chiều sâu tâm lý để giải mã thái độ thực sự và lời khuyên ứng xử.
  + Chỉ mở đầu bằng Có / Không / Cần điều kiện khi câu hỏi thực sự là câu hỏi Có/Không.
- Chia câu trả lời thành đúng 2 đoạn văn xuôi tách nhau bằng 1 dòng trống (\\n\\n).
- Khi gọi tên lá bài, dùng định dạng tự nhiên như "Four of Wands (Bốn Gậy)", tuyệt đối không lặp "Four of Wands (Four of Wands)".
- TUYỆT ĐỐI CẤM viết cử chỉ nhập vai trong ngoặc đơn như "(gõ nhẹ...)", "(khẽ chạm...)", "(ánh mắt...)" và cấm dùng các từ trong danh sách cấm.`;
  }

  return `THÔNG TIN TRẢI BÀI & CÂU HỎI CỦA NGƯỜI XEM:
- Chủ đề: ${topic}
- Kiểu trải bài: ${spreadName}
- Câu hỏi của người xem: "${question || "Xin thông điệp định hướng thực tế từ các lá bài này"}"
- Danh sách các lá bài đã rút:
${cardsSummary}

YÊU CẦU LUẬN GIẢI TỔNG HỢP:
- Sử dụng tri thức chuẩn Tarot kết hợp chặt chẽ với dữ liệu trải bài trên và câu hỏi thực tế của người xem.
- Chia câu trả lời làm 2 đoạn văn xuôi rõ rệt tách nhau bằng 1 dòng trống (\\n\\n):
  + Đoạn 1 (Phán quyết & Phân tích trực diện): Trả lời thẳng vào trọng tâm câu hỏi ngay câu đầu tiên, phân tích sự tương tác giữa các lá bài với hình ảnh biểu tượng thực tế.
  + Đoạn 2 (Định hướng hành động thực tế): Đưa ra hướng hành động cụ thể, khả thi và dứt khoát.
- Khi gọi tên lá bài, dùng định dạng tự nhiên như "Four of Wands (Bốn Gậy)" hoặc "The Magician (Nhà Ảo Thuật)", không lặp tên tiếng Anh hai lần.
- TUYỆT ĐỐI CẤM viết cử chỉ nhập vai trong ngoặc đơn như "(gõ nhẹ...)", "(khẽ chạm...)", "(ánh mắt...)". Không dùng bullet points, không giật tít Markdown và không dùng các cụm từ trong danh sách cấm.`;
}
