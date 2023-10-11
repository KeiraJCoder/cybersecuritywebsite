function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

document.addEventListener('DOMContentLoaded', function() {
    const urlList = document.querySelector('.url-list');
    const urls = Array.from(urlList.children); // Convert NodeList to Array
    const shuffledUrls = shuffleArray(urls);
    urlList.innerHTML = ''; // Clear the current list
    shuffledUrls.forEach(url => urlList.appendChild(url)); // Append the shuffled URLs back to the container
});

function selectUrl(element) {
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
    } else {
        element.classList.add('selected');
    }
}

document.getElementById('submitAnswers').addEventListener('click', function() {
    const selectedUrls = document.querySelectorAll('.url-item.selected[data-url-type="threat"]');
    const incorrectSelections = document.querySelectorAll('.url-item.selected[data-url-type="safe"]');
    
    if (selectedUrls.length === 10 && incorrectSelections.length === 0) {
        document.getElementById('feedbackMessage').innerText = "Congratulations! You've successfully identified all unsafe URLs!";
    } else {
        document.getElementById('feedbackMessage').innerText = `You've correctly identified ${selectedUrls.length} unsafe URLs. Please review your selections.`;
    }
});
