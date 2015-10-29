var Fly = function (canvas) {

  this.yPos = Math.random() * 0.25 + 0.25
  this.canvasEl = canvas
  this.xPos = (Math.random() > 0.5 ?  canvas.width : 0)
  this.dir = (this.xPos === 0 ? 1 : -1)
  this.xVel = (Math.random() > 0.5 ? 1 : 2)
}

Fly.prototype.move = function () {
  this.xPos = this.xPos + this.dir * this.xVel * 0.01
}
Fly.prototype.render = function() {
  var width = this.canvasEl.width;
  var height = this.canvasEl.height;
  var ctx = this.canvasEl.getContext("2d");
  ctx.fillStyle = "#FFF";
  ctx.fillRect(this.xPos * width, this.yPos * height,
     0.02 * width, 0.02 * height )
}
