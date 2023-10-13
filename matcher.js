document.addEventListener('DOMContentLoaded', function() {
    shuffleCards();
    attachCardListeners();
});

function shuffleCards() {
    const gameContainer = document.getElementById('gameContainer');
    const vulnerabilitiesContainer = gameContainer.querySelector('.vulnerabilities');
    const consequencesContainer = gameContainer.querySelector('.consequences');

    const vulnerabilities = Array.from(vulnerabilitiesContainer.children);
    const consequences = Array.from(consequencesContainer.children);

    // Shuffle each array
    shuffleArray(vulnerabilities);
    shuffleArray(consequences);

    // Empty the containers
    while (vulnerabilitiesContainer.firstChild) {
        vulnerabilitiesContainer.firstChild.remove();
    }
    while (consequencesContainer.firstChild) {
        consequencesContainer.firstChild.remove();
    }

    // Append the shuffled vulnerabilities and consequences back to their respective containers
    vulnerabilities.forEach(card => vulnerabilitiesContainer.appendChild(card));
    consequences.forEach(card => consequencesContainer.appendChild(card));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function attachCardListeners() {
    let selectedCard = null;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            if (selectedCard) {
                if (selectedCard.getAttribute('data-match') === this.getAttribute('data-match') && selectedCard !== this) {
                    alert('Matched: ' + this.textContent + ' to ' + selectedCard.textContent);
                    this.style.backgroundColor = '#a1f5a1';
                    selectedCard.style.backgroundColor = '#a1f5a1';

                    // Add the "matched" class to display the color-coordinated border
                    this.classList.add('matched');
                    selectedCard.classList.add('matched');

                    selectedCard = null;
                } else {
                    setTimeout(() => {
                        this.classList.remove('selected');
                        selectedCard.classList.remove('selected');
                        selectedCard = null;
                    }, 1000);
                }
            } else {
                selectedCard = this;
                this.classList.add('selected');
            }
        });
    });
}
