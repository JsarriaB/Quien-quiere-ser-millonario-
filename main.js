<<<<<<< Updated upstream
=======
const questions = [
  {
    question: "What is the capital of Mongolia?",
    answers: [
      { text: "Baghdad", correct: false },
      { text: "Jakarta", correct: false },
      { text: "Bishkek", correct: false },
      { text: "Ulaanbaatar", correct: true }
    ]
  },
  {
    question: "Who discovered penicillin?",
    answers: [
      { text: "Louis Pasteur", correct: false },
      { text: "Alexander Fleming", correct: true },
      { text: "Robert Koch", correct: false },
      { text: "Joseph Lister", correct: false }
    ]
  }
]

let currentQuestionIndex = 0

const buttonNewGame = document.querySelector("#btn-new-game")
const mainMenu = document.querySelector("#main-menu")
const questionScreen = document.querySelector("#question-screen")
const questionBanner = document.querySelector(".question-banner")
const answersGrid = document.querySelector(".answers-grid")

buttonNewGame.addEventListener("click", () => {
  currentQuestionIndex = 0
  
  mainMenu.classList.remove("active-screen")
  mainMenu.classList.add("hidden")

  questionScreen.classList.remove("hidden")
  questionScreen.classList.add("active-screen")
  
  loadQuestion(currentQuestionIndex)
})

function loadQuestion(index) {
  const currentQuestion = questions[index]
  
  questionBanner.textContent = currentQuestion.question
  
  answersGrid.innerHTML = ""
  
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button")
    button.classList.add("answer-block")
    button.textContent = answer.text
    button.dataset.correct = answer.correct
    
    button.addEventListener("click", () => {
      const isCorrect = button.dataset.correct === "true"

      if (isCorrect) {
        button.classList.add("answer-correct")
        
        setTimeout(() => {
          currentQuestionIndex++
          loadQuestion(currentQuestionIndex)
        }, 2000)
        
      } else {
        button.classList.add("answer-wrong")
      }

      const allButtons = document.querySelectorAll(".answer-block")
      allButtons.forEach(eachButton => {
        eachButton.disabled = true

        if (eachButton.dataset.correct === "true" && eachButton !== button) {
          eachButton.classList.add("answer-correct")
        }
      })
    })
    
    answersGrid.appendChild(button)
  })
}
>>>>>>> Stashed changes
