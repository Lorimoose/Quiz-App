const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const progressElement = document.getElementById('progress')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreTracker = document.getElementById('score-tracker');
const scoreUpElement = document.getElementById('score-up');
const endGame = document.getElementById('end-game')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    endGame.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    progressElement.classList.remove('hide')
    setNextQuestion()
    scoreTracker.classList.remove('hide');
    scoreUpElement.textContent = 0;
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    processResults(correct);
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        endGame.classList.remove('hide')
        questionContainerElement.classList.add('hide')
        progressElement.classList.add('hide')
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

function processResults(isCorrect) {
    if (!isCorrect) {
        return;
    }

    const scoreUp = parseInt(scoreUpElement.textContent, 10) || 0;

    scoreUpElement.textContent = scoreUp + 10;
}

const questions = [
    {
        question: 'How many Infinity Stones are there?',
        answers: [
            { text: '6', correct: true },
            { text: '5', correct: false },
            { text: '3', correct: false },
            { text: '7', correct: false },
        ]
    },
    {
        question: 'What type of scientist is Jane Foster in Thor?',
        answers: [
            { text: 'Biologist', correct: false },
            { text: 'Chemist', correct: false },
            { text: 'Astronomer', correct: true },
            { text: 'Dioptrics', correct: false },
        ]
    },
    {
        question: 'During which war did Captain America get his superhuman abilities?',
        answers: [
            { text: 'Civil War', correct: false },
            { text: 'World War II', correct: true },
            { text: 'Cold War', correct: false },
            { text: 'World War I', correct: false },
        ]
    },
    {
        question: 'Which of the following characters did not disappear during the ”blip”?',
        answers: [
            { text: 'Rocket', correct: true },
            { text: 'Spiderman', correct: false },
            { text: 'Doctor Strange', correct: false },
            { text: 'Black Panther', correct: false },
        ]
    },
    {
        question: 'Who is Loki\'s father?',
        answers: [
            { text: 'Odin', correct: false },
            { text: 'Ronan the Accuser', correct: false },
            { text: 'Thor', correct: false },
            { text: 'Laufey', correct: true },
        ]
    },
    {
        question: 'Which fictional place is the setting of Black Panther?',
        answers: [
            { text: 'Maveth', correct: false },
            { text: 'Wakanda', correct: true },
            { text: 'Vormir', correct: false },
            { text: 'Asgard', correct: false },
        ]
    },
    {
        question: 'How many years was Scott Lang trapped in the Quantum Realm?',
        answers: [
            { text: '10', correct: false },
            { text: '3', correct: false },
            { text: '6', correct: false },
            { text: '5', correct: true },
        ]
    },
    {
        question: 'Which material composes Captain America\'s shield?',
        answers: [
            { text: 'Vibranium', correct: true },
            { text: 'Uru', correct: false },
            { text: 'Carbonadium', correct: false },
            { text: 'Iron', correct: false },
        ]
    },
    {
        question: 'What is the name of Peter Parker\'s best friend?',
        answers: [
            { text: 'Mary Jane', correct: false },
            { text: 'Sean', correct: false },
            { text: 'Ned', correct: true },
            { text: 'Carl', correct: false },
        ]
    },
    {
        question: 'How many children does Hawkeye have?',
        answers: [
            { text: '2', correct: false },
            { text: '1', correct: false },
            { text: '3', correct: true },
            { text: '0', correct: false },
        ]
    },
]