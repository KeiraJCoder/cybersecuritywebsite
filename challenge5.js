let is2FAEnabled = false;
let isSoftwareUpdated = false;
let isFirewallActive = false;
let isVPNActive = false;
let timerStarted = false;

let timeLeft = 15 * 60; // 15 minutes converted to seconds
let timerInterval;

function startTimer() {
    if (timerStarted) return;
    timerStarted = true;

    const timerElem = document.getElementById('timer');
    timerElem.style.display = 'block';

    timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time\'s up!');
        } else {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timerElem.innerText = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }
    }, 1000);
}

function displayHint() {
    alert('Always ensure you follow the company policy for passwords.');
    timeLeft -= 120; // Deducting 2 minutes as a penalty for using the hint.
}

function checkPasswordStrength(password) {
    startTimer();
    const feedback = document.getElementById('passwordFeedback');

    if (password.length > 8 && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        feedback.classList.add('valid');
        feedback.classList.remove('alert');
        feedback.innerText = "Password is strong!";
    } else {
        feedback.classList.add('alert');
        feedback.classList.remove('valid');
        feedback.innerText = "Must be over 8 characters, contain numbers, and special characters";
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
    
    if(is2FAEnabled && isSoftwareUpdated && isFirewallActive && isVPNActive) {
        feedback.classList.add('valid');
        feedback.innerText = "Your system is secure! Good job!";
    } else {
        feedback.classList.add('alert');
        let missingSecurityMeasures = [];

        if(!is2FAEnabled) missingSecurityMeasures.push('2FA');
        if(!isSoftwareUpdated) missingSecurityMeasures.push('Software Updates');
        if(!isFirewallActive) missingSecurityMeasures.push('Firewall');
        if(!isVPNActive) missingSecurityMeasures.push('VPN');

        feedback.innerText = `Your system is vulnerable! Activate: ${missingSecurityMeasures.join(', ')}`;
    }
}

const simulateAttackBtn = document.getElementById('simulateAttack');
const hintBtn = document.getElementById('hint');

if (simulateAttackBtn) {
    simulateAttackBtn.addEventListener('click', simulateAttack);
}

if (hintBtn) {
    hintBtn.addEventListener('click', displayHint);
}
