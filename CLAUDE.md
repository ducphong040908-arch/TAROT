# CLAUDE.md — CYBER-ARCANA // SILICON ORACLE
**Coding, Architecture & Design Rules**

## 1. Core Engineering Discipline (Karpathy Guidelines)
1. **Think Before Coding:** Surface state transitions and data contracts clearly in TypeScript interfaces before writing UI components.
2. **Simplicity & Modularity:** Keep state predictable; isolate the 78-card Tarot database (`src/data/tarot-deck.ts`) from UI components (`src/components/ui/*` and `src/components/tarot/*`).
3. **Surgical Precision:** Every animation, telemetry readout, and component must serve the 3-State Tarot workflow (`STAGE_CONFIG` -> `STAGE_DRAW` -> `STAGE_SYNTHESIS`).
4. **Goal-Driven Verification:** All components must compile cleanly under `tsc --noEmit` and `next build` with zero runtime hydration mismatches.

## 2. Technical Stack & Conventions
- **Framework:** Next.js (App Router, TypeScript Strict Mode).
- **Styling:** Tailwind CSS + CSS Custom Properties for the **Silicon Oracle** dark cosmic palette (`#05050A`, `#0B0C14`, `#F59E0B`, `#8B5CF6`, `#06B6D4`).
- **Animation:** Framer Motion (`layoutId`, `AnimatePresence`, spring physics with `stiffness: 260, damping: 22` for 60fps 3D card flips and fan spread transitions).
- **Icons:** `lucide-react` combined with custom sacred-geometry/PCB inline SVGs.
- **21st.dev Component Integration:** Place reusable primitives inside `src/components/ui/` and compose domain-specific Tarot views inside `src/components/tarot/`.

## 3. Aesthetic Rules ("Cyber-Arcana: Dark Cosmic × Computer Engineering")
- **Dual Typography:**
  - Use Serif (`Cinzel` / `Playfair Display`) for Arcana titles, card names, and oracle headings.
  - Use Monospace (`JetBrains Mono`) for Hex addresses (`0x00`–`0x4D`), clock frequency (`CLK`), entropy hashes, bit polarity (`BIT: 1 [UPRIGHT]` / `BIT: 0 [REVERSED]`), and system logs.
- **3D Card Physics:**
  - Always use `transform-style: preserve-3d`, `perspective: 1200px`, and `backface-visibility: hidden` for card flip containers.
  - Reversed cards (`isReversed: true`) must rotate their inner artwork 180 degrees (`rotate-180`) when flipped face-up and display an `INVERTED_LOGIC [0]` telemetry badge.

## 4. AI Oracle & Streaming Rules (`/api/tarot-chat`)
- Primary Model: **Google AI Studio `models/gemini-3.8-flash`** using `GEMINI_API_KEY`.
- High-Availability Chain: Attempt `gemini-3.8-flash` first; if the upstream endpoint returns 503/timeout, seamlessly cascade to `gemini-3.6-flash` / `gemini-3.5-flash`, and include a comprehensive **Intelligent Cyber-Arcana Streaming Fallback** so the user always gets an instant, deeply contextual reading.
