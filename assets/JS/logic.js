// Declare global variables

var currentQuestion = 0;
var score = 0;
var timeLeft = 90;

// Variables to refer to index.html and audio

var startBtn = document.getElementById("start");
var questionsContainer = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choicesContainer = document.getElementById("choices");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var timeContainer = document.getElementById("time");
var submitBtn = document.getElementById("submit");
var startScreen = document.getElementById("start-screen");
var timer = document.getElementById("timer");
var initials = document.getElementById("initials");
var correctAudio = new Audio("./assets/sfx/correct.wav");
var wrongAudio = new Audio("./assets/sfx/incorrect.wav");

// Event to Start the App

startBtn.addEventListener("click", onStart);

// Function to Start the App

function onStart() {

    startScreen.setAttribute("class", "hide");

    var countDown = setInterval(() => {

        if (timeLeft < 1) {
            clearInterval(countDown);
            questionsContainer.setAttribute("class", "hide");
            finalScore.textContent = score;
            endScreen.setAttribute("class", "show");
        }
        else if (!questions[currentQuestion]) {
            clearInterval(countDown);
        }
        else {
            timeLeft--;
            timeContainer.textContent = timeLeft;
        }
    }, 1000);

    bringQuestion(questions[0]);

}

// Function to bring questions to the page

function bringQuestion(broughtQuestion) {

    var question = document.createElement("h5");

    question.textContent = broughtQuestion.question;

    questionTitle.appendChild(question);

    var answers = document.createElement("ol");

    for (i = 0; i < broughtQuestion.choices.length; i++) {

        var option = document.createElement("li");
        var pick = document.createElement("button");

        option.textContent = broughtQuestion.choices[i];
        option.setAttribute("style", "display: flex; justify-content: space-between;");

        option.setAttribute("data-index", i)

        pick.textContent = "Pick";

        pick.addEventListener("click", onAnswer);

        option.appendChild(pick);
        answers.appendChild(option);
    }

    choicesContainer.appendChild(answers);

    questionsContainer.setAttribute("class", "show");
    choicesContainer.setAttribute("class", "show");
}

// Answers & next question/end Function

function onAnswer(event) {

    var element = event.target;

    var choice = parseInt(element.parentElement.getAttribute("data-index"));
    if (choice === questions[currentQuestion].correct) {
        correctAudio.play();
        score += 10;
    } else {
        wrongAudio.play();
        timeLeft -= 10;
    }

    questionTitle.textContent = "";
    choicesContainer.innerHTML = "";
    currentQuestion++;

    if (questions[currentQuestion]) {
        bringQuestion(questions[currentQuestion]);
    } else {
        questionsContainer.setAttribute("class", "hide");
        finalScore.textContent = score;
        endScreen.setAttribute("class", "show");
    }
}

// Score submission Function

submitBtn.addEventListener("click", onSubmit);

function onSubmit() {


    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.push({ initials: initials.value, score: score });

    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.assign("https://lxpap.github.io/JS_Quiz_AP/highscores.html")

}