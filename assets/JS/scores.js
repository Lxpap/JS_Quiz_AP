var highscoresList = document.getElementById("highscores");
var clearScores = document.getElementById("clear");



function highScores() {


    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    highscoresList.innerHTML = " ";

    for (var i = 0; i < highscores.length; i++) {
        var entry = highscores[i];
        var listItem = document.createElement("li");
        listItem.textContent = entry.initials + ": " + entry.score;
        highScoresEl.appendChild(listItem);
    }

    clearScores.addEventListener("click", function () {
        highScoresList.innerHTML = "";
        localStorage.removeItem("highscores");
    })

}
highScores()