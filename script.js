const questionPool = [
  {
    question: "Wie ist die Hauptstadt von Deutschland?",
    id: 1,
    answers: [
      { answer: "Hamburg", correct: false, id: 10 },
      { answer: "München", correct: false, id: 11 },
      { answer: "Berlin", correct: true, id: 12 },
      { answer: "Hannover", correct: false, id: 13 },
    ],
  },
  {
    question: "Welche ist die längste Autobahn in Deutschland?",
    id: 2,
    answers: [
      { answer: "A1", correct: false, id: 10 },
      { answer: "A5", correct: false, id: 11 },
      { answer: "A7", correct: true, id: 12 },
      { answer: "A3", correct: false, id: 13 },
    ],
  },
  {
    question: "Welche Person hat in 7 vs. Wild - Staffel 2 gewonnen?",
    id: 3,
    answers: [
      { answer: "Otto", correct: true, id: 10 },
      { answer: "Fritz", correct: false, id: 11 },
      { answer: "Knossi", correct: false, id: 12 },
      { answer: "Joris", correct: false, id: 13 },
    ],
  },
  {
    question: "Wann wurde der Eifelturm erbaut?",
    id: 4,
    answers: [
      { answer: "1789", correct: false, id: 10 },
      { answer: "1887", correct: true, id: 11 },
      { answer: "1954", correct: false, id: 12 },
      { answer: "2001", correct: false, id: 13 },
    ],
  },
  {
    question: "Wie viele Einwohner hat Italien?",
    id: 5,
    answers: [
      { answer: "10 Millionen", correct: false, id: 10 },
      { answer: "50 Millionen", correct: false, id: 11 },
      { answer: "60 Millionen", correct: true, id: 12 },
      { answer: "100 Millionen", correct: false, id: 13 },
    ],
  },
  {
    question: "Welcher Stern ist in der Milchstraße der größte?",
    id: 6,
    answers: [
      { answer: "Sirius", correct: false, id: 10 },
      { answer: "Proxima Centauri", correct: false, id: 11 },
      { answer: "Alpha Centauri", correct: false, id: 12 },
      { answer: "Pistol Star", correct: true, id: 13 },
    ],
  },
];

let currentQuestion; //zwischenspeicher der aktuellen Frage
let currentQuestionCount = -1; //index der aktuellen Frage

const randomQuestion =
  questionPool[Math.floor(Math.random() * questionPool.length)];

// displayQuestion(randomQuestion);

function displayQuestion(question) {
  //creating Question display
  const displayQuestionDiv = document.querySelector("#displayQuestion");

  //creating Card of question
  const questionCardDiv = document.createElement("div");
  displayQuestionDiv.appendChild(questionCardDiv);
  questionCardDiv.classList.add("questionCard");
  questionCardDiv.id = question.id;

  //creating Title of Question
  const questionTitleDiv = document.createElement("div");
  questionTitleDiv.classList.add("questionTitle");
  questionTitleDiv.textContent = question.question;
  questionCardDiv.appendChild(questionTitleDiv);

  //creating grid div for answer buttons
  const gridAnswerButtonsDiv = document.createElement("div");
  gridAnswerButtonsDiv.classList.add("gridAnswerButtons");

  //creating answer buttons

  //1: Kopie des Antwort Arrays erstellen
  const answerListCopy = [];
  question.answers.forEach((answer) => {
    answerListCopy.push(answer);
  });

  console.log(answerListCopy);
  //2: while schleife erstellen & mit math.random zufällige vorhandene
  //Elemente herausschneinen

  while (answerListCopy.length > 0) {
    const randomAnswerIndex = Math.floor(Math.random() * answerListCopy.length);
    const answer = answerListCopy.splice(randomAnswerIndex, 1)[0];
    const answerButton = document.createElement("button");
    answerButton.classList.add("answer");
    answerButton.setAttribute("id", answer.id);
    answerButton.textContent = answer.answer;

    gridAnswerButtonsDiv.appendChild(answerButton);
    questionCardDiv.appendChild(gridAnswerButtonsDiv);

    answerButton.addEventListener("click", () => {
      checkIfAnswerIsCorrect(answer);
    });
  }
}

function checkIfAnswerIsCorrect(answer) {
  const answerCheckButtonElement = document.getElementById(answer.id);
  if (answer.correct) {
    answerCheckButtonElement.classList.add("answerCorrect");
  } else {
    //ID des Buttons mit der richtgen ID finden
    showAnswer();
    answerCheckButtonElement.classList.add("answerIncorrect");
  }
}

function nextQuestion() {
  //löschen der inizial erstellen Frage
  if (currentQuestion) {
    document.getElementById(String(currentQuestion.id)).remove();
  }
  //Methode zum Anzeigen der nächsten Frage
  if (currentQuestionCount + 1 < questionPool.length) {
    currentQuestionCount++;
    currentQuestion = questionPool[currentQuestionCount];
  } else {
    currentQuestionCount = 0;
    currentQuestion = questionPool[currentQuestionCount];
  }
  displayQuestion(currentQuestion);
}

function showAnswer() {
  //ID des buttons mit der richtigen ID finden
  const correctAnswer = currentQuestion.answers.find((ans) => {
    return ans.correct;
  });

  //Butten mit der richtigen ID zugreifen
  const correctButton = document.getElementById(correctAnswer.id);

  //Butten mit der richtigen Klasse zuweisen
  correctButton.classList.add("answerCorrect");
}
