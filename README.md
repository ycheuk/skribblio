# skribblio

Updates
--------
1.10.2024:
Yik Yin:
  - added a "[user] has joined!" message
  - added timer functions updateTimer() and startTimer()
  - centered .palette and .drawingCanvas (because it started going off screen for me for some reason)
  - added a (short) array of words
  - added a chooseRandomWord() function to generate a random word, storing it in "wordChosen" for future
  - added joinedPlayers() variable to keep track of who joined (also considers the case when someone
    disconnects as well)
  - added chooseRandomPlayer() function to choose a random player (for picking a player to draw for future)
    and stores it in variable chosenPlayer
