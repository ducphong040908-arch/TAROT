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

export const TAROT_SYSTEM_INSTRUCTION = `### 1. VAI TRÒ & NGUYÊN TẮC LUẬN GIẢI (PERSONA & PHILOSOPHY)
Bạn là một chuyên gia luận giải Tarot từng trải, sắc sảo, điềm tĩnh và thấu hiểu sâu sắc quy luật thực tế cuộc sống.
- NGUYÊN TẮC CỐT LÕI (BẮT BUỘC): Một trải bài Tarot là một BỨC TRANH TOÀN CẢNH và một CHUỖI NHÂN QUẢ LIÊN TỤC. Tuyệt đối KHÔNG phân tích từng lá bài một cách riêng lẻ, rời rạc hay đọc từ điển từng lá (vì hệ thống đã có bảng chi tiết từng lá ở trên).
- NHIỆM VỤ CỦA BẠN: Phải ĐAN DỆT và LIÊN KẾT các lá bài lại với nhau: chỉ ra lá trước tạo tiền đề hay gây xung đột gì cho lá sau; năng lượng chuyển biến thế nào giữa các nguyên tố (Lửa, Nước, Khí, Đất); đâu là nút thắt kìm hãm lớn nhất và đâu là chìa khóa bản lề để mở ra hướng giải quyết.
- PHÁN QUYẾT TRỰC DIỆN: Trả lời thẳng vào trọng tâm câu hỏi của người xem ngay câu đầu tiên. Tuyệt đối KHÔNG nói nước đôi, không vòng vo, không ru ngủ hay gieo hy vọng giả tạo. Xưng "tôi" và gọi người hỏi là "bạn".

### 2. CẤU TRÚC PHẢN HỒI CHO LUẬN GIẢI TỔNG HỢP (SYNTHESIS)
Bắt buộc trình bày rõ ràng, mạch lạc thành 4 phần có tiêu đề chuẩn (sử dụng đúng cú pháp Markdown sau để giao diện phân tách thẻ trực quan):

### ✦ THÔNG ĐIỆP CỐT LÕI & PHÁN QUYẾT
[1-2 câu trả lời thẳng thắn vào trọng tâm câu hỏi của người xem, phán quyết rõ cục diện: Thuận lợi, Cảnh báo bước ngoặt hay Cần điều kiện. Nêu bật bản chất tối thượng của toàn bộ trải bài]

### ✦ BỨC TRANH TOÀN CẢNH & SỢI DÂY LIÊN KẾT BỘ BÀI
[Phân tích cách các lá bài va chạm, tương tác, bổ trợ hoặc đối nghịch nhau để tạo thành một câu chuyện hoàn chỉnh. Phân tích dòng chảy từ Nguyên nhân gốc rễ (lá đầu) -> Biến chuyển / Thử thách (lá giữa / lá ngược) -> Kết quả kết tinh (lá kết). Chỉ ra sự tương tác giữa các nguyên tố và cấp độ Ẩn chính/Ẩn phụ. Tuyệt đối KHÔNG liệt kê lại lá 1 là gì, lá 2 là gì theo kiểu mục vụn vặt]

### ✦ CHIẾN LƯỢC HÀNH ĐỘNG DỨT KHOÁT
- **Việc cần làm ngay (Do):** [Hành động cụ thể, thực tế và khả thi trong tầm tay của người hỏi]
- **Điều tuyệt đối nên tránh (Don't):** [Những cạm bẫy tâm lý, sai lầm hành vi hoặc sự chủ quan do các lá bài (đặc biệt là lá ngược / thử thách) cảnh báo]

### ✦ LỜI ĐÚC KẾT THỨC TỈNH
TUYỆT ĐỐI KHÔNG TỰ BỊA ĐẶT CÂU NÓI. Bắt buộc trích dẫn chính xác 1 câu danh ngôn của người nổi tiếng, danh nhân lịch sử, triết gia (ví dụ: Marcus Aurelius, Seneca, Epictetus, Lão Tử, Khổng Tử, Socrates, Nietzsche, Camus, Steve Jobs, Goethe...) hoặc 1 câu ca dao, tục ngữ, thành ngữ dân gian nổi tiếng có tính đúc kết và ứng hợp sâu sắc nhất với bài học của trải bài.
Bắt buộc ghi rõ tác giả hoặc nguồn gốc trích dẫn theo định dạng:
"[Nội dung câu trích dẫn]" — [Tên tác giả / Triết gia / Xuất xứ ca dao tục ngữ]
Ví dụ: "Trở ngại trên con đường sẽ trở thành chính con đường. Điều cản trở hành động sẽ thúc đẩy hành động." — Marcus Aurelius
Hoặc: "Hành trình vạn dặm bắt đầu từ một bước chân." — Lão Tử
Hoặc: "Lửa thử vàng, gian nan thử sức." — Tục ngữ Việt Nam

### 3. QUY TẮC ĐỐI THOẠI TRÒ CHUYỆN & HỎI ĐÁP (CHAT)
- Hãy trò chuyện TỰ NHIÊN, THÂN THIỆN, ĐỒNG CẢM và TẬP TRUNG THẲNG VÀO CÂU HỎI như một cuộc trò chuyện với chatbot Tarot Reader thông thái, tâm sự và tư vấn trực tiếp 1-1 với người hỏi.
- TUYỆT ĐỐI KHÔNG dùng các tiêu đề Markdown khuôn mẫu cứng nhắc (như "### ✦ THÔNG ĐIỆP...", "### ✦ TRỌNG TÂM GIẢI ĐÁP...", "### ✦ PHÂN TÍCH KẾT NỐI...").
- Trả lời trực diện vào băn khoăn của người xem, sau đó tự nhiên đan cài thông điệp và bài học từ các lá bài đã rút trên bàn trải bài vào cuộc trò chuyện (ví dụ: "Nhìn vào lá The Fool xuôi của bạn...", "Về băn khoăn này, lá The Tower ngược muốn nhắc bạn rằng...").
- Trình bày thành 2-3 đoạn văn hội thoại tự nhiên, mượt mà, dễ đọc, có thể dùng gạch đầu dòng ngắn nếu cần gợi ý hành động cụ thể.

### 4. RÀO CHẮN PHỦ ĐỊNH & CẤM
- Tuyệt đối CẤM cử chỉ nhập vai trong ngoặc đơn như "(gõ nhẹ...)", "(khẽ chạm...)", "(ánh mắt...)", "(nghiêng đầu...)".
- CẤM dùng các cụm từ khuôn mẫu sáo rỗng: "mảnh vỡ", "khép lại chương cũ để mở ra cuốn sách mới", "bước ra ngoài ánh sáng", "tác phẩm dang dở", "người bạn của tôi".`;

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

export interface SpreadDynamics {
  total: number;
  revCount: number;
  uprightCount: number;
  majorCount: number;
  minorCount: number;
  elements: {
    fire: number;
    water: number;
    air: number;
    earth: number;
  };
  dominantElement: string;
  missingElements: string[];
  totalTone: number;
  isChallenging: boolean;
  catalystCard: Required<RichCardInput>;
  challengeCard?: Required<RichCardInput>;
}

export function analyzeSpreadDynamics(
  cards: Required<RichCardInput>[]
): SpreadDynamics {
  const total = cards.length || 1;
  const revCount = cards.filter((c) => c.isReversed).length;
  const uprightCount = total - revCount;

  let majorCount = 0;
  let minorCount = 0;
  const elements = { fire: 0, water: 0, air: 0, earth: 0 };

  cards.forEach((c) => {
    const matched = FULL_TAROT_DECK.find(
      (d) => d.name.toLowerCase() === c.name.toLowerCase()
    );
    if (matched?.arcana === "MAJOR") {
      majorCount++;
    } else {
      minorCount++;
    }

    const el = (c.element || matched?.elementVi || "").toLowerCase();
    if (el.includes("lửa") || el.includes("fire")) elements.fire++;
    else if (el.includes("nước") || el.includes("water")) elements.water++;
    else if (el.includes("khí") || el.includes("air")) elements.air++;
    else if (el.includes("đất") || el.includes("earth")) elements.earth++;
  });

  const missingElements: string[] = [];
  if (elements.fire === 0) missingElements.push("Lửa (Hành động & Ý chí)");
  if (elements.water === 0) missingElements.push("Nước (Cảm xúc & Trực giác)");
  if (elements.air === 0) missingElements.push("Khí (Tư duy & Phân tích)");
  if (elements.earth === 0) missingElements.push("Đất (Thực tế & Nguồn lực)");

  let dominantElement = "Đa nguyên tố cân bằng";
  const maxEl = Math.max(elements.fire, elements.water, elements.air, elements.earth);
  if (maxEl > 1) {
    if (elements.fire === maxEl) dominantElement = "Lửa (Ý chí & Sức bật)";
    else if (elements.water === maxEl) dominantElement = "Nước (Cảm xúc & Trực giác)";
    else if (elements.air === maxEl) dominantElement = "Khí (Tư duy & Chiến lược)";
    else if (elements.earth === maxEl) dominantElement = "Đất (Nền tảng & Kỷ luật)";
  }

  const totalTone = cards.reduce((acc, c) => {
    const d = getCardDeepMeaning(c.name);
    const baseTone = d?.tone ?? 1;
    return acc + (c.isReversed ? -Math.abs(baseTone || 1) : baseTone);
  }, 0);

  const isChallenging = revCount >= Math.ceil(total / 2) || totalTone < 0;

  // Catalyst card: highest tone upright card, or last card
  let catalystCard = cards.find((c) => !c.isReversed) || cards[cards.length - 1] || cards[0];
  const sortedPositive = [...cards]
    .filter((c) => !c.isReversed)
    .sort((a, b) => {
      const toneA = getCardDeepMeaning(a.name)?.tone ?? 0;
      const toneB = getCardDeepMeaning(b.name)?.tone ?? 0;
      return toneB - toneA;
    });
  if (sortedPositive.length > 0) {
    catalystCard = sortedPositive[0];
  }

  // Challenge card: lowest tone card or reversed card
  let challengeCard: Required<RichCardInput> | undefined = cards.find((c) => c.isReversed);
  const sortedNegative = [...cards].sort((a, b) => {
    const toneA = (getCardDeepMeaning(a.name)?.tone ?? 0) * (a.isReversed ? -1 : 1);
    const toneB = (getCardDeepMeaning(b.name)?.tone ?? 0) * (b.isReversed ? -1 : 1);
    return toneA - toneB;
  });
  if (sortedNegative.length > 0 && (sortedNegative[0].isReversed || isChallenging)) {
    challengeCard = sortedNegative[0];
  }

  return {
    total,
    revCount,
    uprightCount,
    majorCount,
    minorCount,
    elements,
    dominantElement,
    missingElements,
    totalTone,
    isChallenging,
    catalystCard,
    challengeCard,
  };
}

export function buildSynthesisFallback(
  question: string,
  topic: string,
  normalizedCards: Required<RichCardInput>[]
): string {
  const trimmedQuestion = question?.trim() || "";
  const effectiveQuestion =
    trimmedQuestion || `định hướng thực tế cho vấn đề ${topic.toLowerCase()}`;

  const domainKey = getDomainKeyFromTopic(`${topic} ${effectiveQuestion}`);
  const dynamics = analyzeSpreadDynamics(normalizedCards);
  const { total, revCount, majorCount, isChallenging, catalystCard, challengeCard, missingElements } = dynamics;

  const askIsYesNo = isYesNoQuestion(trimmedQuestion);
  const catalystTitle = getCleanVietnameseCardTitle(catalystCard);
  const catalystAdvice = getCleanAdviceForCard(catalystCard);

  // 1. THÔNG ĐIỆP CỐT LÕI & PHÁN QUYẾT
  let coreVerdict = "";
  if (askIsYesNo) {
    if (isChallenging) {
      coreVerdict = `Phán quyết trực diện cho câu hỏi "${effectiveQuestion}": KHÔNG. Ở thời điểm hiện tại, các điều kiện thực tế chưa ủng hộ để việc này diễn ra như mong đợi của bạn. Cục diện đang chịu sức ép từ những biến số chưa được xử lý dứt điểm.`;
    } else if (revCount > 0) {
      coreVerdict = `Phán quyết trực diện cho câu hỏi "${effectiveQuestion}": CÓ, NHƯNG ĐI KÈM ĐIỀU KIỆN TIÊN QUYẾT. Cơ hội thành công hoàn toàn khả thi, với điều kiện bạn phải chủ động kiểm soát chặt chẽ điểm nghẽn và không được hành động theo cảm tính chủ quan.`;
    } else {
      coreVerdict = `Phán quyết trực diện cho câu hỏi "${effectiveQuestion}": CÓ. Tổ hợp bài trên bàn mở ra một quỹ đạo rất sáng và thuận chiều, xác nhận bạn đang nắm giữ đầy đủ thiên thời và nền tảng để đạt được kết quả như ý.`;
    }
  } else {
    if (isChallenging) {
      coreVerdict = `Thông điệp cốt lõi cho câu hỏi "${effectiveQuestion}": CẢNH BÁO TÁI CƠ CẤU. Cục diện trong chủ đề ${topic.toLowerCase()} đang phát đi tín hiệu bước ngoặt nghiêm khắc: bạn không thể tiếp tục dùng tư duy cũ để giải quyết bài toán hiện tại. Năng lượng trải bài đòi hỏi một cuộc dọn dẹp và điều chỉnh chiến lược tận gốc rễ.`;
    } else {
      coreVerdict = `Thông điệp cốt lõi cho câu hỏi "${effectiveQuestion}": THỜI CƠ BỨT PHÁ VỮNG VÀNG. Bức tranh tổng thể xác nhận bạn đang có sự hậu thuẫn mạnh mẽ từ các điều kiện thực tế. Rào cản duy nhất lúc này chỉ còn là tốc độ hành động và tính kỷ luật của chính bạn.`;
    }
  }

  // 2. BỨC TRANH TOÀN CẢNH & SỢI DÂY LIÊN KẾT BỘ BÀI
  let macroAnalysis = "";
  if (majorCount >= Math.ceil(total / 2)) {
    macroAnalysis += `Xét trên toàn cục, sự áp đảo của các lá Ẩn Chính (${majorCount}/${total} lá) nhấn mạnh rằng tình huống bạn đang đối diện mang tầm vóc một bước ngoặt lớn về nhận thức và bài học quy luật cuộc đời, vượt trên những biến động nhỏ nhặt thông thường. `;
  } else {
    macroAnalysis += `Mật độ Ẩn Phụ chiếm đa số (${dynamics.minorCount}/${total} lá) cho thấy chìa khóa thành bại gắn liền với những chuyển động thực tế hàng ngày — kết quả hoàn toàn nằm trong tầm tay nếu bạn điều chỉnh thói quen và cách thức thực thi cụ thể. `;
  }

  if (missingElements.length > 0) {
    if (missingElements.some((e) => e.includes("Đất"))) {
      macroAnalysis += `Đáng chú ý, trải bài hoàn toàn khuyết thiếu nguyên tố Đất, cảnh báo rằng dù ý tưởng và khát vọng của bạn rất dồi dào, bạn đang thiếu đi kế hoạch thực thi từng bước có thể đo lường được trên thực tế. `;
    } else if (missingElements.some((e) => e.includes("Lửa"))) {
      macroAnalysis += `Sự vắng bóng của nguyên tố Lửa cho thấy bạn đang quá thận trọng hoặc do dự, thiếu đi ngọn lửa dứt khoát để biến những toan tính thành hành động cụ thể. `;
    } else if (missingElements.some((e) => e.includes("Nước"))) {
      macroAnalysis += `Trải bài khuyết thiếu nguyên tố Nước, nhắc nhở bạn đang xử lý vấn đề một cách quá cơ học, cần bổ sung sự đồng cảm và lắng nghe trực giác để không tạo ra căng thẳng ngầm. `;
    } else if (missingElements.some((e) => e.includes("Khí"))) {
      macroAnalysis += `Sự thiếu hụt nguyên tố Khí phản ánh bạn đang để cảm xúc và áp lực chi phối, cần lùi lại một bước để quan sát khách quan với cái đầu lạnh. `;
    }
  }

  // Xâu chuỗi nhân quả liên hoàn giữa các lá bài
  let narrativeChain = "";
  if (total === 1) {
    const c0 = normalizedCards[0];
    const title0 = getCleanVietnameseCardTitle(c0);
    const domain0 = getCleanDomainMeaningForCard(c0, domainKey);
    narrativeChain = `Lá bài ${title0} ${c0.isReversed ? "lật ngược" : "mở xuôi"} đứng ở vị trí trung tâm phản chiếu trọn vẹn bản chất của vấn đề: ${lowerFirstForClause(domain0)}. Toàn bộ năng lượng hội tụ vào lá bài này đòi hỏi bạn phải nhìn thẳng vào sự thật hiển hiện trước mắt để đưa ra lựa chọn rõ ràng.`;
  } else if (total === 2) {
    const c0 = normalizedCards[0];
    const c1 = normalizedCards[1];
    const title0 = getCleanVietnameseCardTitle(c0);
    const title1 = getCleanVietnameseCardTitle(c1);
    const domain0 = getCleanDomainMeaningForCard(c0, domainKey);
    const domain1 = getCleanDomainMeaningForCard(c1, domainKey);
    narrativeChain = `Mối liên kết giữa hai lá bài tạo nên một trục đối trọng nhân quả rất rõ nét: Lá mở đầu ${title0} ${c0.isReversed ? "lật ngược" : "mở xuôi"} xác lập hiện trạng gốc rễ (${lowerFirstForClause(domain0)}). Khi năng lượng này chạm tới lá thứ hai ${title1} ${c1.isReversed ? "lật ngược" : "mở xuôi"}, nó đặt ra một bước ngoặt tương tác trực tiếp (${lowerFirstForClause(domain1)}). Sự va chạm giữa nguyên tố ${c0.element} và ${c1.element} đòi hỏi bạn phải dùng đòn bẩy từ lá trước để mở đường cho lá sau.`;
  } else if (total === 3) {
    const c0 = normalizedCards[0];
    const c1 = normalizedCards[1];
    const c2 = normalizedCards[2];
    const title0 = getCleanVietnameseCardTitle(c0);
    const title1 = getCleanVietnameseCardTitle(c1);
    const title2 = getCleanVietnameseCardTitle(c2);
    const domain0 = getCleanDomainMeaningForCard(c0, domainKey);
    const domain1 = getCleanDomainMeaningForCard(c1, domainKey);
    const domain2 = getCleanDomainMeaningForCard(c2, domainKey);
    narrativeChain = `Sợi dây liên kết xuyên suốt ba lá bài phác họa một chuỗi nhân quả mạch lạc: Khởi phát từ nền tảng của ${title0} (${c0.isReversed ? "lật ngược" : "mở xuôi"}) — nơi ${lowerFirstForClause(domain0)} đặt nền móng ban đầu. Tuy nhiên, khi chuyển biến sang lá thứ hai ${title1} (${c1.isReversed ? "lật ngược" : "mở xuôi"}), cục diện xuất hiện một bước ngoặt va đập lớn: ${lowerFirstForClause(domain1)}. Đây chính là mắt xích bản lề quyết định toàn bộ trải bài. Chỉ khi bạn tháo gỡ được bài toán ở lá thứ hai này, đích đến tại lá thứ ba ${title2} (${c2.isReversed ? "lật ngược" : "mở xuôi"}) mới có thể kết tinh thành quả: ${lowerFirstForClause(domain2)}.`;
  } else {
    const cFirst = normalizedCards[0];
    const cLast = normalizedCards[normalizedCards.length - 1];
    const titleFirst = getCleanVietnameseCardTitle(cFirst);
    const titleLast = getCleanVietnameseCardTitle(cLast);
    const domainFirst = getCleanDomainMeaningForCard(cFirst, domainKey);
    const domainLast = getCleanDomainMeaningForCard(cLast, domainKey);
    const middleRev = normalizedCards.slice(1, -1).find((c) => c.isReversed);

    narrativeChain = `Các lá bài tạo thành một dòng chảy nhân quả liên hoàn: xuất phát từ gốc rễ tại ${titleFirst} (${lowerFirstForClause(domainFirst)}) và hướng thẳng tới đích đến tại ${titleLast} (${lowerFirstForClause(domainLast)}). ${
      middleRev
        ? `Điểm nghẽn năng lượng then chốt đang nằm ở lá ${getCleanVietnameseCardTitle(middleRev)} ở thế lật ngược — đây là nút thắt bạn bắt buộc phải gỡ bỏ trước khi muốn tiến sang các chặng tiếp theo.`
        : `Dòng chảy giữa các lá bài diễn ra tương đối thuận chiều, nơi mỗi mắt xích đều là bước đệm gia tốc đưa bạn đến kết quả cuối cùng.`
    }`;
  }

  const catalystMention = `Trong toàn bộ tổ hợp này, lá bài nắm giữ 'chìa khóa bản lề' là **${catalystTitle}** — đây là điểm tựa thực tế vững vàng nhất bạn cần bám sát để làm chủ tình thế.`;

  // 3. CHIẾN LƯỢC HÀNH ĐỘNG DỨT KHOÁT (DO / DON'T)
  const doAction = `Tập trung toàn lực vào thông điệp hành động từ lá ${catalystTitle}: ${lowerFirstForClause(catalystAdvice)}`;
  let dontAction = "";
  if (challengeCard) {
    const challengeTitle = getCleanVietnameseCardTitle(challengeCard);
    dontAction = challengeCard.isReversed
      ? `Tuyệt đối tránh cạm bẫy từ lá ${challengeTitle} đang lật ngược: không để sự trì trệ, nghi ngờ bản thân hoặc ảo tưởng kiểm soát làm bạn chệch hướng khỏi mục tiêu ban đầu.`
      : `Tuyệt đối tránh sự nôn nóng, đốt cháy giai đoạn hoặc đưa ra quyết định khi chưa nắm chắc các điều kiện thực tế từ lá ${challengeTitle}.`;
  } else {
    dontAction = `Tuyệt đối tránh tâm lý chủ quan, tự mãn hoặc trông chờ vào may mắn thụ động khi cục diện đang mở ra thuận lợi.`;
  }

  // 4. LỜI ĐÚC KẾT THỨC TỈNH (Trích dẫn danh ngôn người nổi tiếng, triết gia, ca dao tục ngữ chuẩn mực)
  const awakeningQuote = getContextualAwakeningQuote(topic, dynamics, normalizedCards, question);

  return `### ✦ THÔNG ĐIỆP CỐT LÕI & PHÁN QUYẾT
${coreVerdict}

### ✦ BỨC TRANH TOÀN CẢNH & SỢI DÂY LIÊN KẾT BỘ BÀI
${macroAnalysis}${narrativeChain} ${catalystMention}

### ✦ CHIẾN LƯỢC HÀNH ĐỘNG DỨT KHOÁT
- **Việc cần làm ngay (Do):** ${doAction}
- **Điều tuyệt đối nên tránh (Don't):** ${dontAction}

### ✦ LỜI ĐÚC KẾT THỨC TỈNH
${awakeningQuote}`;
}

/**
 * Thư viện danh ngôn, triết gia và ca dao tục ngữ chuẩn mực cho LỜI ĐÚC KẾT THỨC TỈNH.
 * Tuyệt đối không tự chế câu; chỉ trích dẫn từ các danh nhân, triết gia và kho tàng văn hóa dân gian.
 */
export function getContextualAwakeningQuote(
  topic: string,
  dynamics: ReturnType<typeof analyzeSpreadDynamics>,
  cards: Required<RichCardInput>[],
  question: string
): string {
  const isChallenging = dynamics.isChallenging;
  const dominantElement = dynamics.dominantElement;
  const topicLower = (topic || "").toLowerCase();

  // Bể danh ngôn phân loại theo ngữ cảnh
  const adversityQuotes = [
    `"Trở ngại trên con đường sẽ trở thành chính con đường. Điều cản trở hành động sẽ thúc đẩy hành động." — Marcus Aurelius`,
    `"Lửa thử vàng, gian nan thử sức." — Tục ngữ Việt Nam`,
    `"Khó khăn sinh ra để tôi luyện con người, không phải để hủy hoại họ." — Epictetus`,
    `"Cái gì không thể đánh gục được ta sẽ khiến ta mạnh mẽ hơn." — Friedrich Nietzsche`,
    `"Giữa mùa đông buốt giá, tôi nhận ra trong mình có một mùa hè bất diệt." — Albert Camus`,
    `"Qua cơn bĩ cực đến hồi thái lai." — Thành ngữ dân gian`,
    `"Chớ thấy sóng cả mà ngã tay chèo." — Ca dao Việt Nam`,
    `"Người có lý do đủ lớn để sống có thể chịu đựng được hầu hết mọi nghịch cảnh." — Viktor Frankl`,
  ];

  const actionFireQuotes = [
    `"Hành trình vạn dặm bắt đầu từ một bước chân." — Lão Tử`,
    `"Cách tốt nhất để dự đoán tương lai là hãy tự mình tạo ra nó." — Peter Drucker`,
    `"Biết thôi chưa đủ, phải thực hành; muốn thôi chưa đủ, phải dấn thân." — Johann Wolfgang von Goethe`,
    `"Thời điểm tốt nhất để trồng cây là 20 năm trước. Thời điểm tốt thứ hai là ngay bây giờ." — Ngạn ngữ`,
    `"Nước chảy đá mòn; có công mài sắt có ngày nên kim." — Tục ngữ Việt Nam`,
    `"Dám nghĩ dám làm, ắt làm nên chuyện." — Tục ngữ Việt Nam`,
    `"Số phận chỉ mỉm cười với những tâm hồn quả cảm và sẵn sàng hành động dứt khoát." — Virgil`,
  ];

  const wisdomAirQuotes = [
    `"Biết người là trí, biết mình là sáng. Thắng người là có lực, thắng mình mới là kiên cường." — Lão Tử (Đạo Đức Kinh)`,
    `"Cuộc đời không qua suy ngẫm là một cuộc đời không đáng sống." — Socrates`,
    `"Học mà không suy nghĩ thì mịt mờ, suy nghĩ mà không học thì nguy hại." — Khổng Tử`,
    `"Sự bình yên trong tâm trí là nguồn sức mạnh tối thượng trước mọi sóng gió." — Seneca`,
    `"Đừng để tiếng ồn từ quan điểm của người khác nhấn chìm tiếng nói sâu thẳm bên trong bạn." — Steve Jobs`,
    `"Tâm bất biến giữa dòng đời vạn biến." — Triết lý phương Đông`,
    `"Người làm chủ được cảm xúc và tâm trí mới là người thực sự tự do." — Epictetus`,
  ];

  const emotionWaterQuotes = [
    `"Chỉ có trái tim mới thấy được những điều cốt lõi; điều thực sự quan trọng vô hình trong mắt trần." — Antoine de Saint-Exupéry`,
    `"Nước mềm mại nhất thiên hạ, nhưng không thứ cứng rắn nào có thể chiến thắng được nó." — Lão Tử`,
    `"Vết thương chính là nơi ánh sáng đi vào bạn." — Rumi`,
    `"Thương người như thể thương thân; tâm an thì vạn sự an." — Tục ngữ Việt Nam`,
    `"Khi bạn học cách buông bỏ những điều không thuộc về mình, những điều tốt đẹp hơn sẽ tự khắc tìm đến." — Thiền sư Thích Nhất Hạnh`,
    `"Lùi một bước biển rộng trời cao." — Thành ngữ dân gian`,
  ];

  const earthStabilityQuotes = [
    `"Cây lớn ôm một vòng tay khởi sinh từ mầm nhỏ, tháp cao chín tầng bắt đầu từ từng sọt đất." — Lão Tử`,
    `"Gieo hành vi gặt thói quen, gieo thói quen gặt tính cách, gieo tính cách gặt số phận." — William James`,
    `"Tích tiểu thành đại; ngọc bất trác bất thành khí." — Thành ngữ dân gian`,
    `"Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau." — Ngạn ngữ Châu Phi`,
    `"Kiên nhẫn là cay đắng, nhưng quả ngọt của nó sẽ trường tồn." — Jean-Jacques Rousseau`,
    `"Có chí thì nên; thuận vợ thuận chồng tát biển Đông cũng cạn." — Tục ngữ Việt Nam`,
  ];

  // Chọn danh sách phù hợp nhất dựa trên tính chất
  let pool = adversityQuotes;
  if (isChallenging) {
    pool = adversityQuotes;
  } else if (dominantElement === "Lửa" || topicLower.includes("công việc") || topicLower.includes("sự nghiệp")) {
    pool = actionFireQuotes;
  } else if (dominantElement === "Nước" || topicLower.includes("tình") || topicLower.includes("mối quan hệ")) {
    pool = emotionWaterQuotes;
  } else if (dominantElement === "Đất" || topicLower.includes("tài chính") || topicLower.includes("tiền") || topicLower.includes("kinh doanh")) {
    pool = earthStabilityQuotes;
  } else if (dominantElement === "Khí" || topicLower.includes("học tập") || topicLower.includes("định hướng") || topicLower.includes("tâm lý")) {
    pool = wisdomAirQuotes;
  } else {
    pool = actionFireQuotes;
  }

  // Chọn ngẫu nhiên có kiểm soát dựa trên hash nội dung để mỗi lượt trải bài có câu danh ngôn ứng hợp và không trùng lặp
  const seedString = `${question}_${topic}_${cards.map((c) => c.name).join("_")}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % pool.length;
  return pool[index];
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

  const dynamics = analyzeSpreadDynamics(normalizedCards);
  const firstCard = normalizedCards[0];
  const lastCard = normalizedCards[normalizedCards.length - 1] || firstCard;
  const catalystTitle = getCleanVietnameseCardTitle(dynamics.catalystCard);

  if (intent === "action_7_days") {
    const targetCard = mentionedCards[0] || firstCard;
    const supportCard =
      normalizedCards.find((c) => c.name !== targetCard.name) || lastCard;
    const targetTitle = getCleanVietnameseCardTitle(targetCard);
    const supportTitle = getCleanVietnameseCardTitle(supportCard);
    const targetPos = targetCard.isReversed ? "lật ngược" : "mở xuôi";
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
        : "tập trung thực thi kỷ luật";

    return `Chào bạn! Về lộ trình hành động trong 7 ngày tới cho chủ đề ${topic.toLowerCase()}, nhìn vào toàn bộ trải bài thì lá **${targetTitle}** (${targetPos}) chính là kim chỉ nam quan trọng nhất của bạn lúc này.

Lá bài này cho thấy: ${lowerFirstForClause(targetMeaning)}. Từ khóa cốt lõi bạn nên bám sát trong tuần này là **"${focusKw}"**.

Gợi ý nhịp điệu hành động cho bạn:
- **Đầu tuần (Ngày 1 - 2):** ${
      targetCard.isReversed
        ? `Khoanh vùng ngay những điểm đang gây trì trệ hoặc phân tâm, kiên quyết cắt bớt các đầu việc lan man.`
        : `Xác lập rõ mục tiêu số một và chuẩn bị đầy đủ các điều kiện thực tế trước khi bắt tay vào tăng tốc.`
    }
- **Giữa tuần (Ngày 3 - 5):** Tập trung triển khai dứt khoát: ${lowerFirstForClause(targetAdvice)}${
      supportCard && supportCard.name !== targetCard.name
        ? `. Đồng thời mượn năng lượng cân bằng từ lá **${supportTitle}**: ${lowerFirstForClause(supportAdvice)}.`
        : "."
    }
- **Cuối tuần (Ngày 6 - 7):** Đánh giá lại kết quả dựa trên dữ kiện thực tế đo đếm được, đúc kết bài học để chuẩn bị cho chu kỳ tiếp theo.

Chúc bạn có một tuần hành động thật hiệu quả và vững vàng!`;
  }

  if (intent === "reversed_remedy") {
    const reversedCards = normalizedCards.filter((c) => c.isReversed);
    const uprightCards = normalizedCards.filter((c) => !c.isReversed);

    if (reversedCards.length === 0) {
      const watchCard = lastCard || firstCard;
      const watchTitle = getCleanVietnameseCardTitle(watchCard);
      const watchMeaning = getCleanDomainMeaningForCard(watchCard, domainKey);
      const watchAdvice = getCleanAdviceForCard(watchCard);

      return `Thật tuyệt vời là trên bàn trải bài của bạn, toàn bộ **${normalizedCards.length} lá bài đều đang ở thế MỞ XUÔI**! Điều này cho thấy dòng năng lượng trong câu chuyện ${topic.toLowerCase()} đang rất hanh thông và không có điểm nghẽn ngầm nào nghiêm trọng.

Tuy nhiên, lá bài bạn nên để tâm nhất để giữ vững thế chủ động là **${watchTitle}**: ${lowerFirstForClause(watchMeaning)}.

Lời khuyên nhỏ dành cho bạn:
- Hãy tiếp tục phát huy bài học từ lá **${watchTitle}**: ${lowerFirstForClause(watchAdvice)}.
- Tránh tâm lý chủ quan hoặc vội vàng mở rộng khi chưa củng cố nền móng thực tế nhé!`;
    }

    const revListText = reversedCards
      .map((c) => `lá **${getCleanVietnameseCardTitle(c)}** ở vị trí ${c.slotLabel.toLowerCase()}`)
      .join(", ");

    const blockageDetails = reversedCards
      .map((c) => {
        const title = getCleanVietnameseCardTitle(c);
        const revMeaning = getCleanDomainMeaningForCard(c, domainKey);
        return `- Ở lá **${title}**: Nút thắt xuất phát từ việc ${lowerFirstForClause(revMeaning)}.`;
      })
      .join("\n");

    const remedyDetails = reversedCards
      .map((c) => {
        const title = getCleanVietnameseCardTitle(c);
        const advice = getCleanAdviceForCard(c);
        return `- Đối với lá **${title}**: ${lowerFirstForClause(advice)}.`;
      })
      .join("\n");

    return `Về băn khoăn tháo gỡ khó khăn, mình thấy điểm nghẽn thực sự đang nằm ở ${reversedCards.length > 1 ? `${reversedCards.length} lá bài đang lật ngược` : "lá bài đang lật ngược"}: ${revListText}.

Bản chất của lá bài ngược không phải là điềm gở hay vận rủi, mà giống như một chiếc đèn vàng cảnh báo dòng năng lượng đang bị dồn nén hoặc có sự lệch nhịp:
${blockageDetails}

Để từng bước tháo gỡ điều này, bạn hãy:
${remedyDetails}
${
  uprightCards.length > 0
    ? `- Đồng thời dựa vào điểm tựa cân bằng từ lá bài mở xuôi **${getCleanVietnameseCardTitle(uprightCards[0])}**: ${lowerFirstForClause(getCleanAdviceForCard(uprightCards[0]))}.`
    : `- Dành cho mình một khoảng lặng để dọn dẹp tâm trí trước khi đưa ra hành động mới.`
}

Bạn đừng quá áp lực nhé, khi tháo gỡ được mắt xích này thì toàn bộ câu chuyện sẽ tự khắc thông suốt trở lại!`;
  }

  if (intent === "card_connection_turning_point") {
    const cardA = mentionedCards[0] || firstCard;
    const cardB =
      mentionedCards[1] ||
      normalizedCards.find((c) => c.name !== cardA.name) ||
      lastCard;
    const titleA = getCleanVietnameseCardTitle(cardA);
    const titleB = getCleanVietnameseCardTitle(cardB);
    const meaningA = getCleanDomainMeaningForCard(cardA, domainKey);
    const meaningB = getCleanDomainMeaningForCard(cardB, domainKey);
    const adviceA = getCleanAdviceForCard(cardA);
    const adviceB = getCleanAdviceForCard(cardB);
    const elementShift = analyzeElementTransition(cardA.element, cardB.element);

    return `Nhìn vào sự kết nối giữa lá **${titleA}** (${cardA.isReversed ? "ngược" : "xuôi"}) và lá **${titleB}** (${cardB.isReversed ? "ngược" : "xuôi"}), mình thấy đây chính là bước ngoặt quan trọng nhất của câu chuyện.

Sự chuyển giao giữa hai lá bài mang thông điệp: ${elementShift}. Bạn đang trên hành trình dịch chuyển từ trạng thái "${lowerFirstForClause(meaningA)}" sang một ngưỡng cục diện mới: "${lowerFirstForClause(meaningB)}".

Để đón đầu bước ngoặt này một cách thuận lợi nhất:
- **Bước 1:** Hoàn tất bài học hiện tại từ lá **${titleA}**: ${lowerFirstForClause(adviceA)}.
- **Bước 2:** Chủ động chuẩn bị tâm thế cho lá **${titleB}**: ${lowerFirstForClause(adviceB)}.

Khi bạn nắm được sợi dây nhân quả này, bạn sẽ luôn ở thế chủ động và không còn cảm giác bị động hay bất ngờ trước những thay đổi sắp tới.`;
  }

  if (intent === "feelings_mindset") {
    const primaryCard = mentionedCards[0] || firstCard;
    const secondaryCard =
      normalizedCards.find((c) => c.name !== primaryCard.name) || lastCard;
    const primaryDeep = getCardDeepMeaning(primaryCard.name);
    const personTrait = sanitizeTarotText(
      primaryDeep?.person ||
        `Người mang năng lượng nguyên tố ${primaryCard.element} với nội tâm thể hiện qua lá ${primaryCard.name}`
    );
    const loveMeaningPrimary = getCleanDomainMeaningForCard(primaryCard, "love");
    const loveMeaningSecondary = getCleanDomainMeaningForCard(secondaryCard, "love");
    const advicePrimary = getCleanAdviceForCard(primaryCard);

    return `Về cảm xúc và tâm thế trong câu chuyện này, hình ảnh lá **${getCleanVietnameseCardTitle(primaryCard)}** (${primaryCard.isReversed ? "ngược" : "xuôi"}) phản chiếu rất rõ nét: ${lowerFirstForClause(loveMeaningPrimary)}${
      secondaryCard && secondaryCard.name !== primaryCard.name
        ? `. Tầng cảm xúc sâu lắng hơn được lá **${getCleanVietnameseCardTitle(secondaryCard)}** hé lộ: ${lowerFirstForClause(loveMeaningSecondary)}.`
        : "."
    }

Đối phương (hoặc nội tâm của chính bạn) đang mang nét tính cách của ${lowerFirstForClause(personTrait)}. Mọi biểu hiện bên ngoài thực chất chỉ là tấm gương phản chiếu những trăn trở bên trong mà thôi.

Gợi ý ứng xử dành cho bạn:
- Hãy giữ vững trục giá trị và sự bình an bên trong theo lá **${getCleanVietnameseCardTitle(primaryCard)}**: ${lowerFirstForClause(advicePrimary)}.
- Tránh đoán già đoán non hay tự suy diễn cảm xúc của đối phương. Một cuộc trò chuyện chân thành và cởi mở sẽ giúp cả hai tháo bỏ mọi nút thắt.`;
  }

  if (intent === "yes_no") {
    const { isChallenging, revCount } = dynamics;
    const focusCard = mentionedCards[0] || firstCard;
    const outcomeCard = lastCard || focusCard;
    const focusTitle = getCleanVietnameseCardTitle(focusCard);
    const outcomeTitle = getCleanVietnameseCardTitle(outcomeCard);
    const focusMeaning = getCleanDomainMeaningForCard(focusCard, domainKey);
    const outcomeMeaning = getCleanDomainMeaningForCard(outcomeCard, domainKey);
    const outcomeAdvice = getCleanAdviceForCard(outcomeCard);

    if (isChallenging) {
      return `Với câu hỏi này của bạn, nhìn nhận khách quan từ các lá bài thì câu trả lời lúc này đang nghiêng về phía **CHƯA NÊN / KHÔNG**.

Căn cứ chính nằm ở lá **${focusTitle}** (${focusCard.isReversed ? "ngược" : "xuôi"}): ${lowerFirstForClause(focusMeaning)}${
        outcomeCard.name !== focusCard.name
          ? `, đồng thời lá kết **${outcomeTitle}** cũng nhắc nhở: ${lowerFirstForClause(outcomeMeaning)}`
          : ""
      }.

Tuy nhiên, câu trả lời này không phải là dấu chấm hết, mà là một sự ngăn chặn kịp thời để bạn không vội vàng khi các điều kiện chưa chín muồi.

Gợi ý hành động cho bạn:
- Hãy tạm chậm lại một nhịp, rà soát lại kế hoạch theo lời khuyên của lá **${outcomeTitle}**: ${lowerFirstForClause(outcomeAdvice)}.
- Khi các yếu tố cốt lõi được chuẩn bị kỹ lưỡng, cục diện sẽ tự khắc xoay chuyển thuận lợi hơn.`;
    }

    const isConditional = revCount > 0;
    const verdictWord = isConditional
      ? "CÓ, NHƯNG CẦN ĐI KÈM ĐIỀU KIỆN RÕ RÀNG"
      : "CÓ, TÍN HIỆU ĐANG RẤT KHẢ QUAN";

    return `Đối với câu hỏi của bạn, câu trả lời đang nghiêng rất rõ về phía **${verdictWord}**!

Lá bài trọng tâm **${focusTitle}** (${focusCard.isReversed ? "ngược" : "xuôi"}) khẳng định: ${lowerFirstForClause(focusMeaning)}${
      outcomeCard.name !== focusCard.name
        ? `. Thêm vào đó, lá kết **${outcomeTitle}** tiếp thêm niềm tin: ${lowerFirstForClause(outcomeMeaning)}.`
        : "."
    }

Thời điểm này đang mở ra cơ hội rất tốt cho bạn. Lời khuyên lúc này là:
- Hãy quyết đoán triển khai theo chỉ dẫn từ lá **${outcomeTitle}**: ${lowerFirstForClause(outcomeAdvice)}.
- Giữ vững kỷ luật và sự tỉ mỉ để nắm chắc kết quả tốt đẹp này nhé!`;
  }

  // Open custom question
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

  return `Chào bạn! Về câu hỏi "${activeQuery}", nhìn vào bàn trải bài thì trọng tâm câu trả lời hội tụ rõ nhất ở lá **${targetTitle}** (${targetCard.isReversed ? "ngược" : "xuôi"}).

Bản chất cốt lõi của vấn đề nằm ở chỗ: ${lowerFirstForClause(targetEssence)}. Đặt trực tiếp vào bối cảnh bạn đang hỏi, lá bài chỉ rõ rằng ${lowerFirstForClause(targetMeaning)}${
    secondCard && secondCard.name !== targetCard.name
      ? `. Bên cạnh đó, lá **${secondTitle}** bổ sung thêm một góc nhìn quan trọng: ${lowerFirstForClause(secondMeaning)}.`
      : "."
  }

Lời khuyên dành cho bạn:
- Hãy ưu tiên áp dụng chỉ dẫn từ lá **${targetTitle}**: ${lowerFirstForClause(targetAdvice)}.
- Kết hợp với lời nhắc từ lá **${secondTitle}**: ${lowerFirstForClause(secondAdvice)}, hãy giữ tâm thế chủ động và lắng nghe dữ kiện thực tế để đưa ra lựa chọn sáng suốt nhất.

Nếu bạn cần đào sâu thêm khía cạnh nào khác, cứ thoải mái hỏi mình nhé!`;
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

  const dynamics = analyzeSpreadDynamics(normalizedCards);

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
      } | Nguyên tố: ${c.element} | Bản chất: ${cleanEssence} | Biểu tượng: ${cleanSymbols}${
        cleanPerson ? ` | Nhân vật: ${cleanPerson}` : ""
      } | Luận giải theo chủ đề (${domainKey}): ${domainSpecific} | Lời khuyên gốc: ${cleanAdvice}`;
    })
    .join("\n");

  const telemetryBrief = `TỔNG QUAN NĂNG LƯỢNG TRẢI BÀI (${dynamics.total} lá):
- Tỷ lệ Ẩn chính / Ẩn phụ: ${dynamics.majorCount} Ẩn chính / ${dynamics.minorCount} Ẩn phụ
- Tỷ lệ Chiều bài: ${dynamics.uprightCount} Xuôi / ${dynamics.revCount} Ngược (Cục diện: ${dynamics.isChallenging ? "Nhiều thách thức/điểm nghẽn" : "Thuận lợi/sáng sủa"})
- Phân bổ nguyên tố: Lửa=${dynamics.elements.fire}, Nước=${dynamics.elements.water}, Khí=${dynamics.elements.air}, Đất=${dynamics.elements.earth}
- Nguyên tố chủ đạo: ${dynamics.dominantElement} | Nguyên tố khuyết: ${dynamics.missingElements.join(", ") || "Không khuyết"}
- Lá bài Chìa Khóa bản lề: ${getCleanVietnameseCardTitle(dynamics.catalystCard)}${
    dynamics.challengeCard
      ? ` | Lá bài Nút thắt/Thách thức lớn nhất: ${getCleanVietnameseCardTitle(dynamics.challengeCard)}`
      : ""
  }`;

  if (mode === "chat" && messages.length > 0) {
    const detectedIntent = detectChatQuestionIntent(
      latestChatQuestion,
      findMentionedCards(latestChatQuestion, normalizedCards)
    );

    return `THÔNG TIN TRẢI BÀI & NGỮ CẢNH HỎI ĐÁP CHUYÊN SÂU:
- Chủ đề: ${topic}
- Kiểu trải bài: ${spreadName}
- Câu hỏi gốc ban đầu: "${question || "Trải bài định hướng"}"
${telemetryBrief}

DANH SÁCH CÁC LÁ BÀI TRÊN BÀN:
${cardsSummary}

LỊCH SỬ HỘI THOẠI (Tối đa 10 lượt gần nhất):
${messages
  .slice(-10)
  .map((m) => `${m.role === "user" ? "Người hỏi" : "Tarot Reader"}: ${m.content}`)
  .join("\n")}

CÂU HỎI MỚI NHẤT CẦN TRẢ LỜI TRỰC DIỆN: "${latestChatQuestion}"
PHÂN LOẠI TRỌNG TÂM CÂU HỎI (INTENT): ${detectedIntent}

YÊU CẦU CHO TRÒ CHUYỆN / HỎI ĐÁP CHUYÊN SÂU (CHAT):
1. Hãy trả lời một cách TỰ NHIÊN, GẦN GŨI và TẬP TRUNG THẲNG VÀO TRỌNG TÂM câu hỏi: "${latestChatQuestion}".
2. Nói chuyện tự nhiên như một cuộc trò chuyện đối thoại thân tình giữa Tarot Chatbot/Reader và bạn đọc. TUYỆT ĐỐI KHÔNG dùng các tiêu đề Markdown khuôn mẫu hay báo cáo cứng nhắc (KHÔNG dùng tiêu đề "### ✦").
3. Khéo léo kết nối câu trả lời với những lá bài liên quan trên bàn trải bài (${normalizedCards.map(c => `${c.name} [${c.isReversed ? "ngược" : "xuôi"}]`).join(", ")}).
4. Đưa ra góc nhìn sâu sắc, thực tế và những lời khuyên hữu ích, dễ tiếp thu để người xem tháo gỡ băn khoăn.
5. Tuyệt đối CẤM cử chỉ nhập vai trong ngoặc đơn "(gõ nhẹ...)" và cấm dùng các từ trong blacklist.`;
  }

  return `THÔNG TIN TRẢI BÀI & CÂU HỎI CỦA NGƯỜI XEM:
- Chủ đề: ${topic}
- Kiểu trải bài: ${spreadName}
- Câu hỏi của người xem: "${question || "Xin thông điệp định hướng thực tế từ các lá bài này"}"
${telemetryBrief}

DANH SÁCH CÁC LÁ BÀI ĐÃ RÚT:
${cardsSummary}

YÊU CẦU BẮT BUỘC CHO PHÂN TÍCH CHUYÊN SÂU TOÀN BỘ TRẢI BÀI (SYNTHESIS):
1. NGUYÊN TẮC CỐT LÕI: Phải ĐAN DỆT và XÂU CHUỖI các lá bài thành một BỨC TRANH TOÀN CẢNH và CHUỖI NHÂN QUẢ LIÊN TỤC. Tuyệt đối KHÔNG phân tích rời rạc từng lá kiểu "Lá 1 là..., Lá 2 là..." vì giao diện đã có bảng chi tiết từng lá ở trên rồi.
2. Hãy chỉ ra sự va chạm giữa các nguyên tố (Lửa, Nước, Khí, Đất), sự áp đảo của Ẩn chính/Ẩn phụ, đâu là lá bài "nút thắt kìm hãm" và đâu là lá bài "chìa khóa bản lề".
3. Bắt buộc trình bày chuẩn xác theo 4 phần với tiêu đề Markdown sau để giao diện hiển thị thành các Card Cyber trực quan:

### ✦ THÔNG ĐIỆP CỐT LÕI & PHÁN QUYẾT
[1-2 câu trả lời thẳng thắn vào trọng tâm câu hỏi của người xem, phán quyết rõ cục diện: Thuận lợi, Cảnh báo bước ngoặt hay Cần điều kiện. Đúc kết bản chất tối thượng của toàn bộ trải bài]

### ✦ BỨC TRANH TOÀN CẢNH & SỢI DÂY LIÊN KẾT BỘ BÀI
[Phân tích cách các lá bài va chạm, tương tác, bổ trợ hoặc đối nghịch nhau để tạo thành một câu chuyện hoàn chỉnh. Phân tích dòng chảy từ Nguyên nhân gốc rễ (lá đầu) -> Biến chuyển / Thử thách (lá giữa / lá ngược) -> Kết quả kết tinh (lá kết). Chỉ ra sự tương tác giữa các nguyên tố và cấp độ Ẩn chính/Ẩn phụ]

### ✦ CHIẾN LƯỢC HÀNH ĐỘNG DỨT KHOÁT
- **Việc cần làm ngay (Do):** [Hành động cụ thể, thực tế và khả thi trong tầm tay của người hỏi]
- **Điều tuyệt đối nên tránh (Don't):** [Những cạm bẫy tâm lý, sai lầm hành vi hoặc sự chủ quan do các lá bài (đặc biệt là lá ngược / thử thách) cảnh báo]

### ✦ LỜI ĐÚC KẾT THỨC TỈNH
TUYỆT ĐỐI KHÔNG TỰ BỊA ĐẶT CÂU NÓI. Bắt buộc trích dẫn chính xác 1 câu danh ngôn của người nổi tiếng, danh nhân lịch sử, triết gia (ví dụ: Marcus Aurelius, Seneca, Epictetus, Lão Tử, Khổng Tử, Socrates, Nietzsche, Camus, Steve Jobs, Goethe...) hoặc 1 câu ca dao, tục ngữ, thành ngữ dân gian nổi tiếng có tính đúc kết và ứng hợp sâu sắc nhất với bài học của trải bài.
Bắt buộc ghi rõ tác giả hoặc nguồn gốc trích dẫn theo định dạng:
"[Nội dung câu trích dẫn]" — [Tên tác giả / Triết gia / Xuất xứ ca dao tục ngữ]
Ví dụ: "Trở ngại trên con đường sẽ trở thành chính con đường. Điều cản trở hành động sẽ thúc đẩy hành động." — Marcus Aurelius
Hoặc: "Hành trình vạn dặm bắt đầu từ một bước chân." — Lão Tử
Hoặc: "Lửa thử vàng, gian nan thử sức." — Tục ngữ Việt Nam

4. Tuyệt đối CẤM cử chỉ nhập vai trong ngoặc đơn "(gõ nhẹ...)" và cấm dùng các từ trong danh sách cấm.`;
}
