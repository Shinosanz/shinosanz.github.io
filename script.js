// Preloader

var loader;

setTimeout(() => { console.log("World!"); }, 5000);
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
    document.getElementById('homepage').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    
    loader = document.getElementById('loader');
    loadNow(1);
    
});

// Convert to Thai
function convertToThai(input) {
    const englishToThaiMapping = {
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
  
    let output = '';
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      output += englishToThaiMapping[char] || char;
    }
  
    return output;
  }
  
  function translateAndDisplay() {
    const inputElement = document.getElementById('changelang');
    const translatedElement = document.getElementById('translatedText');
  
    // Get the user input from the input element
    const inputText = inputElement.value;
  
    // Translate the input using the convertToThai() function
    const translatedText = convertToThai(inputText);
  
    // Display the translated text in the HTML
    translatedElement.textContent = translatedText;
  }