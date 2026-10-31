import type { Metadata } from "next";
import { Lexend, Plus_Jakarta_Sans, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lexend",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

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
    <html
      lang="vi"
      className={`dark ${lexend.variable} ${jakarta.variable} ${jetbrains.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased bg-[#05050A] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
