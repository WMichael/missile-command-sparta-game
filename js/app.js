$(document).ready(function() {
  // Fixed variables
  const gameFrame = $(".gameFrame");
  const spawnY = 20; // Y position that an object will spawn at.
  const frameWidth = 850; // Width of the game frame.
  const frameHeight = 500;

  // Meteor class used to handle falling meteors and their behaviours.
  function Meteor(id) {
    this.id = id;
    this.meteor;

    // Function that spawns the meteor at a random X coordinate at a fixed Y coordinate.
    this.spawnMeteor = function() {
      var spawnX = Math.ceil(Math.random()*(frameWidth-180));
      gameFrame.append("<div id='" + id + "' class='meteor' style='top:" + spawnY + "px;left:" + spawnX + "px;'> </div>");
      this.meteor = $("#" + id);
    }

    // Function for dropping the meteor
    this.fall = function() {
      var speed = Math.ceil(Math.random()*5);
      var currentY = spawnY;
      var meteor = this.meteor; // Helper variable used so that this.meteor can be used in the setInterval function.
      setInterval(function() {
        if(currentY <= (frameHeight - 42)) {
          meteor.css("top",currentY + "px");
          currentY += speed;
        }
      },100);
    }

    this.spawnMeteor();
    this.fall();
  }

  // Testing the meteors
  for (var i = 0; i < 5; i++) {
    meteor = new Meteor(i);
  }

});
