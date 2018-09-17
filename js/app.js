$(document).ready(function() {
  // Fixed variables
  const gameFrame = $(".gameFrame");
  const spawnY = 20; // Y position that an object will spawn at.
  const frameWidth = 850; // Width of the game frame.
  const frameHeight = 500;

  // Meteor class used to handle falling meteors and their behaviours.
  function Meteor(id) {
    this.id = id; // Id attached to the Meteor element
    var meteorElement; // Had to use a var rather than this variable.

    // Function that spawns the meteor at a random X coordinate at a fixed Y coordinate.
    this.spawnMeteor = function() {
      var spawnX = Math.ceil(Math.random()*(frameWidth-180));
      gameFrame.append("<div id='" + id + "' class='meteor' style='top:" + spawnY + "px;left:" + spawnX + "px;'> </div>");
      meteorElement = $("#" + id);
    }

    // Function for dropping the meteor
    this.fall = function() {
      var speed = Math.ceil(Math.random()*5);
      var currentY = spawnY;
      setInterval(function() {
        if(currentY <= (frameHeight - 42)) {
          meteorElement.css("top",currentY + "px");
          currentY += speed;
        }
      },100);
    }

    // Removes element on click
    this.destroy = function() {
      meteorElement.remove();
    }

    this.spawnMeteor();
    meteorElement.click(this.destroy); // Event listener for the object
    this.fall();
  }

  // Testing the meteors
  for (var i = 0; i < 5; i++) {
    meteor = new Meteor(i);
    console.log(meteor);
  }

});
