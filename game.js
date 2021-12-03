var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var keyHandler = false;
var level = 0;
var userClickedPattern = [];


$(document).keypress(function() {
  if (!keyHandler) {
    $("#level-title").text("Level " + level);
    newSequence();
    keyHandler = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswers(userClickedPattern.length - 1);
});

function checkAnswers(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        newSequence();
      }, 1000);
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

function newSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColor);
};

function animatePress(currentColor) {
  var activeButton = $("#" + currentColor);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
};

function makeSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  keyHandler = false;
}
