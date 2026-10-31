/**
 * Mô phỏng bộ bài Tarot VẬT LÝ.
 *
 * Bói bài thật không "tung đồng xu" cho từng lá. Chiều xuôi/ngược của mỗi lá là trạng thái
 * vật lý của chính lá đó, chỉ thay đổi khi người đọc thực hiện thao tác làm xoay lá bài.
 * Module này mô phỏng đúng các thao tác đó:
 *
 * 1. Bộ bài mới mở hộp: đủ 78 lá, xếp theo thứ tự, TẤT CẢ đều xuôi.
 * 2. Trạng thái (thứ tự + chiều) được LƯU LẠI giữa các lần bói (localStorage), giống như một
 *    bộ bài thật nằm trên bàn: lá đã ngược sẽ vẫn ngược cho tới khi bị xoay lại.
 * 3. Một lượt tráo bài gồm:
 *    - Chia bộ bài thành 2 xấp tại điểm chia ngẫu nhiên kiểu tay người (phân phối nhị thức),
 *      xoay 180° MỘT xấp (thao tác tạo bài ngược phổ biến nhất). Xoay trên mặt bàn giữ nguyên
 *      thứ tự các lá trong xấp, chỉ đảo chiều từng lá.
 *    - Riffle shuffle theo mô hình Gilbert–Shannon–Reeds (mô hình toán chuẩn của kiểu tráo
 *      bài "đan" bằng tay). Số lần riffle ≈ 1.5·log2(n) theo Bayer–Diaconis để bộ bài thực sự
 *      được xáo đều (78 lá → 10 lần, 22 lá → 7 lần). Riffle KHÔNG làm đổi chiều lá bài.
 *    - Cắt bài 1 lần (không đổi chiều lá bài).
 * 4. Người đọc không dùng bài ngược: họ dựng thẳng tất cả các lá → toàn bộ về chiều xuôi.
 */

export interface PhysicalCardState {
  id: number;
  reversed: boolean;
}

export type RandomSource = () => number; // trả về số thực trong [0, 1)

export const PHYSICAL_DECK_STORAGE_KEY = "tarot_physical_deck_v1";

/** Nguồn ngẫu nhiên mật mã học (CSPRNG) — dùng crypto.getRandomValues khi có. */
export const cryptoRandom: RandomSource = () => {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (c?.getRandomValues) {
    const buf = new Uint32Array(1);
    c.getRandomValues(buf);
    return buf[0] / 4294967296;
  }
  return Math.random();
};

/** Điểm chia bài bằng tay: Binomial(n, 1/2) — đa số chia gần giữa, đôi khi lệch. */
function binomialCut(n: number, rand: RandomSource): number {
  let k = 0;
  for (let i = 0; i < n; i++) {
    if (rand() < 0.5) k++;
  }
  return k;
}

/**
 * Ghép 2 xấp theo mô hình GSR: mỗi lá rơi xuống từ xấp nào có xác suất tỉ lệ với
 * số lá còn lại trong xấp đó. Chỉ số 0 = lá trên cùng.
 */
function gsrMerge(
  top: PhysicalCardState[],
  bottom: PhysicalCardState[],
  rand: RandomSource
): PhysicalCardState[] {
  const result: PhysicalCardState[] = [];
  let a = top.length;
  let b = bottom.length;
  while (a > 0 || b > 0) {
    if (rand() < a / (a + b)) {
      result.push(top[--a]);
    } else {
      result.push(bottom[--b]);
    }
  }
  return result.reverse();
}

/** Một lần riffle shuffle (giữ nguyên chiều của mọi lá). */
export function riffleOnce(
  deck: PhysicalCardState[],
  rand: RandomSource = cryptoRandom
): PhysicalCardState[] {
  const k = binomialCut(deck.length, rand);
  return gsrMerge(deck.slice(0, k), deck.slice(k), rand);
}

/** Chia đôi, xoay 180° một xấp, rồi đan hai xấp vào nhau. */
export function splitTurnAndRiffle(
  deck: PhysicalCardState[],
  rand: RandomSource = cryptoRandom
): PhysicalCardState[] {
  const k = binomialCut(deck.length, rand);
  const turnTop = rand() < 0.5;
  const flip = (c: PhysicalCardState) => ({ ...c, reversed: !c.reversed });
  const top = deck.slice(0, k).map((c) => (turnTop ? flip(c) : c));
  const bottom = deck.slice(k).map((c) => (turnTop ? c : flip(c)));
  return gsrMerge(top, bottom, rand);
}

/** Cắt bài: nhấc xấp trên đặt xuống dưới (không đổi chiều). Trả về cả vị trí cắt. */
export function cutDeck(
  deck: PhysicalCardState[],
  rand: RandomSource = cryptoRandom
): { deck: PhysicalCardState[]; cutAt: number } {
  if (deck.length < 2) return { deck: [...deck], cutAt: 0 };
  // Tay người hiếm khi cắt sát mép: giữ điểm cắt trong khoảng 1..n-1
  const cutAt = Math.min(deck.length - 1, Math.max(1, binomialCut(deck.length, rand)));
  return { deck: [...deck.slice(cutAt), ...deck.slice(0, cutAt)], cutAt };
}

export function riffleCountFor(n: number): number {
  return Math.max(1, Math.ceil(1.5 * Math.log2(Math.max(2, n))));
}

/**
 * Một lượt tráo bài hoàn chỉnh của người đọc bài.
 * @param useReversals true: có thao tác xoay một xấp; false: dựng thẳng toàn bộ lá về chiều xuôi.
 */
export function physicalShuffleSession(
  deck: PhysicalCardState[],
  useReversals: boolean,
  rand: RandomSource = cryptoRandom
): PhysicalCardState[] {
  let d: PhysicalCardState[] = useReversals
    ? deck
    : deck.map((c) => ({ ...c, reversed: false }));
  const riffles = riffleCountFor(d.length);
  for (let i = 0; i < riffles; i++) {
    d = i === 0 && useReversals ? splitTurnAndRiffle(d, rand) : riffleOnce(d, rand);
  }
  return cutDeck(d, rand).deck;
}

/** Bộ bài mới mở hộp: đúng thứ tự, tất cả xuôi. */
export function createFreshDeck(allIds: number[]): PhysicalCardState[] {
  return allIds.map((id) => ({ id, reversed: false }));
}

/** Kiểm tra trạng thái lưu có đúng là một bộ bài đầy đủ (không thiếu/thừa/trùng lá). */
function isValidDeck(value: unknown, allIds: number[]): value is PhysicalCardState[] {
  if (!Array.isArray(value) || value.length !== allIds.length) return false;
  const expected = new Set(allIds);
  const seen = new Set<number>();
  for (const item of value) {
    if (
      !item ||
      typeof item.id !== "number" ||
      typeof item.reversed !== "boolean" ||
      !expected.has(item.id) ||
      seen.has(item.id)
    ) {
      return false;
    }
    seen.add(item.id);
  }
  return true;
}

export function loadPhysicalDeck(allIds: number[]): PhysicalCardState[] {
  try {
    const raw = localStorage.getItem(PHYSICAL_DECK_STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isValidDeck(parsed, allIds)) return parsed;
    }
  } catch {
    // localStorage không khả dụng hoặc dữ liệu hỏng → dùng bộ bài mới
  }
  return createFreshDeck(allIds);
}

export function savePhysicalDeck(deck: PhysicalCardState[]): void {
  try {
    localStorage.setItem(PHYSICAL_DECK_STORAGE_KEY, JSON.stringify(deck));
  } catch {
    // Bỏ qua lỗi quota / chế độ riêng tư
  }
}

/** Lấy riêng một nhóm lá (VD: chỉ 22 lá Ẩn Chính) theo đúng thứ tự & chiều hiện tại. */
export function extractSubset(
  deck: PhysicalCardState[],
  allowedIds: Set<number>
): PhysicalCardState[] {
  return deck.filter((c) => allowedIds.has(c.id));
}

/**
 * Ghi nhóm lá vừa tráo/cắt trở lại bộ bài đầy đủ: các lá ngoài nhóm giữ nguyên vị trí,
 * các vị trí thuộc nhóm được điền lại theo thứ tự mới.
 */
export function mergeSubsetBack(
  fullDeck: PhysicalCardState[],
  subset: PhysicalCardState[]
): PhysicalCardState[] {
  const subsetIds = new Set(subset.map((c) => c.id));
  let cursor = 0;
  return fullDeck.map((c) => (subsetIds.has(c.id) ? subset[cursor++] : c));
}
