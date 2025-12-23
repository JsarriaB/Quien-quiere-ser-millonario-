let currentQuestionIndex = 0
let countdown = null

const buttonNewGame = document.querySelector(".btn-new-game")
const mainMenu = document.querySelector(".main-menu")
const questionScreen = document.querySelector(".question-screen")
const homeHeader = document.querySelector(".home-header")
const questionBanner = document.querySelector(".question-banner")
const answersGrid = document.querySelector(".answers-grid")
const questionCounter = document.querySelector(".question-counter")
const timerForQuestions = document.querySelector(".timer")

const gameOverModal = document.getElementById("game-over-modal")
const backToMenuBtn = document.getElementById("back-to-menu")

buttonNewGame.addEventListener("click", () => {
  currentQuestionIndex = 0

  mainMenu.classList.add("hidden")
  homeHeader.classList.add("hidden")

  questionScreen.classList.remove("hidden")
  questionScreen.classList.add("active-screen")

  loadQuestion(currentQuestionIndex)
})

function showGameOver() {
  if (countdown) clearInterval(countdown)

  gameOverModal.classList.remove("hidden")

  backToMenuBtn.onclick = () => {
    gameOverModal.classList.add("hidden")

    questionScreen.classList.remove("active-screen")
    questionScreen.classList.add("hidden")

    mainMenu.classList.remove("hidden")
    mainMenu.classList.add("active-screen")

    homeHeader.classList.remove("hidden")
    homeHeader.classList.add("active-screen")

    currentQuestionIndex = 0
  }
}

function loadQuestion(index) {
  const currentQuestion = questions[index]

  questionBanner.textContent = currentQuestion.question
  questionCounter.textContent = `Pregunta ${index + 1}/${questions.length}`
  answersGrid.innerHTML = ""

  if (countdown) clearInterval(countdown)

  let timeLeft = 30
  timerForQuestions.textContent = timeLeft

  countdown = setInterval(() => {
    timeLeft--
    timerForQuestions.textContent = timeLeft

    if (timeLeft === 0) {
      showGameOver()
    }
  }, 1000)

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button")
    button.classList.add("answer-block")
    button.textContent = answer.text

    button.addEventListener("click", () => {
      clearInterval(countdown)

      document.querySelectorAll(".answer-block").forEach(b => {
        b.disabled = true
        if (!answer.correct) {
          const correctAnswer = currentQuestion.answers.find(a => a.correct)
          if (b.textContent === correctAnswer.text) {
            b.classList.add("answer-correct")
          }
        }
      })

      if (answer.correct) {
        button.classList.add("answer-correct")

        setTimeout(() => {
          currentQuestionIndex++
          if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex)
          } else {
            showGameOver()
          }
        }, 1500)

      } else {
        button.classList.add("answer-wrong")
        setTimeout(showGameOver, 1500)
      }
    })

    answersGrid.appendChild(button)
  })
}
