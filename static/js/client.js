// adquirindo todos os elementos necessários

const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

// se o botão de start for apertado

start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // aparece a info_box
}

// se o botão de sair for apertado

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // esconde a info_box
}

// se o botão continuar for apertado

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // esconde a info_box
    quiz_box.classList.add("activeQuiz"); // mostra a quiz box
    showQuestions(0);
}

let que_count = 0;

// pegando perguntas e respostas do array

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    const option_list = document.querySelector(".option_list");
    let que_tag = '<span>' + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span></span></div>'
                    + '<div class="option"><span></span></div>'
                    + '<div class="option"><span></span></div>'
                    + '<div class="option"><span></span></div>';
    que_text.innerHTML = que_tag;
}