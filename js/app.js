$(document).ready(function() {

  // Fixed variables
  const gameFrame = $(".gameFrame");
  const spawnY = "20px"; // Y position that an object will spawn at.
  const frameWidth = 850; // Width of the game frame.

  // Meteor class used to handle falling meteors and their behaviours.
  function Meteor() {

    // Function that spawns the meteor at a random X coordinate at a fixed Y coordinate.
    this.spawnMeteor = function() {
      var spawnX = Math.ceil(Math.random()*(frameWidth-80));
      gameFrame.append("<div class='meteor' style='top:" + spawnY + ";left:" + spawnX + "px;'> </div>");
    }

    this.spawnMeteor();
  }
});
