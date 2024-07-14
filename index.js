const questionPool = [
    {
        question: "Wie heißt die Hauptstadt von Deutschland?",
        id: 1,
        answers: [
            { answer: "Hamburg", correct: false, id: 10 },
            { answer: "München", correct: false, id: 11 },
            { answer: "Berlin", correct: true, id: 12 },
            { answer: "Hannover", correct: false, id: 13 },
        ],
    },
    {
        question: "Welche Autobahn ist die längste in Deutschland?",
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
        question: "In welchem Jahr wurde der Eifelturm erbaut?",
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
// The current question can be of type `Question` or `undefined`.
let currentQuestion = questionPool[0]; // intermediate storage of the current question
let currentQuestionCount = -1; // index of the current question, initial value -1
// Function for deactivating the "Next" button
function disableNextButton() {
    const nextQuestionButton = document.getElementById("nextQuestion");
    if (nextQuestionButton) {
        nextQuestionButton.disabled = true;
    }
}
// Function for activating the "Next" button
function enableNextButton() {
    const nextQuestionButton = document.getElementById("nextQuestion");
    if (nextQuestionButton) {
        nextQuestionButton.disabled = false;
    }
}
function displayQuestion(question) {
    //creating Question display
    const displayQuestionDiv = document.querySelector("#displayQuestion");
    if (!displayQuestionDiv)
        return;
    //creating Card of question
    const questionCardDiv = document.createElement("div");
    displayQuestionDiv.appendChild(questionCardDiv);
    questionCardDiv.classList.add("questionCard");
    questionCardDiv.id = question.id.toString();
    //creating Title of Question
    const questionTitleDiv = document.createElement("div");
    questionTitleDiv.classList.add("questionTitle");
    questionTitleDiv.textContent = question.question;
    questionCardDiv.appendChild(questionTitleDiv);
    //creating grid div for answer buttons
    const gridAnswerButtonsDiv = document.createElement("div");
    gridAnswerButtonsDiv.classList.add("gridAnswerButtons");
    const answerListCopy = [...question.answers];
    while (answerListCopy.length > 0) {
        const randomAnswerIndex = Math.floor(Math.random() * answerListCopy.length);
        const answer = answerListCopy.splice(randomAnswerIndex, 1)[0];
        const answerButton = document.createElement("button");
        answerButton.classList.add("answer");
        answerButton.setAttribute("id", answer.id.toString());
        answerButton.textContent = answer.answer;
        gridAnswerButtonsDiv.appendChild(answerButton);
        questionCardDiv.appendChild(gridAnswerButtonsDiv);
        answerButton.addEventListener("click", () => {
            checkIfAnswerIsCorrect(answer);
        });
    }
    disableNextButton(); // Deactivate the "Next" button until an answer has been selected
}
function checkIfAnswerIsCorrect(answer) {
    const answerCheckButtonElement = document.getElementById(answer.id.toString());
    if (answerCheckButtonElement) {
        if (answer.correct) {
            answerCheckButtonElement.classList.add("answerCorrect");
        }
        else {
            //Find the ID of the button with the correct ID
            showAnswer();
            answerCheckButtonElement.classList.add("answerIncorrect");
        }
        enableNextButton(); // Activate the "Next" button when an answer has been selected
    }
}
function nextQuestion() {
    if (currentQuestion) {
        const questionCard = document.getElementById(currentQuestion.id.toString());
        if (questionCard) {
            questionCard.remove();
        }
    }
    if (currentQuestionCount + 1 < questionPool.length) {
        currentQuestionCount++;
    }
    else {
        currentQuestionCount = 0;
    }
    currentQuestion = questionPool[currentQuestionCount];
    displayQuestion(currentQuestion);
}
function showAnswer() {
    if (!currentQuestion)
        return;
    const correctAnswer = currentQuestion.answers.find((ans) => ans.correct);
    if (correctAnswer) {
        const correctButton = document.getElementById(correctAnswer.id.toString());
        if (correctButton) {
            correctButton.classList.add("answerCorrect");
            enableNextButton(); // Activate the "Next" button when the correct answer is displayed
        }
    }
}
window.addEventListener("DOMContentLoaded", () => {
    nextQuestion(); // displays the first question
    const showAnswerButton = document.getElementById("showAnswer");
    const nextQuestionButton = document.getElementById("nextQuestion");
    if (showAnswerButton) {
        showAnswerButton.addEventListener("click", showAnswer);
    }
    if (nextQuestionButton) {
        nextQuestionButton.addEventListener("click", nextQuestion);
    }
});
export {};
