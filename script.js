// Preloader

var loader;

function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 0.05);
        }, 50);
    }
}

function displayContent() {
    loader.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {

    loader = document.getElementById('loader');
    if (loader) loadNow(1);

});

// Convert between English-layout typing and Thai (Kedmanee) layout
const EN_TO_TH = {
  '1': 'ๅ', '!': '+',
  '2': '/', '@': '๑',
  '3': '-', '#': '๒',
  '4': 'ภ', '$': '๓',
  '5': 'ถ', '%': '๔',
  '6': 'ุ', '^': 'ู',
  '7': 'ึ', '&': '฿',
  '8': 'ค', '*': '๕',
  '9': 'ต', '(': '๖',
  '0': 'จ', ')': '๗',
  '-': 'ข', '_': '๘',
  '=': 'ช', '+': '๙',
  'q': 'ๆ', 'Q': '๐',
  'w': 'ไ', 'W': '"',
  'e': 'ำ', 'E': 'ฎ',
  'r': 'พ', 'R': 'ฑ',
  't': 'ะ', 'T': 'ธ',
  'y': 'ั', 'Y': 'ํ',
  'u': 'ี', 'U': '๊',
  'i': 'ร', 'I': 'ณ',
  'o': 'น', 'O': 'ฯ',
  'p': 'ย', 'P': 'ญ',
  '[': 'บ', ']': 'ล',
  'a': 'ฟ', 'A': 'ฤ',
  's': 'ห', 'S': 'ฆ',
  'd': 'ก', 'D': 'ฏ',
  'f': 'ด', 'F': 'โ',
  'g': 'เ', 'G': 'ฌ',
  'h': '้', 'H': '็',
  'j': '่', 'J': '๋',
  'k': 'า', 'K': 'ษ',
  'l': 'ส', 'L': 'ศ',
  ';': 'ว', ':': 'ซ',
  '\'': 'ง','"':".",
  'z': 'ผ', 'Z': 'ฉ',
  'x': 'ป', 'X': 'ฮ',
  'c': 'แ', 'C': 'ฺ',
  'v': 'อ', 'V': '์',
  'b': 'ิ', 'B': 'ฒ',
  'n': 'ื', 'N': 'ฬ',
  'm': 'ท', 'M': 'ฦ',
  ',': 'ม', '<': 'ฒ',
  '.': 'ใ', '>': 'ฬ',
  '/': 'ฝ', '?': 'ฦ'
};

// Reverse map: only Thai (non-ASCII) keys, so typed digits/punctuation pass through untouched
const TH_TO_EN = Object.fromEntries(
  Object.entries(EN_TO_TH)
    .filter(([, th]) => th.charCodeAt(0) > 127)
    .map(([en, th]) => [th, en])
);

let direction = 'en2th';

function convertText(input, dir) {
  const map = dir === 'th2en' ? TH_TO_EN : EN_TO_TH;
  return Array.from(input, (c) => map[c] || c).join('');
}

function translateAndDisplay() {
  const out = convertText(document.getElementById('changelang').value, direction);
  document.getElementById('translatedText').textContent = out;
  document.getElementById('copy-button').style.visibility = out ? 'visible' : 'hidden';
}

function toggleDirection() {
  direction = direction === 'en2th' ? 'th2en' : 'en2th';
  document.getElementById('swap-button').textContent =
    direction === 'en2th' ? 'EN → TH' : 'TH → EN';
  translateAndDisplay();
}

// CopyText
function copyFunc() {
  const btn = document.getElementById('copy-button');
  navigator.clipboard
    .writeText(document.getElementById('translatedText').textContent)
    .then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = 'Copy'), 1500);
    });
}

// Live conversion while typing (only on the converter page)
const langInput = document.getElementById('changelang');
if (langInput) langInput.addEventListener('input', translateAndDisplay);
