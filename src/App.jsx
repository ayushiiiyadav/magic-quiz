import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingStars from './components/FloatingStars';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import HistoryScreen from './components/HistoryScreen';
import { saveResult, loadProfile, saveProfile, loadHistory } from './utils/storage';
import './index.css';

function MagicOrbs() {
  return (
    <>
      <div className="orb" style={{ width: 400, height: 400, background: 'rgba(124,58,237,0.12)', top: '-100px', left: '-100px' }} />
      <div className="orb" style={{ width: 350, height: 350, background: 'rgba(236,72,153,0.08)', bottom: '-80px', right: '-80px' }} />
      <div className="orb" style={{ width: 250, height: 250, background: 'rgba(6,182,212,0.07)', top: '40%', right: '10%' }} />
    </>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [quizConfig, setQuizConfig] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [profile, setProfile] = useState(() => loadProfile());
  const [history, setHistory] = useState(() => loadHistory());
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('magic-quiz-hs') || '0'); }
    catch { return 0; }
  });

  const handleSaveProfile = (newProfile) => {
    saveProfile(newProfile);
    setProfile(newProfile);
  };

  const handleStart = (config) => {
    setQuizConfig(config);
    setScreen('quiz');
  };

  const handleFinish = (result) => {
    // Save to history
    saveResult({
      ...result,
      category: quizConfig.category,
      difficulty: quizConfig.difficulty,
    });
    setHistory(loadHistory());
    setQuizResult(result);
    setScreen('result');

    if (result.score > highScore) {
      setHighScore(result.score);
      try { localStorage.setItem('magic-quiz-hs', result.score); } catch {}
    }
  };

  const handleHome = () => {
    setScreen('home');
    setQuizConfig(null);
    setQuizResult(null);
  };

  const handlePlayAgain = () => {
    setScreen('quiz');
    setQuizResult(null);
  };

  return (
    <div className="min-h-screen relative" style={{ background: '#0F0D2B' }}>
      <MagicOrbs />
      <FloatingStars />

      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeScreen
              onStart={handleStart}
              highScore={highScore}
              profile={profile}
              onSaveProfile={handleSaveProfile}
              onShowHistory={() => setScreen('history')}
            />
          </motion.div>
        )}

        {screen === 'quiz' && quizConfig && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuizScreen config={quizConfig} onFinish={handleFinish} onQuit={handleHome} />
          </motion.div>
        )}

        {screen === 'result' && quizResult && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultScreen
              result={quizResult}
              onPlayAgain={handlePlayAgain}
              onHome={handleHome}
              onShowHistory={() => setScreen('history')}
            />
          </motion.div>
        )}

        {screen === 'history' && (
          <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HistoryScreen
              history={history}
              onBack={handleHome}
              onClear={() => {
                clearHistory();
                setHistory([]);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}