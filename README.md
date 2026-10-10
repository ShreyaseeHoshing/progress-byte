# 🌟 Quiz Master – Class 6 to 8 Edition

A standalone, single-file educational app built with vanilla JavaScript, HTML5, and CSS3, styled with a school graph-paper worksheet aesthetic and zero backend dependencies.

---

## 🚀 Key Upgrades in this Edition

1. **Classes 6 to 8 Support**:
   - First-launch "Which class are you in?" screen with prominent buttons for Class 6, Class 7, and Class 8.
   - Header chip showing the current class with a quick `(change)` option.
   - 24 curated NCERT-aligned chapters (at least 2 chapters per subject for every class across Maths, Science, English, and Social Science).
   - Difficulty scales with grade level (Class 8 Easy matches Class 7 Medium).
   - Progress, best scores, and streaks tracked independently per class, with backward compatibility for legacy data.

2. **Daily Practice Problem (DPP)**:
   - Deterministic DPP generated per class and seeded with the date (`YYYY-MM-DD` + Class).
   - Displays header: `DPP No. XX · Class X`.
   - 5 mixed questions across all four subjects including varied question formats.

3. **Richer Collapsible Chapter Summaries**:
   - 2–3 line chapter overview.
   - 8–12 concise key points.
   - Highlighted formulas and definitions box.
   - Worked / real-life application example.
   - Common mistakes and "Remember" warning lines.
   - Collapsible `<details><summary>` sections optimized for quick scanning on mobile screens.

4. **Tiered Practice with Flexible Question Counts**:
   - At least 10 questions in each of Easy, Medium, and Challenge (at least 30 questions per chapter, 720+ questions total).
   - Pre-quiz question count picker: **5**, **10 (Default)**, or **All**.
   - Shuffled questions with zero repeats per session.

5. **Immediate Explanations for Wrong Answers**:
   - When a student answers incorrectly, the explanation appears **directly below the chosen option inside the same card** before any other UI element.
   - Includes the explicit model answer: *"Not quite. The correct answer is..."*.
   - Color + symbol highlights: Correct in green (`✓`), wrong in red (`✗`).
   - For correct answers, displays a concise *"Correct! ✓"* confirmation.
   - The **Next Question** button gains keyboard focus automatically.

6. **Five Interactive Question Types**:
   - `mcq`: 4 distinct options, 1 mark.
   - `fill`: Sentence with blank `___`, text input, and clickable word bank chips. Case-insensitive matching, 1 mark.
   - `short`: 1–2 lines with keyword auto-matching and self-marking (`I got it ✓` / `I missed it ✗`), 1 mark.
   - `long`: 4–6 lines with model answer and interactive 3–5 point checklist. Awards up to 3 marks proportionally.
   - `flow`: Flowchart diagrams with arrows and interactive `<select>` dropdowns for missing steps. Fully responsive down to 360px mobile width, 1 mark.

7. **Hindi Bilingual Explanations**:
   - English language subjects feature bilingual explanations and chapter summaries in English and Hindi (Devanagari script).
   - Styled with Google Fonts `Noto Sans Devanagari` (font-size >= 16px) and a `हिंदी में` badge.
   - Language toggle: **English Only**, **हिंदी Only**, or **Both (Eng+हिंदी)**.

8. **Graph-Paper Worksheet Design & Themes**:
   - Graph-paper squared grid pattern with school notebook borders and date stamps.
   - Instant Light ☀️ and Dark 🌙 mode toggle stored in `localStorage`.
   - Synthesized Web Audio sound effects (zero external audio files).

---

## 🏃 Quick Start

Simply open [`index.html`](file:///C:/Users/Lenovo/.gemini/antigravity/scratch/quiz-master/index.html) directly in any web browser (Google Chrome, Microsoft Edge, Firefox, Safari). No npm install, no build steps, and no server required!
