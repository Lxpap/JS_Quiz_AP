var highscoresList = document.getElementById("highscores");
var clearScores = document.getElementById("clear");

// Function to add, display and clear high scores

function highScores() {

    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    highscoresList.innerHTML = " ";

    for (var i = 0; i < highscores.length; i++) {
        var scoreEntry = highscores[i];
        var listItem = document.createElement("li");
        listItem.textContent = scoreEntry.initials + ": " + scoreEntry.score;
        highscoresList.appendChild(listItem);
    }

    clearScores.addEventListener("click", function () {
        highscoresList.innerHTML = "";
        localStorage.removeItem("highscores");
    })

}
highScores()