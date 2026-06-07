const PROFILE_KEY = 'magic-quiz-profile';
const HISTORY_KEY = 'magic-quiz-history';

// ─── Profile ───────────────────────────────────────────
export function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function clearProfile() {
  try { localStorage.removeItem(PROFILE_KEY); } catch {}
}

// ─── History ───────────────────────────────────────────
export function saveResult(result) {
  try {
    const history = loadHistory();
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      name: result.name,
      category: result.category,
      difficulty: result.difficulty,
      score: result.score,
      totalQ: result.totalQ,
      correct: result.answers.filter(a => a.correct).length,
      maxStreak: result.maxStreak,
      answers: result.answers.map(a => ({
        question: a.question.q,
        emoji: a.question.emoji,
        correct: a.correct,
        correctAnswer: a.question.options[a.question.answer],
        selectedAnswer: a.selected === -1 ? 'Timed out ⏰' : a.question.options[a.selected],
        fun: a.question.fun,
      })),
    };
    history.unshift(entry); 
    const trimmed = history.slice(0, 20);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch {}
}

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function clearHistory() {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}