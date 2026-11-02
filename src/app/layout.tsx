import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FET 30 NĂM // LẮNG NGHE VŨ TRỤ, HIỂU RÕ CHÍNH MÌNH — Khám Phá Bản Thân Qua Lá Bài Tarot",
  description:
    "Không gian trải bài Tarot 78 lá tương tác chào mừng 30 năm Khoa Điện tử Viễn thông (FET - UET 1996 - 2026).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&family=Lexend:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#05050A] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
