let is2FAEnabled = false;
let isSoftwareUpdated = false;
let isFirewallActive = false;
let isVPNActive = false;
let timeLeft = 15 * 60; // 15 minutes in seconds
let timerInterval;

let randomSecurityIssues = [
    {
        message: "Malware detected!",
        actionRequired: ["updateSoftware"],
        warning: "A potential malware threat has been detected! Check the company policies for the steps to resolve this issue."
    },
    {
        message: "Suspicious login attempt detected!",
        actionRequired: ["toggle2FA", "toggleVPN"],
        warning: "Suspicious login attempts detected! Refer to the company policies for resolution steps."
    },
    {
        message: "Data breach detected! User credentials at risk!",
        actionRequired: ["toggleFirewall", "toggleVPN"],
        warning: "A potential data breach detected! Check the company policy for guidance."
    },
    {
        message: "DDoS attack initiated!",
        actionRequired: ["toggleFirewall"],
        warning: "DDoS attack detected! What does the company policy suggest?"
    },
    {
        message: "Security certificate expired!",
        actionRequired: ["updateSoftware", "toggleVPN"],
        warning: "The security certificate has expired! Ensure you follow the company policy to resolve this."
    }
];

function checkPasswordStrength(password) {
    const feedback = document.getElementById('passwordFeedback');

    if (password.length > 8 && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        feedback.classList.add('valid');
        feedback.classList.remove('alert');
        feedback.innerText = "Password is strong!";
    } else {
        feedback.classList.add('alert');
        feedback.classList.remove('valid');
        feedback.innerText = "Must be over 8 characters, contain numbers, and special characters.";
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

    if (is2FAEnabled && isSoftwareUpdated && isFirewallActive && isVPNActive) {
        feedback.classList.add('valid');
        feedback.innerText = "Your system is secure! Good job!";
    } else {
        feedback.classList.add('alert');
        let missingSecurityMeasures = [];

        if (!is2FAEnabled) missingSecurityMeasures.push('2FA');
        if (!isSoftwareUpdated) missingSecurityMeasures.push('Software Updates');
        if (!isFirewallActive) missingSecurityMeasures.push('Firewall');
        if (!isVPNActive) missingSecurityMeasures.push('VPN');

        feedback.innerText = `Your system is vulnerable! Activate: ${missingSecurityMeasures.join(', ')}`;
    }

    penalizeUser(); // Call the penalizeUser function after the attack simulation
}

function penalizeUser() {
    if (!window[randomIssue.actionRequired]) {
        timeLeft -= 120;  // Deduct 2 minutes
    }
}

function openRandomSecurityAlert() {
    let randomIssue = randomSecurityIssues[Math.floor(Math.random() * randomSecurityIssues.length)];
    alert(`${randomIssue.message} ${randomIssue.warning}`);
}

function startTimer() {
    const timerElem = document.getElementById('timer');
    timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        } else {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timerElem.innerText = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }
    }, 1000);
}

document.getElementById('simulateAttack').addEventListener('click', simulateAttack);
document.addEventListener("DOMContentLoaded", function() {
    openRandomSecurityAlert(); // Call this function to display a random security alert when the page loads
    startTimer();
});
