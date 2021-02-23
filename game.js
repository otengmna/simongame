var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelCount = 0;

function nextSequence() {
  userClickedPattern = [];
  levelCount++;
  $("h1").html("Level " + levelCount);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  buttonAnimation(randomChosenColour);
}


$(document).on("keypress", function() {
  if (gamePattern.length === 0) {
    nextSequence();
  }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  buttonAnimation(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function buttonAnimation(randomColour) {
  $("#" + randomColour).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomColour + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").html("Look At You.<br> You Are A Failure!.<br> Press any key to restart");
    $("body").toggleClass("game-over");
    setTimeout(function() {
      $("body").toggleClass("game-over");
    }, 100);
    var gameOverAudio = new Audio("sounds/wrong.mp3");
    gameOverAudio.play();
    $(document).keypress(function() {
      location.reload();
    });
  }
}








// end
