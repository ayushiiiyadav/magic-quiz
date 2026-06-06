import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MEDALS = [
  { min: 90, emoji: '🏆', label: 'Grand Wizard!', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  { min: 70, emoji: '🥇', label: 'Spell Master!', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  { min: 50, emoji: '🥈', label: 'Magic Apprentice!', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)' },
  { min: 0,  emoji: '🥉', label: 'Keep Practicing!', color: '#EC4899', bg: 'rgba(236,72,153,0.15)' },
];

function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = ['#F59E0B', '#EC4899', '#7C3AED', '#06B6D4', '#10B981', '#EF4444', '#fff'];
    const shapes = ['square', 'circle', 'triangle'];
    const newPieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 2,
      size: 8 + Math.random() * 10,
      spin: Math.random() * 720 - 360,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.left}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: p.spin, opacity: [1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: 0,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            clipPath: p.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
          }}
        />
      ))}
    </div>
  );
}

export default function ResultScreen({ result, onPlayAgain, onHome }) {
  const { score, answers, maxStreak, totalQ, name } = result;
  const correct = answers.filter(a => a.correct).length;
  const pct = Math.round((correct / totalQ) * 100);
  const medal = MEDALS.find(m => pct >= m.min);
  const [animScore, setAnimScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(pct >= 50);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(score / 40);
    const t = setInterval(() => {
      current = Math.min(current + step, score);
      setAnimScore(current);
      if (current >= score) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [score]);

  useEffect(() => {
    if (pct >= 50) {
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, []);

  const funMessages = [
    pct === 100 && "🎉 PERFECT! You're a LEGEND!",
    pct >= 80 && "🌟 Amazing! You're practically a wizard professor!",
    pct >= 60 && "⚡ Great job! Your magical powers are growing!",
    pct >= 40 && "💪 Not bad! Keep casting those spells!",
    "🌱 Every wizard starts somewhere — try again!",
  ].find(Boolean);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="w-full max-w-lg"
      >
        {/* Medal */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-8xl mb-3"
          >
            {medal.emoji}
          </motion.div>
          <h1
            className="text-4xl font-bold mb-1"
            style={{ fontFamily: "'Fredoka One', cursive", color: medal.color, textShadow: `0 0 30px ${medal.color}80` }}
          >
            {medal.label}
          </h1>
          <p className="text-purple-300 font-semibold">{name} — {funMessages}</p>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6 mb-4"
          style={{
            background: 'rgba(30, 27, 75, 0.9)',
            border: `2px solid ${medal.color}50`,
            boxShadow: `0 0 50px ${medal.color}20`,
          }}
        >
          {/* Big score */}
          <div className="text-center mb-6">
            <motion.div
              className="text-7xl font-bold shimmer-text"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              {animScore}
            </motion.div>
            <div className="text-purple-300 font-semibold text-lg">Magic Points ✨</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Correct', value: `${correct}/${totalQ}`, emoji: '✅', color: '#10B981' },
              { label: 'Accuracy', value: `${pct}%`, emoji: '🎯', color: '#06B6D4' },
              { label: 'Best Streak', value: maxStreak, emoji: '🔥', color: '#F59E0B' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                className="text-center p-3 rounded-2xl"
                style={{ background: `${stat.color}15`, border: `1.5px solid ${stat.color}35` }}
              >
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-bold text-white text-lg" style={{ fontFamily: "'Fredoka One', cursive" }}>{stat.value}</div>
                <div className="text-xs font-semibold" style={{ color: stat.color }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Answer review */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3 text-center opacity-70">Your Answers</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {answers.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.05, type: 'spring' }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                  style={{
                    background: a.correct ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                    border: `2px solid ${a.correct ? '#10B981' : '#EF4444'}`,
                  }}
                >
                  {a.correct ? '✅' : '❌'}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onHome}
            className="flex-1 py-4 rounded-2xl font-bold text-white text-lg"
            style={{
              fontFamily: "'Fredoka One', cursive",
              background: 'rgba(124,58,237,0.2)',
              border: '2px solid rgba(124,58,237,0.4)',
            }}
          >
            🏠 Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(124,58,237,0.6)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onPlayAgain}
            className="flex-2 py-4 rounded-2xl font-bold text-white text-xl"
            style={{
              fontFamily: "'Fredoka One', cursive",
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              boxShadow: '0 0 25px rgba(124,58,237,0.4)',
            }}
          >
            🪄 Play Again!
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}