/// <reference types="../@types/jquery" />
import { Quiz } from "./quiz.module.js";
export class Setting {

  constructor() {
    // document.getElementById('start').addEventListener("click",this.startQuestion.bind(this))
    // ! =============> second solution ===============>
    document.getElementById('start').addEventListener("click", _ => {
      this.startQuestion()
    })
  }

  load() {
    $('#start').attr("disabled","disabled")
    $('#loader').addClass('show')
    $('.button').removeClass('show')
    $('.star').removeClass('show')
  }
  
async startQuestion() {
    const category = document.getElementById("category").value;
    // const difficulty =Array.from(document.getElementsByName('difficulty')).find((ele)=>{
    //   return ele.checked
    // })       // ! =============> second solution ===============>
    const difficulty = document.querySelector('[name="difficulty"]:checked').value;
    const questionsNumbers = document.getElementById('amount').value;

    if (questionsNumbers > 0){
      this.load()
      const result =  await this.getQuestions(questionsNumbers,category,difficulty)
      $('#setting').removeClass('show')
      $('#quiz').addClass('show')
      const quiz = new Quiz(result)
    }else {
      $('#alertNumber').fadeIn(1000)

    }
  }

  async getQuestions(num,cate,diff) {
    const apiResponse = await fetch(`https://opentdb.com/api.php?amount=${num}&category=${cate}&difficulty=${diff}`)
    const response = await apiResponse.json()
    return response.results;
  }


}