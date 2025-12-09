document.addEventListener("DOMContentLoaded", () => {

  const btnNewGame = document.getElementById("btn-new-game");
  const mainMenu = document.getElementById("main-menu");
  const questionScreen = document.getElementById("question-screen");
  const answerButtons = document.querySelectorAll(".answer-block");

  
  btnNewGame.addEventListener("click", () => {

    mainMenu.classList.remove("active-screen");
    mainMenu.classList.add("hidden");

    
    questionScreen.classList.remove("hidden");
    questionScreen.classList.add("active-screen");

  });

 
  answerButtons.forEach(button => {
    button.addEventListener("click", () => {

      const isCorrect = button.dataset.correct === "true";

      if (isCorrect) {
        button.classList.add("answer-correct");
      } else {
        button.classList.add("answer-wrong");
      }

      
      answerButtons.forEach(btn => {

        btn.disabled = true;

        if (btn.dataset.correct === "true" && btn !== button) {
          btn.classList.add("answer-correct");
        }
      });
    });
  });

});
