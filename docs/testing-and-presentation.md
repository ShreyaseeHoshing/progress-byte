# 📋 Member 5: Testing Plan & Presentation Blueprint

This document is prepared specifically for **Member 5 (Testing & Presentation Lead)** to test Quiz Master, log defects, and deliver a standout project presentation.

---

## Part 1: QA & Testing Checklist

### 1. Functional Test Matrix

| ID | Feature | Test Step | Expected Outcome | Status |
|---|---|---|---|---|
| TC-01 | Subject Navigation | Click on Science, Maths, English, or Social Science card | Opens Topic selection screen with appropriate theme and chapters | [ ] Pass |
| TC-02 | Chapter Summary | Click "📖 Chapter Summary" button on any topic | Modal opens with concise key points, formula/tip, and fun fact | [ ] Pass |
| TC-03 | Difficulty Filter | Toggle between "Easy", "Medium", and "Challenge" | Difficulty pill updates style and correctly filters quiz questions | [ ] Pass |
| TC-04 | MCQ Interaction | Select an answer option | Option turns green (correct) or red (wrong); remaining options locked | [ ] Pass |
| TC-05 | Instant Feedback | Answer any question | Feedback card shows immediately with clear explanation | [ ] Pass |
| TC-06 | Sound Effects | Answer question with sound ON / OFF | Synthesized chime plays for correct; gentle boop for wrong; silence when muted | [ ] Pass |
| TC-07 | Score Calculation | Complete all questions in a quiz | Results card displays exact score, % accuracy, time taken, and star rating | [ ] Pass |
| TC-08 | Review Answers | Click "📝 Review Answers" on result screen | Shows question list with user selection, correct answer, and explanation | [ ] Pass |
| TC-09 | Local Storage | Refresh page after earning stars | Star count and quiz history persist across page refreshes | [ ] Pass |
| TC-10 | Trophy Cabinet | Earn stars or 100% score | Unlocks corresponding badges (e.g. Bullseye, Star Collector) in Cabinet | [ ] Pass |

### 2. Edge Case & Responsive Testing
- **Small Screens / Mobile View**: Verify that option cards stack properly and font sizes remain legible on widths under 400px.
- **Audio Permission**: Ensure browser autoplay policies don't crash the app (Web Audio gracefully resumes on first user click).
- **Empty State**: Verify zero-progress behavior when the app is first opened or after clicking "Reset My Progress".

---

## Part 2: Project Presentation Slide Deck (8-Slide Outline)

### Slide 1: Title & Hook
- **Title**: Quiz Master – Class 6–7 Learning Adventure
- **Tagline**: Making revision engaging, concise, and rewarding with AI assistance.
- **Presenter**: Team Introduction (5 Members & Roles).

### Slide 2: The Problem
- Class 6–7 students often struggle with voluminous textbook chapters before exams.
- Passive reading leads to quick forgetting; students lack instant feedback on where they stand.

### Slide 3: Our Solution – Quiz Master
- **Bite-Sized Chapter Summaries**: 5 key takeaways, formulas/rules, and memorable fun facts.
- **Interactive Tiered MCQs**: Easy (warm-up), Medium (core understanding), and Challenge (higher-order thinking).
- **Instant Explanations**: Immediate reinforcement why an answer is right or wrong.
- **Gamified Progress**: Stars, streaks, confetti, and unlockable achievement trophies.

### Slide 4: System Architecture & Tech Stack
- **Frontend**: Clean HTML5, Modern CSS3 with CSS variables and responsive flex/grid layouts.
- **Audio Synthesizer**: Web Audio API (zero external sound files needed).
- **Data Engine**: Modular JSON/JS schema (`data.js`) for seamless question additions.
- **State & Storage**: Client-side LocalStorage for offline data retention.

### Slide 5: Live Demonstration
- Walk through:
  1. Reading the "Components of Food" summary in Science.
  2. Taking a Medium difficulty quiz.
  3. Demonstrating instant feedback & the explanation box.
  4. Celebrating on the Scorecard with stars & reviewing mistake analysis.
  5. Visiting the Trophy Cabinet.

### Slide 6: Team Work Distribution
- **Member 1 (UI/Design)**: Color palette, card layouts, animations, typography.
- **Member 2 (Quiz/Questions)**: Curriculum research, question curation, explanations, summaries.
- **Member 3 (App Development)**: Screen routing, modal components, DOM rendering, audio.
- **Member 4 (Scoring & Features)**: Streak multipliers, timer, star calculation, trophy unlocking.
- **Member 5 (Testing & Presentation)**: QA checklists, bug finding, documentation, slide deck.

### Slide 7: Future Roadmap
- AI-generated question recommendations based on weak topics.
- Multiplayer / Classroom Kahoot-style quiz battles.
- Hindi / regional language support for broader accessibility.

### Slide 8: Q&A and Thank You
- Open floor for questions and feedback.
