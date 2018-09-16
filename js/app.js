$(document).ready(function() {

  // Fixed variables
  const gameFrame = $(".gameFrame");
  const spawnY = "20px"; // Y position that an object will spawn at.
  const frameWidth = 850; // Width of the game frame.

  // Meteor class used to handle falling meteors and their behaviours.
  class Meteor {
    constructor() {
      switch (Math.ceil(Math.random()*3)) {
        case 1:
        this.direction = "down";
        break;

        case 2:
        this.direction = "left";
        break;

        case 3:
        this.direction = "right";
        break;
      }
      this.spawnMeteor();
    }

    // Function that spawns the meteor at a random X coordinate at a fixed Y coordinate.
    spawnMeteor() {
      var spawnX;
      switch (this.direction) {
        case "down":
          spawnX = Math.ceil(Math.random()*frameWidth);
          break;
        case "left":
          spawnX = (frameWidth / 2) + Math.ceil(Math.random()*(frameWidth/2));
          break;
        case "right":
          spawnX = Math.ceil(Math.random()*(frameWidth/2));
          break;
      }

      // Add the meteor to the frame.
      gameFrame.html("<div class=\"meteor-" + this.direction + "\" style='top:" + spawnY + ";left:" + spawnX + "px;'> </div>");
    }
  }
});
