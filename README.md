# Memroy Game Project

## Overview
Memory Game project created as a task to join Chingu's 12th voyage, it have been required as 2nd Tier prework to demonstrate mastery of 
the core web development skills - HTML, CSS, and JavaScript [More Details](https://chingu.gitbook.io/chingu-voyage-handbook/cohort-guide/pre-work/task-4-solo-project-for-new-chingus).


## About the code
By checking the same game from others, i found that the player can cheat and check html by the developer tools and use that to complete the game in less possible moves,
so i started thinking how to make that hard for them. 
The best answer i sort with, as a beginner, is "closure"! colsures was hard to me to understand without starting a project from scratch with this goal in my head.

In this code you will find me using "closure" to keep the cards data in the Deck module, and only generate the BackFace element when the player select the card
to reveal it, and then it will be remove as the card been hidden again.
 


## How To Play
This game is a browser-based card matching game that presents the player with cards arranged in a 4x4 grid. On one side of each card is a common design shared by all cards. On the other is a distinctive symbol shared by one pair of cards in the deck, thus there are 8 unique symbols shared by 8 pairs of cards in the deck.

The objective of the Memory Game is for the play to turn over pairs of matching cards across eight successive turns. In a turn if the player selects two cards whose symbols match those cards, along with those successfully matched in previous turns, will remain up. However, if the player chooses two cards with different symbols they will both be flipped back over.

The game ends when all eight pairs of matching cards have been revealed.

## Features:
  For now the game have the following featurs:
  1. Restart Button: Allow the player to restart the game any time he want.
  
  2. Moves counter: Increment anytime the player select a pair of card.
  
  3. (Futur)Timer:  A timer displaying the number of minutes and seconds that have elapsed. The timer is stopped when the player wins the game.
  
  4. (Futur)Grading: Player will recieve a grade from 3 stars to 1 star based on the moves counter, less moves more stars.
  
