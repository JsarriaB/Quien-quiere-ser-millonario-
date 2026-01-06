let currentQuestionIndex = 0
let countdown = null
let timeLeft = 30

let timeLifelineUsed = false
let fiftyFiftyUsed = false

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

const timeLifelineBtn = document.getElementById("time-lifeline")
const fiftyFiftyBtn = document.getElementById("fifty-fifty")

buttonNewGame.addEventListener("click", () => {
  currentQuestionIndex = 0

  timeLifelineUsed = false
  fiftyFiftyUsed = false

  if (timeLifelineBtn) {
    timeLifelineBtn.classList.remove("lifeline-used")
    timeLifelineBtn.disabled = false
  }

  if (fiftyFiftyBtn) {
    fiftyFiftyBtn.classList.remove("lifeline-used")
    fiftyFiftyBtn.disabled = false
  }

  mainMenu.classList.add("hidden")
  homeHeader.classList.add("hidden")

  questionScreen.classList.remove("hidden")
  questionScreen.classList.add("active-screen")

  loadQuestion(currentQuestionIndex)
})

if (timeLifelineBtn) {
  timeLifelineBtn.addEventListener("click", () => {
    if (timeLifelineUsed) return

    timeLeft += 60
    timerForQuestions.textContent = timeLeft

    timeLifelineUsed = true
    timeLifelineBtn.classList.add("lifeline-used")
    timeLifelineBtn.disabled = true
  })
}

if (fiftyFiftyBtn) {
  fiftyFiftyBtn.addEventListener("click", () => {
    if (fiftyFiftyUsed) return

    applyFiftyFifty()

    fiftyFiftyUsed = true
    fiftyFiftyBtn.classList.add("lifeline-used")
    fiftyFiftyBtn.disabled = true
  })
}

function applyFiftyFifty() {
  const answerButtons = Array.from(document.querySelectorAll(".answer-block"))

  const correctButtons = answerButtons.filter(btn => btn.dataset.correct === "true")
  const wrongButtons = answerButtons.filter(btn => btn.dataset.correct !== "true")


  if (correctButtons.length !== 1 || wrongButtons.length < 2) return

  wrongButtons.sort(() => Math.random() - 0.5)

  wrongButtons[0].style.display = "none"
  wrongButtons[1].style.display = "none"
}

function showGameOver() {
  if (countdown) clearInterval(countdown)

  gameOverModal.classList.remove("hidden")

  backToMenuBtn.onclick = () => {
    gameOverModal.classList.add("hidden")

    questionScreen.classList.add("hidden")
    questionScreen.classList.remove("active-screen")

    mainMenu.classList.remove("hidden")
    mainMenu.classList.add("active-screen")

    homeHeader.classList.remove("hidden")
    homeHeader.classList.add("active-screen")
  }
}

function loadQuestion(index) {
  const currentQuestion = questions[index]

  questionBanner.textContent = currentQuestion.question
  questionCounter.textContent = `Pregunta ${index + 1}/${questions.length}`
  answersGrid.innerHTML = ""

  if (countdown) clearInterval(countdown)

  timeLeft = 30
  timerForQuestions.textContent = timeLeft


  if (timeLifelineBtn) timeLifelineBtn.disabled = timeLifelineUsed
  if (fiftyFiftyBtn) fiftyFiftyBtn.disabled = fiftyFiftyUsed

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


    button.dataset.correct = answer.correct ? "true" : "false"

    button.addEventListener("click", () => {
      clearInterval(countdown)

      document.querySelectorAll(".answer-block").forEach(b => (b.disabled = true))


      if (timeLifelineBtn) timeLifelineBtn.disabled = true
      if (fiftyFiftyBtn) fiftyFiftyBtn.disabled = true

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
