# SPEC.md — CYBER-ARCANA // SILICON ORACLE
**Technical & Product Specification (v1.0.0)**  
**Aesthetic Direction:** Cyber-Arcana: Dark Cosmic × Computer Engineering ("Silicon Oracle")  
**Reference Benchmarks:** `tarotap.com/vi/draw-cards` (Interactive 78-Card Fan & Flip Engine) × `tarotmienphi.com` (Vietnamese Tarot Domain Knowledge, Topic Lookup, 4-Element Telemetry & AI Synthesis)

---

## 1. Executive Summary & Core Vision

**Cyber-Arcana (Silicon Oracle)** reimagines traditional 78-card Rider-Waite-Smith Tarot reading as a high-precision quantum-silicon divination terminal. Every card in the 78-card deck is mapped to a hexadecimal memory register (`0x00` to `0x4D`), a logic polarity (`HIGH_LOGIC [1]` for Upright, `INVERTED_LOGIC [0]` for Reversed), an elemental bus (`FIRE/PLASMA`, `WATER/COOLANT`, `AIR/SIGNAL`, `EARTH/SILICON`), and a computer engineering metaphor (`Kernel Panic`, `Zero-Day Interrupt`, `Deadlock Resolution`, `Quantum Entanglement`, `Garbage Collection`, etc.).

The application runs on both `/` and `/draw-cards` as a unified, zero-page-reload, 60fps reactive experience driven by a 3-State Finite State Machine (FSM) and powered by **Google Gemini (`models/gemini-3.8-flash`)** via `/api/tarot-chat` with an automatic multi-model & deterministic Cyber-Arcana streaming fallback.

---

## 2. Finite State Machine (FSM) Architecture

All states execute seamlessly within a single unified workspace (`/` and `/draw-cards`):

```
[STATE 1: CONFIG & ENTROPY] ──(Initialize Bus / Lock Query)──► [STATE 2: 78-CARD 3D TABLE & FAN DECK]
                                                                          │
                                                        (All Slots Drawn & Flipped 180°)
                                                                          ▼
                                                       [STATE 3: AI ORACLE SYNTHESIS & CHAT]
```

### State 1: Query & Spread Configuration (`STAGE_CONFIG`)
- **Domain Topic Presets (inspired by `tarotmienphi.com`):**
  - `Tình Yêu & Kết Nối` (Love & Entanglement)
  - `Sự Nghiệp & Tài Chính` (Career & Bandwidth)
  - `Bản Thân & Tiềm Thức` (Self & Kernel Introspection)
  - `Định Hướng Quyết Định` (Decision Branch Prediction)
- **Spread Topology Selector:**
  1. **1 Lá — `Single Bit Interrupt` (`1-BIT`):** Điểm nghẽn cốt lõi / Thông điệp năng lượng tức thời.
  2. **3 Lá — `I/O Pipeline` (`3-STAGE`):**
     - Slot 0 (`STDIN // QUÁ KHỨ`): Nguyên nhân gốc & Dữ liệu đầu vào.
     - Slot 1 (`ALU // HIỆN TẠI`): Tiến trình đang xử lý & Xung đột hiện hành.
     - Slot 2 (`STDOUT // TƯƠNG LAI`): Kết quả xuất ra & Hướng hội tụ.
  3. **5 Lá — `System Architecture Analysis` (`5-NODE`):**
     - Slot 0 (`CORE_STATE`): Trạng thái trung tâm hiện tại.
     - Slot 1 (`BLOCKER_IRQ`): Rào cản / Xung đột ngầm.
     - Slot 2 (`ROOT_MEMORY`): Nền tảng tiềm thức / Quá khứ.
     - Slot 3 (`NEXT_CYCLE`): Tương lai gần (Chu kỳ kế tiếp).
     - Slot 4 (`OPTIMAL_PATCH`): Lời khuyên chiến lược & Giải pháp tối ưu.
- **Tarotap Hardware Switches (Deck & Flip Customization):**
  - `Reversal Bit Toggle` (`ALLOW_INVERTED_LOGIC`): Bật/tắt 50% xác suất bài Ngược khi xào bài.
  - `Deck Subset Filter` (`MAJOR_ARCANA_ONLY`): Giới hạn 22 lá Ẩn Chính (`0x00–0x15`) hoặc mở toàn bộ 78 lá (`0x00–0x4D`).
  - `Flip Trigger Mode` (`AUTO_FLIP_ON_DRAW`): Lật từng lá ngay khi rút hoặc đợi rút đủ mới lật mở.
  - `Pure Draw Mode` (`SKIP_QUERY_MODE`): Chế độ rút bài ngẫu nhiên thuần túy không bắt buộc nhập câu hỏi.
- **Hardware Entropy Seed Generator:**
  - Thu thập biến thiên thời gian thực + tọa độ chuột để sinh mã `ENTROPY_HASH` (SHA-like 64-bit hex signature), `CLK: 4.28 GHz`, và `QUANTUM_NOISE_FLOOR`.

### State 2: Interactive 78-Card Deck & 3D Table (`STAGE_DRAW`)
- **Deck Manipulation Bar:**
  - **Shuffle (`TRỘN XUNG NHỊP / SHUFFLE_BUS`):** Xáo trộn mảng bài bằng thuật toán Fisher-Yates kết hợp Entropy Seed, kích hoạt hiệu ứng rung/trộn lá bài và tái tạo `ENTROPY_HASH`.
  - **Cut Deck (`PHÂN VÙNG BỘ NHỚ / MEM_PARTITION`):** Tách bộ bài tại điểm cắt ngẫu nhiên và đảo nửa bộ nhớ.
  - **Spread Layout Toggle (`FAN_ARC` vs `RIBBON_STREAM`):** Chuyển đổi giữa trải bài hình cánh quạt vòng cung (Fan Arc) và dải băng ngang mượt mà.
- **Interactive 78-Card Fan / Ribbon:**
  - Hiển thị các lá bài đang úp với mặt lưng **Silicon Sacred Geometry PCB** (mạch in vàng đồng + chòm sao + chip trung tâm).
  - Hovering trên lá bài: Lá bài nhô lên (`translateY(-24px) scale(1.08)`), phát sáng viền vàng/cyan và hiển thị nhãn `MEM_ADDR: 0x..` + chỉ số vị trí.
  - Clicking lá bài: Lá bài bay mượt (`Framer Motion layoutId`) vào Slot trống tiếp theo trên bàn trải bài 3D.
- **3D Table & Holographic Wafer Flip:**
  - Mỗi Slot hiển thị tên vị trí (VD: `SLOT_01 // STDIN: QUÁ KHỨ`) và tọa độ thanh ghi.
  - Click vào từng lá đã rút hoặc bấm nút **"GIẢI MÃ TOÀN BỘ (DECODE ALL REGISTERS)"** để xoay 3D 180 độ (`rotateY(180deg)` với `perspective: 1200px`, `backface-visibility: hidden`).
  - Lá bài mở ra hiển thị rõ:
    - Mã Hex (`0x00` – `0x4D`), Tên tiếng Anh & tiếng Việt, Nguyên tố.
    - Trạng thái Bit: `BIT_STATE: 1 [UPRIGHT // XUÔI]` (màu Emerald/Gold) hoặc `BIT_STATE: 0 [REVERSED // NGƯỢC]` (màu Violet/Amber, hình minh họa xoay 180 độ).
    - Hình minh họa SVG Cyber-Constellation & PCB độc bản cho từng lá bài.

### State 3: AI Oracle Synthesis & Deep-Dive Chat (`STAGE_SYNTHESIS`)
- **Automatic Kernel Decoding:**
  - Ngay khi toàn bộ các lá bài trên Slot được lật mở, giao diện tự động cuộn mượt xuống khu vực **Oracle Kernel Decoding**.
- **Telemetry & Elemental Balance HUD:**
  - Tính toán tỷ lệ 4 nguyên tố (`Lửa/Fire`, `Nước/Water`, `Khí/Air`, `Đất/Earth`), tỷ lệ Major/Minor Arcana, và tỷ lệ Logic Xuôi/Ngược (`HIGH_LOGIC` vs `INVERTED_LOGIC`).
- **Per-Card Register Breakdown & System Synthesis:**
  - Hiển thị thẻ phân tích chi tiết cho từng lá bài theo đúng vị trí Slot, chiều Xuôi/Ngược, `Cyber Metaphor` (ẩn dụ kỹ thuật máy tính), từ khóa, và lời giải nghĩa sâu sắc.
  - Luận giải tổng hợp (**System Synthesis**) từ AI model **`gemini-3.8-flash`** với hiệu ứng chữ chạy (Streaming Text) kết nối tất cả các lá bài với câu hỏi và chủ đề của người dùng.
- **Interactive AI Tarot Reader Chat (`/api/tarot-chat`):**
  - Khung chat trực tiếp ở cuối trang, tự động nạp toàn bộ Context: Câu hỏi ban đầu + Chủ đề + Kiểu trải bài + Danh sách lá bài vừa rút (tên, mã Hex, vị trí, xuôi/ngược, cyber metaphor).
  - 3+ **Quick Follow-up Chips** sinh động dựa trên đúng các lá bài vừa mở.
  - Kết nối trực tiếp tới Google AI Studio API (`models/gemini-3.8-flash`) qua biến môi trường `GEMINI_API_KEY`, kèm cơ chế fallback tự động thông minh để luôn phản hồi tức thì.

---

## 3. Design System: "Silicon Oracle" Tokens

| Token Role | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--bg-void` | `#05050A` | Nền vũ trụ tối thẳm chính |
| `--bg-panel` | `#0B0C14` | Nền thẻ HUD,แผง mạch, bàn trải bài |
| `--accent-gold` | `#F59E0B` / `#D4AF37` | Chân pin vàng đồng PCB, viền bài Major Arcana |
| `--accent-nebula` | `#8B5CF6` | Tím tinh vân, luồng xung AI Oracle & bài Ngược |
| `--accent-cyan` | `#06B6D4` | Xanh vi xử lý, trạng thái bus, telemetry & bài Xuôi |
| `--font-serif` | `Cinzel` / `Playfair Display` | Tiêu đề huyền học, tên lá bài Tarot |
| `--font-mono` | `JetBrains Mono` | Địa chỉ thanh ghi Hex, xung nhịp CLK, entropy hash, logs |
| `--font-sans` | `Inter` / `Plus Jakarta Sans` | Nội dung luận giải tiếng Việt rõ ràng, dễ đọc |
