document.addEventListener("DOMContentLoaded", function () {
    const redFlagPlaceholders = document.querySelectorAll(".red-flag-placeholder");
    const requiredRedFlagsCount = 5; // Number of red flags students need to identify
    let identifiedRedFlags = 0; // Initialize the count

    // Event listener for clicking on red flag placeholders
    redFlagPlaceholders.forEach((placeholder) => {
        placeholder.addEventListener("click", function () {
            // Display an alert message with an explanation for this red flag
            alert(getRedFlagExplanation(placeholder.getAttribute('data-redflag').trim()));

            // Add the identified class to change the color
            placeholder.classList.add('red-flag-identified');

            identifiedRedFlags++; // Increment the count
            checkRedFlagCount(); // Check if the required count is reached
        }, true);  // Using the capture phase.
    });

    // Function to get explanations for red flags
    function getRedFlagExplanation(redFlagText) {
        // Define explanations for each red flag text
        const redFlagExplanations = {
            "Unknown Sender": "Receiving an email from an unknown sender can be a phishing indicator. Be cautious of emails from unfamiliar sources.",
            "Unusual Greeting": "Phishing emails may use unusual greetings to appear more legitimate. Be wary of emails with unfamiliar greetings.",
            "Urgent Request": "Phishing emails often use urgency to pressure recipients into taking action. Be cautious of emails that demand immediate attention.",
            "Large Sum of Money": "Phishing emails that promise large sums of money are common scams. Be cautious of emails that offer significant financial rewards.",
            "Emotional Manipulation": "Phishing emails may use emotional manipulation to persuade recipients. Be cautious of emails that play on emotions.",
            "Religious Appeal": "Phishing emails may use religious appeals to appear more legitimate. Be wary of emails with unusual religious references.",
            "Insistence on Immediate Response": "Phishing emails may insist on an immediate response. Be cautious of emails that pressure you to act quickly.",
            // Add explanations for other red flag placeholders here
        };

        return redFlagExplanations[redFlagText] || "This is a potential phishing indicator.";
    }

    // Function to check if the required red flag count is reached
    function checkRedFlagCount() {
        if (identifiedRedFlags >= requiredRedFlagsCount) {
            alert(`Congratulations! You've identified ${requiredRedFlagsCount} red flags. Challenge completed.`);
        }
    }
});
