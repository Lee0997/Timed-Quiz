var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

var myQuestions = [
    {
        question: "What is HTML?",
        answers: {
            a: "Hyper Text Processor",
            b: "Hyper Text Markup Language",
            c: "Hyper Text Multiple Language",
            d: "Hyper Tool Multi Language"
        },
        correctAnswer: "b"
    },
    {
        question: "What is CSS?",
        answers: {
            a: "Cascading Style Sheet",
            b: "Concatenated Super Sheet",
            c: "Cat's See Saw",
            d: "Congregated Style Sheet"
        },
        correctAnswer: "a"
    },
    {
        question: "What is an API?",
        answers: {
            a: "Application Porting Interface",
            b: "Application Pileup Interface",
            c: "Application Programming Interface",
            d: "Application Processesing Interface"
        },
        correctAnswer: "c"
    },
    {
        question: "How do you reference an ID??",
        answers: {
            a: "With a '#'",
            b: "With a '.'",
            c: "With a '-'",
            d: "With a '{}'"
        },
        correctAnswer: "a"
    },
    {
        question: "How do you create a timed quiz?",
        answers: {
            a: "With hard work",
            b: "With great stress",
            c: "With a cup of tea",
            d: "All of the above"
        },
        correctAnswer: "d"
    }
]


function generatQuiz(questions, quizContainer, resultsContainer, submitButton){
    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;

        for(var i=0; i < questions.length; i++) {
            answers = [];

            for(letter in questions[i].answers){
                answers.push(
                    '<label>'
                    + 'input type ="radio" name="question"'+i+' value="'+letter+'">'
                    + letter + ': '
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers"' + answers.join('') + '</div>'
            );
        }
        quizContainer.innerHTML = output.join('')
    }
    }
    function showResults(questions, quizContainer, resultsContainer){
        var answerContainers = quizContainer.querySelectorAll('.answers');
        var userAnswer = ''
        var numCorrect = 0;

        for(var i = 0; i < questions.length; i++){
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            if(userAnswer ===questions[i].correctAnswer) {
                numCorrect++;
                answerContainers[i].style.color = 'lightgreen';
            }
            else {
                answerContainers[i].style.color = 'red';
            }
        }
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        
    showQuestions(questions, quizContainer);

    submitButton.on("click",) = function() {
        showResults(questions, quizContainer, resultsContainer);
    }
}
generatQuiz(myQuestions, quizContainer, resultsContainer, submitButton)