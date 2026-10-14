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

// Thai letters outnumber Latin letters -> text was typed in Thai layout
function detectDirection(text) {
  const thai = (text.match(/[฀-๿]/g) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  return thai > latin ? 'th2en' : 'en2th';
}

function convertText(input, dir) {
  const map = dir === 'th2en' ? TH_TO_EN : EN_TO_TH;
  return Array.from(input, (c) => map[c] || c).join('');
}

// A real Thai word can't: start with a vowel/tone mark, end with a leading vowel,
// put a mark right after a leading vowel / ะาำ, or stack vowels / tone marks
// ponytail: heuristic, no dictionary - see the letters-only rule in convertMixed for its ceiling
const looksBroken = (w) =>
  /^[ะัาำิีึืฺุู็่้๊๋์ํๅๆฯ]|[เแโใไ]$|[เแโใไ][^ก-ฮเแ]|[ะาำๅ][ัิีึืฺุู็่้๊๋์ํ]|[ัิีึืฺุู็่้๊๋์ํ][ัิีึืฺุู]|[่้๊๋][่้๊๋็์ํ]/.test(w);

// Mixed = Thai next to Latin letters, or Thai words that are a mix of broken and fine
function isMixed(text) {
  const thaiWords = text.split(/\s+/).filter((w) => /[฀-๿]/.test(w));
  if (!thaiWords.length) return false;
  return /[A-Za-z]/.test(text) || (thaiWords.some(looksBroken) && !thaiWords.every(looksBroken));
}

// Mixed text: decide per word instead of for the whole line
function convertMixed(text) {
  const hasLatin = /[A-Za-z]/.test(text);
  return text.split(/(\s+)/).map((w) => {
    if (/[฀-๿]/.test(w)) {
      const en = convertText(w, 'th2en');
      // No real English in the line: English typed in the Thai layout has some words that look
      // like valid Thai by luck. Real Thai almost always reads back with digits/punctuation
      // (สวัสดี -> l;ylfu), so a letters-only reading is treated as mistyped English too.
      // ponytail: Thai words made only of letter keys (ที่, ไป) get flipped in such lines
      return looksBroken(w) || (!hasLatin && /^[a-z]+$/i.test(en)) ? en : w;
    }
    if (!/[A-Za-z]/.test(w)) return w; // numbers/punctuation stay as typed
    const th = convertText(w, 'en2th');
    return looksBroken(th) ? w : th;
  }).join('');
}

function translateAndDisplay() {
  const text = document.getElementById('changelang').value;
  const mixed = isMixed(text);
  const dir = detectDirection(text);
  const out = mixed ? convertMixed(text) : convertText(text, dir);
  document.getElementById('translatedText').textContent = out;
  document.getElementById('copy-button').style.visibility = out ? 'visible' : 'hidden';
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
