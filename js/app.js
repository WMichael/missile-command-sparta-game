$(document).ready(function() {
  // Fixed variables
  const homeDiv = $("#homeDiv");
  const gameDiv = $("#gameDiv");
  const settingsDiv = $("#settingsDiv");
  const gameFrame = $(".gameFrame");
  const gameFrameText = $("#gameFrameText");
  const score = $("#score");
  const startButton = $("#startButton");
  const settingsButton = $("#settingsButton");
  const returnHomeButtonFrmGame = $("#returnHomeButtonFrmGame");
  const returnHomeButtonFrmSettings = $("#returnHomeButtonFrmSettings");
  const spawnY = 20; // Y position that an object will spawn at.
  const frameWidth = 850; // Width of the game frame.
  const frameHeight = 500;
  const roundArray = [5,10,20]; // Number of meteors per round.
  var currentMeteors = 0;

  // Meteor object constructor used to handle falling meteors and their behaviours.
  function Meteor(id) {
    this.id = id; // id attached to the Meteor element
    var meteorElement; // Had to use a var rather than this variable.
    var destroyed = false; // checks whether player has destroyed the meteor.

    // Function that spawns the meteor at a random X coordinate at a fixed Y coordinate.
    this.spawnMeteor = function() {
      var spawnX = Math.ceil(Math.random()*(frameWidth-180));
      gameFrame.append("<div id='" + id + "' class='meteor' style='top:" + spawnY + "px;left:" + spawnX + "px;'> </div>");
      meteorElement = $("#" + id);
      currentMeteors++;
    }

    // Function for dropping the meteor
    this.fall = function() {
      var speed = Math.ceil(Math.random()*5);
      var currentY = spawnY;
      // Every 100ms the object moves downwards until it reaches the bottom, at the bottom the interval is cleared and a score is taken away.
      var interval = setInterval(function() {
          meteorElement.css("top",currentY + "px");
          currentY += speed;
        if (currentY >= (frameHeight - 42)) {
          window.clearInterval(interval);
          meteorElement.css("visibility","hidden");
          if(!destroyed) {
            setScore(-50); // Deducts 50 points from the current score.
            currentMeteors--;
          }
        }
      },100);
    }

    // Removes element on click
    this.destroy = function() {
      meteorElement.css("visibility","hidden");
      setScore(50);
      destroyed = true;
      currentMeteors--;
    }

    // Methods that are called when this object is created.
    this.spawnMeteor();
    meteorElement.click(this.destroy); // Event listener for the object
    this.fall();
  }

  // Adds or removes from the current score.
  function setScore(num) {
    var currentScore = score.text();
    score.html(parseInt(currentScore) + parseInt(num));
  }

  function clearScore() {
    score.html("0");
  }

  function startRound(meteorAmt) {
    var randomTime = Math.ceil(Math.random()*6000)+1000;
    var i = 0;
    var interval = setInterval(function(){

      //  Loop through meteors
      if(i <= meteorAmt) {
        meteor = new Meteor(i);
        console.log("Meteor " + i + " created.");
        console.log(currentMeteors);
        i++;
      }

      //Set Random interval
      randomTime = Math.ceil(Math.random()*6000)+1000;

    },randomTime);
  }

  function startGame() {
    startRound(roundArray[0]);
  }

  // Initial setup
  startButton.click(function(){
    homeDiv.css("display","none");
    gameDiv.css("display","block");
    // startGame();
  });

  settingsButton.click(function() {
    settingsDiv.css("display","block");
    homeDiv.css("display","none");
    gameDiv.css("display","none");
  })

  returnHomeButtonFrmGame.click(function(){
    homeDiv.css("display","block");
    gameDiv.css("display","none");
  });

  returnHomeButtonFrmSettings.click(function(){
    homeDiv.css("display","block");
    settingsDiv.css("display","none");
  });

  // Test game
  startGame();

});
