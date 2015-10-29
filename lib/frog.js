var Frog = function(color) {
  this.color = color;
  this.xPos = (color === "#AAA" ? 0.6 : 0.75);
  this.dir = -1;
  this.yPos = 0.625
  this.jumping = false;
  this.licking = false;
}

Frog.prototype.move = function() {
  if (this.jumping) {
    this.jumpTime += 1;
    if (this.jumpTime === 24) {
      this.jumping = false
      this.xPos = (0.4 - 0.25 * this.dir) + (this.dir * this.jumpTime * 0.5 / 24)
      this.yPos = 0.625
      this.dir = (this.xPos < 0.5 ? 1 : -1)
    }else{
      this.yPos = Math.pow(this.jumpTime - 12, 2) / (8*48) + 0.25
      this.xPos = (0.4 - 0.25 * this.dir) + (this.dir * this.jumpTime * 0.5 / 24)
    }
    if (this.color !== "#AAA"){
      this.xPos += 0.15;
    }
  }
  if (this.licking) {
    this.lickTime += 1;
    if (this.lickTime === 13) {
      this.licking = false
    }
    this.tongueWidth = Math.pow(this.lickTime - 6, 2) / -360 + 0.15
  }
}

Frog.prototype.render = function(ctx,canvas) {
  var height = canvas.height;
  var width = canvas.width;
  ctx.fillStyle = this.color;
  if(this.jumping){
    //hanging legs on the frog
  }
  ctx.fillRect(this.xPos * width, height * this.yPos, 0.1 * width, 0.1 * height)
  if (this.licking) {
    if (this.dir === -1) {
      ctx.fillStyle = "#FF0066"
      ctx.fillRect( (this.xPos - this.tongueWidth) * width,
      (this.yPos + 0.04) * height,
      this.tongueWidth * width,
      0.02 * height)
    }else {
      ctx.fillStyle = "#FF0066"
      ctx.fillRect((this.xPos + 0.1) * width,
      (this.yPos + 0.04) * height,
      this.tongueWidth * width,
      0.02 * height)
    }
  }
}

Frog.prototype.jump = function() {
  if (!this.jumping){
    this.jumping = true;
    this.jumpTime = 0
  }
}

Frog.prototype.lick = function() {
  if (!this.licking){
    this.licking = true;
    this.lickTime = 0
  }
}

Frog.prototype.eats = function(fly) {
  if (!this.licking) {
    return false
  }
  if(this.dir === -1){
    if( fly.xPos > (this.xPos - this.tongueWidth) &&
      fly.xPos < this.xPos && fly.yPos > (this.yPos + 0.03) &&
      fly.yPos < (this.yPos + 0.06)
    ){
      console.log("true")
      return true;
    }
  }else{
    if ( fly.xPos > (this.xPos + 0.1) &&
      fly.xPos < (this.xPos + this.tongueWidth) &&
      fly.yPos > (this.yPos + 0.03) && fly.yPos < (this.yPos + 0.06)
    ){
      console.log("true")
      return true;
    }
  }
}
