# 🧙 Magic Quiz — Spell Your Way to Smart!

A fun, interactive quiz app built for primary school kids with a magical fantasy theme.
Built with React + Vite + Framer Motion + Tailwind CSS.

![Magic Quiz](https://img.shields.io/badge/Magic-Quiz-7C3AED?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)

---

## ✨ Features

- 🎭 **Magic Fantasy Theme** — animated stars, glowing cards, shimmer effects
- 📚 **5 Quiz Categories** — Math, Science, English, General Knowledge, Mystery Mix
- ⚡ **3 Difficulty Levels** — Easy, Medium, Hard with different time limits
- ❤️ **Lives System** — 3 hearts, lose one for each wrong answer
- 🔥 **Streak & Combo** — bonus points for consecutive correct answers
- 🎉 **Confetti Explosion** — celebration animation on results screen
- 👤 **User Profiles** — name + avatar saved locally, auto-loaded on return
- 📜 **Quiz History** — full history with scores, accuracy and answer breakdown
- 💾 **Local Storage** — everything saved on device, no server needed
- 📱 **Responsive** — works on desktop and mobile

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/magic-quiz.git

# Go into the project
cd magic-quiz

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open your browser at `http://localhost:5173`

---

## 🗂️ Project Structure

├── src/
│   ├── components/
│   │   ├── FloatingStars.jsx   # Canvas animated background
│   │   ├── HomeScreen.jsx      # Landing + category selection
│   │   ├── QuestionCard.jsx    # Individual question with timer
│   │   ├── QuizScreen.jsx      # Main quiz gameplay
│   │   ├── ResultScreen.jsx    # Score + confetti screen
│   │   └── HistoryScreen.jsx   # Past quiz history
│   ├── data/
│   │   └── questions.js        # All quiz questions + shuffle logic
│   ├── utils/
│   │   └── storage.js          # localStorage helpers
│   ├── App.jsx                 # Root component + screen router
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles + animations
├── index.html
├── vite.config.js
└── tailwind.config.js

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI components |
| Vite 5 | Build tool + dev server |
| Framer Motion | Animations |
| Tailwind CSS 4 | Styling |
| Lucide React | Icons |
| localStorage | Data persistence |

---

## 🎮 How to Play

1. Enter your wizard name and pick an avatar
2. Choose a quiz category
3. Pick your difficulty level
4. Answer questions before the timer runs out
5. Build streaks for bonus points
6. Don't lose all 3 hearts!
7. See your results and full history

---

## 📜 Quiz Categories

| Category | Topics |
|---|---|
| 🧮 Math Magic | Multiplication, division, geometry, word problems |
| ⚗️ Science Spells | Plants, planets, animals, states of matter |
| ✨ Word Wizardry | Nouns, adjectives, punctuation, vocabulary |
| 🗺️ General Quest | Geography, nature, general knowledge |
| 🎭 Mystery Mix | Random mix of all categories |

---

## 🔮 Roadmap

- [ ] Sound effects for correct/wrong answers
- [ ] Online leaderboard
- [ ] More question packs
- [ ] Teacher mode — add custom questions
- [ ] Deploy to Vercel

---

## 👨‍💻 Built by

**Ayushi Yadav** — built from scratch with guidance from Claude AI 🤖

---

## 📄 License

MIT License — free to use and modify!
