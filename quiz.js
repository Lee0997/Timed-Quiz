var startButton = document.getElementById('start-btn')
var questionContainerEl = document.getElementById('questions-container')
let shuffledQuestions, currentQuestionsIndex
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')
var nextButton = document.getElementById('next-btn')
let countRightAnswers = document.getElementById('right-answers')
var myQuestions = [
    {
        question: "What is HTML?",
        answers: [
        { text: "Hyper Text Processor", correct: false},
        { text: "Hyper Text Markup Language", correct: true},
        { text: "Hyper Text Multiple Language", correct: false},
        { text: "Hyper Tool Multi Language", correct: false},
        ]
    },
    {
        question: "What is CSS?",
        answers: [
        { text: "Cascading Style Sheet", correct: true},
        { text: "Concatenated Super Sheet", correct: false},
        { text: "Cat's See Saw", correct: false},
        { text: "Congregated Style Sheet", correct: false},
        ]
    },
    {
        question: "What is an API?",
        answers: [
        { text: "Application Porting Interface", correct: false},
        { text: "Application Pileup Interface", correct: false},
        { text: "Application Programming Interface", correct: true},
        { text: "Application Processesing Interface", correct: false},
        ]
    },
    {
        question: "How do you reference an ID?",
        answers: [
        { text: "With a '#'", correct: true},
        { text: "With a '.'", correct: false},
        { text: "With a '-'", correct: false},
        { text: "With a '{}'", correct: false},
        ]
    },
    {
        question: "How do you create a timed quiz?",
        answers: [
        { text: "With great stress", correct: false},
        { text: "With hard work", correct: false},
        { text: "With a cup of tea", correct: false},
        { text: "All of the above", correct: true},
        ]
    }
]

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = myQuestions.sort(() => Math.random() - .5)
    currentQuestionsIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    if (e === correct) {
        countRightAnswers++
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}