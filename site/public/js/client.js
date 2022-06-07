/** @format */

// adquirindo todos os elementos necessários

const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");

// se o botão de start for apertado

start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); // aparece a info_box
};

// se o botão de sair for apertado

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // esconde a info_box
};

// se o botão continuar for apertado

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // esconde a info_box
  quiz_box.classList.add("activeQuiz"); // mostra a quiz box
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const graph =  document.querySelector(".graph");

restart_quiz.onclick = () => {
  window.location.reload();
  // quiz_box.classList.add("activeQuiz");
  // result_box.classList.remove("activeResult");
  // let que_count = 0;
  // let que_numb = 1;
  // let timeValue = 15;
  // let widthValue = 0;
  // let userScore = 0;
  // showQuestions(que_count);
  // queCounter(que_numb);
  // clearInterval(counter);
  // startTimer(timeValue);
  // clearInterval(counterLine);
  // startTimerLine(widthValue);
  // next_btn.style.display = "none";
  // timeOff.textContent = "Tempo:";
};
// quit_quiz.onclick = () => {
//     window.location.reload();
// }

// quando o botao proximo for apertado

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Acabou";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Questões completadas");
    showResultBox();
  }
};

// pegando perguntas e respostas do array

function showQuestions(index) {
  const que_text = document.querySelector(".que_text");
  let que_tag =
    "<span>" +
    questions[index].numb +
    "." +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = option_list.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Reposta Correta");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    console.log("Reposta Errada");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    // se as respostas tiverem incorretas, então automaticamente selecionar a resposta correta

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
      }
    }
  }

  // quando o usuario selecionar o botão de desabilitar todas as opções

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function showResultBox() {
  info_box.classList.remove("activeInfo"); // esconde a box de info
  quiz_box.classList.remove("activeQuiz"); // esconde a box de quiz
  result_box.classList.add("activeResult"); //mostra a box do resultado
  graph.classList.add("activeGraph");
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 5) {
    let scoreTag =
      "<span>e parabéns! Você acertou apenas <p>" +
      userScore +
      "</p> de <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 3) {
    let scoreTag =
      "<span>Boa, Mas você acertou apenas <p>" +
      userScore +
      "</p> de <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>Desculpa, bas você acertou apenas " +
      userScore +
      " de " +
      questions.length +
      "</span>";
    scoreText.innerHTML = scoreTag;
  }

  // =====================================================================================
  // Publicar
  var idUsuario = sessionStorage.ID_USUARIO;

  //   var corpo = {};

  fetch(`/avisos/publicar/${idUsuario}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      userScore,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Post realizado com sucesso");
        window.onload = obterDadosGrafico(1);
        // window.location = "ranking.html";
        // limparFormulario();
        // finalizarAguardar();
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      // finalizarAguardar();
    });
}
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Acabou";

      let correctAns = questions[que_count].answer;
      let allOptions = option_list.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
          option_list.children[i].setAttribute("class", "option correct");
        }
      }

      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.style.display = "block";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  let totalQuesCountTag =
    "<span><p>" +
    index +
    "</p>de<p>" +
    questions.length +
    "</p> Perguntas</span>";
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}
