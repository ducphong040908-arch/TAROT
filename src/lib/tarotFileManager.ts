import fs from "fs";
import path from "path";
import type { GoogleGenAI, File as GenAIFile } from "@google/genai";

/**
 * Đường dẫn chuẩn tới thư mục data/ và các vị trí file PDF tài liệu gốc 78 lá bài Tarot
 */
export const TAROT_DATA_DIR = path.join(process.cwd(), "data");
export const TAROT_PDF_PATH = path.join(TAROT_DATA_DIR, "tarot_reference.pdf");
export const ROOT_VI_TAROT_PDF_PATH = path.join(
  process.cwd(),
  "Y nghia cac la bai trong Tarot.pdf"
);
export const TAROT_FILE_CACHE_PATH = path.join(
  TAROT_DATA_DIR,
  ".tarot_file_cache.json"
);

/**
 * Thời gian sống tối đa của cache local: 40 giờ (Google Files API giữ file 48 giờ)
 */
const CACHE_TTL_MS = 40 * 60 * 60 * 1000; // 40 hours in milliseconds

export interface TarotFileCacheRecord {
  file_name: string;
  file_uri: string;
  mime_type: string;
  created_at: number; // Unix timestamp (ms)
  created_at_iso: string;
  source_pdf_path?: string;
  local_file_size?: number;
  local_file_mtime?: number;
}

export class TarotReferenceFileMissingError extends Error {
  public readonly expectedPath: string;

  constructor(expectedPath: string = TAROT_PDF_PATH) {
    super(
      `[TarotFileManager] Không tìm thấy file tài liệu Tarot PDF tại "${expectedPath}" hoặc "${ROOT_VI_TAROT_PDF_PATH}". Vui lòng đặt file PDF vào thư mục dự án.`
    );
    this.name = "TarotReferenceFileMissingError";
    this.expectedPath = expectedPath;
  }
}

/**
 * Tự động tìm đường dẫn file PDF tài liệu Tarot:
 * 1. Ưu tiên data/tarot_reference.pdf
 * 2. Hoặc "Y nghia cac la bai trong Tarot.pdf" ở thư mục gốc hp/
 * 3. Hoặc bất kỳ file *.pdf nào trong thư mục data/
 */
export function resolveTarotPdfPath(): string | null {
  const candidates = [
    TAROT_PDF_PATH,
    ROOT_VI_TAROT_PDF_PATH,
    path.join(TAROT_DATA_DIR, "Y nghia cac la bai trong Tarot.pdf"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const st = fs.statSync(candidate);
      if (st.isFile() && st.size > 0) {
        return candidate;
      }
    }
  }

  // Quét thêm trong thư mục data/ nếu có file .pdf bất kỳ
  if (fs.existsSync(TAROT_DATA_DIR)) {
    const files = fs.readdirSync(TAROT_DATA_DIR);
    const pdfFile = files.find((f) => f.toLowerCase().endsWith(".pdf"));
    if (pdfFile) {
      const fullPath = path.join(TAROT_DATA_DIR, pdfFile);
      const st = fs.statSync(fullPath);
      if (st.isFile() && st.size > 0) {
        return fullPath;
      }
    }
  }

  return null;
}

// Khóa đồng bộ (Mutex promise) ngăn chặn upload trùng lặp khi nhiều request gọi đồng thời
let inflightFilePromise: Promise<GenAIFile> | null = null;

/**
 * Đọc thông tin cache từ data/.tarot_file_cache.json
 */
function readFileCache(): TarotFileCacheRecord | null {
  try {
    if (!fs.existsSync(TAROT_FILE_CACHE_PATH)) {
      return null;
    }
    const raw = fs.readFileSync(TAROT_FILE_CACHE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<TarotFileCacheRecord>;
    if (
      !parsed ||
      typeof parsed.file_name !== "string" ||
      !parsed.file_name.trim() ||
      typeof parsed.created_at !== "number"
    ) {
      return null;
    }
    return parsed as TarotFileCacheRecord;
  } catch (err) {
    console.warn(
      "[TarotFileManager] Không thể đọc file cache .tarot_file_cache.json, sẽ tạo mới:",
      err
    );
    return null;
  }
}

/**
 * Ghi thông tin file đã upload vào data/.tarot_file_cache.json
 */
function writeFileCache(record: TarotFileCacheRecord): void {
  try {
    if (!fs.existsSync(TAROT_DATA_DIR)) {
      fs.mkdirSync(TAROT_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      TAROT_FILE_CACHE_PATH,
      JSON.stringify(record, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.warn(
      "[TarotFileManager] Không thể ghi file cache data/.tarot_file_cache.json:",
      err
    );
  }
}

/**
 * Lấy hoặc Upload file PDF tài liệu Tarot lên Google Files API.
 * - Tái sử dụng file đã upload trong vòng 40 giờ (Google lưu trữ 48 giờ).
 * - Tự động upload lại nếu cache hết hạn (> 40h), file trên Google bị xóa, hoặc file PDF local vừa được cập nhật mới.
 * - Ném lỗi TarotReferenceFileMissingError rõ ràng nếu chưa có file PDF.
 */
export async function getOrUploadTarotFile(
  client: GoogleGenAI
): Promise<GenAIFile> {
  // 1. Tìm file PDF tài liệu Tarot (data/tarot_reference.pdf hoặc Y nghia cac la bai trong Tarot.pdf)
  const resolvedPdfPath = resolveTarotPdfPath();
  if (!resolvedPdfPath) {
    throw new TarotReferenceFileMissingError(TAROT_PDF_PATH);
  }

  const stat = fs.statSync(resolvedPdfPath);

  // Nếu đang có tiến trình kiểm tra/upload chạy song song thì chờ kết quả đó
  if (inflightFilePromise) {
    return inflightFilePromise;
  }

  inflightFilePromise = (async () => {
    try {
      const now = Date.now();
      const cached = readFileCache();

      const isCacheFresh =
        cached !== null &&
        now - cached.created_at < CACHE_TTL_MS &&
        (!cached.local_file_size || cached.local_file_size === stat.size) &&
        (!cached.local_file_mtime ||
          Math.abs(cached.local_file_mtime - stat.mtimeMs) < 1000);

      // 2. Nếu cache còn hạn (< 40 giờ) và file local không thay đổi -> gọi client.files.get() để tái sử dụng
      if (isCacheFresh && cached) {
        try {
          const remoteFile = await client.files.get({
            name: cached.file_name,
          });
          if (
            remoteFile &&
            remoteFile.uri &&
            remoteFile.state !== "FAILED"
          ) {
            return remoteFile;
          }
        } catch (getErr) {
          console.warn(
            `[TarotFileManager] Không thể lấy lại file cache "${cached.file_name}" từ Google Files API (sẽ upload lại):`,
            getErr
          );
        }
      }

      // 3. Nếu chưa có cache, đã quá 40 giờ, hoặc file không còn trên Google -> Upload mới
      const uploadResult = await client.files.upload({
        file: resolvedPdfPath,
        config: {
          mimeType: "application/pdf",
          displayName: path.basename(resolvedPdfPath),
        },
      });

      if (!uploadResult || !uploadResult.name || !uploadResult.uri) {
        throw new Error(
          "[TarotFileManager] Google Files API không trả về name/uri hợp lệ sau khi upload."
        );
      }

      // Chờ nếu file PDF lớn (~92MB) đang ở trạng thái PROCESSING trên máy chủ Google
      let finalFile: GenAIFile = uploadResult;
      let pollAttempts = 0;
      while (finalFile.state === "PROCESSING" && pollAttempts < 30) {
        await new Promise((r) => setTimeout(r, 1000));
        finalFile = await client.files.get({ name: uploadResult.name });
        pollAttempts++;
      }

      // 4. Lưu lại thông tin vào data/.tarot_file_cache.json
      const newCacheRecord: TarotFileCacheRecord = {
        file_name: finalFile.name || uploadResult.name,
        file_uri: finalFile.uri || uploadResult.uri,
        mime_type: finalFile.mimeType || "application/pdf",
        created_at: Date.now(),
        created_at_iso: new Date().toISOString(),
        source_pdf_path: resolvedPdfPath,
        local_file_size: stat.size,
        local_file_mtime: stat.mtimeMs,
      };
      writeFileCache(newCacheRecord);

      return finalFile;
    } finally {
      inflightFilePromise = null;
    }
  })();

  return inflightFilePromise;
}
