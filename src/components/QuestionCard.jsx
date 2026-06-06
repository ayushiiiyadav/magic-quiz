import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const optionColors = ['#7C3AED', '#EC4899', '#F59E0B', '#06B6D4'];
const optionLabels = ['A', 'B', 'C', 'D'];

export default function QuestionCard({ question, questionNumber, total, onAnswer, timeLimit = 20 }) {
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    setTimeLeft(timeLimit);
  }, [question, timeLimit]);

  useEffect(() => {
    if (revealed) return;
    if (timeLeft <= 0) {
      setRevealed(true);
      setTimeout(() => onAnswer(-1, false), 1200);
      return;
    }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, revealed]);

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    const isCorrect = idx === question.answer;
    setTimeout(() => onAnswer(idx, isCorrect), 1400);
  };

  const progressPct = (timeLeft / timeLimit) * 100;
  const timerColor = timeLeft > 10 ? '#10B981' : timeLeft > 5 ? '#F59E0B' : '#EF4444';

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: -30 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-purple-300 font-bold text-sm">
          Question {questionNumber} of {total}
        </span>
        <motion.div
          animate={{ scale: timeLeft <= 5 ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 0.4, repeat: timeLeft <= 5 ? Infinity : 0 }}
          className="relative w-12 h-12 flex items-center justify-center"
        >
          <svg className="absolute inset-0" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke={timerColor}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - progressPct / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s' }}
            />
          </svg>
          <span className="font-bold text-white text-sm z-10">{timeLeft}</span>
        </motion.div>
      </div>

      {/* Question card */}
      <div
        className="rounded-3xl p-6 mb-5 text-center relative overflow-hidden"
        style={{
          background: 'rgba(30, 27, 75, 0.9)',
          border: '1.5px solid rgba(124, 58, 237, 0.5)',
          boxShadow: '0 0 40px rgba(124, 58, 237, 0.2)',
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="text-5xl mb-4"
        >
          {question.emoji || '✨'}
        </motion.div>
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white text-xl md:text-2xl font-bold leading-snug"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {question.q}
        </motion.h2>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((opt, idx) => {
          let bgColor = 'rgba(255,255,255,0.05)';
          let borderColor = 'rgba(255,255,255,0.15)';
          let shadow = 'none';
          let icon = null;
          let stateClass = '';

          if (revealed) {
            if (idx === question.answer) {
              bgColor = 'rgba(16, 185, 129, 0.2)';
              borderColor = '#10B981';
              shadow = '0 0 20px rgba(16,185,129,0.4)';
              icon = '✅';
              stateClass = 'correct';
            } else if (idx === selected && idx !== question.answer) {
              bgColor = 'rgba(239, 68, 68, 0.2)';
              borderColor = '#EF4444';
              shadow = '0 0 20px rgba(239,68,68,0.4)';
              icon = '❌';
              stateClass = 'wrong';
            } else {
              bgColor = 'rgba(255,255,255,0.03)';
              borderColor = 'rgba(255,255,255,0.06)';
            }
          }

          return (
            <motion.button
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 + idx * 0.08, type: 'spring' }}
              whileHover={!revealed ? { x: 6, scale: 1.02 } : {}}
              whileTap={!revealed ? { scale: 0.97 } : {}}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              className={`answer-option ${stateClass} flex items-center gap-4 p-4 rounded-2xl text-left w-full`}
              style={{
                background: bgColor,
                border: `2px solid ${borderColor}`,
                boxShadow: shadow,
                cursor: revealed ? 'default' : 'pointer',
              }}
            >
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                style={{ background: revealed && idx === question.answer ? '#10B981' : optionColors[idx] }}
              >
                {optionLabels[idx]}
              </span>
              <span className="text-white font-semibold text-base flex-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {opt}
              </span>
              {icon && (
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-xl ml-auto"
                >
                  {icon}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Fun fact */}
      <AnimatePresence>
        {revealed && question.fun && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-4 px-4 py-3 rounded-2xl text-center"
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1.5px solid rgba(245, 158, 11, 0.35)',
            }}
          >
            <p className="text-yellow-300 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
              💡 {question.fun}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}