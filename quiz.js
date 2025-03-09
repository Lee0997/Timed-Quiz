var startButton = document.getElementById('start-btn');
var questionContainerEl = document.getElementById('questions-container');
let shuffledQuestions, currentQuestionsIndex;
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var nextButton = document.getElementById('next-btn');
var timerEl = document.getElementById('timer');
let countRightAnswers = document.getElementById('right-answers');
let timer;
let timeLeft = 10; // 10 seconds for each question

var myQuestions = [
    {
        question: "What is HTML?",
        answers: [
            { text: "Hyper Text Processor", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Multiple Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false },
        ]
    },
    {
        question: "What is CSS?",
        answers: [
            { text: "Cascading Style Sheet", correct: true },
            { text: "Concatenated Super Sheet", correct: false },
            { text: "Cat's See Saw", correct: false },
            { text: "Congregated Style Sheet", correct: false },
        ]
    },
    // Add more questions here...
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = myQuestions.sort(() => Math.random() - .5);
    currentQuestionsIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
    startTimer();
}

function startTimer() {
    timerEl.innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(function () {
        timeLeft--;
        timerEl.innerText = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextButton.classList.remove('hide');
            setStatusClass(document.body, false);
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionsIndex]);
    timeLeft = 10; // Reset the timer for the next question
    startTimer();
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }

    if (correct === "true") {
        let answers = parseInt(countRightAnswers.textContent);
        answers++;
        countRightAnswers.textContent = answers;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsEl.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}
