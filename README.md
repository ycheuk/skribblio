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
  - changed some css styles and colors because i said so >:) (feel free to change ofc if you don't like
    colors)

1.11.2024:
emily
- ok lmk if this doesn't make any sense
- implemented "start" keyword -> if u type "start" into chat, it'll start the timer, randomly assign a player a word to draw, etc.
- if someone guesses the correct keyword, they're awarded a point and the chat announces they got it correct
- *(TODO: if u wanna make it closer to actual skribbl.io, we'd need to award points based on the order of getting it correct...)*
- pressing start again after getting it correct resets the timer and invokes a new prompt
- *(TODO: need to make something happen when no one guesses the prompt and the timer runs out... rn when it runs out it runs out)*
- *(TODO: optional, but if u type "score" it shows everyone's scores)*
