document.addEventListener('DOMContentLoaded', function() {
    shuffleCards();
    attachCardListeners();
});

function shuffleCards() {
    const gameContainer = document.getElementById('gameContainer');
    const vulnerabilities = Array.from(gameContainer.children).filter(card => !card.textContent.includes('risk') && !card.textContent.includes('Risk'));
    const consequences = Array.from(gameContainer.children).filter(card => card.textContent.includes('risk') || card.textContent.includes('Risk'));

    // Shuffle each array
    shuffleArray(vulnerabilities);
    shuffleArray(consequences);

    // Empty the container
    while (gameContainer.firstChild) {
        gameContainer.firstChild.remove();
    }

    // Append vulnerabilities (risks) then consequences
    vulnerabilities.forEach(card => gameContainer.appendChild(card));
    consequences.forEach(card => gameContainer.appendChild(card));
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
                    selectedCard = null;
                } else {
                    this.classList.remove('selected');
                    selectedCard.classList.remove('selected');
                    selectedCard = null;
                }
            } else {
                selectedCard = this;
                this.classList.add('selected');
            }
        });
    });
}
