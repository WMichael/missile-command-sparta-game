$(document).ready(function() {
  // Views
  const homeDiv = $("#homeDiv");
  const gameDiv = $("#gameDiv");
  const settingsDiv = $("#settingsDiv");
  const leaderboardDiv = $("#leaderboardDiv");

  // Sounds
  var soundEffects = true;
  var backgroundMusic = true;
  const winSound = new sound("sounds/win.wav");
  const loseSound = new sound("sounds/lose.mp3");

  // Game div elements
  const gameFrame = $(".gameFrame");
  const endLevelDiv = $("#endLevel");
  const endLevelText = $("#endLevelText");
  const endGameDiv = $("#endGame");
  const nextLevelBtn = $("#nextLevelBtn");
  const playAgainBtn = $("#playAgainBtn");
  const score = $("#score");
  const defence = $("#defenceLevel");

  // Game frame
  const frameHeight = 500;

  // Game variables
  // const spawnY = 0; // Y position that an object will spawn at.
  var spawnY = gameFrame.offset().top; // finds the top of the gameframe
  const roundArray = [[5,5,10,1500,2000],[10,5,13,1000,1500],[15,10,15,1000,1200]];
  // roundArray - 0: Amt of Meteors 1: Min Speed 2: Max Speed 3: Min Time 4: Max Time
  var currentIndex = 0; // Start of each round current index is incremented.
  var meteorsPlaced = 0; // Reset after each round.
  var currentMeteors = 0;
  var decreaseDefenceAmt = 10; // Amt to decrease defence by.
  var gameOver = false;

  // Leaderboard and current player score.
  var leaderboard = [];
  var playerScore = 0;

  // Meteor object constructor used to handle falling meteors and their behaviours.
  function Meteor(id) {
    var meteorElement; // Had to use a var rather than this variable.
    var destroyed = false; // checks whether player has destroyed the meteor.

    // Function that spawns the meteor at a random X coordinate at a fixed Y coordinate.
    this.spawnMeteor = function() {
      var spawnX = Math.ceil((Math.random()*30)+30); // SpawnX at a random percentage of the width.
      console.log(spawnX + "%");
      gameFrame.append("<div id='" + id + "' class='meteor' style='top:" + spawnY + "px;left:" + spawnX + "%;'> </div>");
      meteorElement = $("#" + id);
      currentMeteors++;
    }

    // Function for dropping the meteor
    this.fall = function() {
      var speed = Math.ceil((Math.random()*roundArray[currentIndex][2])+roundArray[currentIndex][1]);
      var currentY = spawnY;
      // Every 100ms the object moves downwards until it reaches the bottom, at the bottom the interval is cleared and a score is taken away.
      var interval = setInterval(function() {
          meteorElement.css("top",currentY + "px");
          currentY += speed;
        if (currentY >= (spawnY + frameHeight - 75)) {
          window.clearInterval(interval);
          // meteorElement.css("visibility","hidden");
          meteorElement.remove();
          if(!destroyed && gameOver != true) {
            setScore(-50); // Deducts 50 points from the current score.
            decreaseDefence(); // Decreases Defence
            currentMeteors--;

            // Checks whether this meteor is the last one of the round.
            if (((meteorsPlaced == roundArray[currentIndex][0]) && currentMeteors == 0) || parseInt(defence.text()) <= 1) {
              gameOver = true; // clears Interval in the start round function.
              endLevel();
            }
          }
        }
      },100);
    }

    // Removes element on click
    this.destroy = function() {
      meteorElement.remove();
      // meteorElement.css("visibility","hidden");
      setScore(50);
      if (soundEffects) {
        var meteorExplosion = new sound("sounds/explosion.mp3");
        meteorExplosion.play();
      }
      destroyed = true;
      currentMeteors--;

      // Checks whether this meteor is the last one of the round.
      if ((meteorsPlaced == roundArray[currentIndex][0]) && currentMeteors == 0) {
        gameOver = true; // clears Interval in the start round function.
        endLevel();
      }
    }

    // Methods that are called when this object is created.
    meteorsPlaced++;
    console.log(meteorsPlaced + " / " + roundArray[currentIndex][0]);
    this.spawnMeteor();
    meteorElement.click(this.destroy); // Event listener for the object
    this.fall();
  }

  // Adds or removes from the current score.
  function setScore(num) {
    var currentScore = score.text();
    score.html(parseInt(currentScore) + parseInt(num));
  }

  function decreaseDefence() {
    defence.html(parseInt(defence.text()) - decreaseDefenceAmt);
    // Change opacity of base imgs depending on Defence percentage.
    $(".base img").css("opacity","0."+defence.text());
  }

  function clearScore() {
    score.html("0");
  }

  // Starts round of meteors taking in the amount of meteors to be spawned.
  function startLevel() {
    console.clear();
    console.log("Total Score: " + playerScore);
    console.log("Level " + (currentIndex + 1));
    console.log("Amount of meteors: " + roundArray[currentIndex][0]);
    console.log("Min speed of meteor: " + roundArray[currentIndex][1]);
    console.log("Max speed of meteor: " + roundArray[currentIndex][2]);
    console.log("Min time between meteors: " + roundArray[currentIndex][3]);
    console.log("Max time between meteors: " + roundArray[currentIndex][4]);

    var randomTime = Math.ceil((Math.random()*roundArray[currentIndex][4])+roundArray[currentIndex][3]);
    var i = 0;
    var interval = setInterval(function(){
      // If game is over then no more meteors spawn.
      if (gameOver == true) {
        $(".meteor").remove();
        window.clearInterval(interval);
      }
      else {

        //  Loop through meteors
        if(i < roundArray[currentIndex][0]) {
          meteor = new Meteor(i);
          i++;
        }

        //Set Random interval
        randomTime = Math.ceil(Math.random()*roundArray[currentIndex][4])+roundArray[currentIndex][3];
      }
    },randomTime);
  }

  // Function called when all meteors have been placed and none are currently on the board.
  // Called from the last meteor.
  function endLevel() {

    // Reset opacity and hide the base.
    $(".base img").css("opacity","1");
    $(".base").hide();

    // Whether player has won or lost
    if (parseInt(score.text()) > 0 && parseInt(defence.text()) > 1) {
      // Whether its the end of the game
      if(currentIndex != (roundArray.length - 1)) {
        endLevelDiv.show();
        endLevelText.html("<h1>Level " + (currentIndex + 1) + " Success!</h1><br><h2>Points + Defence Bonus: " + (parseInt(score.text()) + parseInt(defence.text())) + "</h2>");
        nextLevelBtn.show();
        if (soundEffects) {
          winSound.play();
        }
      }
      else {
        playerScore = playerScore + (parseInt(score.html()) + parseInt(defence.html()));
        endGameDiv.show();
        var playerName = prompt("Game Over - What's your name?");
        $("#finalScore").html(playerName + " " + playerScore);
        leaderboard.push([playerName,playerScore]); // Push name and score to leaderboard.
        localStorage.setItem("leaderboard",JSON.stringify(leaderboard)); // Put leaderboard into localStorage.
      }
    }
    else {
      endLevelDiv.css("display","block");
      endLevelText.html("<h1>You lost!</h1>");
      nextLevelBtn.hide();
      playAgainBtn.show();
      if (soundEffects) {
        loseSound.play();
      }
    }

    // Reset variables
    gameOver = true;
    meteorsPlaced = 0;
    currentMeteors = 0;
  }

  function startGame() {
    gameOver = false;
    startLevel();
    $(".base").show();
  }

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.5;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
  }

  $("#startButton").click(function(){
    homeDiv.css("display","none");
    gameDiv.css("display","block");
    endLevelDiv.css("display","none");
    endGameDiv.css("display","none");
    spawnY = gameFrame.offset().top; // declared again since start button shows the game div.
    startGame();
  });

  $("#leaderboardButton").click(function() {

    // Sort leaderboard array in ascending order.
    leaderboard.sort(function(a,b){
      return b[1] - a[1];
    });

    // Clears table and then adds each score to the table.
    $("#leaderboardTable").html("");
    for (var i = 0; i < leaderboard.length; i++) {
      $("#leaderboardTable").append("<tr><td>" + leaderboard[i][0] + "</td><td>" + leaderboard[i][1] + "</td></tr>");
    }
    homeDiv.css("display","none")
    leaderboardDiv.css("display","block");

  });

  $("#settingsButton").click(function() {
    settingsDiv.css("display","block");
    homeDiv.css("display","none");
    gameDiv.css("display","none");
  })

  $("#returnHomeButtonFrmGame").click(function(){

    // Finish current game
    gameOver = true;
    currentIndex = 0;
    meteorsPlaced = 0;
    currentMeteors = 0;
    score.html("0");
    defence.html("100");
    $("#cLevel").html(currentIndex + 1);
    $(".base img").css("opacity","1");

    homeDiv.css("display","block");
    gameDiv.css("display","none");
  });

  $(".returnHomeButton").click(function(){
    homeDiv.css("display","block");
    settingsDiv.css("display","none");
    leaderboardDiv.css("display","none");
    endLevelDiv.css("display","none");
  });

  $("#checkSoundEffects").click(function() {
    if ($("#checkSoundEffects:checked").length > 0) {
      soundEffects = true;
    }
    else {
      soundEffects = false;
    }
  })

  $("#checkBackgroundMusic").click(function() {
    if ($("#checkBackgroundMusic:checked").length > 0) {
      backgroundMusic = true;
    }
    else {
      backgroundMusic = false;
    }
  })

  // End level event listeners
  nextLevelBtn.click(function(){
    playerScore = playerScore + (parseInt(score.html()) + parseInt(defence.html()));
    console.log(playerScore);
    score.html("0");
    defence.html("100");
    currentIndex++;
    $("#cLevel").html(currentIndex + 1);
    endLevelDiv.hide();
    startGame();
  });

  playAgainBtn.click(function(){
    score.html("0");
    defence.html("100");
    endLevelDiv.hide();
    startGame();
  })

  // Get leaderboard array from localStorage.
  if (JSON.parse(localStorage.getItem("leaderboard") != null)) {
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
  }
});
