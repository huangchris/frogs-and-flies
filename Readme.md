Frogs and flies!

2 players

pos p2 = pos p1.offset(x)

movement parabola
  "boing" sound?

Frog orientation / jumping or sitting images.

Tongue iterates over array of lengths.

score points when tongue overlaps Fly

fly movement = ?
  constant motion left-to-right or r-to-l, with random up/down velocity change each render(small magnitude)

keymaster (or might be simple enough to do document.on(keypress))
left arrow keys all initiate jump. (lru), down, right command=initiate lick
asdf, space p1

options for pvp, pve ?


day to night timer.
  Firefly drags "gameOver" onto screen

OOP
  React wrapper:
    1player / 2 player, begin/restart

    keybindings/aiclass:
      AI calls frog.jump/frog.lick at random.

  Game:
      Timer, color palettes, render Bkg.
      Bkg.render(colors);
      calls frog.render, fly.render
```
  setInterval (if(!timer.over){
    timer += 1
    frogs.move()
    flies.move()
    checkCatches()
      increment scores
    bkg.render()
      includes scores at top
    frogs.render()
    flies.render()
  }else{
    clearInterval();
    GameOverAnimation();
      callback.endGame();
  })
```
