import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/questions';

const difficulties = [
  { id: 'easy', label: '😊 Easy', desc: '5 questions', count: 5, color: '#10B981' },
  { id: 'medium', label: '🤔 Medium', desc: '6 questions', count: 6, color: '#F59E0B' },
  { id: 'hard', label: '🔥 Hard', desc: '8 questions', count: 8, color: '#EF4444' },
];

export default function HomeScreen({ onStart, highScore }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1 && playerName.trim()) setStep(2);
    else if (step === 2 && selectedCategory) setStep(3);
    else if (step === 3 && selectedDifficulty) {
      const diff = difficulties.find(d => d.id === selectedDifficulty);
      onStart({ category: selectedCategory, difficulty: selectedDifficulty, count: diff.count, name: playerName.trim() });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">

      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
          className="text-7xl mb-3 select-none"
        >
          🧙
        </motion.div>
        <h1
          className="text-5xl md:text-6xl font-magic shimmer-text mb-2"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Magic Quiz!
        </h1>
        <p className="text-purple-300 text-lg font-body font-semibold">
          ✨ Spell your way to being SUPER SMART! ✨
        </p>
        {highScore > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-3 inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-1"
          >
            <span className="text-yellow-400 text-sm font-bold">🏆 Best Score: {highScore} pts</span>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="w-full max-w-lg"
        style={{
          background: 'rgba(30, 27, 75, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(124, 58, 237, 0.4)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 0 60px rgba(124, 58, 237, 0.2), 0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Step indicators */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: step === s ? 1.2 : 1,
                  background: step > s ? '#10B981' : step === s ? '#7C3AED' : 'rgba(255,255,255,0.1)',
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              >
                {step > s ? '✓' : s}
              </motion.div>
              {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-green-400' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* Step 1 — Name */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <h2 className="text-2xl font-magic text-white text-center mb-2" style={{ fontFamily: "'Fredoka One', cursive" }}>
                Who's the Wizard? 🧙
              </h2>
              <p className="text-purple-300 text-center text-sm mb-6">Enter your magical name!</p>
              <input
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNext()}
                placeholder="e.g. Merlin Jr. ✨"
                maxLength={20}
                className="w-full px-5 py-4 rounded-2xl text-white text-lg font-semibold text-center outline-none mb-4"
                style={{
                  background: 'rgba(124, 58, 237, 0.15)',
                  border: '2px solid rgba(124, 58, 237, 0.5)',
                  fontFamily: "'Nunito', sans-serif",
                }}
                autoFocus
              />
              <div className="flex justify-center gap-3 mb-6">
                {['🧙', '🧝', '🦸', '🧚', '🐲'].map(emoji => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl"
                    onClick={() => setPlayerName(prev => prev + emoji)}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Category */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <h2 className="text-2xl font-magic text-white text-center mb-1" style={{ fontFamily: "'Fredoka One', cursive" }}>
                Pick Your Spell! 🪄
              </h2>
              <p className="text-purple-300 text-center text-sm mb-5">What do you want to master today?</p>
              <div className="grid grid-cols-1 gap-3">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ x: 6, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
                    style={{
                      background: selectedCategory === cat.id ? `${cat.color}25` : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${selectedCategory === cat.id ? cat.color : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: selectedCategory === cat.id ? `0 0 20px ${cat.color}40` : 'none',
                    }}
                  >
                    <span className="text-3xl">{cat.emoji}</span>
                    <span className="text-white font-bold text-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {cat.label}
                    </span>
                    {selectedCategory === cat.id && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-xl"
                      >
                        ✅
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3 — Difficulty */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <h2 className="text-2xl font-magic text-white text-center mb-1" style={{ fontFamily: "'Fredoka One', cursive" }}>
                Choose Your Power! ⚡
              </h2>
              <p className="text-purple-300 text-center text-sm mb-6">How brave are you feeling?</p>
              <div className="flex flex-col gap-4">
                {difficulties.map((diff, i) => (
                  <motion.button
                    key={diff.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className="p-5 rounded-2xl text-left transition-all"
                    style={{
                      background: selectedDifficulty === diff.id ? `${diff.color}20` : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${selectedDifficulty === diff.id ? diff.color : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: selectedDifficulty === diff.id ? `0 0 25px ${diff.color}40` : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-xl" style={{ fontFamily: "'Fredoka One', cursive" }}>{diff.label}</span>
                      <span className="text-purple-300 text-sm font-semibold">{diff.desc}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep(s => s - 1)}
              className="flex-1 py-3 rounded-2xl font-bold text-purple-300 text-lg"
              style={{ background: 'rgba(124,58,237,0.1)', border: '2px solid rgba(124,58,237,0.3)' }}
            >
              ← Back
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleNext}
            disabled={
              (step === 1 && !playerName.trim()) ||
              (step === 2 && !selectedCategory) ||
              (step === 3 && !selectedDifficulty)
            }
            className="flex-2 py-4 rounded-2xl font-bold text-white text-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              fontFamily: "'Fredoka One', cursive",
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)',
            }}
          >
            {step === 3 ? '🪄 Cast the Spell!' : 'Next →'}
          </motion.button>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-purple-400/60 text-sm text-center"
      >
        🌟 Every question you answer makes your brain more powerful!
      </motion.p>
    </div>
  );
}