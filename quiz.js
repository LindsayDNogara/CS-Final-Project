const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('score')
const scoreDisplay = document.getElementById('score-display')

let shuffledQuestions, currentQuestionIndex
let score = 0 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  scoreDisplay.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  score = 0 
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
  if (correct) {
    score++ 
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    questionContainerElement.classList.add('hide')

    scoreDisplay.innerText = `Final Score: ${score} / ${shuffledQuestions.length}`
    scoreDisplay.classList.remove('hide')
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
    question: 'What SDG promotes gender equality for all?',
    answers: [
      { text: 'SDG 5', correct: true },
      { text: 'SDG 10', correct: false },
      { text: 'SDG 3', correct: false },
      { text: 'SDG 15', correct: false }
    ]
  } , 
  {
    question: ' When is Sexual Assault Awareness Month?"',
    answers: [
      { text: 'October', correct: false },
      { text: 'January', correct: false },
      { text: 'April', correct: true },
      { text: 'June', correct: false }
    ]
  },
  {
    question: ' What color represents sexual violence prevention?',
    answers: [
      { text: 'Indigo', correct: false },
      { text: 'Teal', correct: true },
      { text: 'Lavender', correct: false },
      { text: 'Green', correct: false }
    ]
  },
  {
    question: 'What Philippine republic act criminalizes the act of rape?',
    answers: [
      { text: 'RA 10173', correct: false },
      { text: 'RA 8353', correct: true },
      { text: 'RA 9344', correct: false },
      { text: 'RA 7659', correct: false}
    ]
  },
  {
    question: 'Is sexual assault still prevalent in the world today?',
    answers: [
      { text: 'No', correct: false },
      { text: 'Yes', correct: true }
    ]
  }
]