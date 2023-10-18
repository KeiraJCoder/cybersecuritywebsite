document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("passwordInput");
    const checkPasswordButton = document.getElementById("checkPasswordButton");
    const passwordMessage = document.getElementById("passwordMessage");
    const passwordHints = document.getElementById("passwordHints");

    const randomPasswordHints = {
        "123456": [
            "This password is very weak.",
            "It's a sequence of numbers.",
            "It's the first 6 numbers on a keyboard."
        ],
        "password": [
            "This is probably the weakest word-based password.",
            "It's often a default password for many accounts.",
            "It literally is 'password'."
        ],
        "12345678": [
            "This is a very common number-based password.",
            "It's a sequence of numbers.",
            "It's the first 8 numbers in sequence."
        ],
        "12345": [
            "This is one of the simplest sequences of numbers.",
            "It's a consecutive sequence.",
            "It's the first 5 numbers in sequence."
        ],
        "qwerty": [
            "This password is related to the keyboard layout.",
            "It's a sequence found on the top row of a keyboard.",
            "It's the first 6 characters on the top row."
        ],
        "abc123": [
            "This password combines basic letters and numbers.",
            "It's the first three letters followed by numbers.",
            "It starts with 'abc' and ends with '123'."
        ],
        "111111": [
            "This password is extremely basic.",
            "All the numbers are the same.",
            "It's just six ones in a row."
        ],
        "admin": [
            "This password is a role that has top-level access.",
            "Often default for many accounts.",
            "It's a 5-letter word for someone in charge."
        ],
        "letmein": [
            "This password is a request.",
            "It's like asking someone to allow you inside.",
            "It says 'let me in'."
        ],
        "welcome": [
            "This password is a friendly greeting.",
            "You might see it at the entrance of a place.",
            "It's almost the opposite of 'goodbye'."
        ],
        "sunshine": [
            "This password is bright and warm.",
            "It's what you hope for on a beach day.",
            "It's a big, bright star in the sky."
        ],
        "football": [
            "This password is related to a popular sport.",
            "It's played with 11 players on each side.",
            "A game played with a round ball mostly with feet."
        ],
        "password1": [
            "This is a variant of a very common password.",
            "It's a simple word followed by a number.",
            "It's 'password' with a '1' at the end."
        ],
        "123123": [
            "This password has a repeated pattern.",
            "It's a short sequence of numbers, then repeated.",
            "The sequence '123' is used twice."
        ],
        "1234": [
            "This is one of the simplest numeric passwords.",
            "It's a very short sequence.",
            "First 4 numbers in sequence."
        ],
        "superman": [
            "This password is associated with a hero.",
            "It's a character known to fly.",
            "A man who wears a cape and the letter 'S'."
        ],
        "iloveyou": [
            "This password expresses a deep emotion.",
            "It's three words combined into one.",
            "A way to tell someone you have feelings for them."
        ]
    };
    

    // Get the shuffled passwords from passwords.js
    const shuffledPasswords = passwords.slice(); // Copy the shuffled passwords array

    // Pick a random password from the shuffled list
    const randomIndex = Math.floor(Math.random() * shuffledPasswords.length);
    const randomPassword = shuffledPasswords.splice(randomIndex, 1)[0];

    // Display a hint for the current password
    let hintLevel = 0; // Start with the most general hint
    const passwordHint = document.createElement("p");
    passwordHint.textContent = "Hint: " + randomPasswordHints[randomPassword][hintLevel]; // Show the most general hint initially
    passwordHints.appendChild(passwordHint);

    checkPasswordButton.addEventListener("click", function () {
        const userGuess = passwordInput.value;

        if (userGuess === randomPassword) {
            passwordMessage.textContent = "Password cracked! Access granted.";
            passwordMessage.style.color = "green"; // <-- Add this line
            passwordHints.textContent = ""; // Clear the hint section
        } else {
            passwordMessage.textContent = "Incorrect password. Try again.";
            passwordMessage.style.color = "red"; // <-- You can set it back to red if it's incorrect

            // Increase the hint level for more specific hints
            hintLevel++;
            if (hintLevel < randomPasswordHints[randomPassword].length) {
                passwordHint.textContent = "Hint: " + randomPasswordHints[randomPassword][hintLevel];
            }
        }
    });
});
