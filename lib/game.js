var Game = function(players, callback) {
  this.createPlayers(players);
  this.endGameCallback = callback;
  // this.color_palette = [];
  this.color_palette = ["#33CCFF"]
  this.canvasEl = document.getElementById("canvas");
  this.context = this.canvasEl.getContext("2d");
  this.scores = [0,0];
  this.flies = [];
  this.NIGHT_TIME = 6 * 720;
}
Game.prototype.createPlayers = function (num) {
  this.frogs = [new Frog("#AAA"), new Frog("#FF0B0B")];
  if(num === 1) {
    this.AIPlayer = new AIPlayer();
  }
};

Game.prototype.addFly = function () {
  this.flies.push(new Fly())
};

Game.prototype.run = function() {
  this.timer = 0
  this.timerId = setInterval(function(){
    this.timer += 1;
    this.checkTime();
    if(this.AIPlayer){
      this.AIPlayer.move(this.frogs[1]);
    }
    if (this.timer < this.NIGHT_TIME) {
      this.context.clearRect(0,0,this.canvasEl.width,this.canvasEl.height)
      this.renderBackground();
      if(Math.random() < 0.02){
        this.flies.push(new Fly(this.canvasEl));
      }
      this.frogs.forEach(function(frog) {
        frog.move();
        frog.render(this.context, this.canvasEl);
      }.bind(this));
      this.flies.forEach(function(fly) {
        fly.move();
        if(fly.xPos < -.1 || fly.xPos > 1.1 ){
          fly.removable = true;
        }
      });
      this.checkCatches();
      this.flies.forEach(function(fly) {
        fly.render(this.context, this.canvasEl);
      }.bind(this));
    } else {
      clearInterval(this.timerId)
      this.animateOver();
    }
  }.bind(this),1000/24)
};

Game.prototype.checkTime = function () {
  // when timer hits checkpoints (approximately 5x30 second intervals, so
  // 720 * i), update color_palette with MORNING,NOON,EVENING,DUSK,NIGHT palette
  var COLORS = [["#33CCFF", "#0808FF", "#00CC00"],
                ["#0099FF", "#0808FF", "#00CC00"],
                ["#FF6600", "#000099", "#00CC00"],
                ["#000099", "#000028", "#00CC00"],
                ["#000", "#000", "#00CC00"]]
  if(this.timer === 1) {
    this.color_palette = COLORS[0]
  }
  if (this.timer % 720 === 0) {
    this.color_palette = COLORS[this.timer/720]
  }
};

Game.prototype.checkCatches = function () {
  this.flies.forEach(function(fly){
    for (var i = 0; i < 2; i++) {
      if(this.frogs[i].eats(fly)){
        fly.removable = true;
        this.scores[i] += 2;
      }
    }
  }.bind(this))
  for (var i = 0; i < this.flies.length; i++) {
    if(this.flies[i].removable) {
      this.flies.splice(i,1);
      i = -1;
    }
  }
};

Game.prototype.renderBackground = function () {
  // draw a pretty picture on the background, using the color_palette
  this.canvasEl.height = window.innerHeight * 0.5;
  this.canvasEl.width = window.innerHeight * 0.5;
  var width = this.canvasEl.width;
  var height = this.canvasEl.height;
  this.context.fillStyle = this.color_palette[0];
  this.context.fillRect(0,0, width, height * 0.6);
  this.context.fillStyle = this.color_palette[1];
  this.context.fillRect(0, height * 0.6, width, height * 0.4);
  this.context.fillStyle = this.color_palette[2];
  this.context.fillRect(width * 0.1, height * 0.6, width * 0.3, height * 0.2)
  this.context.fillRect(width * 0.6, height * 0.6, width * 0.3, height * 0.2)


};

Game.prototype.animateOver = function () {
  var i = 0;
  // var interval = setInterval({
    // if (i = //some centering value){
    //   clearInterval(interval);
      // this.endGameCallback();
    // }else{
    // i += 1
    //   this.context.clearContext();
    //   this.context.fillRect(// all black)
    //   this.context.fillStyle = "white"
    //   this.context.fillRect(//a firefly at width - i)
    //   this.context.writeText(width - i, "game Over")
    // }
  // }.bind(this), 1000/60)
};


AIPlayer = function () {}

AIPlayer.prototype.move = function (frog) {
  if(!frog.jumping && Math.random() > 0.98) {
    frog.jump();
  }
  if(frog.jumping && !frog.licking && Math.random() > 0.4){
    frog.lick();
  }
}
