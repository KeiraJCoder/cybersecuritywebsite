const sayings = [
    "A stitch in time saves nine",
    "Better late than never",
    "Every cloud has a silver lining",
    "Talk is cheap, show me the code",
    "It's not a bug, it's a feature",
    "There's no place like home",
    "Keep calm and carry on",
    "Think different",
    "Stay hungry, stay foolish",
    "Don't be evil",
    "Change is good",
    "The pen is mightier than the sword",
    "Actions speak louder than words",
    "A picture is worth a thousand words",
    "Birds of a feather flock together",
    "Beauty is in the eye of the beholder",
    "You can't judge a book by its cover",
    "When in Rome, do as the Romans do",
    "Time flies",
    "When the cat's away, the mice will play"
];

const randomSaying = sayings[Math.floor(Math.random() * sayings.length)];

function generateCipher() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    let shuffled;

    // Ensure no letter maps to itself
    do {
        shuffled = [...alphabet].sort(() => Math.random() - 0.5);
    } while (shuffled.some((char, index) => char === alphabet[index]));

    return Object.fromEntries(alphabet.map((char, index) => [char, shuffled[index]]));
}

function encode(message, cipher) {
    return message.toLowerCase().split('').map(char => cipher[char] || char).join('');
}

function autoCheck(index, originalChar) {
    const inputElements = document.querySelectorAll(`.decodeInput[data-char="${originalChar}"]`);
    const encodedCharElements = document.querySelectorAll(`.encodedChar[data-char="${originalChar}"]`);
    const guessedChar = document.querySelector(`.decodeInput[data-index="${index}"]`).value.toLowerCase();

    if (guessedChar === originalChar) {
        inputElements.forEach(el => {
            el.classList.add('success');
            el.disabled = true;
            el.value = originalChar;
        });

        encodedCharElements.forEach(el => {
            el.innerText = originalChar;
            el.classList.add('success');  // Add 'success' class to the correct letters
        });

        const nextInput = document.querySelector(`.decodeInput:not([disabled])`);
        nextInput && nextInput.focus();
    } else {
        inputElements.forEach(el => {
            el.classList.add('error');
            setTimeout(() => {
                el.classList.remove('error');
            }, 500);
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const encodedSayingElement = document.getElementById('encodedSaying');
    const encodedMessage = encode(randomSaying, generateCipher());

    let displayedChars = "";
    let underscoreChars = "";
    let inputFields = "";

    encodedMessage.split('').forEach((char, index) => {
        const originalChar = randomSaying.toLowerCase()[index];
        displayedChars += char;
        if (char === ' ') { // Handle spaces
            underscoreChars += '<span class="word-space"></span>'; 
            inputFields += '<span class="word-space"></span>';
        
        } else if (/[a-z]/i.test(char)) {
            underscoreChars += `<span class="encodedChar" data-index="${index}" data-char="${originalChar}">_</span>`;
            inputFields += `<input type="text" maxlength="1" class="decodeInput" data-index="${index}" data-char="${originalChar}" oninput="autoCheck(${index}, '${originalChar}')">`;
        } else {
            underscoreChars += char;
            inputFields += ' ';
        }
    });

    encodedSayingElement.innerHTML = `<span class="displayedChar">${displayedChars}</span><br>`;
    encodedSayingElement.innerHTML += underscoreChars + '<br>';
    encodedSayingElement.innerHTML += inputFields;

    window.giveHint = function() {
        const availableHints = Array.from(document.querySelectorAll('.decodeInput:not([disabled])'));
        if (!availableHints.length) {
            alert('You have deciphered all the letters!');
            return;
        }
        const randomHintElement = availableHints[Math.floor(Math.random() * availableHints.length)];
        const originalChar = randomHintElement.getAttribute('data-char');
        randomHintElement.value = originalChar;
        autoCheck(parseInt(randomHintElement.getAttribute('data-index')), originalChar);
    }
});
