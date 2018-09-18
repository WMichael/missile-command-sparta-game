$(document).ready(function() {
  // Views
  const homeDiv = $("#homeDiv");
  const gameDiv = $("#gameDiv");
  const settingsDiv = $("#settingsDiv");

  // Sounds
  const winSound = new sound("sounds/win.wav");
  const loseSound = new sound("sounds/lose.mp3");

  // Game div elements
  const gameFrame = $(".gameFrame");
  const endLevelDiv = $("#endLevel");
  const endLevelText = $("#endLevelText");
  const nextLevelBtn = $("#nextLevelBtn");
  const playAgainBtn = $("#playAgainBtn");
  const score = $("#score");
  const defence = $("#defenceLevel");

  // Game frame
  const frameWidth = 850; // Width of the game frame.
  const frameHeight = 500;

  // Game variables
  const spawnY = 20; // Y position that an object will spawn at.
  const roundArray = [10,30,40]; // Number of meteors per round.
  var currentIndex = 0; // Start of each round current index is incremented.
  var meteorsPlaced = 0; // Reset after each round.
  var currentMeteors = 0;
  var decreaseDefenceAmt = 100 / (roundArray[currentIndex]/2); // Amt to decrease defence by.
  var gameOver = false;

  // Meteor object constructor used to handle falling meteors and their behaviours.
  function Meteor(id) {
    var meteorElement; // Had to use a var rather than this variable.
    var destroyed = false; // checks whether player has destroyed the meteor.

    // Function that spawns the meteor at a random X coordinate at a fixed Y coordinate.
    this.spawnMeteor = function() {
      var spawnX = Math.ceil(Math.random()*(300));
      gameFrame.append("<div id='" + id + "' class='meteor' style='top:" + spawnY + "px;left:" + spawnX + "px;'> </div>");
      meteorElement = $("#" + id);
      currentMeteors++;
    }

    // Function for dropping the meteor
    this.fall = function() {
      var speed = Math.ceil(Math.random()*15);
      var currentY = spawnY;
      // Every 100ms the object moves downwards until it reaches the bottom, at the bottom the interval is cleared and a score is taken away.
      var interval = setInterval(function() {
          meteorElement.css("top",currentY + "px");
          currentY += speed;
        if (currentY >= (frameHeight - 60)) {
          window.clearInterval(interval);
          meteorElement.css("visibility","hidden");
          if(!destroyed && gameOver != true) {
            setScore(-50); // Deducts 50 points from the current score.
            decreaseDefence(); // Decreases Defence
            currentMeteors--;

            // Checks whether this meteor is the last one of the round.
            if (((meteorsPlaced == roundArray[currentIndex]) && currentMeteors == 0) || parseInt(defence.text()) <= 0) {
              gameOver = true; // clears Interval in the start round function.
              endLevel();
            }
          }
        }
      },100);
    }

    // Removes element on click
    this.destroy = function() {
      meteorElement.css("visibility","hidden");
      setScore(50);
      var meteorExplosion = new sound("sounds/explosion.mp3");
      meteorExplosion.play();
      destroyed = true;
      currentMeteors--;

      // Checks whether this meteor is the last one of the round.
      if ((meteorsPlaced == roundArray[currentIndex]) && currentMeteors == 0) {
        gameOver = true; // clears Interval in the start round function.
        endLevel();
      }
    }

    // Methods that are called when this object is created.
    meteorsPlaced++;
    console.log(meteorsPlaced + " / " + roundArray[currentIndex]);
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
  }

  function clearScore() {
    score.html("0");
  }

  // Starts round of meteors taking in the amount of meteors to be spawned.
  function startLevel(meteorAmt) {
    var randomTime = Math.ceil(Math.random()*2000)+1000;
    var i = 0;
    var interval = setInterval(function(){
      // If game is over then no more meteors spawn.
      if (gameOver == true) {
        console.log("Interval clear");
        $(".meteor").remove();
        window.clearInterval(interval);
      }
      else {

        //  Loop through meteors
        if(i < meteorAmt) {
          meteor = new Meteor(i);
          i++;
        }

        //Set Random interval
        randomTime = Math.ceil(Math.random()*2000)+1000;
      }
    },randomTime);
  }

  // Function called when all meteors have been placed and none are currently on the board.
  // Called from the last meteor.
  function endLevel() {
    console.log("End level function called");
    $(".base").css("display","none");

    score.html("0");
    defence.html("100");
    if (parseInt(score.text()) > 0 && parseInt(defence.text()) > 0) {
      endLevelDiv.css("display","block");
      endLevelText.html("<h1>Level Success!</h1><br><h2>Points: " + score.text() + " Defence: " + defence.text() + "%</h2>");
      nextLevelBtn.css("display","block");
      winSound.play();
    }
    else {
      endLevelDiv.css("display","block");
      endLevelText.html("<h1>You lost!</h1>");
      playAgainBtn.css("display","block");
      loseSound.play();
    }

    // Reset variables
    gameOver = true;
    meteorsPlaced = 0;
    currentMeteors = 0;
    // currentIndex++;
  }

  function startGame() {
    startLevel(roundArray[0]);
  }

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

  // Initial setup
  $("#startButton").click(function(){
    homeDiv.css("display","none");
    gameDiv.css("display","block");
    // startGame();
  });

  $("#settingsButton").click(function() {
    settingsDiv.css("display","block");
    homeDiv.css("display","none");
    gameDiv.css("display","none");
  })

  $("#returnHomeButtonFrmGame").click(function(){
    homeDiv.css("display","block");
    gameDiv.css("display","none");
  });

  $("#returnHomeButtonFrmSettings").click(function(){
    homeDiv.css("display","block");
    settingsDiv.css("display","none");
  });

  // Test game
  startGame();

});
