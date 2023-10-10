document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("passwordInput");
    const checkPasswordButton = document.getElementById("checkPasswordButton");
    const passwordMessage = document.getElementById("passwordMessage");
    const passwordHints = document.getElementById("passwordHints");

    // Object to store hints for specific passwords
    const randomPasswordHints = {
        "123456": [
            "This password is very weak.",
            "It consists of only consecutive numbers.",
            "It's one of the most commonly used passwords."
        ],
        "password": [
            "This password is extremely weak.",
            "It's a single word commonly used as a password.",
            "It's the same as the word itself."
        ],
        "12345678": [
            "This password is weak.",
            "It consists of consecutive numbers.",
            "It's slightly longer than '123456'."
        ],
        "12345": [
            "This password is weak.",
            "It consists of consecutive numbers.",
            "It's one of the weakest passwords."
        ],
        "qwerty": [
            "This password is weak.",
            "It's a simple keyboard pattern.",
            "It's commonly used as a password."
        ],
        "abc123": [
            "This password is weak.",
            "It's a combination of letters and numbers.",
            "It's predictable and easy to guess."
        ],
        "111111": [
            "This password is weak.",
            "It consists of repeating numbers.",
            "It's a very simple password."
        ],
        "admin": [
            "This password is weak.",
            "It's a common username used as a password.",
            "It's easily guessable."
        ],
        "letmein": [
            "This password is weak.",
            "It's a phrase commonly used as a password.",
            "It suggests granting access."
        ],
        "welcome": [
            "This password is weak.",
            "It's a friendly greeting used as a password.",
            "It's commonly used and easily guessable."
        ],
        "sunshine": [
            "This password is weak.",
            "It's a positive word used as a password.",
            "It's not very secure."
        ],
        "football": [
            "This password is weak.",
            "It's a sports-related word used as a password.",
            "It's commonly used and easy to guess."
        ],
        "password1": [
            "This password is weak.",
            "It's a common password with a number appended.",
            "It's only slightly stronger than 'password'."
        ],
        "123123": [
            "This password is weak.",
            "It consists of consecutive numbers repeated.",
            "It's not secure."
        ],
        "1234": [
            "This password is weak.",
            "It's a very short sequence of numbers.",
            "It's easy to guess."
        ],
        "superman": [
            "This password is weak.",
            "It's a common word related to a superhero.",
            "It's not secure."
        ],
        "iloveyou": [
            "This password is weak.",
            "It's a phrase expressing love.",
            "It's easily guessable."
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
            passwordHints.textContent = ""; // Clear the hint section
        } else {
            passwordMessage.textContent = "Incorrect password. Try again.";

            // Increase the hint level for more specific hints
            hintLevel++;
            if (hintLevel < randomPasswordHints[randomPassword].length) {
                passwordHint.textContent = "Hint: " + randomPasswordHints[randomPassword][hintLevel];
            }
        }
    });
});
