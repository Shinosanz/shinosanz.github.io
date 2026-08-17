// Convert to Thai
const englishToThaiMapping = {
  '1': 'ๅ', '!': '+', '2': '/', '@': '๑', '3': '-', '#': '๒', '4': 'ภ', '$': '๓', '5': 'ถ', '%': '๔',
  '6': 'ุ', '^': 'ู', '7': 'ึ', '&': '฿', '8': 'ค', '*': '๕', '9': 'ต', '(': '๖', '0': 'จ', ')': '๗',
  '-': 'ข', '_': '๘', '=': 'ช', '+': '๙', 'q': 'ๆ', 'Q': '๐', 'w': 'ไ', 'W': '"', 'e': 'ำ', 'E': 'ฎ',
  'r': 'พ', 'R': 'ฑ', 't': 'ะ', 'T': 'ธ', 'y': 'ั', 'Y': 'ํ', 'u': 'ี', 'U': '๊', 'i': 'ร', 'I': 'ณ',
  'o': 'น', 'O': 'ฯ', 'p': 'ย', 'P': 'ญ', '[': 'บ', ']': 'ล', 'a': 'ฟ', 'A': 'ฤ', 's': 'ห', 'S': 'ฆ',
  'd': 'ก', 'D': 'ฏ', 'f': 'ด', 'F': 'โ', 'g': 'เ', 'G': 'ฌ', 'h': '้', 'H': '็', 'j': '่', 'J': '๋',
  'k': 'า', 'K': 'ษ', 'l': 'ส', 'L': 'ศ', ';': 'ว', ':': 'ซ', '\'': 'ง', '"': '.', 'z': 'ผ', 'Z': 'ฉ',
  'x': 'ป', 'X': 'ฮ', 'c': 'แ', 'C': 'ฺ', 'v': 'อ', 'V': '์', 'b': 'ิ', 'B': 'ฒ', 'n': 'ื', 'N': 'ฬ',
  'm': 'ท', 'M': 'ฦ', ',': 'ม', '<': 'ฒ', '.': 'ใ', '>': 'ฬ', '/': 'ฝ', '?': 'ฦ'
};

function convertToThai(input) {
  let output = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    output += englishToThaiMapping[char] || char;
  }
  const copyBtn = document.getElementById('copy-button');
  if (copyBtn) copyBtn.style.visibility = 'visible';
  return output;
}

function translateAndDisplay() {
  const inputElement = document.getElementById('changelang');
  const translatedElement = document.getElementById('translatedText');
  const translatedText = convertToThai(inputElement.value);
  translatedElement.textContent = translatedText;
}

function copyFunc() {
  const copyText = document.getElementById('translatedText').innerHTML;
  navigator.clipboard.writeText(copyText);
}

// QR code
function generatorQR() {
  const qrText = document.getElementById('qrText');
  const qrImage = document.getElementById('qrImage');
  if (qrText.value.length > 0) {
    qrImage.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(qrText.value);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const qrText = document.getElementById('qrText');
  if (qrText) {
    qrText.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') generatorQR();
    });
  }
  const changelang = document.getElementById('changelang');
  if (changelang) {
    changelang.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); translateAndDisplay(); }
    });
  }
});
