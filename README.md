# Sparta Game Project: Missile Command
### Missile Command game for my Sparta Game Project.
This is a HTML5 / JS / CSS game. The idea of this game came from the old Atari game of the same name.

The purpose of the game is to be quick enough to destroy the increasingly fast incoming meteors that are heading for the home base.

## Instructions
To destroy the meteors you have to left-click on them. Destroying a meteor will earn you 50 points but missing a meteor will lose you 50 points and 10% from your defence.

In order to win a level you must have 1 point or more and have a defence level of over 1%, getting a defence level of under 1% will instantly lose you the level.

## Functionality
The game uses many divs over one page these divs represent different views of the game e.g home, game, leaderboard and settings. When one div is shown then all other divs are hidden.

The game consists of multiple levels each with increasingly lower times between meteors and increasingly higher speeds and amounts of meteors.

The game has a leaderboard which takes the score from a previous game. These scores are shown in descending order with the player's name.

## Current issues
- Intermittently meteors will spawn at the top of the game but will be stuck. This will cause the user to lose points/defence and possibly lose the level.

## Demo
[Link to game](https://wmichael.github.io/missile-command-sparta-game/)
