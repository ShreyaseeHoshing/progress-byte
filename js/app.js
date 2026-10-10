/**
 * Quiz Master - Application Engine
 * Pair-programmed for Class 6–7 Educational Platform
 * Clean, modular architecture for App Dev (Member 3) & Scoring (Member 4)
 */

(function () {
  "use strict";

  // ================= State Management =================
  const state = {
    selectedSubject: null,
    selectedTopic: null,
    selectedDifficulty: "medium", // default per topic
    topicDifficulties: {}, // topicId -> difficulty ("easy" | "medium" | "challenge")
    currentQuestions: [],
    currentIndex: 0,
    score: 0,
    currentStreak: 0,
    maxStreak: 0,
    secondsElapsed: 0,
    timerInterval: null,
    userAnswers: [], // { question, selectedIdx, correctIdx, isCorrect, explanation }
    soundEnabled: true,
    progress: {
      totalQuizzes: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      totalStars: 0,
      bestStreak: 0,
      perfectQuizzes: 0,
      unlockedBadges: []
    }
  };

  // Badges Definitions
  const BADGES_DEFINITIONS = [
    {
      id: "first_quiz",
      icon: "🌱",
      title: "First Step",
      description: "Complete your very first quiz on Quiz Master.",
      check: (p) => p.totalQuizzes >= 1
    },
    {
      id: "streak_3",
      icon: "🔥",
      title: "Streak Starter",
      description: "Achieve a streak of 3 correct answers in a row.",
      check: (p) => p.bestStreak >= 3
    },
    {
      id: "perfect_score",
      icon: "💯",
      title: "Bullseye!",
      description: "Score 100% on any quiz challenge.",
      check: (p) => p.perfectQuizzes >= 1
    },
    {
      id: "star_collector",
      icon: "⭐",
      title: "Star Collector",
      description: "Earn 10 or more stars across your quizzes.",
      check: (p) => p.totalStars >= 10
    },
    {
      id: "quiz_veteran",
      icon: "🎖️",
      title: "Quiz Veteran",
      description: "Complete at least 5 quizzes across different subjects.",
      check: (p) => p.totalQuizzes >= 5
    },
    {
      id: "master_scholar",
      icon: "👑",
      title: "Quiz Master",
      description: "Earn 20+ stars and at least 2 perfect scores.",
      check: (p) => p.totalStars >= 20 && p.perfectQuizzes >= 2
    }
  ];

  // ================= Audio Synthesizer (Zero External Dependencies) =================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        // High upbeat chime (C5 -> G5)
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "wrong") {
        // Low gentle boop (Eb3 -> C3)
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(260.00, now);
        osc.frequency.exponentialRampToValueAtTime(160.00, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "celebrate") {
        // Multi-tone celebratory fanfare
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "triangle";
          o.frequency.setValueAtTime(freq, now + idx * 0.08);
          g.gain.setValueAtTime(0.15, now + idx * 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.08);
          o.stop(now + idx * 0.08 + 0.3);
        });
      }
    } catch (e) {
      console.warn("Audio playback not supported or blocked:", e);
    }
  }

  // ================= Confetti Particle System =================
  const confettiCanvas = document.getElementById("confetti-canvas");
  let confettiCtx = confettiCanvas.getContext("2d");
  let confettiParticles = [];
  let confettiAnimId = null;

  function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeConfetti);
  resizeConfetti();

  function launchConfetti(count = 70) {
    resizeConfetti();
    const colors = ["#4f46e5", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#8b5cf6"];
    confettiParticles = [];
    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: window.innerWidth / 2 + (Math.random() * 200 - 100),
        y: window.innerHeight * 0.4,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() * -12) - 4,
        gravity: 0.35,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10
      });
    }

    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

    function updateConfetti() {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let activeCount = 0;

      for (let p of confettiParticles) {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        if (p.y < confettiCanvas.height + 20) {
          activeCount++;
          confettiCtx.save();
          confettiCtx.translate(p.x, p.y);
          confettiCtx.rotate((p.rot * Math.PI) / 180);
          confettiCtx.fillStyle = p.color;
          confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          confettiCtx.restore();
        }
      }

      if (activeCount > 0) {
        confettiAnimId = requestAnimationFrame(updateConfetti);
      } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }
    updateConfetti();
  }

  // ================= LocalStorage Data Persistence =================
  function loadPersistedData() {
    try {
      const saved = localStorage.getItem("quiz_master_progress_v1");
      if (saved) {
        state.progress = Object.assign(state.progress, JSON.parse(saved));
      }
      const soundSetting = localStorage.getItem("quiz_master_sound");
      if (soundSetting !== null) {
        state.soundEnabled = soundSetting === "true";
      }
    } catch (e) {
      console.warn("Unable to load localStorage data:", e);
    }
    updateHeaderUI();
  }

  function savePersistedData() {
    try {
      localStorage.setItem("quiz_master_progress_v1", JSON.stringify(state.progress));
      localStorage.setItem("quiz_master_sound", state.soundEnabled ? "true" : "false");
    } catch (e) {
      console.warn("Unable to save progress to localStorage:", e);
    }
    updateHeaderUI();
  }

  function checkAndUnlockBadges() {
    let unlockedNew = false;
    BADGES_DEFINITIONS.forEach(b => {
      if (!state.progress.unlockedBadges.includes(b.id)) {
        if (b.check(state.progress)) {
          state.progress.unlockedBadges.push(b.id);
          unlockedNew = true;
        }
      }
    });
    if (unlockedNew) {
      savePersistedData();
    }
  }

  // ================= Navigation & Screen Switching =================
  const screens = {
    home: document.getElementById("screen-home"),
    topics: document.getElementById("screen-topics"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result"),
    progress: document.getElementById("screen-progress")
  };

  function showScreen(screenKey) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    if (screens[screenKey]) {
      screens[screenKey].classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (screenKey === "home") {
      updateHomeStats();
    } else if (screenKey === "progress") {
      renderBadgesCabinet();
    }
  }

  // ================= Header UI Updates =================
  function updateHeaderUI() {
    const starLabel = document.getElementById("header-stars");
    if (starLabel) {
      starLabel.textContent = `${state.progress.totalStars} Stars`;
    }
    const soundIcon = document.getElementById("sound-icon");
    if (soundIcon) {
      soundIcon.textContent = state.soundEnabled ? "🔊" : "🔇";
    }
  }

  function updateHomeStats() {
    const qCount = document.getElementById("stat-quizzes-taken");
    const accLabel = document.getElementById("stat-avg-accuracy");
    if (qCount) qCount.textContent = state.progress.totalQuizzes;
    if (accLabel) {
      if (state.progress.totalQuestions > 0) {
        const pct = Math.round((state.progress.totalCorrect / state.progress.totalQuestions) * 100);
        accLabel.textContent = `${pct}%`;
      } else {
        accLabel.textContent = "0%";
      }
    }
  }

  // ================= 1. Render Subjects =================
  function renderSubjects() {
    const container = document.getElementById("subjects-container");
    if (!container) return;
    container.innerHTML = "";

    QUIZ_DATA.subjects.forEach(subject => {
      const card = document.createElement("div");
      card.className = "subject-card";
      card.style.setProperty("--card-color", subject.color);

      card.innerHTML = `
        <span class="subject-card-icon">${subject.icon}</span>
        <span class="subject-card-badge" style="background:${subject.bgColor}; color:${subject.color}">
          ${subject.badge}
        </span>
        <h4>${subject.title}</h4>
        <p>${subject.description}</p>
        <div class="subject-card-footer">
          <span>${subject.topics.length} Chapters Available</span>
          <span>Explore ➔</span>
        </div>
      `;

      card.addEventListener("click", () => {
        selectSubject(subject);
      });

      container.appendChild(card);
    });
  }

  function selectSubject(subject) {
    state.selectedSubject = subject;
    document.getElementById("breadcrumb-subject-name").textContent = subject.title;
    document.getElementById("subject-banner-title").textContent = subject.title;
    document.getElementById("subject-banner-icon").textContent = subject.icon;
    document.getElementById("subject-banner-desc").textContent = subject.description;

    renderTopics(subject);
    showScreen("topics");
  }

  // ================= 2. Render Topics & Difficulties =================
  function renderTopics(subject) {
    const container = document.getElementById("topics-container");
    if (!container) return;
    container.innerHTML = "";

    subject.topics.forEach(topic => {
      // Default to "medium" if not set
      if (!state.topicDifficulties[topic.id]) {
        state.topicDifficulties[topic.id] = "medium";
      }

      const card = document.createElement("div");
      card.className = "topic-card";

      // Question count summary
      const qCount = topic.questions ? topic.questions.length : 0;

      card.innerHTML = `
        <div class="topic-main-row">
          <div class="topic-title-area">
            <span class="topic-emoji">${topic.icon}</span>
            <div>
              <h4>${topic.title}</h4>
              <span style="font-size: 0.85rem; color: var(--text-muted);">
                ${qCount} Practice Questions Included
              </span>
            </div>
          </div>
        </div>

        <div class="topic-actions-row">
          <div class="difficulty-selector">
            <span class="difficulty-label">Difficulty:</span>
            <div class="diff-btn-group" data-topic-id="${topic.id}">
              <button class="diff-btn ${state.topicDifficulties[topic.id] === 'easy' ? 'selected-easy' : ''}" data-diff="easy">Easy</button>
              <button class="diff-btn ${state.topicDifficulties[topic.id] === 'medium' ? 'selected-medium' : ''}" data-diff="medium">Medium</button>
              <button class="diff-btn ${state.topicDifficulties[topic.id] === 'challenge' ? 'selected-challenge' : ''}" data-diff="challenge">Challenge</button>
            </div>
          </div>

          <div class="topic-buttons">
            <button class="btn-secondary btn-summary-open" data-topic-id="${topic.id}">
              📖 Chapter Summary
            </button>
            <button class="btn-primary btn-start-quiz" data-topic-id="${topic.id}">
              🎯 Start Quiz
            </button>
          </div>
        </div>
      `;

      // Wire up difficulty buttons
      const diffButtons = card.querySelectorAll(".diff-btn");
      diffButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const diff = btn.getAttribute("data-diff");
          state.topicDifficulties[topic.id] = diff;

          diffButtons.forEach(b => {
            b.classList.remove("selected-easy", "selected-medium", "selected-challenge");
          });

          if (diff === "easy") btn.classList.add("selected-easy");
          else if (diff === "medium") btn.classList.add("selected-medium");
          else if (diff === "challenge") btn.classList.add("selected-challenge");
        });
      });

      // Wire up Summary Button
      const summaryBtn = card.querySelector(".btn-summary-open");
      summaryBtn.addEventListener("click", () => {
        openChapterSummary(topic);
      });

      // Wire up Start Quiz Button
      const quizBtn = card.querySelector(".btn-start-quiz");
      quizBtn.addEventListener("click", () => {
        const chosenDiff = state.topicDifficulties[topic.id] || "medium";
        startQuiz(topic, chosenDiff);
      });

      container.appendChild(card);
    });
  }

  // ================= 3. Chapter Summary Modal =================
  const summaryModal = document.getElementById("summary-modal");
  const modalSummaryIcon = document.getElementById("modal-summary-icon");
  const modalSummaryTitle = document.getElementById("modal-summary-title");
  const modalSummaryContent = document.getElementById("modal-summary-content");
  const btnCloseSummary = document.getElementById("btn-close-summary");
  const btnModalDismiss = document.getElementById("btn-modal-dismiss");
  const btnModalStartQuiz = document.getElementById("btn-modal-start-quiz");

  let activeModalTopic = null;

  function openChapterSummary(topic) {
    activeModalTopic = topic;
    modalSummaryIcon.textContent = topic.icon;
    modalSummaryTitle.textContent = topic.title;

    const summary = topic.summary;
    let bulletsHtml = "";
    if (summary.keyPoints && summary.keyPoints.length) {
      bulletsHtml = summary.keyPoints.map(pt => `<li>${pt}</li>`).join("");
    }

    let formulaHtml = "";
    if (summary.keyFormulasOrTips) {
      formulaHtml = `<div class="summary-callout-box">${summary.keyFormulasOrTips}</div>`;
    }

    let funFactHtml = "";
    if (summary.funFact) {
      funFactHtml = `<div class="summary-fun-fact"><strong>🌟 Fun Fact:</strong> ${summary.funFact}</div>`;
    }

    modalSummaryContent.innerHTML = `
      <h4 class="summary-headline">${summary.headline || "Key Highlights"}</h4>
      <ul class="summary-bullet-list">
        ${bulletsHtml}
      </ul>
      ${formulaHtml}
      ${funFactHtml}
    `;

    summaryModal.classList.add("open");
  }

  function closeChapterSummary() {
    summaryModal.classList.remove("open");
    activeModalTopic = null;
  }

  btnCloseSummary.addEventListener("click", closeChapterSummary);
  btnModalDismiss.addEventListener("click", closeChapterSummary);
  summaryModal.addEventListener("click", (e) => {
    if (e.target === summaryModal) closeChapterSummary();
  });

  btnModalStartQuiz.addEventListener("click", () => {
    if (activeModalTopic) {
      const topic = activeModalTopic;
      const diff = state.topicDifficulties[topic.id] || "medium";
      closeChapterSummary();
      startQuiz(topic, diff);
    }
  });

  // ================= 4. Active Quiz Engine =================
  function startQuiz(topic, difficulty) {
    state.selectedTopic = topic;
    state.selectedDifficulty = difficulty;

    // Filter questions by difficulty, or if not enough, fall back gracefully
    let filtered = topic.questions.filter(q => q.difficulty === difficulty);
    if (filtered.length === 0) {
      // If user selected difficulty with no specific items, pick all
      filtered = [...topic.questions];
    }

    // Shuffle questions
    state.currentQuestions = filtered.sort(() => Math.random() - 0.5);
    state.currentIndex = 0;
    state.score = 0;
    state.currentStreak = 0;
    state.maxStreak = 0;
    state.userAnswers = [];
    state.secondsElapsed = 0;

    // Quiz Header UI
    document.getElementById("quiz-badge-topic").textContent = topic.title;
    const diffBadge = document.getElementById("quiz-badge-difficulty");
    diffBadge.textContent = difficulty.toUpperCase();
    diffBadge.className = `difficulty-tag ${difficulty}`;

    // Timer reset
    if (state.timerInterval) clearInterval(state.timerInterval);
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
      state.secondsElapsed++;
      updateTimerDisplay();
    }, 1000);

    updateStreakUI();
    showScreen("quiz");
    renderCurrentQuestion();
  }

  function updateTimerDisplay() {
    const mins = Math.floor(state.secondsElapsed / 60);
    const secs = state.secondsElapsed % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    document.getElementById("timer-text").textContent = formatted;
  }

  function updateStreakUI() {
    const streakCountElem = document.getElementById("streak-count");
    if (streakCountElem) streakCountElem.textContent = state.currentStreak;
    const streakDisplay = document.getElementById("quiz-streak-display");
    if (state.currentStreak >= 2) {
      streakDisplay.style.display = "flex";
    } else {
      streakDisplay.style.display = "none";
    }
  }

  function renderCurrentQuestion() {
    const total = state.currentQuestions.length;
    const curr = state.currentIndex;
    const qData = state.currentQuestions[curr];

    // Progress updates
    const pct = Math.round(((curr) / total) * 100);
    document.getElementById("quiz-progress-fill").style.width = `${pct}%`;
    document.getElementById("question-index-text").textContent = `Question ${curr + 1} of ${total}`;
    document.getElementById("live-score-text").textContent = `Score: ${state.score}`;

    // Hide feedback card
    const feedbackCard = document.getElementById("feedback-card");
    feedbackCard.style.display = "none";
    feedbackCard.className = "feedback-card";

    // Set question text
    document.getElementById("question-text").textContent = qData.question;

    // Render options
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    qData.options.forEach((optText, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerHTML = `
        <span class="option-letter">${letters[idx]}</span>
        <span class="option-label">${optText}</span>
      `;

      btn.addEventListener("click", () => handleOptionSelection(idx, qData));
      optionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelection(selectedIdx, qData) {
    const optionsContainer = document.getElementById("options-container");
    const optionButtons = optionsContainer.querySelectorAll(".option-btn");

    // Lock all buttons
    optionButtons.forEach(btn => (btn.disabled = true));

    const isCorrect = selectedIdx === qData.correctIndex;

    // Track answer for review
    state.userAnswers.push({
      question: qData.question,
      options: qData.options,
      selectedIdx: selectedIdx,
      correctIdx: qData.correctIndex,
      isCorrect: isCorrect,
      explanation: qData.explanation
    });

    // Style chosen & correct buttons
    if (isCorrect) {
      optionButtons[selectedIdx].classList.add("correct");
      state.score++;
      state.currentStreak++;
      if (state.currentStreak > state.maxStreak) {
        state.maxStreak = state.currentStreak;
      }
      playSound("correct");
    } else {
      optionButtons[selectedIdx].classList.add("wrong");
      optionButtons[qData.correctIndex].classList.add("correct");
      state.currentStreak = 0;
      playSound("wrong");
    }

    updateStreakUI();
    document.getElementById("live-score-text").textContent = `Score: ${state.score}`;

    // Show Instant Feedback
    showInstantFeedback(isCorrect, qData.explanation);
  }

  function showInstantFeedback(isCorrect, explanation) {
    const feedbackCard = document.getElementById("feedback-card");
    const icon = document.getElementById("feedback-icon");
    const title = document.getElementById("feedback-title");
    const expl = document.getElementById("feedback-explanation");
    const nextBtn = document.getElementById("btn-next-question");

    feedbackCard.style.display = "block";

    if (isCorrect) {
      feedbackCard.className = "feedback-card correct-feedback";
      icon.textContent = "🎉";
      title.textContent = "Brilliant! You got it right!";
    } else {
      feedbackCard.className = "feedback-card wrong-feedback";
      icon.textContent = "💡";
      title.textContent = "Not quite, but here's why:";
    }

    expl.textContent = explanation || "Keep practicing to master this concept!";

    const isLast = state.currentIndex + 1 >= state.currentQuestions.length;
    nextBtn.textContent = isLast ? "Finish Quiz & See Score 🏆" : "Next Question ➔";

    nextBtn.onclick = () => {
      if (isLast) {
        finishQuiz();
      } else {
        state.currentIndex++;
        renderCurrentQuestion();
      }
    };
  }

  // Exit Quiz Early prompt
  document.getElementById("btn-exit-quiz").addEventListener("click", () => {
    if (confirm("Are you sure you want to exit this quiz? Your current progress won't be saved.")) {
      if (state.timerInterval) clearInterval(state.timerInterval);
      showScreen("topics");
    }
  });

  // ================= 5. Quiz Result & Scoring Logic =================
  function finishQuiz() {
    if (state.timerInterval) clearInterval(state.timerInterval);

    // Calculate score percentage
    const total = state.currentQuestions.length;
    const score = state.score;
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    // Calculate stars (0 to 3)
    let starsEarned = 0;
    if (accuracy === 100) starsEarned = 3;
    else if (accuracy >= 70) starsEarned = 2;
    else if (accuracy >= 40) starsEarned = 1;

    // Update global state progress
    state.progress.totalQuizzes++;
    state.progress.totalQuestions += total;
    state.progress.totalCorrect += score;
    state.progress.totalStars += starsEarned;
    if (state.maxStreak > state.progress.bestStreak) {
      state.progress.bestStreak = state.maxStreak;
    }
    if (accuracy === 100) {
      state.progress.perfectQuizzes++;
    }

    checkAndUnlockBadges();
    savePersistedData();

    // Populate Results Screen
    const trophyElem = document.getElementById("result-trophy-emoji");
    const badgeTitle = document.getElementById("result-badge-title");
    const subtitle = document.getElementById("result-subtitle");

    if (accuracy === 100) {
      trophyElem.textContent = "🏆";
      badgeTitle.textContent = "Perfect Score! Quiz Master!";
      subtitle.textContent = "Incredible work! You answered every question correctly!";
      playSound("celebrate");
      launchConfetti(80);
    } else if (accuracy >= 70) {
      trophyElem.textContent = "🌟";
      badgeTitle.textContent = "High Achiever!";
      subtitle.textContent = "Great job! You have a solid grasp of this chapter.";
      playSound("celebrate");
      launchConfetti(50);
    } else if (accuracy >= 40) {
      trophyElem.textContent = "🚀";
      badgeTitle.textContent = "Good Effort, Keep Growing!";
      subtitle.textContent = "You're making steady progress. Review notes and try again!";
    } else {
      trophyElem.textContent = "📚";
      badgeTitle.textContent = "Revision Recommended";
      subtitle.textContent = "Take a moment to read the Chapter Summary before retrying!";
    }

    // Stars display
    const starsRow = document.getElementById("result-stars-row");
    let starIcons = "";
    for (let i = 0; i < 3; i++) {
      starIcons += i < starsEarned ? "⭐" : "⚪";
    }
    starsRow.textContent = starIcons;

    document.getElementById("result-score-large").textContent = `${score} / ${total}`;
    document.getElementById("result-accuracy-large").textContent = `${accuracy}% Accuracy`;

    // Time formatting
    const mins = Math.floor(state.secondsElapsed / 60);
    const secs = state.secondsElapsed % 60;
    document.getElementById("result-time-taken").textContent =
      `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    document.getElementById("result-max-streak").textContent = `${state.maxStreak} 🔥`;
    document.getElementById("result-earned-stars").textContent = `+${starsEarned} ⭐`;

    // Reset review answers box
    const reviewBox = document.getElementById("review-answers-box");
    reviewBox.style.display = "none";
    document.getElementById("btn-result-review").textContent = "📝 Review Answers";

    showScreen("result");
  }

  // Result Screen Action Buttons
  document.getElementById("btn-result-retry").addEventListener("click", () => {
    if (state.selectedTopic && state.selectedDifficulty) {
      startQuiz(state.selectedTopic, state.selectedDifficulty);
    } else {
      showScreen("topics");
    }
  });

  document.getElementById("btn-result-summary").addEventListener("click", () => {
    if (state.selectedTopic) {
      openChapterSummary(state.selectedTopic);
    }
  });

  document.getElementById("btn-result-home").addEventListener("click", () => {
    showScreen("home");
  });

  // Review Answers Toggle & Renderer
  document.getElementById("btn-result-review").addEventListener("click", () => {
    const reviewBox = document.getElementById("review-answers-box");
    const btn = document.getElementById("btn-result-review");
    if (reviewBox.style.display === "none") {
      renderReviewAnswers();
      reviewBox.style.display = "block";
      btn.textContent = "▲ Hide Review";
    } else {
      reviewBox.style.display = "none";
      btn.textContent = "📝 Review Answers";
    }
  });

  function renderReviewAnswers() {
    const list = document.getElementById("review-list-container");
    list.innerHTML = "";

    state.userAnswers.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = `review-item ${item.isCorrect ? "review-correct" : "review-wrong"}`;

      const pickedText = item.options[item.selectedIdx] || "No Answer";
      const correctText = item.options[item.correctIdx];

      card.innerHTML = `
        <div class="review-q-text">Q${idx + 1}: ${item.question}</div>
        <div class="review-ans-row">
          <span><strong>Your Answer:</strong> ${pickedText} ${item.isCorrect ? "✅" : "❌"}</span>
        </div>
        ${
          !item.isCorrect
            ? `<div class="review-ans-row" style="color: var(--accent-green); font-weight:700;">
                 Correct Answer: ${correctText}
               </div>`
            : ""
        }
        <div class="review-explanation">
          <strong>Why:</strong> ${item.explanation}
        </div>
      `;

      list.appendChild(card);
    });
  }

  // ================= 6. Progress / Trophy Cabinet Screen =================
  function renderBadgesCabinet() {
    document.getElementById("cab-total-stars").textContent = state.progress.totalStars;
    document.getElementById("cab-quizzes-completed").textContent = state.progress.totalQuizzes;
    document.getElementById("cab-best-streak").textContent = state.progress.bestStreak;
    document.getElementById("cab-perfect-quizzes").textContent = state.progress.perfectQuizzes;

    const badgesContainer = document.getElementById("badges-container");
    badgesContainer.innerHTML = "";

    BADGES_DEFINITIONS.forEach(b => {
      const isUnlocked = state.progress.unlockedBadges.includes(b.id);
      const card = document.createElement("div");
      card.className = `badge-card ${isUnlocked ? "unlocked" : "locked"}`;

      card.innerHTML = `
        <span class="badge-emoji">${b.icon}</span>
        <h4 class="badge-title">${b.title}</h4>
        <p class="badge-desc">${b.description}</p>
        <div style="margin-top: 0.6rem; font-size: 0.75rem; font-weight: 800; color: ${isUnlocked ? "var(--accent-green)" : "var(--text-light)"}">
          ${isUnlocked ? "✓ UNLOCKED" : "🔒 LOCKED"}
        </div>
      `;

      badgesContainer.appendChild(card);
    });
  }

  // Reset Progress Handler
  document.getElementById("btn-reset-data").addEventListener("click", () => {
    if (confirm("Reset all quiz scores, stars, and trophies? This cannot be undone.")) {
      state.progress = {
        totalQuizzes: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        totalStars: 0,
        bestStreak: 0,
        perfectQuizzes: 0,
        unlockedBadges: []
      };
      savePersistedData();
      renderBadgesCabinet();
      updateHomeStats();
      alert("Progress has been reset.");
    }
  });

  // ================= Navigation Event Listeners =================
  document.getElementById("btn-back-to-home").addEventListener("click", () => {
    showScreen("home");
  });

  document.getElementById("nav-brand").addEventListener("click", () => {
    showScreen("home");
  });

  document.getElementById("btn-home-nav").addEventListener("click", () => {
    showScreen("home");
  });

  document.getElementById("btn-progress-nav").addEventListener("click", () => {
    showScreen("progress");
  });

  document.getElementById("btn-progress-back").addEventListener("click", () => {
    showScreen("home");
  });

  document.getElementById("btn-sound-toggle").addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    savePersistedData();
  });

  // ================= App Initialization =================
  function init() {
    loadPersistedData();
    renderSubjects();
    showScreen("home");
  }

  // Kickoff on DOM loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
