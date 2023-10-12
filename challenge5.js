let is2FAEnabled = false;
let isSoftwareUpdated = false;
let isFirewallActive = false;
let isVPNActive = false;
let isPasswordChanged = false;
let timeLeft = 5 * 60; // 5 minutes in seconds
let timerInterval;

const securityIssues = [
    {
        message: "Malware detected!",
        actionRequired: ["updateSoftware", "toggleVPN", "changePassword"],
        warning: "A potential malware threat has been detected! Check the company policies for the steps to resolve this issue."
    },
    {
        message: "Suspicious login attempt detected!",
        actionRequired: ["toggle2FA", "toggleVPN", "changePassword"],
        warning: "Suspicious login attempts detected! Refer to the company policies for resolution steps."
    },
    {
        message: "Data breach detected! User credentials at risk:",
        actionRequired: ["toggleFirewall", "toggleVPN", "changePassword"],
        warning: "A potential data breach detected! Check the company policy for guidance."
    },
    {
        message: "DDoS attack initiated!",
        actionRequired: ["toggleFirewall", "changePassword"],
        warning: "DDoS attack detected! What does the company policy suggest?"
    },
    {
        message: "Security certificate expired!",
        actionRequired: ["updateSoftware", "toggleVPN", "changePassword"],
        warning: "The security certificate has expired! Ensure you follow the company policy to resolve this."
    }
];

// Add an event listener to the "Change Password" button
document.getElementById('changePasswordButton').addEventListener('click', function () {
    // Perform password strength check
    const password = prompt('Enter your new password:');
    checkPasswordStrength(password);
});

function checkPasswordStrength(password) {
    const feedback = document.getElementById('passwordFeedback');
    const hasCapital = /[A-Z]/.test(password);
    const hasThreeNumbers = (password.match(/\d/g) || []).length >= 3;
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (password.length > 8 && hasCapital && hasThreeNumbers && hasSpecialCharacter) {
        feedback.classList.add('valid');
        feedback.classList.remove('alert');
        feedback.innerText = "Password is strong!";
        // Password is considered changed when it meets the strength criteria
        isPasswordChanged = true;

        // Enable the "Change Password" button
        document.getElementById('changePasswordButton').disabled = false;
    } else {
        feedback.classList.add('alert');
        feedback.classList.remove('valid');
        feedback.innerText = "Must be over 8 characters, contain 1 capital letter, at least 3 numbers, and a special character.";

        // Disable the "Change Password" button if the password is not strong
        document.getElementById('changePasswordButton').disabled = true;
    }
}


function toggle2FA() {
    is2FAEnabled = !is2FAEnabled;
    alert(is2FAEnabled ? 'Two-Factor Authentication Enabled!' : 'Two-Factor Authentication Disabled!');
}

function updateSoftware() {
    isSoftwareUpdated = true;
    alert('Software Updated Successfully!');
}

function toggleFirewall() {
    isFirewallActive = !isFirewallActive;
    alert(isFirewallActive ? 'Firewall Activated!' : 'Firewall Deactivated!');
}

function toggleVPN() {
    isVPNActive = !isVPNActive;
    alert(isVPNActive ? 'VPN Activated!' : 'VPN Deactivated!');
}

function simulateAttack() {
    const feedback = document.getElementById('simulationFeedback');
    const randomIssue = securityIssues[Math.floor(Math.random() * securityIssues.length)];

    if (randomIssue) {
        const requiredActions = randomIssue.actionRequired;
        const missingActions = [];

        for (const action of requiredActions) {
            // Check if the action is relevant to the current policy
            switch (action) {
                case "updateSoftware":
                    if (!isSoftwareUpdated) {
                        missingActions.push('Update Software');
                    }
                    break;
                case "toggleVPN":
                    if (!isVPNActive) {
                        missingActions.push('Activate VPN');
                    }
                    break;
                case "toggle2FA":
                    if (!is2FAEnabled) {
                        missingActions.push('Enable Two-Factor Authentication (2FA)');
                    }
                    break;
                case "toggleFirewall":
                    if (!isFirewallActive) {
                        missingActions.push('Activate Firewall');
                    }
                    break;
                case "changePassword":
                    if (!isPasswordChanged) {
                        missingActions.push('Change Password');
                    }
                    break;
                default:
                    break;
            }
        }

        if (missingActions.length === 0) {
            feedback.classList.toggle('valid', true);
            feedback.innerText = "Your system is secure! Good job!";
        } else {
            feedback.classList.toggle('valid', false);
            feedback.innerText = `Your system is vulnerable! Take action: ${missingActions.join(', ')}`;
            penalizeUser(); // Call the penalizeUser function after the attack simulation
        }
    }
}


function penalizeUser() {
    timeLeft -= 120; // Deduct 2 minutes
}

function openRandomSecurityAlert() {
    const randomIssue = securityIssues[Math.floor(Math.random() * securityIssues.length)];
    
    // Display a popup message with the issue details
    alert(`${randomIssue.message}\n\n${randomIssue.warning}`);
}

function startTimer() {
    const timerElem = document.getElementById('timer');
    timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElem.innerText = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }
    }, 1000);
}

document.getElementById('simulateAttack').addEventListener('click', simulateAttack);

document.addEventListener("DOMContentLoaded", function () {
    openRandomSecurityAlert(); // Call this function to display a random security alert when the page loads
    startTimer();

    // Add the event listener for the "Change Password" button
    document.getElementById('changePasswordButton').addEventListener('click', function () {
        changePassword();
    });
});
