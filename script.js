const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
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
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
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
            { text: 'Astronomer', correct: true },
            { text: 'Biologist', correct: false },
            { text: 'Chemist', correct: false },
            { text: 'Dioptrics', correct: false },
        ]
    },
    {
        question: 'During which war did Captain America get his superhuman abilities?',
        answers: [
            { text: 'World War II', correct: true },
            { text: 'Civil War', correct: false },
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
]