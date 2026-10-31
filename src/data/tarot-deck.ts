export type ArcanaType = "MAJOR" | "MINOR";
export type SuitType = "ARCANA_CORE" | "WANDS" | "CUPS" | "SWORDS" | "PENTACLES";
export type ElementType = "ETHER" | "FIRE" | "WATER" | "AIR" | "EARTH";

export interface TarotCardData {
  id: number;
  hexAddress: string; // e.g., "0x00" to "0x4D"
  name: string;
  viName: string;
  image: string;
  arcana: ArcanaType;
  suit: SuitType;
  element: ElementType;
  elementVi: string;
  clockFreq: string;
  romanNumeral: string;
  cyberMetaphor: string;
  cyberSubtext: string;
  keywordsUpright: string[];
  keywordsReversed: string[];
  meaningUpright: string;
  meaningReversed: string;
  advice: string;
  constellationNodes: Array<{ x: number; y: number }>;
  glyphType: "orb" | "circuit" | "prism" | "matrix" | "waveform" | "nexus" | "flame" | "chalice" | "blade" | "pentacle";
}

export interface SpreadSlotMeta {
  index: number;
  code: string;
  label: string;
  viLabel: string;
  description: string;
}

export interface SpreadConfig {
  id: "single" | "three" | "five" | "custom";
  name: string;
  viName: string;
  cyberName: string;
  cardCount: number;
  badge: string;
  description: string;
  slots: SpreadSlotMeta[];
}

export interface TopicPreset {
  id: string;
  name: string;
  cyberCode: string;
  iconName: string;
  description: string;
  sampleQuestions: string[];
}

export const TOPIC_PRESETS: TopicPreset[] = [
  {
    id: "love",
    name: "Tình Yêu & Kết Nối",
    cyberCode: "TÌNH YÊU & NHÂN DUYÊN",
    iconName: "Heart",
    description: "Giải mã tín hiệu cảm xúc, mức độ đồng bộ tần số và nút thắt trong mối quan hệ.",
    sampleQuestions: [
      "Người ấy đang thực sự nghĩ gì và cảm nhận thế nào về mối quan hệ này?",
      "Mối quan hệ hiện tại của chúng tôi sẽ dịch chuyển ra sao trong 3 tháng tới?",
      "Tôi cần tháo gỡ 'nút thắt' tâm lý nào để đón nhận tình yêu lành mạnh hơn?",
    ],
  },
  {
    id: "career",
    name: "Sự Nghiệp & Tài Chính",
    cyberCode: "CÔNG VIỆC & TÀI CHÍNH",
    iconName: "Cpu",
    description: "Phân tích băng thông sự nghiệp, cơ hội thăng tiến, dòng tiền và điểm nghẽn dự án.",
    sampleQuestions: [
      "Tôi nên tiếp tục tối ưu vị trí hiện tại hay chuyển hướng sang cơ hội mới?",
      "Đâu là điểm nghẽn vô hình đang kìm hãm bước tiến sự nghiệp và tài chính của tôi?",
      "Dự án / kế hoạch kinh doanh tôi sắp khởi chạy cần lưu ý rủi ro hệ thống nào?",
    ],
  },
  {
    id: "self",
    name: "Bản Thân & Tiềm Thức",
    cyberCode: "PHÁT TRIỂN BẢN THÂN",
    iconName: "Sparkles",
    description: "Truy xuất bộ nhớ tiềm thức, nhận diện giới hạn bản thân và tái cân bằng năng lượng.",
    sampleQuestions: [
      "Thông điệp quan trọng nhất mà vũ trụ và tiềm thức muốn gửi đến tôi lúc này là gì?",
      "Tôi đang tự giới hạn tiềm năng của chính mình qua những thói quen hay nỗi sợ nào?",
      "Làm thế nào để khôi phục lại trạng thái cân bằng và xung nhịp năng lượng tích cực?",
    ],
  },
  {
    id: "decision",
    name: "Định Hướng Quyết Định",
    cyberCode: "LỰA CHỌN & NGÃ RẼ",
    iconName: "GitBranch",
    description: "Mô phỏng phân nhánh tương lai khi đứng trước ngã rẽ hoặc lựa chọn quan trọng.",
    sampleQuestions: [
      "Nếu tôi quyết định bước ra khỏi vùng an toàn lúc này, kết quả dài hạn sẽ ra sao?",
      "Giữa hai lựa chọn đang phân vân, hướng đi nào đồng điệu nhất với giá trị cốt lõi của tôi?",
      "Yếu tố ẩn giấu nào tôi đang bỏ sót trước khi đưa ra quyết định cuối cùng?",
    ],
  },
];

export const SPREAD_CONFIGS: SpreadConfig[] = [
  {
    id: "single",
    name: "Trải Bài 1 Lá — Thông Điệp Tức Thời",
    viName: "Trải Bài 1 Lá",
    cyberName: "1 LÁ",
    cardCount: 1,
    badge: "1 LÁ",
    description: "Nhận diện thông điệp cốt lõi, lời khuyên trực diện hoặc câu trả lời nhanh cho vấn đề của bạn.",
    slots: [
      {
        index: 0,
        code: "LÁ 1",
        label: "Card 1",
        viLabel: "Lá 1",
        description: "Thông điệp cốt lõi cho câu hỏi của bạn.",
      },
    ],
  },
  {
    id: "three",
    name: "Trải Bài 3 Lá — Tổng Quan Diễn Biến",
    viName: "Trải Bài 3 Lá",
    cyberName: "3 LÁ",
    cardCount: 3,
    badge: "3 LÁ",
    description: "Phân tích dòng chảy diễn biến toàn diện qua 3 lá bài liên kết (Nguồn gốc, Thực tại và Xu hướng).",
    slots: [
      {
        index: 0,
        code: "LÁ 1",
        label: "Card 1",
        viLabel: "Lá 1",
        description: "Lá bài thứ nhất: Nền tảng và nguyên nhân ban đầu.",
      },
      {
        index: 1,
        code: "LÁ 2",
        label: "Card 2",
        viLabel: "Lá 2",
        description: "Lá bài thứ hai: Trạng thái và diễn biến hiện tại.",
      },
      {
        index: 2,
        code: "LÁ 3",
        label: "Card 3",
        viLabel: "Lá 3",
        description: "Lá bài thứ ba: Xu hướng và hướng phát triển tiếp theo.",
      },
    ],
  },
  {
    id: "five",
    name: "Trải Bài 5 Lá — Phân Tích Chuyên Sâu",
    viName: "Trải Bài 5 Lá",
    cyberName: "5 LÁ",
    cardCount: 5,
    badge: "5 LÁ",
    description: "Khám phá đa chiều và sâu sắc tình huống của bạn qua 5 lá bài tương hỗ.",
    slots: [
      {
        index: 0,
        code: "LÁ 1",
        label: "Card 1",
        viLabel: "Lá 1",
        description: "Lá bài 1: Trọng tâm cốt lõi của tình huống.",
      },
      {
        index: 1,
        code: "LÁ 2",
        label: "Card 2",
        viLabel: "Lá 2",
        description: "Lá bài 2: Thử thách hoặc yếu tố tác động.",
      },
      {
        index: 2,
        code: "LÁ 3",
        label: "Card 3",
        viLabel: "Lá 3",
        description: "Lá bài 3: Tác động ngầm và nội tâm.",
      },
      {
        index: 3,
        code: "LÁ 4",
        label: "Card 4",
        viLabel: "Lá 4",
        description: "Lá bài 4: Chuyển biến sắp tới.",
      },
      {
        index: 4,
        code: "LÁ 5",
        label: "Card 5",
        viLabel: "Lá 5",
        description: "Lá bài 5: Lời khuyên và giải pháp hành động.",
      },
    ],
  },
];

export function buildCustomSpread(count: number): SpreadConfig {
  const safeCount = Math.min(8, Math.max(1, count));
  return {
    id: "custom",
    name: `Trải Bài ${safeCount} Lá`,
    viName: `Trải Bài ${safeCount} Lá`,
    cyberName: `${safeCount} LÁ`,
    cardCount: safeCount,
    badge: `${safeCount} LÁ`,
    description: `Trải bài ${safeCount} lá: Chọn ${safeCount} lá bài bạn cảm thấy thu hút nhất từ bộ bài 78 lá.`,
    slots: Array.from({ length: safeCount }, (_, idx) => ({
      index: idx,
      code: `LÁ ${idx + 1}`,
      label: `Card ${idx + 1}`,
      viLabel: `Lá ${idx + 1}`,
      description: `Lá bài thứ ${idx + 1}`,
    })),
  };
}

const MAJOR_ARCANA_IMAGE_MAP: Record<number, string> = {
  0: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
  1: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
  2: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
  3: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
  4: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
  5: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
  6: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg",
  7: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  8: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  9: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
  10: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
  11: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
  12: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
  13: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
  14: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
  15: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
  16: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
  17: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
  18: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
  19: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
  20: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
  21: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
};

function getCommonsMinorImage(suit: SuitType, rankNumber: number): string {
  const prefixMap: Record<SuitType, string> = {
    ARCANA_CORE: "RWS_Tarot",
    WANDS: "Wands",
    CUPS: "Cups",
    SWORDS: "Swords",
    PENTACLES: "Pents",
  };
  const numStr = String(rankNumber).padStart(2, "0");
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${prefixMap[suit]}${numStr}.jpg`;
}

const MAJOR_ARCANA_RAW: Omit<TarotCardData, "image">[] = [
  {
    id: 0,
    hexAddress: "0x00",
    name: "The Fool",
    viName: "Kẻ Khờ — Khởi Nguyên Tự Do",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "AIR",
    elementVi: "Khí",
    clockFreq: "0.00 GHz [UNBOUND]",
    romanNumeral: "0",
    cyberMetaphor: "Uninitialized Pointer // Cold Boot",
    cyberSubtext: "Khởi tạo tiến trình mới hoàn toàn trên vùng bộ nhớ trắng, không bị ràng buộc bởi dữ liệu cũ.",
    keywordsUpright: ["Khởi đầu mới", "Bước nhảy niềm tin", "Tự do", "Nguyên bản"],
    keywordsReversed: ["Liều lĩnh", "Thiếu kiểm tra biên", "Do dự", "Bất cẩn"],
    meaningUpright: "Một chu kỳ hoàn toàn mới đang mở ra trước mắt bạn. Giống như một tiến trình Cold Boot trên vùng nhớ sạch, bạn được mời gọi bước ra khỏi vùng an toàn với tâm thế cởi mở, không định kiến.",
    meaningReversed: "Cảnh báo về việc nhảy vào một quyết định khi chưa kiểm tra điều kiện biên (Unchecked Exception), hoặc ngược lại: quá sợ hãi lỗi hệ thống mà không dám nhấn nút khởi chạy.",
    advice: "Hãy cho phép mình thử nghiệm với tinh thần học hỏi, nhưng giữ một cơ chế sao lưu an toàn.",
    constellationNodes: [{ x: 50, y: 20 }, { x: 30, y: 45 }, { x: 70, y: 50 }, { x: 45, y: 78 }],
    glyphType: "orb",
  },
  {
    id: 1,
    hexAddress: "0x01",
    name: "The Magician",
    viName: "Nhà Ảo Thuật — Kiến Trúc Sư Thực Thi",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "AIR",
    elementVi: "Khí",
    clockFreq: "5.20 GHz [TURBO]",
    romanNumeral: "I",
    cyberMetaphor: "Full-Stack Compiler // Resource Multiplexer",
    cyberSubtext: "Biên dịch ý tưởng trừu tượng thành mã máy thực thi với đầy đủ 4 bus nguyên tố.",
    keywordsUpright: ["Làm chủ công cụ", "Hiện thực hóa", "Tập trung cao độ", "Sáng tạo"],
    keywordsReversed: ["Phân tán tài nguyên", "Thao túng", "Ảo tưởng sức mạnh", "Chưa khai thác hết"],
    meaningUpright: "Bạn đang nắm giữ đầy đủ mọi thư viện, tài nguyên và kỹ năng cần thiết để biến ý tưởng thành hiện thực. Đây là thời điểm biên dịch suy nghĩ thành hành động cụ thể.",
    meaningReversed: "Năng lượng đang bị phân mảnh vào quá nhiều luồng xử lý cùng lúc hoặc bạn đang nghi ngờ chính năng lực thực thi của mình.",
    advice: "Tập trung toàn bộ xung nhịp CPU vào một mục tiêu ưu tiên cao nhất và bắt tay hành động ngay.",
    constellationNodes: [{ x: 50, y: 15 }, { x: 25, y: 40 }, { x: 75, y: 40 }, { x: 50, y: 65 }, { x: 50, y: 85 }],
    glyphType: "circuit",
  },
  {
    id: 2,
    hexAddress: "0x02",
    name: "The High Priestess",
    viName: "Nữ Tư Tế — Kho Dữ Liệu Tiềm Thức",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "WATER",
    elementVi: "Nước",
    clockFreq: "1.44 GHz [SILENT]",
    romanNumeral: "II",
    cyberMetaphor: "Encrypted Kernel Vault // Deep Intuition",
    cyberSubtext: "Dữ liệu nằm sâu dưới lớp mã hóa trực giác, không thể truy xuất bằng logic bề mặt thông thường.",
    keywordsUpright: ["Trực giác nhạy bén", "Bí ẩn", "Tĩnh lặng", "Tri thức nội tâm"],
    keywordsReversed: ["Bỏ qua tín hiệu ngầm", "Bí mật bị rò rỉ", "Sống bề nổi", "Nghi ngờ bản thân"],
    meaningUpright: "Câu trả lời bạn tìm kiếm không nằm ở những ồn ào bên ngoài mà đã được mã hóa sẵn trong trực giác của bạn. Hãy lắng nghe những tín hiệu tinh tế nhất từ nội tâm.",
    meaningReversed: "Bạn đang để tiếng ồn ngoại cảnh lấn át tiếng nói bên trong, hoặc đang cố ép buộc một kết luận khi dữ liệu chưa sẵn sàng mở khóa.",
    advice: "Tạm dừng các tác vụ ồn ào, quan sát giấc mơ và những linh cảm thoáng qua.",
    constellationNodes: [{ x: 35, y: 22 }, { x: 65, y: 22 }, { x: 50, y: 50 }, { x: 35, y: 78 }, { x: 65, y: 78 }],
    glyphType: "prism",
  },
  {
    id: 3,
    hexAddress: "0x03",
    name: "The Empress",
    viName: "Nữ Hoàng — Nguồn Sinh Lực Trù Phú",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "EARTH",
    elementVi: "Đất",
    clockFreq: "3.14 GHz [HARMONIC]",
    romanNumeral: "III",
    cyberMetaphor: "Generative Neural Fabric // Abundant Supply",
    cyberSubtext: "Môi trường nuôi dưỡng dồi dào, nơi mọi hạt giống ý tưởng đều được cấp đủ năng lượng để nảy mầm.",
    keywordsUpright: ["Trù phú", "Nuôi dưỡng", "Sáng tạo nghệ thuật", "Cảm xúc ấm áp"],
    keywordsReversed: ["Cạn kiệt năng lượng", "Quá phụ thuộc", "Bế tắc sáng tạo", "Thiếu chăm sóc bản thân"],
    meaningUpright: "Giai đoạn nở rộ của sự sáng tạo, tình yêu thương và sự sung túc. Những gì bạn đang ấp ủ có một nền tảng cực kỳ màu mỡ để phát triển bền vững.",
    meaningReversed: "Hệ thống đang báo hiệu tình trạng quá tải vì chăm lo cho người khác mà quên nạp lại năng lượng cho chính bo mạch chủ của mình.",
    advice: "Nuôi dưỡng cơ thể, cảm xúc và cho phép dự án của bạn phát triển theo nhịp sinh học tự nhiên.",
    constellationNodes: [{ x: 50, y: 18 }, { x: 28, y: 38 }, { x: 72, y: 38 }, { x: 38, y: 70 }, { x: 62, y: 70 }],
    glyphType: "nexus",
  },
  {
    id: 4,
    hexAddress: "0x04",
    name: "The Emperor",
    viName: "Hoàng Đế — Kiến Trúc Hệ Thống Vững Chãi",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "FIRE",
    elementVi: "Lửa",
    clockFreq: "4.80 GHz [LOCKED]",
    romanNumeral: "IV",
    cyberMetaphor: "Root Hypervisor // Deterministic Governance",
    cyberSubtext: "Thiết lập cấu trúc kỷ luật, giao thức rõ ràng và tường lửa bảo vệ vững chắc.",
    keywordsUpright: ["Kỷ luật", "Quyền lực", "Cấu trúc vững chắc", "Bảo vệ"],
    keywordsReversed: ["Cứng nhắc", "Kiểm soát thái quá", "Thiếu kỷ luật", "Lạm quyền"],
    meaningUpright: "Để đạt được mục tiêu lớn, bạn cần một kiến trúc hệ thống rõ ràng, kỷ luật thép và tư duy chiến lược. Sự ổn định đến từ việc làm chủ quy trình.",
    meaningReversed: "Sự bảo thủ và cứng nhắc đang làm giảm tính linh hoạt của bạn, hoặc ngược lại, việc thiếu cấu trúc đang khiến mọi thứ rơi vào hỗn loạn.",
    advice: "Xây dựng kế hoạch có lộ trình rõ ràng, phân tách trách nhiệm minh bạch và kiên định thực thi.",
    constellationNodes: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 50, y: 50 }, { x: 25, y: 75 }, { x: 75, y: 75 }],
    glyphType: "matrix",
  },
  {
    id: 5,
    hexAddress: "0x05",
    name: "The Hierophant",
    viName: "Giáo Hoàng — Giao Thức Chuẩn Mực",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "EARTH",
    elementVi: "Đất",
    clockFreq: "2.40 GHz [VERIFIED]",
    romanNumeral: "V",
    cyberMetaphor: "IEEE Standard Protocol // Legacy Wisdom",
    cyberSubtext: "Kế thừa tri thức chuẩn hóa, cố vấn chuyên gia và những nguyên tắc đã được kiểm chứng qua thời gian.",
    keywordsUpright: ["Truyền thống", "Người dẫn đường", "Học vấn", "Chuẩn mực đạo đức"],
    keywordsReversed: ["Phá cách", "Tự tìm lối riêng", "Giáo điều lỗi thời", "Phản kháng quy tắc"],
    meaningUpright: "Đây là lúc nên tôn trọng các quy chuẩn nền tảng, tìm kiếm một người thầy (Mentor) hoặc học hỏi từ những phương pháp đã được chứng minh hiệu quả.",
    meaningReversed: "Các giao thức cũ kỹ không còn phù hợp với bài toán hiện tại của bạn; đã đến lúc nâng cấp tư duy và tự viết kiến trúc riêng.",
    advice: "Nắm vững nguyên lý gốc trước khi phá cách sáng tạo.",
    constellationNodes: [{ x: 50, y: 15 }, { x: 32, y: 42 }, { x: 68, y: 42 }, { x: 50, y: 68 }, { x: 50, y: 86 }],
    glyphType: "circuit",
  },
  {
    id: 6,
    hexAddress: "0x06",
    name: "The Lovers",
    viName: "Đôi Tình Nhân — Liên Kết Lượng Tử",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "AIR",
    elementVi: "Khí",
    clockFreq: "4.32 GHz [SYNCED]",
    romanNumeral: "VI",
    cyberMetaphor: "Quantum Entanglement // Value Alignment",
    cyberSubtext: "Hai nút mạng đồng bộ hóa pha hoàn toàn; đồng thời là ngã rẽ đòi hỏi sự lựa chọn từ trái tim.",
    keywordsUpright: ["Sự hòa hợp", "Tình yêu sâu sắc", "Lựa chọn giá trị", "Cam kết"],
    keywordsReversed: ["Lệch pha", "Mâu thuẫn nội tâm", "Né tránh trách nhiệm", "Cám dỗ"],
    meaningUpright: "Một sự kết nối mạnh mẽ và đồng điệu đang hiện diện. Ngoài chuyện tình cảm, lá bài còn nhấn mạnh việc đưa ra lựa chọn hoàn toàn trung thực với hệ giá trị cốt lõi của bạn.",
    meaningReversed: "Có sự mất đồng bộ giữa lời nói và hành động, hoặc bạn đang đứng giữa hai luồng tín hiệu xung đột mà chưa dám dứt khoát.",
    advice: "Hãy chọn con đường mà cả lý trí lẫn trái tim bạn đều ký xác nhận (Digital Signature).",
    constellationNodes: [{ x: 30, y: 30 }, { x: 70, y: 30 }, { x: 50, y: 55 }, { x: 50, y: 80 }],
    glyphType: "nexus",
  },
  {
    id: 7,
    hexAddress: "0x07",
    name: "The Chariot",
    viName: "Cỗ Xe — Xung Nhịp Bứt Phá",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "WATER",
    elementVi: "Nước",
    clockFreq: "5.60 GHz [OVERCLOCK]",
    romanNumeral: "VII",
    cyberMetaphor: "DMA High-Speed Vector // Directed Momentum",
    cyberSubtext: "Hợp nhất hai luồng xung lực đối nghịch thành một mũi tên tiến về đích với tốc độ tối đa.",
    keywordsUpright: ["Ý chí sắt đá", "Chiến thắng", "Tăng tốc", "Làm chủ hướng đi"],
    keywordsReversed: ["Mất phương hướng", "Xung đột lực kéo", "Nóng vội", "Mất kiểm soát"],
    meaningUpright: "Khi mục tiêu đã khóa tọa độ, không rào cản nào có thể ngăn cản đà tiến của bạn. Sự tập trung và kỷ luật sẽ mang lại chiến thắng thuyết phục.",
    meaningReversed: "Bạn đang tăng tốc quá mức nhưng lại buông lỏng tay lái, khiến hai luồng cảm xúc và lý trí kéo bạn đi theo hai hướng ngược nhau.",
    advice: "Giữ chặt tay lái, định chuẩn lại la bàn trước khi nhấn ga tối đa.",
    constellationNodes: [{ x: 50, y: 15 }, { x: 25, y: 50 }, { x: 75, y: 50 }, { x: 35, y: 82 }, { x: 65, y: 82 }],
    glyphType: "waveform",
  },
  {
    id: 8,
    hexAddress: "0x08",
    name: "Strength",
    viName: "Sức Mạnh — Nội Lực Bền Bỉ",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "FIRE",
    elementVi: "Lửa",
    clockFreq: "3.80 GHz [STABLE]",
    romanNumeral: "VIII",
    cyberMetaphor: "Fault-Tolerant Core // Graceful Dampening",
    cyberSubtext: "Điều tiết dòng năng lượng dữ dội bằng sự điềm tĩnh, lòng trắc ẩn và bản lĩnh nội tâm.",
    keywordsUpright: ["Bản lĩnh nội tâm", "Kiên nhẫn", "Lòng trắc ẩn", "Lương thiện mạnh mẽ"],
    keywordsReversed: ["Tự ti", "Nóng giận bộc phát", "Mệt mỏi tinh thần", "Thiếu kiên nhẫn"],
    meaningUpright: "Sức mạnh thật sự không nằm ở sự cưỡng ép thô bạo mà ở khả năng làm chủ cảm xúc và hóa giải áp lực bằng sự kiên định dịu dàng.",
    meaningReversed: "Cảm giác nghi ngờ bản thân hoặc sự kiệt sức đang làm giảm ngưỡng chịu tải của bạn trước áp lực.",
    advice: "Thở sâu, đối diện với thử thách bằng sự bao dung và kiên trì bền bỉ.",
    constellationNodes: [{ x: 30, y: 50 }, { x: 45, y: 32 }, { x: 55, y: 68 }, { x: 70, y: 50 }],
    glyphType: "orb",
  },
  {
    id: 9,
    hexAddress: "0x09",
    name: "The Hermit",
    viName: "Ẩn Sĩ — Chế Độ Tĩnh Tâm Debug",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "EARTH",
    elementVi: "Đất",
    clockFreq: "1.08 GHz [OFFLINE]",
    romanNumeral: "IX",
    cyberMetaphor: "Air-Gapped Sandbox // Deep Code Audit",
    cyberSubtext: "Ngắt kết nối ngoại vi để rà soát lại mã nguồn tâm thức dưới ánh đèn soi chiếu nội tại.",
    keywordsUpright: ["Chiêm nghiệm", "Tĩnh tâm", "Tự vấn", "Trí tuệ sâu sắc"],
    keywordsReversed: ["Cô lập quá mức", "Trốn tránh thực tại", "Lạc lõng", "Từ chối lời khuyên"],
    meaningUpright: "Đã đến lúc tạm ngắt kết nối với những ồn ào mạng lưới bên ngoài để lùi lại một bước, tự soi chiếu và tìm ra chân lý của riêng bạn.",
    meaningReversed: "Ranh giới giữa tĩnh tâm lành mạnh và sự tự cô lập tiêu cực đang bị xóa nhòa; đừng đóng băng kết nối với những người yêu thương bạn.",
    advice: "Dành không gian yên tĩnh để suy ngẫm thấu đáo trước khi bước tiếp.",
    constellationNodes: [{ x: 50, y: 20 }, { x: 55, y: 45 }, { x: 45, y: 65 }, { x: 40, y: 85 }],
    glyphType: "prism",
  },
  {
    id: 10,
    hexAddress: "0x0A",
    name: "Wheel of Fortune",
    viName: "Bánh Xe Số Phận — Chu Kỳ Xoay Chuyển",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "FIRE",
    elementVi: "Lửa",
    clockFreq: "4.44 GHz [DYNAMIC]",
    romanNumeral: "X",
    cyberMetaphor: "Quantum RNG Scheduler // Macro Cycle Shift",
    cyberSubtext: "Vòng lặp vĩ mô của vũ trụ đang chuyển pha; biến động mang theo cơ hội xoay chuyển cục diện.",
    keywordsUpright: ["Bước ngoặt", "Vận may", "Chu kỳ mới", "Nhân quả"],
    keywordsReversed: ["Chậm nhịp", "Kháng cự thay đổi", "Biến cố bất ngờ", "Vòng lặp cũ"],
    meaningUpright: "Bánh xe vũ trụ đang quay sang một chương mới đầy bất ngờ. Những cơ hội mang tính thời điểm và sự dịch chuyển lớn đang đến gần.",
    meaningReversed: "Một vài trục trặc ngoài tầm kiểm soát có thể xảy ra, nhưng việc cố cưỡng lại sự thay đổi chỉ làm tiêu hao thêm năng lượng.",
    advice: "Giữ tâm bất biến giữa dòng biến thiên; linh hoạt thích ứng với chu kỳ mới.",
    constellationNodes: [{ x: 50, y: 20 }, { x: 80, y: 50 }, { x: 50, y: 80 }, { x: 20, y: 50 }, { x: 50, y: 50 }],
    glyphType: "orb",
  },
  {
    id: 11,
    hexAddress: "0x0B",
    name: "Justice",
    viName: "Công Lý — Cân Bằng Checksum",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "AIR",
    elementVi: "Khí",
    clockFreq: "4.00 GHz [EXACT]",
    romanNumeral: "XI",
    cyberMetaphor: "Cryptographic Checksum // Equilibrium Gate",
    cyberSubtext: "Mọi đầu vào đều tạo ra đầu ra tương xứng; sự thật và tính minh bạch được xác thực tuyệt đối.",
    keywordsUpright: ["Công bằng", "Minh bạch", "Trách nhiệm", "Nhân quả rõ ràng"],
    keywordsReversed: ["Thiên vị", "Thiếu cân bằng", "Trốn tránh trách nhiệm", "Thiếu minh bạch"],
    meaningUpright: "Mọi quyết định lúc này cần dựa trên sự thật khách quan, công tâm và tính chính trực. Bạn sẽ nhận lại đúng giá trị tương xứng với những gì đã gieo.",
    meaningReversed: "Cần xem xét lại xem bạn có đang đánh giá tình huống thiếu công bằng với chính mình hoặc với người khác hay không.",
    advice: "Đặt cảm tính sang một bên, cân nhắc dữ kiện trên bàn cân lý trí và đạo đức.",
    constellationNodes: [{ x: 50, y: 18 }, { x: 22, y: 48 }, { x: 78, y: 48 }, { x: 50, y: 82 }],
    glyphType: "matrix",
  },
  {
    id: 12,
    hexAddress: "0x0C",
    name: "The Hanged Man",
    viName: "Người Treo — Đảo Góc Nhìn Tọa Độ",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "WATER",
    elementVi: "Nước",
    clockFreq: "0.50 GHz [YIELD]",
    romanNumeral: "XII",
    cyberMetaphor: "Async Await // Perspective Inversion",
    cyberSubtext: "Tạm dừng luồng thực thi chính để giải phóng góc nhìn mới thông qua việc đảo chiều hệ quy chiếu.",
    keywordsUpright: ["Đổi góc nhìn", "Tạm dừng chủ động", "Buông bỏ cái tôi", "Khai sáng"],
    keywordsReversed: ["Trì hoãn vô ích", "Bế tắc", "Hy sinh mù quáng", "Sốt ruột"],
    meaningUpright: "Đôi khi bước tiến lớn nhất lại đến từ việc chủ động dừng lại. Khi bạn xoay ngược góc nhìn 180 độ, lời giải cho bài toán hóc búa sẽ tự khắc lộ diện.",
    meaningReversed: "Bạn đang mắc kẹt trong trạng thái chờ đợi bị động hoặc hy sinh quá nhiều cho một tiến trình không mang lại kết quả.",
    advice: "Đừng cố thúc ép tiến độ ngay lúc này; hãy quan sát vấn đề từ một chiều không gian khác.",
    constellationNodes: [{ x: 35, y: 20 }, { x: 65, y: 20 }, { x: 50, y: 48 }, { x: 50, y: 82 }],
    glyphType: "prism",
  },
  {
    id: 13,
    hexAddress: "0x0D",
    name: "Death",
    viName: "Tử Thần — Tái Cấu Trúc & Khởi Sinh",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "WATER",
    elementVi: "Nước",
    clockFreq: "3.33 GHz [REBOOT]",
    romanNumeral: "XIII",
    cyberMetaphor: "Garbage Collection // System Deprecation",
    cyberSubtext: "Thu hồi vùng nhớ đã hết vòng đời để giải phóng tài nguyên cho phiên bản kiến trúc mới.",
    keywordsUpright: ["Chuyển hóa sâu sắc", "Khép lại chương cũ", "Tái sinh", "Giải phóng"],
    keywordsReversed: ["Bám víu quá khứ", "Sợ thay đổi", "Trì trệ", "Chuyển giao dang dở"],
    meaningUpright: "Một giai đoạn cũ đã hoàn thành sứ mệnh của nó và cần được khép lại dứt khoát. Sự kết thúc này là điều kiện tất yếu để một khởi đầu rực rỡ hơn được sinh ra.",
    meaningReversed: "Việc cố níu giữ những gì đã không còn phù hợp chỉ khiến hệ thống của bạn bị rò rỉ bộ nhớ và trì trệ.",
    advice: "Dũng cảm dọn dẹp những tập tin quá khứ đã lỗi thời để đón nhận sự tái sinh.",
    constellationNodes: [{ x: 25, y: 25 }, { x: 50, y: 45 }, { x: 75, y: 65 }, { x: 40, y: 82 }],
    glyphType: "waveform",
  },
  {
    id: 14,
    hexAddress: "0x0E",
    name: "Temperance",
    viName: "Tiết Độ — Điều Hòa Xung Nhịp",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "FIRE",
    elementVi: "Lửa",
    clockFreq: "3.60 GHz [BALANCED]",
    romanNumeral: "XIV",
    cyberMetaphor: "Adaptive Load Balancer // Alchemy Synth",
    cyberSubtext: "Pha trộn hai dòng dữ liệu đối lập ở tỷ lệ vàng để đạt trạng thái ổn định động hoàn hảo.",
    keywordsUpright: ["Cân bằng", "Hài hòa", "Chữa lành", "Kiên nhẫn dung hợp"],
    keywordsReversed: ["Mất cân đối", "Cực đoan", "Xung đột nhịp độ", "Vội vàng"],
    meaningUpright: "Sự điềm tĩnh, điều độ và khả năng dung hợp các mặt đối lập đang mang lại sự chữa lành và dòng chảy êm ả cho cuộc sống của bạn.",
    meaningReversed: "Bạn đang nghiêng quá đà về một thái cực (làm việc quá sức hoặc cảm xúc quá tải) khiến hệ thống mất đi điểm cân bằng.",
    advice: "Tìm kiếm điểm giao thoa trung dung, kiên nhẫn từng bước nhỏ.",
    constellationNodes: [{ x: 30, y: 25 }, { x: 70, y: 35 }, { x: 30, y: 65 }, { x: 70, y: 75 }],
    glyphType: "nexus",
  },
  {
    id: 15,
    hexAddress: "0x0F",
    name: "The Devil",
    viName: "Ác Quỷ — Vòng Lặp Ràng Buộc",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "EARTH",
    elementVi: "Đất",
    clockFreq: "6.66 GHz [THROTTLED]",
    romanNumeral: "XV",
    cyberMetaphor: "Infinite Dependency Loop // Shadow Lock-In",
    cyberSubtext: "Nhận diện những sợi xích vô hình của nỗi sợ, sự lệ thuộc và những thói quen tiêu hao tài nguyên.",
    keywordsUpright: ["Ràng buộc ngầm", "Ám ảnh", "Cám dỗ vật chất", "Nhận diện bóng tối"],
    keywordsReversed: ["Bẻ gãy xiềng xích", "Thức tỉnh", "Giải phóng", "Lấy lại quyền tự chủ"],
    meaningUpright: "Có một thói quen, mối quan hệ độc hại hoặc nỗi sợ đang giữ bạn trong vòng lặp lặp đi lặp lại. Nhưng hãy nhìn kỹ: chiếc khóa thực chất nằm trong tay bạn.",
    meaningReversed: "Tin vui lớn: Bạn đang thức tỉnh và bắt đầu ngắt kết nối khỏi những ràng buộc tiêu cực từng kìm hãm mình bấy lâu.",
    advice: "Gọi tên thẳng thắn điều đang kiểm soát bạn — ngay khi được nhận diện, nó sẽ mất đi một nửa sức mạnh.",
    constellationNodes: [{ x: 25, y: 20 }, { x: 75, y: 20 }, { x: 50, y: 52 }, { x: 35, y: 82 }, { x: 65, y: 82 }],
    glyphType: "matrix",
  },
  {
    id: 16,
    hexAddress: "0x10",
    name: "The Tower",
    viName: "Tòa Tháp — Giải Phóng Cấu Trúc Ảo",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "FIRE",
    elementVi: "Lửa",
    clockFreq: "9.99 GHz [SURGE]",
    romanNumeral: "XVI",
    cyberMetaphor: "Kernel Panic // False Architecture Collapse",
    cyberSubtext: "Xung sét sự thật đánh sập các tầng kiến trúc xây trên nền móng giả tạo để lộ ra nền đá chân thực.",
    keywordsUpright: ["Thức tỉnh đột ngột", "Sụp đổ cái cũ", "Giải phóng sự thật", "Đột phá"],
    keywordsReversed: ["Trì hoãn biến động", "Giảm chấn thương", "Sợ sụp đổ", "Tái thiết ngầm"],
    meaningUpright: "Một cú hích mạnh mẽ làm rung chuyển những giả định hoặc cấu trúc không còn vững chắc. Dù gây choáng váng ban đầu, sự kiện này giúp bạn thoát khỏi một ảo tưởng lớn.",
    meaningReversed: "Bạn đã cảm nhận được những vết nứt trong hệ thống nhưng đang cố gắng chắp vá tạm thời thay vì dũng cảm đại tu từ gốc.",
    advice: "Đừng sợ khi những gì không thuộc về sự thật rời đi; đó là lúc bạn có mặt bằng sạch để xây dựng lại bền vững hơn.",
    constellationNodes: [{ x: 50, y: 12 }, { x: 35, y: 38 }, { x: 65, y: 52 }, { x: 28, y: 78 }, { x: 72, y: 85 }],
    glyphType: "waveform",
  },
  {
    id: 17,
    hexAddress: "0x11",
    name: "The Star",
    viName: "Ngôi Sao — Tín Hiệu Bắc Đẩu Hy Vọng",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "AIR",
    elementVi: "Khí",
    clockFreq: "4.32 GHz [CRYSTAL]",
    romanNumeral: "XVII",
    cyberMetaphor: "Deep-Space Beacon // Pure Signal Recovery",
    cyberSubtext: "Sau cơn bão hệ thống, bầu trời quang đãng lộ diện chòm sao dẫn đường với độ nhiễu bằng không.",
    keywordsUpright: ["Hy vọng sáng ngời", "Chữa lành", "Cảm hứng", "Niềm tin vũ trụ"],
    keywordsReversed: ["Mất niềm tin", "Hoài nghi", "Cạn cảm hứng", "Quên giá trị bản thân"],
    meaningUpright: "Sau những giông bão, sự bình yên và ánh sáng dẫn đường đã quay trở lại. Đây là giai đoạn chữa lành sâu sắc, khơi nguồn cảm hứng sáng tạo và niềm tin vào tương lai.",
    meaningReversed: "Sự mệt mỏi tạm thời làm mờ đi tầm nhìn của bạn; hãy nhớ rằng các vì sao vẫn luôn tỏa sáng ngay cả khi mây mù che khuất.",
    advice: "Giữ vững lý tưởng đẹp đẽ nhất của bạn; bạn đang đi đúng hướng trên bản đồ sao.",
    constellationNodes: [{ x: 50, y: 15 }, { x: 25, y: 40 }, { x: 75, y: 40 }, { x: 35, y: 72 }, { x: 65, y: 72 }, { x: 50, y: 48 }],
    glyphType: "orb",
  },
  {
    id: 18,
    hexAddress: "0x12",
    name: "The Moon",
    viName: "Mặt Trăng — Miền Nhiễu Sóng Tiềm Thức",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "WATER",
    elementVi: "Nước",
    clockFreq: "2.12 GHz [MODULATED]",
    romanNumeral: "XVIII",
    cyberMetaphor: "Signal Hallucination // Subconscious Fog",
    cyberSubtext: "Băng qua vùng nhiễu xạ của nỗi sợ vô hình và những thông tin chưa được giải mã toàn phần.",
    keywordsUpright: ["Bất an mơ hồ", "Trực giác sâu", "Giấc mơ", "Điều ẩn giấu"],
    keywordsReversed: ["Sáng tỏ sự thật", "Tan màn sương", "Vượt qua nỗi sợ", "Giải phóng hiểu lầm"],
    meaningUpright: "Mọi thứ lúc này chưa hoàn toàn rõ ràng như vẻ bề ngoài. Những nỗi lo lắng vô hình hoặc bóng tối quá khứ có thể tạo ra ảo ảnh; hãy bước đi chậm rãi và quan sát kỹ.",
    meaningReversed: "Màn sương mù đang dần tan biến, những hiểu lầm hoặc bí mật ẩn giấu chuẩn bị được phơi bày ra ánh sáng.",
    advice: "Đừng vội kết luận khi dữ liệu còn nhiễu; hãy đợi ánh bình minh làm rõ bức tranh toàn cảnh.",
    constellationNodes: [{ x: 35, y: 25 }, { x: 65, y: 30 }, { x: 45, y: 55 }, { x: 30, y: 80 }, { x: 70, y: 80 }],
    glyphType: "prism",
  },
  {
    id: 19,
    hexAddress: "0x13",
    name: "The Sun",
    viName: "Mặt Trời — Quang Phổ Rực Rỡ Toàn Phần",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "FIRE",
    elementVi: "Lửa",
    clockFreq: "7.77 GHz [RADIANT]",
    romanNumeral: "XIX",
    cyberMetaphor: "Photonic Superconductor // Zero-Latency Joy",
    cyberSubtext: "Năng lượng thuần khiết chiếu sáng toàn bộ mạch hệ thống, mang lại thành tựu, sự minh bạch và niềm vui.",
    keywordsUpright: ["Thành công rực rỡ", "Niềm vui", "Minh bạch", "Sinh lực dồi dào"],
    keywordsReversed: ["Thành công đến muộn", "Quá lạc quan", "Che giấu mệt mỏi", "Tự mãn"],
    meaningUpright: "Một trong những lá bài rực rỡ nhất bộ Tarot: Mọi bóng tối và nghi ngờ đều tan biến, nhường chỗ cho sự thành công, ấm áp, rõ ràng và nguồn năng lượng tràn đầy.",
    meaningReversed: "Ánh sáng và thành quả vẫn ở đó nhưng bạn đang để những đám mây lo âu nhỏ nhặt che khuất niềm vui trọn vẹn.",
    advice: "Tự tin tỏa sáng, chia sẻ nguồn năng lượng tích cực và đón nhận thành quả xứng đáng.",
    constellationNodes: [{ x: 50, y: 50 }, { x: 50, y: 18 }, { x: 82, y: 50 }, { x: 50, y: 82 }, { x: 18, y: 50 }],
    glyphType: "orb",
  },
  {
    id: 20,
    hexAddress: "0x14",
    name: "Judgement",
    viName: "Phán Quyết — Tiếng Gọi Thức Tỉnh",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "FIRE",
    elementVi: "Lửa",
    clockFreq: "5.00 GHz [AWAKENED]",
    romanNumeral: "XX",
    cyberMetaphor: "Global Wakeup Interrupt // System Audit",
    cyberSubtext: "Tổng kết toàn bộ nhật ký thực thi (System Logs), tha thứ cho các lỗi cũ và nâng cấp lên phiên bản sống cao hơn.",
    keywordsUpright: ["Thức tỉnh", "Tiếng gọi sứ mệnh", "Tha thứ & giải thoát", "Bước ngoặt lớn"],
    keywordsReversed: ["Tự phán xét khắt khe", "Do dự trước cơ hội", "Bỏ lỡ tín hiệu", "Nuối tiếc"],
    meaningUpright: "Một thời khắc thức tỉnh quan trọng: Bạn nhìn lại toàn bộ hành trình đã qua với sự thấu hiểu, khép lại những phán xét cũ và sẵn sàng đáp lại tiếng gọi lớn hơn của cuộc đời.",
    meaningReversed: "Bạn đang quá khắt khe tự trách mình về những lỗi lầm đã qua, khiến bản thân chần chừ trước cơ hội làm lại.",
    advice: "Bao dung với phiên bản cũ của chính mình và dứt khoát bước sang trang mới.",
    constellationNodes: [{ x: 50, y: 16 }, { x: 25, y: 45 }, { x: 75, y: 45 }, { x: 40, y: 78 }, { x: 60, y: 78 }],
    glyphType: "circuit",
  },
  {
    id: 21,
    hexAddress: "0x15",
    name: "The World",
    viName: "Thế Giới — Hợp Nhất Mạng Lưới Vũ Trụ",
    arcana: "MAJOR",
    suit: "ARCANA_CORE",
    element: "EARTH",
    elementVi: "Đất",
    clockFreq: "8.88 GHz [COMPLETE]",
    romanNumeral: "XXI",
    cyberMetaphor: "Global Mesh Convergence // Full Deployment",
    cyberSubtext: "Hoàn tất trọn vẹn toàn bộ vòng đời hệ thống, hợp nhất mọi module trong sự viên mãn.",
    keywordsUpright: ["Viên mãn trọn vẹn", "Hoàn thành xuất sắc", "Vươn tầm thế giới", "Hợp nhất"],
    keywordsReversed: ["Thiếu bước hoàn tất cuối", "Đi đường tắt", "Chưa khép lại trọn vẹn", "Trì hoãn"],
    meaningUpright: "Một hành trình lớn đang đi đến đích viên mãn. Mọi mảnh ghép kinh nghiệm, thử thách và nỗ lực của bạn nay đã kết nối thành một bức tranh hoàn chỉnh.",
    meaningReversed: "Bạn đã đi được 95% chặng đường nhưng vẫn còn một vài tác vụ tồn đọng cần hoàn tất dứt điểm trước khi ăn mừng.",
    advice: "Hoàn thiện những chi tiết cuối cùng với sự trân trọng và sẵn sàng vươn tới chân trời mới.",
    constellationNodes: [{ x: 50, y: 15 }, { x: 82, y: 38 }, { x: 70, y: 78 }, { x: 30, y: 78 }, { x: 18, y: 38 }, { x: 50, y: 50 }],
    glyphType: "nexus",
  },
];

const MAJOR_ARCANA: TarotCardData[] = MAJOR_ARCANA_RAW.map((card) => ({
  ...card,
  image: MAJOR_ARCANA_IMAGE_MAP[card.id] ?? MAJOR_ARCANA_IMAGE_MAP[0],
}));

interface SuitTemplate {
  suit: SuitType;
  suitVi: string;
  element: ElementType;
  elementVi: string;
  glyphType: TarotCardData["glyphType"];
  cyberDomain: string;
  ranks: Array<{
    rank: string;
    viRank: string;
    cyberTag: string;
    kwUp: string[];
    kwRev: string[];
    up: string;
    rev: string;
    advice: string;
  }>;
}

const SUIT_TEMPLATES: SuitTemplate[] = [
  {
    suit: "WANDS",
    suitVi: "Gậy (Lửa Nhiệt Huyết)",
    element: "FIRE",
    elementVi: "Lửa",
    glyphType: "flame",
    cyberDomain: "PLASMA_EXEC",
    ranks: [
      { rank: "Ace", viRank: "Ace of Wands — Xung Khởi Tạo Lửa", cyberTag: "Spark Ignition Pulse", kwUp: ["Cảm hứng bùng nổ", "Khởi đầu đam mê", "Động lực mới"], kwRev: ["Trì hoãn", "Thiếu lửa", "Chưa rõ hướng"], up: "Một tia lửa sáng tạo và nhiệt huyết mới vừa được kích hoạt mạnh mẽ trong bạn.", rev: "Ý tưởng đã có nhưng xung lực khởi động đang bị nghẽn bởi sự chần chừ.", advice: "Nắm bắt ngay tia sáng cảm hứng đầu tiên trước khi nó nguội đi." },
      { rank: "Two", viRank: "Two of Wands — Quy Hoạch Kiến Trúc", cyberTag: "Dual-Node Roadmap", kwUp: ["Tầm nhìn xa", "Lập kế hoạch", "Mở rộng biên giới"], kwRev: ["Sợ bước ra ngoài", "Thiếu quy hoạch", "An phận"], up: "Bạn đang đứng trên đỉnh cao quan sát bản đồ lớn và chuẩn bị cho bước mở rộng quy mô.", rev: "Nỗi sợ vùng chưa biết đang giữ chân bạn ở lại môi trường chật hẹp.", advice: "Phác thảo lộ trình dài hạn và mạnh dạn chọn hướng mở rộng." },
      { rank: "Three", viRank: "Three of Wands — Triển Khai Viễn Chinh", cyberTag: "Fleet Deployment", kwUp: ["Đón đầu cơ hội", "Hợp tác mở rộng", "Tầm nhìn thành hình"], kwRev: ["Trễ tiến độ", "Trở ngại vận hành", "Ngắn hạn"], up: "Những con tàu dự án bạn phóng đi đã bắt đầu gửi tín hiệu tích cực từ chân trời mới.", rev: "Cần kiên nhẫn điều chỉnh lại tiến độ khi gặp độ trễ ngoài dự kiến.", advice: "Mở rộng tầm nhìn và sẵn sàng hợp tác liên vùng." },
      { rank: "Four", viRank: "Four of Wands — Cột Mốc Ổn Định", cyberTag: "Stable Milestone Lock", kwUp: ["Ăn mừng cột mốc", "Hòa hợp", "Nền tảng vững"], kwRev: ["Chuyển giao tạm thời", "Thiếu gắn kết", "Chưa kịp nghỉ"], up: "Một cột mốc đáng tự hào đã hoàn tất; đây là lúc tận hưởng thành quả cùng những người đồng hành.", rev: "Đừng quên ghi nhận những chiến thắng nhỏ trên đường đi.", advice: "Tạm dừng để tri ân tập thể và củng cố nền tảng." },
      { rank: "Five", viRank: "Five of Wands — Xung Đột Luồng Xử Lý", cyberTag: "Thread Contention", kwUp: ["Cạnh tranh sôi nổi", "Va chạm ý kiến", "Thử lửa"], kwRev: ["Né tránh xung đột", "Mâu thuẫn ngầm", "Mệt mỏi"], up: "Nhiều luồng ý kiến và cái tôi đang va chạm mạnh; nếu biết điều phối, đây sẽ là buổi мозговой штурм (brainstorm) tạo đột phá.", rev: "Sự căng thẳng ngầm cần được giải tỏa bằng đối thoại minh bạch.", advice: "Biến áp lực cạnh tranh thành động lực nâng cấp chất lượng." },
      { rank: "Six", viRank: "Six of Wands — Vinh Quang Xác Thực", cyberTag: "Verified Triumph", kwUp: ["Chiến thắng", "Được công nhận", "Tự tin dẫn đầu"], kwRev: ["Hào quang ảo", "Tự phụ", "Thiếu ghi nhận"], up: "Nỗ lực của bạn đã được toàn mạng lưới ghi nhận xứng đáng với sự ngưỡng mộ và tin tưởng.", rev: "Đừng để sự tự mãn làm giảm tốc độ cải tiến hoặc quá phụ thuộc vào lời khen ngoại cảnh.", advice: "Đón nhận thành công với lòng biết ơn và sự khiêm tốn." },
      { rank: "Seven", viRank: "Seven of Wands — Tường Lửa Phòng Thủ", cyberTag: "Active Firewall Defense", kwUp: ["Bảo vệ lập trường", "Kiên cường", "Giữ vững vị thế"], kwRev: ["Quá tải phòng thủ", "Lung lay", "Nhượng bộ"], up: "Dù chịu nhiều áp lực cạnh tranh, bạn đang đứng ở vị thế cao hơn và hoàn toàn đủ sức bảo vệ giá trị của mình.", rev: "Cảm giác phải chống đỡ quá nhiều hướng cùng lúc đang làm bạn kiệt sức.", advice: "Chọn lọc những mặt trận thực sự cốt lõi để bảo vệ." },
      { rank: "Eight", viRank: "Eight of Wands — Truyền Tải Siêu Tốc", cyberTag: "Fiber-Optic Burst", kwUp: ["Tăng tốc cực nhanh", "Tin tức đến dồn dập", "Thông suốt"], kwRev: ["Nghẽn mạng", "Hấp tấp", "Trễ thông tin"], up: "Mọi rào cản đã được gỡ bỏ; thông tin, cơ hội và tiến độ đang lao về đích với vận tốc ánh sáng.", rev: "Sự vội vã thiếu kiểm soát có thể gây mất gói tin (packet loss).", advice: "Sẵn sàng phản xạ nhanh và đồng bộ nhịp độ với dòng chảy mới." },
      { rank: "Nine", viRank: "Nine of Wands — Sức Bền Chặng Cuối", cyberTag: "Last-Mile Resilience", kwUp: ["Kiên trì phút chót", "Cảnh giác", "Bền bỉ"], kwRev: ["Kiệt sức", "Đa nghi quá mức", "Muốn bỏ cuộc"], up: "Bạn đã trải qua nhiều thử thách và chỉ còn cách đích đến một bước chân; hãy giữ vững ý chí.", rev: "Cơ thể và tinh thần đang báo động đỏ vì gồng mình quá lâu.", advice: "Nghỉ lấy sức ngắn hạn nhưng tuyệt đối đừng bỏ cuộc ở mét cuối." },
      { rank: "Ten", viRank: "Ten of Wands — Quá Tải Băng Thông", cyberTag: "CPU 100% Overload", kwUp: ["Gánh nặng trách nhiệm", "Ôm đồm", "Nỗ lực lớn"], kwRev: ["Buông bớt gánh", "Ủy quyền", "Quá tải sập nguồn"], up: "Bạn đang tự mình gánh vác quá nhiều tác vụ cùng lúc trên vai dù đích đến đã ở rất gần.", rev: "Đã đến lúc phải phân bổ lại tải (Load Balancing) và từ chối những việc không thuộc về mình.", advice: "Học cách chia sẻ công việc và cắt giảm các tiến trình dư thừa." },
      { rank: "Page", viRank: "Page of Wands — Tín Hiệu Khám Phá Mới", cyberTag: "Explorer Packet", kwUp: ["Tin vui", "Tò mò khám phá", "Nhiệt huyết trẻ"], kwRev: ["Thiếu kiên định", "Tin đồn", "Bốc đồng"], up: "Một nguồn cảm hứng trẻ trung, lời mời thử nghiệm mới hoặc tin tức đầy hứng khởi đang gõ cửa.", rev: "Tránh cả thèm chóng chán hoặc khởi động quá nhiều dự án rồi bỏ dở.", advice: "Giữ tâm thế ham học hỏi và biến sự tò mò thành kỹ năng thực tế." },
      { rank: "Knight", viRank: "Knight of Wands — Xung Kích Tốc Độ Cao", cyberTag: "Turbo Execution Thread", kwUp: ["Hành động quyết liệt", "Phiêu lưu", "Táo bạo"], kwRev: ["Nóng vội", "Thiếu kế hoạch", "Bốc đồng"], up: "Năng lượng hành động cực kỳ mạnh mẽ, dám nghĩ dám làm và không ngại dấn thân vào thử thách.", rev: "Tốc độ cao nhưng thiếu bản đồ định vị dễ dẫn đến việc đi chệch mục tiêu.", advice: "Kết hợp lòng nhiệt huyết cháy bỏng với điểm phanh chiến lược." },
      { rank: "Queen", viRank: "Queen of Wands — Từ Trường Quyến Rũ", cyberTag: "Radiant Node Leader", kwUp: ["Tự tin tỏa sáng", "Truyền cảm hứng", "Độc lập"], kwRev: ["Nóng nảy", "Đố kỵ", "Thu mình"], up: "Sự tự tin, ấm áp và sức hút tự nhiên giúp bạn làm chủ tình huống và truyền lửa cho mọi người xung quanh.", rev: "Đừng để sự so sánh bên ngoài làm lu mờ ánh sáng độc bản của bạn.", advice: "Hãy bước ra vị trí trung tâm với sự tự tin và chân thành nhất." },
      { rank: "King", viRank: "King of Wands — Tổng Công Trình Sư Tầm Nhìn", cyberTag: "Visionary Chief Architect", kwUp: ["Lãnh đạo tầm nhìn", "Quyết đoán", "Khởi nghiệp lớn"], kwRev: ["Độc đoán", "Kỳ vọng quá mức", "Thiếu kiên nhẫn"], up: "Bạn mang tầm nhìn của một nhà lãnh đạo tiên phong: Nhìn thấy bức tranh vĩ mô và dẫn dắt tập thể chinh phục mục tiêu lớn.", rev: "Tránh áp đặt tốc độ của mình lên người khác một cách cực đoan.", advice: "Dẫn dắt bằng tầm nhìn truyền cảm hứng và sự bao dung." },
    ],
  },
  {
    suit: "CUPS",
    suitVi: "Cốc (Nước Cảm Xúc)",
    element: "WATER",
    elementVi: "Nước",
    glyphType: "chalice",
    cyberDomain: "EMOTION_STREAM",
    ranks: [
      { rank: "Ace", viRank: "Ace of Cups — Suối Nguồn Cảm Xúc Mới", cyberTag: "Pure Affective Stream", kwUp: ["Tình yêu chớm nở", "Trực giác mở", "Tràn đầy yêu thương"], kwRev: ["Khép lòng", "Cảm xúc dồn nén", "Trống rỗng"], up: "Trái tim bạn đang mở rộng để đón nhận một dòng chảy tình cảm, sự đồng cảm và niềm hạnh phúc tinh khôi.", rev: "Bạn đang đóng cổng giao tiếp cảm xúc vì sợ tổn thương lặp lại.", advice: "Cho phép trái tim được lắng nghe và đón nhận sự yêu thương chân thành." },
      { rank: "Two", viRank: "Two of Cups — Giao Thức Đồng Điệu Đôi", cyberTag: "TLS Mutual Handshake", kwUp: ["Tình yêu đôi lứa", "Thấu hiểu sâu sắc", "Đối tác ăn ý"], kwRev: ["Lệch nhịp", "Hiểu lầm", "Mất cân bằng cho-nhận"], up: "Sự kết nối hai chiều tuyệt đẹp dựa trên sự tôn trọng, thấu hiểu và đồng điệu tâm hồn.", rev: "Cần một cuộc trò chuyện chân thành để tháo gỡ những hiểu lầm nhỏ đang gây nhiễu tín hiệu.", advice: "Trân trọng sự bình đẳng và lắng nghe nhau bằng cả trái tim." },
      { rank: "Three", viRank: "Three of Cups — Cộng Hưởng Mạng Lưới", cyberTag: "Cluster Celebration", kwUp: ["Tình bạn gắn kết", "Niềm vui chung", "Hội ngộ"], kwRev: ["Tách biệt", "Chuyện bên lề", "Tiệc tùng quá đà"], up: "Thời điểm tuyệt vời để kết nối cộng đồng, sẻ chia niềm vui cùng bạn bè và những người tri kỷ.", rev: "Hãy chọn lọc những mối quan hệ thực sự chất lượng thay vì đám đông ồn ào.", advice: "Lan tỏa niềm vui và tìm sức mạnh từ cộng đồng tích cực." },
      { rank: "Four", viRank: "Four of Cups — Trạng Thái Chờ Thờ Ơ", cyberTag: "Idle Sleep State", kwUp: ["Chán nản", "Bỏ lỡ cơ hội trước mắt", "Thu mình"], kwRev: ["Tỉnh thức", "Đón nhận cái mới", "Thoát khỏi trì trệ"], up: "Vì quá tập trung vào những tiếc nuối cũ, bạn đang vô tình làm ngơ trước một món quà mới vũ trụ đang trao tặng.", rev: "Bạn đã sẵn sàng bước ra khỏi vùng trầm lắng để nắm bắt cơ hội mới.", advice: "Ngẩng đầu nhìn quanh — cơ hội quý giá đang ở ngay sát bên bạn." },
      { rank: "Five", viRank: "Five of Cups — Khấu Hao Mất Mát", cyberTag: "Packet Loss Grief", kwUp: ["Tiếc nuối quá khứ", "Buồn bã", "Tập trung vào mất mát"], kwRev: ["Chấp nhận & chữa lành", "Nhìn thấy phần còn lại", "Tha thứ"], up: "Bạn đang nhìn chằm chằm vào 3 chiếc cốc đã đổ mà quên mất vẫn còn 2 chiếc cốc nguyên vẹn phía sau lưng.", rev: "Nỗi buồn đang dần lắng xuống, nhường chỗ cho sự chấp nhận và hy vọng tái thiết.", advice: "Ghi nhận bài học từ quá khứ nhưng hãy quay lại trân trọng những gì đang còn." },
      { rank: "Six", viRank: "Six of Cups — Bản Sao Lưu Ký Ức", cyberTag: "Nostalgia Snapshot", kwUp: ["Hoài niệm đẹp", "Sự hồn nhiên", "Người cũ quay lại"], kwRev: ["Mắc kẹt ở quá khứ", "Chưa chịu lớn", "Ảo tưởng cũ"], up: "Những ký ức ấm áp, sự thuần khiết thời thơ ấu hoặc một kết nối thân quen từ quá khứ mang lại sự bình yên.", rev: "Trân trọng quá khứ nhưng đừng để nó trở thành nơi trú ẩn ngăn bạn sống ở hiện tại.", advice: "Kết nối lại với niềm vui giản dị, chân thành nhất trong bạn." },
      { rank: "Seven", viRank: "Seven of Cups — Đa Luồng Ảo Ảnh", cyberTag: "Virtual Reality Mirage", kwUp: ["Quá nhiều lựa chọn", "Mơ mộng", "Phân vân"], kwRev: ["Thực tế hóa", "Chọn lọc rõ ràng", "Tỉnh mộng"], up: "Trước mắt bạn có quá nhiều viễn cảnh lung linh nhưng không phải lựa chọn nào cũng có nền tảng thực tế.", rev: "Sự tỉnh táo đã quay lại giúp bạn gạch bỏ những ảo vọng để tập trung vào điều cốt lõi.", advice: "Kiểm tra tính khả thi thực tế của từng phương án trước khi cam kết." },
      { rank: "Eight", viRank: "Eight of Cups — Rời Bỏ Vùng Cũ", cyberTag: "Graceful Disconnect", kwUp: ["Chủ động rời đi", "Tìm ý nghĩa sâu hơn", "Buông bỏ"], kwRev: ["Lưu luyến ngập ngừng", "Sợ cô đơn", "Quay lại lối mòn"], up: "Dù những gì đang có không hẳn tệ, tâm hồn bạn biết rõ đã đến lúc rời đi để tìm kiếm chân trời có ý nghĩa cao hơn.", rev: "Sự dùng dằng giữa đi và ở đang làm tiêu hao năng lượng tinh thần của bạn.", advice: "Can đảm bước theo tiếng gọi sâu thẳm của sự trưởng thành." },
      { rank: "Nine", viRank: "Nine of Cups — Thanh Ghi Mãn Nguyện", cyberTag: "Wish Fulfillment Buffer", kwUp: ["Ước nguyện thành hiện thực", "Hài lòng", "Sung túc cảm xúc"], kwRev: ["Thỏa mãn bề nổi", "Thiếu chiều sâu", "Tham vọng lệch"], up: "Lá bài của sự viên mãn cá nhân: Những điều bạn mong cầu đang kết tinh thành niềm vui và sự hài lòng trọn vẹn.", rev: "Hãy tự hỏi điều bạn đang khao khát có thực sự nuôi dưỡng tâm hồn dài lâu hay không.", advice: "Tận hưởng trọn vẹn phút giây hiện tại với lòng biết ơn." },
      { rank: "Ten", viRank: "Ten of Cups — Hòa Hợp Toàn Mạng", cyberTag: "Harmonic Resonance Mesh", kwUp: ["Hạnh phúc viên mãn", "Gia đình ấm êm", "Bình yên trọn vẹn"], kwRev: ["Bất đồng gia đình", "Lệch giá trị chung", "Vẻ ngoài hoàn hảo"], up: "Biểu tượng cao nhất của hạnh phúc cảm xúc, sự gắn kết yêu thương bền chặt và bình yên nơi bến đỗ tâm hồn.", rev: "Cần dành thời gian lắng nghe và vun đắp sự thấu hiểu thực chất thay vì giữ vẻ bề ngoài.", advice: "Nuôi dưỡng sự chân thành và ấm áp trong từng kết nối thân thương." },
      { rank: "Page", viRank: "Page of Cups — Tin Nhắn Trực Giác", cyberTag: "Intuitive Ping Packet", kwUp: ["Lời tỏ bày ngọt ngào", "Trực giác nghệ thuật", "Nhạy cảm"], kwRev: ["Nhõng nhẽo cảm xúc", "Sợ bị từ chối", "Mơ mộng"], up: "Một lời nhắn dễ thương, một rung động tình cảm mới hoặc một ý tưởng nghệ thuật bất ngờ nảy nở.", rev: "Đừng để sự nhạy cảm quá mức làm bạn thu mình trước thế giới.", advice: "Mở lòng đón nhận những điều bất ngờ dịu dàng của cuộc sống." },
      { rank: "Knight", viRank: "Knight of Cups — Sứ Giả Lãng Mạn", cyberTag: "Poetic Carrier Wave", kwUp: ["Lãng mạn", "Theo đuổi trái tim", "Tinh tế"], kwRev: ["Phi thực tế", "Thất thường", "Lời hứa gió bay"], up: "Hành động dẫn lối bởi trái tim, sự lãng mạn và lý tưởng cái đẹp đang tiến về phía bạn.", rev: "Cần đặt đôi chân chạm đất để tránh bị cuốn theo những cảm xúc nhất thời.", advice: "Giữ sự chân thành và nhất quán giữa cảm xúc và hành động." },
      { rank: "Queen", viRank: "Queen of Cups — Thấu Cảm Tâm Thức", cyberTag: "Empathic Deep Sensor", kwUp: ["Thấu cảm sâu sắc", "Dịu dàng", "Trực giác chuẩn xác"], kwRev: ["Quá tải cảm xúc người khác", "Phụ thuộc", "Bi lụy"], up: "Khả năng lắng nghe, thấu cảm và trực giác tâm linh của bạn đang ở độ chín muồi và trong trẻo nhất.", rev: "Hãy thiết lập ranh giới năng lượng để không bị cuốn chìm vào nỗi buồn của người khác.", advice: "Yêu thương và lắng nghe bản thân sâu sắc như cách bạn chăm sóc mọi người." },
      { rank: "King", viRank: "King of Cups — Bản Lĩnh Làm Chủ Cảm Xúc", cyberTag: "Emotional Kernel Master", kwUp: ["Điềm tĩnh", "Trưởng thành cảm xúc", "Cố vấn nhân hậu"], kwRev: ["Kìm nén cảm xúc", "Thao túng ngầm", "Lạnh lùng"], up: "Sự kết hợp hoàn hảo giữa trái tim nhân hậu và cái đầu điềm tĩnh; làm chủ sóng gió cảm xúc với bản lĩnh vững vàng.", rev: "Việc đè nén cảm xúc quá lâu có thể tạo ra áp suất ngầm không đáng có.", advice: "Dùng sự điềm đạm và lòng bao dung để dẫn dắt tình huống." },
    ],
  },
  {
    suit: "SWORDS",
    suitVi: "Kiếm (Khí Lý Trí)",
    element: "AIR",
    elementVi: "Khí",
    glyphType: "blade",
    cyberDomain: "LOGIC_GATE",
    ranks: [
      { rank: "Ace", viRank: "Ace of Swords — Xung Đột Phá Tư Duy", cyberTag: "Laser Logic Cut", kwUp: ["Sự thật sắc bén", "Thông suốt trí tuệ", "Quyết định dứt khoát"], kwRev: ["Rối loạn thông tin", "Lời nói sát thương", "Mơ hồ"], up: "Lưỡi kiếm của trí tuệ và sự thật cắt đứt mọi màn sương rối rắm, mang lại góc nhìn cực kỳ minh mẫn.", rev: "Cẩn trọng với những kết luận vội vàng hoặc lời nói thiếu kiềm chế.", advice: "Dùng sự thật và tư duy sắc bén để giải quyết dứt điểm vấn đề." },
      { rank: "Two", viRank: "Two of Swords — Khóa Chết Lưỡng Lự", cyberTag: "Mutex Deadlock", kwUp: ["Tiến thoái lưỡng nan", "Tạm đóng băng", "Né tránh quyết định"], kwRev: ["Mở mắt đối diện", "Phá vỡ thế bế tắc", "Quá tải thông tin"], up: "Bạn đang tự bịt mắt trước một sự thật cần đối diện, giữ hai luồng suy nghĩ ở thế giằng co bất động (Deadlock).", rev: "Đã đến lúc tháo băng bịt mắt và đưa ra lựa chọn dù không có phương án nào hoàn hảo 100%.", advice: "Thu thập thêm dữ kiện thực tế và dũng cảm phá vỡ thế giằng co." },
      { rank: "Three", viRank: "Three of Swords — Ngoại Lệ Tổn Thương", cyberTag: "Critical Heart Exception", kwUp: ["Nỗi đau sự thật", "Tổn thương", "Giải phóng nước mắt"], kwRev: ["Chữa lành vết thương", "Tha thứ", "Vượt qua nỗi buồn"], up: "Một sự thật hoặc mất mát có thể làm bạn nhói lòng, nhưng việc đối diện thẳng thắn chính là bước đầu tiên để chữa lành.", rev: "Quá trình hồi phục đang diễn ra; những vết xước cũ đang dần khép miệng.", advice: "Cho phép mình được buồn nhưng đừng biến nỗi đau thành định danh vĩnh viễn." },
      { rank: "Four", viRank: "Four of Swords — Chế Độ Ngủ Đông Hồi Phục", cyberTag: "System Hibernation", kwUp: ["Nghỉ ngơi tinh thần", "Tĩnh dưỡng", "Tạm ngưng"], kwRev: ["Kiệt sức", "Trở lại hoạt động", "Mất ngủ lo âu"], up: "Bộ vi xử lý trí não của bạn cần được đưa về chế độ nghỉ dưỡng (Hibernation) để hạ nhiệt và tái tạo năng lượng.", rev: "Đừng ép hệ thống chạy tiếp khi đèn cảnh báo quá nhiệt đã nhấp nháy.", advice: "Cho phép tâm trí được nghỉ ngơi hoàn toàn trước trận đánh mới." },
      { rank: "Five", viRank: "Five of Swords — Chiến Thắng Rỗng", cyberTag: "Zero-Sum Conflict", kwUp: ["Tranh cãi hơn thua", "Thắng cuộc nhưng mất kết nối", "Cái tôi cao"], kwRev: ["Hòa giải", "Buông bỏ tranh chấp", "Rút kinh nghiệm"], up: "Một cuộc tranh luận mà nếu bạn cố thắng bằng mọi giá, cái giá phải trả sẽ là sự rạn nứt mối quan hệ.", rev: "Bạn nhận ra việc buông bỏ những cuộc chiến vô bổ mang lại sự bình yên quý giá hơn nhiều.", advice: "Tự hỏi bạn muốn 'đúng' hay muốn 'hạnh phúc và hiệu quả'." },
      { rank: "Six", viRank: "Six of Swords — Di Trú Sang Vùng Êm Ả", cyberTag: "Cloud Migration", kwUp: ["Chuyển dịch bình yên", "Rời xa giông bão", "Hồi phục dần"], kwRev: ["Hành lý quá khứ nặng nề", "Chuyển giao chậm", "Khó buông"], up: "Con thuyền đang đưa bạn rời khỏi vùng biển động để tiến sang vùng nước phẳng lặng và an toàn hơn.", rev: "Khi di chuyển sang môi trường mới, đừng mang theo những tập tin rác của quá khứ.", advice: "Tin tưởng vào hành trình chuyển giao; phía trước sẽ bình yên hơn." },
      { rank: "Seven", viRank: "Seven of Swords — Thuật Toán Đường Vòng", cyberTag: "Stealth Bypass Route", kwUp: ["Chiến lược khôn khéo", "Hành động độc lập", "Cảnh giác"], kwRev: ["Lộ sự thật", "Tự lừa dối mình", "Đối diện thẳng"], up: "Bài toán này đòi hỏi sự khéo léo, chiến thuật thông minh thay vì đối đầu trực diện; đồng thời nhắc bạn kiểm tra tính minh bạch.", rev: "Những đường tắt thiếu trung thực hoặc sự tự đánh lừa bản thân không thể duy trì lâu dài.", advice: "Kết hợp tư duy chiến lược thông minh với sự chính trực." },
      { rank: "Eight", viRank: "Eight of Swords — Hộp Cát Tự Giới Hạn", cyberTag: "Self-Imposed Sandbox", kwUp: ["Tự trói buộc bằng suy nghĩ", "Cảm giác bế tắc", "Sợ hãi"], kwRev: ["Tự cởi trói", "Tìm ra lối thoát", "Tự do tư tưởng"], up: "Những thanh kiếm vây quanh thực chất không khóa chặt bạn — chính những niềm tin giới hạn trong tâm trí đang giữ chân bạn.", rev: "Khi bạn thay đổi góc nhìn, những rào cản tưởng chừng kiên cố lập tức tan biến.", advice: "Tháo bỏ định kiến 'tôi không thể' và bước một bước đầu tiên." },
      { rank: "Nine", viRank: "Nine of Swords — Vòng Lặp Lo Âu Đêm Khuya", cyberTag: "Overthinking Loop", kwUp: ["Lo âu quá mức", "Mất ngủ", "Áp lực tâm lý"], kwRev: ["Giải tỏa tâm lý", "Nhìn rõ thực tế", "Chia sẻ gánh nặng"], up: "Tâm trí bạn đang chạy kịch bản mô phỏng những điều tồi tệ nhất vào ban đêm, dù thực tế bên ngoài không đáng sợ đến vậy.", rev: "Ánh sáng thực tế giúp bạn nhận ra 90% nỗi sợ chỉ là sản phẩm của sự suy diễn.", advice: "Viết những nỗi lo ra giấy và chia sẻ với người đáng tin cậy." },
      { rank: "Ten", viRank: "Ten of Swords — Điểm Chạm Đáy & Bình Minh", cyberTag: "Hard Reset // Dawn", kwUp: ["Khép lại hoàn toàn", "Chạm đáy để bật lên", "Bình minh mới"], kwRev: ["Hồi sinh", "Vượt qua khủng hoảng", "Tái khởi động"], up: "Mọi thứ khó khăn nhất đã đi đến điểm tận cùng và không thể tệ hơn được nữa; phía chân trời, ánh bình minh mới đã bắt đầu ló dạng.", rev: "Quá trình tái khởi động (Hard Reset) đã hoàn tất, bạn đang đứng dậy mạnh mẽ hơn trước.", advice: "Chấp nhận sự kết thúc hoàn toàn của chu kỳ cũ để đón bình minh mới." },
      { rank: "Page", viRank: "Page of Swords — Trình Phân Tích Nhạy Bén", cyberTag: "Packet Sniffer", kwUp: ["Tư duy sắc sảo", "Ham tìm hiểu", "Quan sát tinh tường"], kwRev: ["Tranh luận vụn vặt", "Nói trước khi nghĩ", "Đa nghi"], up: "Sự nhạy bén với thông tin, trí tò mò khoa học và khả năng đặt câu hỏi sắc sảo giúp bạn nhìn thấu vấn đề.", rev: "Tránh sa đà vào những cuộc tranh cãi trên mạng hoặc suy diễn thiếu căn cứ.", advice: "Kiểm chứng nguồn tin kỹ lưỡng và giữ thái độ cầu thị." },
      { rank: "Knight", viRank: "Knight of Swords — Mũi Nhọn Đột Kích Logic", cyberTag: "Zero-Latency Strike", kwUp: ["Tốc độ quyết liệt", "Tư duy thẳng thắn", "Tập trung mục tiêu"], kwRev: ["Hấp tấp", "Lời nói sắc lạnh", "Bỏ qua cảm xúc"], up: "Một khi đã xác định mục tiêu, bạn lao thẳng tới đích với tốc độ và lập luận sắc bén không gì cản nổi.", rev: "Tốc độ quá nhanh có thể làm tổn thương cảm xúc của những người đồng hành cùng bạn.", advice: "Bổ sung sự lắng nghe và thấu cảm vào tốc độ thực thi." },
      { rank: "Queen", viRank: "Queen of Swords — Minh Triết Độc Lập", cyberTag: "Clear-Boundary Architect", kwUp: ["Sắc sảo", "Ranh giới rõ ràng", "Trung thực khách quan"], kwRev: ["Khắt khe", "Lạnh lùng vì tổn thương cũ", "Quá критический"], up: "Sự thông tuệ, độc lập và khả năng nhìn thẳng vào bản chất sự việc giúp bạn đưa ra quyết định sáng suốt nhất.", rev: "Đừng để những vết thương cũ biến bức tường bảo vệ thành sự lạnh lùng cô lập.", advice: "Giữ cái đầu tỉnh táo, ranh giới rõ ràng cùng trái tim ấm áp." },
      { rank: "King", viRank: "King of Swords — Kiến Trúc Sư Tối Cao Lý Trí", cyberTag: "Supreme Logic Kernel", kwUp: ["Trí tuệ đỉnh cao", "Công tâm", "Chiến lược vĩ mô"], kwRev: ["Lạm dụng lý lẽ", "Thiếu tình người", "Độc đoán"], up: "Đỉnh cao của tư duy hệ thống, đạo đức nghề nghiệp và khả năng phán đoán chiến lược khách quan, chuẩn xác.", rev: "Lý trí thuần túy nếu thiếu đi lòng nhân ái sẽ trở nên khô cứng.", advice: "Áp dụng tư duy hệ thống minh bạch để giải quyết bài toán lớn." },
    ],
  },
  {
    suit: "PENTACLES",
    suitVi: "Tiền (Đất Thực Tế)",
    element: "EARTH",
    elementVi: "Đất",
    glyphType: "pentacle",
    cyberDomain: "SILICON_ASSET",
    ranks: [
      { rank: "Ace", viRank: "Ace of Pentacles — Hạt Giống Thịnh Vượng", cyberTag: "Genesis Asset Block", kwUp: ["Cơ hội tài chính mới", "Nền tảng vững chắc", "Thịnh vượng"], kwRev: ["Bỏ lỡ cơ hội thực tế", "Chi tiêu thiếu kế hoạch", "Chậm trễ"], up: "Một cơ hội thực tế về tài chính, sự nghiệp hoặc sức khỏe đang được trao tận tay bạn như một khối tài sản khởi nguyên.", rev: "Cần rà soát lại tính khả thi và quản trị rủi ro tài nguyên cẩn thận hơn.", advice: "Gieo hạt giống này xuống đất thực tế và kiên trì chăm bón mỗi ngày." },
      { rank: "Two", viRank: "Two of Pentacles — Cân Bằng Đa Nhiệm", cyberTag: "Dynamic Load Balancing", kwUp: ["Linh hoạt xoay xở", "Quản lý thời gian", "Thích ứng"], kwRev: ["Quá tải lịch trình", "Mất cân đối thu-chi", "Rối loạn"], up: "Bạn đang khéo léo điều phối nhiều dự án, dòng tiền và trách nhiệm cùng lúc một cách nhịp nhàng.", rev: "Việc tung hứng quá nhiều quả bóng cùng lúc đang chạm ngưỡng giới hạn an toàn.", advice: "Ưu tiên hóa các tác vụ cốt lõi và giữ nhịp thở linh hoạt." },
      { rank: "Three", viRank: "Three of Pentacles — Hợp Tác Chuyên Gia", cyberTag: "Multi-Agent Co-Op", kwUp: ["Làm việc nhóm xuất sắc", "Tay nghề cao", "Đồng kiến tạo"], kwRev: ["Thiếu phối hợp", "Làm việc rời rạc", "Cái tôi cá nhân"], up: "Sự kết hợp giữa các chuyên gia có kỹ năng bổ trợ lẫn nhau đang kiến tạo nên một công trình chất lượng cao.", rev: "Cần thống nhất lại giao thức làm việc chung để tránh chồng chéo.", advice: "Tôn trọng chuyên môn của nhau và cùng hướng tới chất lượng hoàn mỹ." },
      { rank: "Four", viRank: "Four of Pentacles — Bảo Toàn Bộ Nhớ Đệm", cyberTag: "Strict Cache Lock", kwUp: ["Tiết kiệm", "An toàn tài chính", "Giữ chặt nguồn lực"], kwRev: ["Sợ mất mát", "Keo kiệt", "Bế tắc dòng chảy"], up: "Việc quản lý tài nguyên chặt chẽ mang lại sự an toàn, nhưng đừng biến sự cẩn trọng thành nỗi sợ buông bỏ.", rev: "Dòng tiền và năng lượng cần được lưu thông hợp lý để sinh sôi thay vì đóng băng.", advice: "Cân bằng giữa tích lũy an toàn và đầu tư phát triển." },
      { rank: "Five", viRank: "Five of Pentacles — Cảnh Báo Thiếu Hụt", cyberTag: "Low Power Mode", kwUp: ["Khó khăn tạm thời", "Cảm giác cô đơn", "Thắt lưng buộc bụng"], kwRev: ["Vượt qua khủng hoảng", "Tìm thấy sự trợ giúp", "Phục hồi"], up: "Giai đoạn thử thách về tài nguyên hoặc cảm giác bị bỏ rơi, nhưng hãy nhìn lên: Cánh cửa hỗ trợ vẫn đang sáng đèn ngay bên cạnh bạn.", rev: "Mùa đông lạnh giá đang qua đi, các nguồn lực phục hồi đã bắt đầu xuất hiện.", advice: "Đừng ngần ngại mở lời đón nhận sự hỗ trợ từ những người tin cậy." },
      { rank: "Six", viRank: "Six of Pentacles — Phân Bổ Dòng Năng Lượng", cyberTag: "Fair Bandwidth Allocation", kwUp: ["Sẻ chia công bằng", "Hào phóng", "Quý nhân hỗ trợ"], kwRev: ["Cho-nhận lệch pha", "Có điều kiện ngầm", "Nợ nần"], up: "Sự lưu thông hài hòa giữa cho đi và nhận lại: Bạn có thể nhận được sự nâng đỡ kịp thời hoặc đang ở vị thế sẻ chia cho người khác.", rev: "Đảm bảo lòng tốt và nguồn lực được trao đi đúng chỗ, không kèm sự lệ thuộc.", advice: "Giữ cán cân trao đổi công bằng và trân trọng giá trị của nhau." },
      { rank: "Seven", viRank: "Seven of Pentacles — Kiểm Toán Đầu Tư Dài Hạn", cyberTag: "Long-Term Yield Audit", kwUp: ["Kiên nhẫn chờ quả ngọt", "Đánh giá lại chiến lược", "Đầu tư dài hạn"], kwRev: ["Nóng ruột", "Đầu tư dàn trải", "Nghi ngờ công sức"], up: "Hạt giống bạn gieo đang âm thầm bén rễ sâu dưới lòng đất; đây là lúc rà soát lại chiến lược và kiên nhẫn chờ mùa thu hoạch.", rev: "Đừng vì chưa thấy kết quả tức thì mà nhổ cây lên xem rễ mỗi ngày.", advice: "Tối ưu hóa quy trình chăm sóc và tin vào lãi kép của sự kiên trì." },
      { rank: "Eight", viRank: "Eight of Pentacles — Tinh Luyện Kỹ Nghệ", cyberTag: "Deep Model Fine-Tuning", kwUp: ["Rèn luyện chuyên sâu", "Tỉ mỉ", "Nâng cấp tay nghề"], kwRev: ["Cầu toàn quá mức", "Làm việc máy móc", "Thiếu lửa"], up: "Sự tập trung rèn giũa kỹ năng từng chi tiết nhỏ mỗi ngày đang đưa bạn lên đẳng cấp của một bậc thầy thực thụ.", rev: "Tránh rơi vào vòng lặp làm việc máy móc mà quên mất mục đích lớn của sản phẩm.", advice: "Kiên trì trau dồi chuyên môn — sự xuất sắc nằm ở từng chi tiết." },
      { rank: "Nine", viRank: "Nine of Pentacles — Tự Chủ Thịnh Vượng", cyberTag: "Sovereign Node Autonomy", kwUp: ["Độc lập tài chính", "Tận hưởng thành quả", "Sang trọng tự chủ"], kwRev: ["Phụ thuộc ngầm", "Làm việc quên tận hưởng", "Cô đơn trên đỉnh"], up: "Thành quả ngọt ngào của sự nỗ lực bền bỉ: Bạn đạt được sự tự chủ, vững vàng và tự hào tận hưởng khu vườn do chính tay mình vun đắp.", rev: "Hãy nhớ dành thời gian tận hưởng giá trị cuộc sống thay vì chỉ nhìn vào con số.", advice: "Tự hào về hành trình độc lập của mình và sống xứng đáng với nỗ lực đã bỏ ra." },
      { rank: "Ten", viRank: "Ten of Pentacles — Di Sản Bền Vững", cyberTag: "Immutable Ledger Legacy", kwUp: ["Thịnh vượng bền vững", "Di sản lâu dài", "Nền tảng gia tộc"], kwRev: ["Tranh chấp tài sản", "Ngắn hạn", "Rạn nứt nền tảng"], up: "Đỉnh cao của sự thịnh vượng vật chất và giá trị bền vững truyền qua nhiều chu kỳ, mang lại sự an tâm vững chắc.", rev: "Ưu tiên xây dựng giá trị thật dài hạn thay vì chạy theo lợi ích ngắn hạn.", advice: "Kiến tạo những giá trị có sức sống bền bỉ với thời gian." },
      { rank: "Page", viRank: "Page of Pentacles — Khởi Đầu Học Tập Thực Tiễn", cyberTag: "New Skill Compiler", kwUp: ["Học kỹ năng mới", "Cơ hội thực tế", "Chăm chỉ"], kwRev: ["Trì hoãn thực hành", "Thiếu tập trung", "Lý thuyết suông"], up: "Một kế hoạch học tập, chứng chỉ mới hoặc dự án thực tế đầy hứa hẹn đang mở ra trước mắt bạn.", rev: "Hãy chuyển hóa kiến thức trên giấy thành sản phẩm thực tế ngay hôm nay.", advice: "Bắt đầu từ những bước thực hành nhỏ nhưng chắc chắn mỗi ngày." },
      { rank: "Knight", viRank: "Knight of Pentacles — Tiến Trình Bền Bỉ Chuẩn Xác", cyberTag: "Zero-Downtime Daemon", kwUp: ["Đáng tin cậy", "Kiên định", "Chắc chắn từng bước"], kwRev: ["Bảo thủ", "Chậm chạp", "Ngại đổi mới"], up: "Không phô trương ồn ào nhưng cực kỳ kỷ luật và đáng tin cậy: Bạn tiến từng bước vững chắc cho đến khi hoàn thành 100% mục tiêu.", rev: "Cẩn thận đừng để sự an toàn biến thành sự trì trệ ngại cải tiến.", advice: "Giữ vững kỷ luật đều đặn và mở lòng với những công cụ tối ưu mới." },
      { rank: "Queen", viRank: "Queen of Pentacles — Quản Trị Thực Tế Ấm Áp", cyberTag: "Resource Sanctuary Core", kwUp: ["Chu đáo", "Vững vàng tài chính", "Chăm sóc thực tế"], kwRev: ["Ôm đồm việc nhà/việc chung", "Lo lắng tiền bạc", "Quên bản thân"], up: "Sự kết hợp tuyệt vời giữa tư duy quản trị tài chính nhạy bén và trái tim ấm áp, tạo dựng không gian sống sung túc, bình yên.", rev: "Hãy chăm sóc sức khỏe và sự an tâm của chính bạn trước tiên.", advice: "Tạo dựng môi trường sống ngăn nắp, ấm cúng và bền vững." },
      { rank: "King", viRank: "King of Pentacles — Đế Chế Thịnh Vượng Thực Thụ", cyberTag: "Enterprise Infrastructure Titan", kwUp: ["Thành đạt vững chắc", "Quản trị tài sản lớn", "Bảo trợ"], kwRev: ["Thực dụng quá mức", "Cứng nhắc", "Đo lường mọi thứ bằng tiền"], up: "Biểu tượng của sự thành công thực tế đỉnh cao, năng lực kiến tạo tài sản bền vững và sự hào phóng bảo trợ cho tập thể.", rev: "Tiền bạc và quyền lực là công cụ phục vụ hạnh phúc con người, không phải mục đích cuối cùng.", advice: "Xây dựng sự thịnh vượng dựa trên uy tín, chất lượng thật và giá trị cộng đồng." },
    ],
  },
];

function generateMinorArcana(): TarotCardData[] {
  const cards: TarotCardData[] = [];
  let currentId = 22;

  const romanRanks = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "PG", "KN", "QN", "KG"];

  for (const suitTpl of SUIT_TEMPLATES) {
    suitTpl.ranks.forEach((rk, idx) => {
      const hex = `0x${currentId.toString(16).toUpperCase().padStart(2, "0")}`;
      const baseFreq = (2.2 + ((currentId * 17) % 36) / 10).toFixed(2);
      const nodes = [
        { x: 25 + ((currentId * 13) % 50), y: 20 + ((idx * 11) % 25) },
        { x: 50, y: 50 },
        { x: 30 + ((idx * 19) % 45), y: 75 - ((currentId * 7) % 20) },
        { x: 70 - ((idx * 11) % 40), y: 35 + ((currentId * 9) % 35) },
      ];

      cards.push({
        id: currentId,
        hexAddress: hex,
        name: `${rk.rank} of ${suitTpl.suit.charAt(0) + suitTpl.suit.slice(1).toLowerCase()}`,
        viName: rk.viRank,
        image: getCommonsMinorImage(suitTpl.suit, idx + 1),
        arcana: "MINOR",
        suit: suitTpl.suit,
        element: suitTpl.element,
        elementVi: suitTpl.elementVi,
        clockFreq: `${baseFreq} GHz [${suitTpl.cyberDomain}]`,
        romanNumeral: romanRanks[idx],
        cyberMetaphor: `${suitTpl.cyberDomain} // ${rk.cyberTag}`,
        cyberSubtext: `Thanh ghi ${hex} thuộc bus ${suitTpl.suitVi}: ${rk.up}`,
        keywordsUpright: rk.kwUp,
        keywordsReversed: rk.kwRev,
        meaningUpright: rk.up,
        meaningReversed: rk.rev,
        advice: rk.advice,
        constellationNodes: nodes,
        glyphType: suitTpl.glyphType,
      });

      currentId++;
    });
  }

  return cards;
}

export const FULL_TAROT_DECK: TarotCardData[] = [...MAJOR_ARCANA, ...generateMinorArcana()];
