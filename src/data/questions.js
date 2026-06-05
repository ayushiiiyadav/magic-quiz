export const categories = [
  { id: 'math', label: '🔢 Math Magic', color: '#F59E0B', emoji: '🧮' },
  { id: 'science', label: '🔬 Science Spells', color: '#06B6D4', emoji: '⚗️' },
  { id: 'english', label: '📖 Word Wizardry', color: '#EC4899', emoji: '✨' },
  { id: 'general', label: '🌍 General Quest', color: '#10B981', emoji: '🗺️' },
  { id: 'mixed', label: '🎲 Mystery Mix', color: '#7C3AED', emoji: '🎭' },
];

export const questions = {
  math: [
    { id: 1, q: "What is 7 × 8?", options: ["54", "56", "58", "64"], answer: 1, emoji: "🔢", fun: "That's as many legs as 7 spiders! 🕷️" },
    { id: 2, q: "If you have 25 candies and give 9 to your friend, how many do you have?", options: ["14", "15", "16", "17"], answer: 2, emoji: "🍬", fun: "You're a generous wizard!" },
    { id: 3, q: "What is half of 48?", options: ["20", "22", "24", "26"], answer: 2, emoji: "✂️", fun: "You just split a magic potion in half!" },
    { id: 4, q: "Which number is the biggest?", options: ["312", "321", "231", "213"], answer: 1, emoji: "🏆", fun: "You have the eye of a dragon!" },
    { id: 5, q: "What is 100 ÷ 4?", options: ["20", "25", "30", "40"], answer: 1, emoji: "🧙", fun: "Perfectly divided like a magic spell!" },
    { id: 6, q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1, emoji: "⬡", fun: "Bees know this shape very well! 🐝" },
    { id: 7, q: "What is 15 + 27?", options: ["40", "41", "42", "43"], answer: 2, emoji: "➕", fun: "Adding powers to your spell!" },
    { id: 8, q: "If a wizard has 5 hats with 3 stars each, how many stars total?", options: ["8", "12", "15", "20"], answer: 2, emoji: "⭐", fun: "That's a LOT of sparkle!" },
  ],
  science: [
    { id: 1, q: "What do plants need to make their food?", options: ["Moonlight", "Sunlight", "Starlight", "Torchlight"], answer: 1, emoji: "🌱", fun: "Plants are solar-powered wizards!" },
    { id: 2, q: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: 2, emoji: "☀️", fun: "It's super hot there — no ice cream survives! 🍦" },
    { id: 3, q: "What gas do we breathe to stay alive?", options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"], answer: 2, emoji: "💨", fun: "Without it, even dragons can't breathe fire!" },
    { id: 4, q: "How many bones are in the human body?", options: ["106", "206", "306", "406"], answer: 1, emoji: "🦴", fun: "You're a walking, talking skeleton castle!" },
    { id: 5, q: "What is the fastest animal on land?", options: ["Lion", "Horse", "Cheetah", "Leopard"], answer: 2, emoji: "🐆", fun: "Even the Flash would be impressed! ⚡" },
    { id: 6, q: "What state of matter is ice?", options: ["Gas", "Liquid", "Solid", "Plasma"], answer: 2, emoji: "🧊", fun: "Frozen water is perfect for spells!" },
    { id: 7, q: "How many colors are in a rainbow?", options: ["5", "6", "7", "8"], answer: 2, emoji: "🌈", fun: "ROYGBIV — remember the magic code!" },
    { id: 8, q: "What is the largest planet in our solar system?", options: ["Saturn", "Jupiter", "Uranus", "Neptune"], answer: 1, emoji: "🪐", fun: "It has a storm bigger than Earth! 🌀" },
  ],
  english: [
    { id: 1, q: "Which word is a NOUN?", options: ["Run", "Happy", "Castle", "Quickly"], answer: 2, emoji: "📚", fun: "Nouns are the THINGS in the magical world!" },
    { id: 2, q: "What is the plural of 'mouse'?", options: ["Mouses", "Mice", "Moose", "Mices"], answer: 1, emoji: "🐭", fun: "Sneaky little mice in the wizard's lab!" },
    { id: 3, q: "Which sentence has correct punctuation?", options: ["where are you", "Where are you.", "Where are you?", "where are you?"], answer: 2, emoji: "❓", fun: "Always ask questions properly!" },
    { id: 4, q: "What is the opposite of 'ancient'?", options: ["Old", "Modern", "Dusty", "Historic"], answer: 1, emoji: "⏰", fun: "Even spells can be modern!" },
    { id: 5, q: "Which word rhymes with 'magic'?", options: ["Tragic", "Table", "Marble", "Making"], answer: 0, emoji: "🎵", fun: "Tragic magic — a sad wizard's poem!" },
    { id: 6, q: "How many vowels are in the alphabet?", options: ["4", "5", "6", "7"], answer: 1, emoji: "🔤", fun: "A, E, I, O, U — the 5 power vowels!" },
    { id: 7, q: "What does the prefix 'un-' mean?", options: ["Again", "Before", "Not", "After"], answer: 2, emoji: "🪄", fun: "Unbelievable! You knew that!" },
    { id: 8, q: "Which word is an ADJECTIVE?", options: ["Jump", "Sparkly", "Quickly", "Wizard"], answer: 1, emoji: "✨", fun: "Adjectives make everything more sparkly!" },
  ],
  general: [
    { id: 1, q: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Rome"], answer: 2, emoji: "🗼", fun: "Ooh la la! The Eiffel Tower says hi!" },
    { id: 2, q: "How many days are in a week?", options: ["5", "6", "7", "8"], answer: 2, emoji: "📅", fun: "7 days, 7 chances for adventures!" },
    { id: 3, q: "What do caterpillars turn into?", options: ["Moths", "Butterflies", "Both!", "Bees"], answer: 2, emoji: "🦋", fun: "The ultimate magical transformation!" },
    { id: 4, q: "What is the color of the sky on a clear day?", options: ["Green", "Pink", "Blue", "Purple"], answer: 2, emoji: "☁️", fun: "Look up! It's your wizard ceiling!" },
    { id: 5, q: "How many continents are on Earth?", options: ["5", "6", "7", "8"], answer: 2, emoji: "🌍", fun: "7 lands to explore on your quest!" },
    { id: 6, q: "What animal is known as the 'King of the Jungle'?", options: ["Tiger", "Elephant", "Lion", "Bear"], answer: 2, emoji: "🦁", fun: "ROAR! Even kings respect the wizard!" },
    { id: 7, q: "How many fingers do humans have in total?", options: ["8", "9", "10", "12"], answer: 2, emoji: "👐", fun: "Perfect for casting spells with!" },
    { id: 8, q: "What do bees make?", options: ["Jam", "Honey", "Butter", "Syrup"], answer: 1, emoji: "🍯", fun: "Sweet magic from tiny winged wizards!" },
  ],
};

export function getMixedQuestions(count = 8) {
  const all = Object.values(questions).flat();
  return shuffleArray(all).slice(0, count);
}

export function getQuestions(category, count = 8) {
  if (category === 'mixed') return getMixedQuestions(count);
  const pool = questions[category] || [];
  return shuffleArray([...pool]).slice(0, count);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}