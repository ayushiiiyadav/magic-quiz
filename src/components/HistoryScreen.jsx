import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clearHistory } from '../utils/storage';

const CATEGORY_LABELS = {
  math: '🧮 Math Magic',
  science: '⚗️ Science Spells',
  english: '✨ Word Wizardry',
  general: '🗺️ General Quest',
  mixed: '🎭 Mystery Mix',
};

const DIFFICULTY_COLORS = {
  easy: '#10B981',
  medium: '#F59E0B',
  hard: '#EF4444',
};

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function ScoreBadge({ pct }) {
  const color = pct >= 80 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#EF4444';
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '💪';
  return (
    <span
      className="text-xs font-bold px-2 py-1 rounded-full"
      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {emoji} {pct}%
    </span>
  );
}

function HistoryCard({ entry, index }) {
  const [expanded, setExpanded] = useState(false);
  const pct = Math.round((entry.correct / entry.totalQ) * 100);

  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.06, type: 'spring' }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(30,27,75,0.85)',
        border: '1.5px solid rgba(124,58,237,0.25)',
      }}
    >
      {/* Card header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{entry.answers[0]?.emoji || '✨'}</span>
            <div>
              <div className="text-white font-bold text-sm" style={{ fontFamily: "'Fredoka One', cursive" }}>
                {CATEGORY_LABELS[entry.category] || entry.category}
              </div>
              <div className="text-purple-400 text-xs">{formatDate(entry.date)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ScoreBadge pct={pct} />
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              className="text-purple-400 text-sm"
            >
              ▼
            </motion.span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full capitalize"
            style={{
              background: `${DIFFICULTY_COLORS[entry.difficulty]}20`,
              color: DIFFICULTY_COLORS[entry.difficulty],
              border: `1px solid ${DIFFICULTY_COLORS[entry.difficulty]}40`,
            }}
          >
            {entry.difficulty}
          </span>
          <span className="text-purple-300 text-xs">
            ✅ {entry.correct}/{entry.totalQ} correct
          </span>
          <span className="text-yellow-400 text-xs font-bold">
            ⭐ {entry.score} pts
          </span>
          {entry.maxStreak >= 2 && (
            <span className="text-orange-400 text-xs font-bold">
              🔥 {entry.maxStreak} streak
            </span>
          )}
        </div>
      </button>

      {/* Expanded answer breakdown */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-2 flex flex-col gap-2"
              style={{ borderTop: '1px solid rgba(124,58,237,0.2)' }}
            >
              <p className="text-purple-300 text-xs font-bold mb-1 uppercase tracking-wider">
                Answer Breakdown
              </p>
              {entry.answers.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-3 rounded-xl"
                  style={{
                    background: a.correct
                      ? 'rgba(16,185,129,0.08)'
                      : 'rgba(239,68,68,0.08)',
                    border: `1px solid ${a.correct ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`,
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base mt-0.5">{a.correct ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold leading-snug">
                        {a.emoji} {a.question}
                      </p>
                      {!a.correct && (
                        <div className="mt-1 flex flex-col gap-0.5">
                          <p className="text-red-400 text-xs">
                            Your answer: {a.selectedAnswer}
                          </p>
                          <p className="text-green-400 text-xs">
                            Correct: {a.correctAnswer}
                          </p>
                        </div>
                      )}
                      {a.fun && (
                        <p className="text-yellow-300 text-xs mt-1 opacity-80">
                          💡 {a.fun}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HistoryScreen({ history, onBack, onClear }) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const totalGames = history.length;
  const avgScore = totalGames
    ? Math.round(history.reduce((s, e) => s + e.score, 0) / totalGames)
    : 0;
  const bestScore = totalGames
    ? Math.max(...history.map(e => e.score))
    : 0;
  const totalCorrect = history.reduce((s, e) => s + e.correct, 0);
  const totalQ = history.reduce((s, e) => s + e.totalQ, 0);
  const overallPct = totalQ ? Math.round((totalCorrect / totalQ) * 100) : 0;

  const handleClear = () => {
    clearHistory();
    onClear();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-6 relative z-10">
      <div className="w-full max-w-lg">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-purple-300"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1.5px solid rgba(124,58,237,0.3)' }}
          >
            ← Back
          </motion.button>

          <h1
            className="text-2xl text-white"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            📜 Quest History
          </h1>

          {history.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowClearConfirm(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-red-400"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              🗑️ Clear
            </motion.button>
          )}
        </div>

        {/* Overall stats */}
        {history.length > 0 && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-4 gap-2 mb-6"
          >
            {[
              { label: 'Games', value: totalGames, emoji: '🎮', color: '#7C3AED' },
              { label: 'Avg Score', value: avgScore, emoji: '⭐', color: '#F59E0B' },
              { label: 'Best', value: bestScore, emoji: '🏆', color: '#10B981' },
              { label: 'Accuracy', value: `${overallPct}%`, emoji: '🎯', color: '#06B6D4' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                className="text-center p-3 rounded-2xl"
                style={{
                  background: `${stat.color}15`,
                  border: `1.5px solid ${stat.color}30`,
                }}
              >
                <div className="text-xl mb-1">{stat.emoji}</div>
                <div
                  className="text-white font-bold text-base"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-semibold" style={{ color: stat.color }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* History list */}
        {history.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📭</div>
            <h2
              className="text-2xl text-white mb-2"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              No quizzes yet!
            </h2>
            <p className="text-purple-300 text-sm">
              Complete your first quest to see your history here!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="mt-6 px-8 py-3 rounded-2xl font-bold text-white text-lg"
              style={{
                fontFamily: "'Fredoka One', cursive",
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                boxShadow: '0 0 25px rgba(124,58,237,0.4)',
              }}
            >
              🪄 Start a Quest!
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3 pb-8">
            {history.map((entry, i) => (
              <HistoryCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        )}

        {/* Clear confirm popup */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-full max-w-sm p-6 rounded-3xl text-center"
                style={{
                  background: 'rgba(30,27,75,0.98)',
                  border: '2px solid rgba(239,68,68,0.4)',
                  boxShadow: '0 0 50px rgba(239,68,68,0.2)',
                }}
              >
                <div className="text-5xl mb-3">🗑️</div>
                <h2
                  className="text-2xl text-white mb-2"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  Clear all history?
                </h2>
                <p className="text-purple-300 text-sm mb-6">
                  This will delete all your past quiz records. This cannot be undone!
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 py-3 rounded-2xl font-bold text-white"
                    style={{ background: 'rgba(124,58,237,0.2)', border: '2px solid rgba(124,58,237,0.4)' }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClear}
                    className="flex-1 py-3 rounded-2xl font-bold text-white"
                    style={{ background: 'rgba(239,68,68,0.3)', border: '2px solid rgba(239,68,68,0.5)' }}
                  >
                    🗑️ Yes, Clear!
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}