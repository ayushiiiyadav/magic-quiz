import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import { getQuestions } from '../data/questions';

export default function QuizScreen({ config, onFinish, onQuit }) {
  const [questions] = useState(() => getQuestions(config.category, config.count));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showStreakBurst, setShowStreakBurst] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  const timePerQ = config.difficulty === 'easy' ? 25 : config.difficulty === 'medium' ? 20 : 15;

  const handleAnswer = (selectedIdx, isCorrect) => {
    const newAnswers = [...answers, { question: questions[currentIdx], selected: selectedIdx, correct: isCorrect }];
    setAnswers(newAnswers);

    if (isCorrect) {
      const newStreak = streak + 1;
      const newCombo = combo + 1;
      setStreak(newStreak);
      setCombo(newCombo);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      const pts = newStreak >= 3 ? 15 : 10;
      setScore(s => s + pts);
      if (newStreak >= 3) {
        setShowStreakBurst(true);
        setTimeout(() => setShowStreakBurst(false), 1500);
      }
      if (newCombo > 1) {
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 1000);
      }
    } else {
      setStreak(0);
      setCombo(0);
      const newHearts = hearts - 1;
      setHearts(newHearts);
      if (newHearts <= 0) {
        setGameOver(true);
        setTimeout(() => onFinish({ score, answers: newAnswers, maxStreak, totalQ: questions.length, name: config.name }), 1500);
        return;
      }
    }

    const nextIdx = currentIdx + 1;
    if (nextIdx >= questions.length) {
      setTimeout(() => onFinish({
        score: isCorrect ? score + (streak + 1 >= 3 ? 15 : 10) : score,
        answers: newAnswers,
        maxStreak,
        totalQ: questions.length,
        name: config.name,
      }), 800);
    } else {
      setTimeout(() => setCurrentIdx(nextIdx), 600);
    }
  };

  const progressPct = (currentIdx / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-6 relative z-10">

      {/* Top HUD */}
      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center justify-between mb-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuit}
            className="px-3 py-2 rounded-xl text-purple-300 font-bold text-sm"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            ✕ Quit
          </motion.button>

          <motion.div
            key={score}
            initial={{ scale: 1.4, color: '#F59E0B' }}
            animate={{ scale: 1, color: '#ffffff' }}
            className="text-xl font-bold"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            ⭐ {score} pts
          </motion.div>

          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ scale: i < hearts ? 1 : 0.7, opacity: i < hearts ? 1 : 0.3 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-xl"
              >
                {i < hearts ? '❤️' : '🖤'}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            className="h-full rounded-full progress-fill"
            animate={{ width: `${progressPct}%` }}
            style={{
              background: 'linear-gradient(90deg, #7C3AED, #EC4899, #F59E0B)',
              boxShadow: '0 0 10px rgba(236, 72, 153, 0.6)',
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-purple-300 text-xs font-semibold">
            {config.name}'s Quest 🗺️
          </span>
          {streak >= 2 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.4)' }}
            >
              🔥 {streak} streak!
            </motion.span>
          )}
        </div>
      </div>

      {/* Streak burst */}
      <AnimatePresence>
        {showStreakBurst && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 0 }}
            animate={{ scale: 1.2, opacity: 1, y: -20 }}
            exit={{ scale: 0.8, opacity: 0, y: -60 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none"
          >
            <div
              className="px-8 py-4 rounded-3xl text-white font-bold text-2xl"
              style={{
                fontFamily: "'Fredoka One', cursive",
                background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                boxShadow: '0 0 40px rgba(245,158,11,0.7)',
              }}
            >
              🔥 ON FIRE! +5 Bonus!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Combo popup */}
      <AnimatePresence>
        {showCombo && combo > 1 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: -10, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="fixed top-1/2 right-6 z-50 pointer-events-none"
          >
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "'Fredoka One', cursive", color: '#F59E0B', textShadow: '0 0 20px rgba(245,158,11,0.8)' }}
            >
              x{combo} COMBO!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game over overlay */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-center p-8 rounded-3xl"
              style={{ background: 'rgba(30,27,75,0.95)', border: '2px solid #EF4444', boxShadow: '0 0 50px rgba(239,68,68,0.3)' }}
            >
              <div className="text-6xl mb-4">💀</div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Fredoka One', cursive" }}>
                Oops! Out of Hearts!
              </h2>
              <p className="text-purple-300">But you scored <strong className="text-yellow-400">{score} points</strong>!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question */}
      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentIdx}
          question={questions[currentIdx]}
          questionNumber={currentIdx + 1}
          total={questions.length}
          onAnswer={handleAnswer}
          timeLimit={timePerQ}
        />
      </AnimatePresence>
    </div>
  );
}