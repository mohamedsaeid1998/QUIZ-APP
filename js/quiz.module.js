/// <reference types="../@types/jquery" />
export class Quiz {
  constructor(result) {
    this.result = result;
    document.getElementById("to").innerText = this.result.length;
    this.currentIndex = 0;
    this.from = document.getElementById("from");
    this.questionTitle = document.getElementById("questionTitle");
    this.questionContent = document.getElementById("questionContent");
    document.getElementById("nextQuestion").addEventListener("click", _ => {
      this.nextQuestion()
    })
    this.getQuestion();
    this.trueAnswers;
    this.score = 0;
    document.getElementById('end').addEventListener('click', _ =>{
      location.reload()
    })
  }

  getQuestion() {
    this.from.innerText = this.currentIndex + 1;
    const currentQuestion = this.result[this.currentIndex];
    this.questionTitle.innerText = currentQuestion.question;
    const answers = [...currentQuestion.incorrect_answers];
    this.trueAnswers = currentQuestion.correct_answer;
    const randomNumber = Math.ceil(Math.random() * answers.length);
    answers.splice(randomNumber, 0, this.trueAnswers);
    console.log(answers);
    this.getAnswers(answers);
  }

  getAnswers(answers) {
    let box = ``;
    for (let i = 0; i < answers.length; i++) {
      box += `<li class="my-3 animate__animated">
      <div class="pretty p-icon p-round p-jelly">
      <input type="radio" name="answer" value="${answers[i]}" />
      <div class="state p-success">
      <i class="icon mdi mdi-check"></i>
      <label> ${answers[i]} </label>
      </div>
      </div>
      </li>
      `;
    }
    this.questionContent.innerHTML = box;
  }

  nextQuestion() {
    const selectAns = document.querySelector('[name="answer"]:checked')?.value;

    if (selectAns != undefined) {
      $("#alertAns").fadeOut(300);
      this.currentIndex++;

      if (this.currentIndex > this.result.length - 1) {
        $("#quiz").removeClass("show");
        $("#finish").addClass("show");
        $("#score").text(this.score);
      } else {
        if (selectAns === this.trueAnswers) {
          $("#correct").fadeIn(0);
          setTimeout(() => {
            $("#correct").fadeOut(0);
          }, 800);
          this.score += 10;
        } else {
          $('#inCorrect').text(`Correct answer is ${this.trueAnswers}`)
          $("#inCorrect").fadeIn(0);
          setTimeout(() => {
            $("#inCorrect").fadeOut(0);
          }, 1000);
        }
          this.getQuestion();
      }
    } else {
      $("#alertAns").fadeIn(300);
    }
  }
}
