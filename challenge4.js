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
    const selectedThreatUrls = document.querySelectorAll('.url-item.selected[data-url-type="threat"]');
    const alreadyCorrectUrls = document.querySelectorAll('.url-item.correctAnswer[data-url-type="threat"]');
    const incorrectSelections = document.querySelectorAll('.url-item.selected[data-url-type="safe"]');
    
    const totalCorrectSelections = [...selectedThreatUrls, ...alreadyCorrectUrls];

    // Remove duplicates in case some URLs have both classes
    const uniqueCorrectSelections = Array.from(new Set(totalCorrectSelections));
    
    // Highlight newly identified correct answers in green
    selectedThreatUrls.forEach(url => {
        url.classList.add('correctAnswer');
        url.classList.remove('selected');  // This is just for visual (to clear the red color), we still consider them selected
    });

    // Deselect incorrect answers
    incorrectSelections.forEach(url => url.classList.remove('selected'));

    if (uniqueCorrectSelections.length === 10 && incorrectSelections.length === 0) {
        document.getElementById('feedbackMessage').innerText = "Congratulations! You've successfully identified all unsafe URLs!\n\n👍";
    } else {
        document.getElementById('feedbackMessage').innerText = `You've correctly identified ${uniqueCorrectSelections.length} out of 10 unsafe URLs. Please review your selections.`;
    }
});

