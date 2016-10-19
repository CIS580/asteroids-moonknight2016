"use strict";

const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Astro class
 */
module.exports = exports = Astro;

/**
 * @constructor Astro
 * Creates a new Astro object
 * @param {Postition} position object specifying an x and y
 */
function Astro(position, canvas) {
  this.worldWidth = canvas.width;
  this.worldHeight = canvas.height;
  this.state = "idle";
  this.position = {
    x: position.x,
    y: position.y
  };
  this.velocity = {
    x: 0,
    y: 0
  }
  
  
  this.speed = 0.2;
  this.size = 4;
  
  this.angle = 0;
  this.radius  = 64;
  this.thrusting = false;
  this.steerLeft = false;
  this.steerRight = false;

  var self = this;
 

  
}



/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Astro.prototype.update = function(time) {
  // Apply angular velocity
  
  // Apply acceleration
  
  // Apply velocity
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
  // Wrap around the screen
  if(this.position.x < 0) this.position.x += this.worldWidth;
  if(this.position.x > this.worldWidth) this.position.x -= this.worldWidth;
  if(this.position.y < 0) this.position.y += this.worldHeight;
  if(this.position.y > this.worldHeight) this.position.y -= this.worldHeight;
}

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Astro.prototype.render = function(time, ctx) {
  ctx.save();

  // Draw player's ship
  ctx.translate(this.position.x, this.position.y);
  ctx.rotate(-this.angle);
  /*
  ctx.beginPath();
  ctx.moveTo(0, -7*this.size);
  ctx.lineTo(-12*this.size, 7*this.size);
  ctx.lineTo(0, 7*3*this.size);
  ctx.lineTo(12*this.size, 7*this.size);
  ctx.closePath();
  */
  ctx.arc(0,0,15*this.size,0,2*Math.PI);
  ctx.closePath();
  ctx.fillStyle = 'grey';
  ctx.fill();

  // Draw engine thrust
  
  ctx.restore();
}
