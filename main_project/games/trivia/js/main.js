'use strict';

let gCurrQuestIdx = 0;
let gQuests;
let gNum
const startBtns = document.querySelectorAll('button')
let categoryBtns = ''


function categoryChoose() {
    fetch(`https://opentdb.com/api_category.php`)
        .then(response => response.json())
        .then(data => {
            const elCategory = document.getElementById('category');
            const htmls = [];
            data.trivia_categories.forEach((category, i) => {
                htmls.push(`<button id="btn_category" onclick="categoryQuest(${category.id})">${category.name}</button>`);
            });

            // Join the HTML strings and set them as the inner HTML of the element
            elCategory.innerHTML = `<div class="btns_category">${htmls.join('')}</div>`;
        })
        .catch(err => alert('Error fetching questions'));
}

function categoryQuest(categoryNum) {
    categoryBtns = document.querySelector('.btns_category')
    categoryBtns.classList.add('hide')
    gNum = categoryNum
    return gNum
}

function init(num) {
    let category = gNum
    startBtns.forEach(btn => {
        btn.style.display = 'none';
    });

    fetch(`https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=medium&type=multiple`)
        .then(response => response.json())
        .then(data => {
            gQuests = data.results;
            renderQuest();
        })
        .catch(err => alert('Error fetching questions'));
}


function renderQuest() {
    const questionWindow = document.getElementById('question-window');

    if (!questionWindow) {
        console.error('Element with ID "question-window" not found.');
        return;
    }

    if (gCurrQuestIdx >= gQuests.length) {
        questionWindow.style.display = 'none';
        document.getElementById('restartBtn').style.display = 'inline-block'; // Show the restart button
        alert('All questions answered! Click "Restart" to play again.');
        return;
    }

    var elBtns = document.querySelector('.question-btns');
    let strHTML = '';

    const shuffledAnswers = shuffleAnswers([...gQuests[gCurrQuestIdx].incorrect_answers, gQuests[gCurrQuestIdx].correct_answer]);

    strHTML += `<p>${gQuests[gCurrQuestIdx].question}</p>`;

    shuffledAnswers.forEach((answer, index) => {
        strHTML += `<button onclick="checkAnswer(${index})">${answer}</button>`;
    });

    elBtns.innerHTML = strHTML;
}

function checkAnswer(answerIndex) {
    if (answerIndex === gQuests[gCurrQuestIdx].incorrect_answers.length) {
        gCurrQuestIdx++;
        renderQuest();
    } else {
        alert('Incorrect answer! Try again or move to the next question.');
    }
}

function shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
}

function restart() {
    gCurrQuestIdx = 0;
    const questionWindow = document.getElementById('question-window');

    if (questionWindow) {
        questionWindow.style.display = 'block'; // Show the question window
    }

    document.getElementById('restartBtn').style.display = 'none'; // Hide the restart button
    init(); // Fetch new questions and restart the game
}
