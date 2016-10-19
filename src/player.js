"use strict";

const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Player class
 */
module.exports = exports = Player;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Player(position, canvas) {
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
  this.bullets = [];
  this.speed = 0.2;
  
  this.angle = 0;
  this.radius  = 64;
  this.thrusting = false;
  this.steerLeft = false;
  this.steerRight = false;
  //this.bullets n
  var lazerSound = new Audio();
  lazerSound.src = 'lazer-beam.wav';
  var self = this;
  window.onkeydown = function(event) {
    switch(event.key) {
      case 'ArrowUp': // up
      case 'w':
        self.thrusting = true;
        break;
      case 'ArrowLeft': // left
      case 'a':
        self.steerLeft = true;
        break;
      case 'ArrowRight': // right
      case 'd':
        self.steerRight = true;
        break;
	  case 't':
	  
	  self.position.x =Math.floor(Math.random()*1000)%self.worldWidth
	  self.position.y =Math.floor(Math.random()*1000)%self.worldHeight
	  
	  self.velocity.x =0
	  self.velocity.y =0
	  
	  break;
	  case 'x':
	  case " ":
	  lazerSound.play();                 //////////////////////////////THIS SHOULD BE IN!!	
	  var bpos = {
		  /*
		  x: self.position.x-20*Math.cos(self.angle),
		  y: 100*Math.sin(self.angle)+self.position.y
		  */
		  
		  x: self.position.x - 20*Math.sin(self.angle),
		  y: self.position.y - 20* Math.cos(self.angle)
	  };
	  var bvel= {
		  x: -10*Math.sin(self.angle),
		  y: -10* Math.cos(self.angle)
	  };
	  
	  var bullet= {
		  position:bpos,
		  velocity:bvel,
		  angle: self.angle
	  };
	  //console.log(bullet);
	  
		self.bullets.push(bullet);
	  break;
	  
	  case 'g':
	  console.log(self.bullets);
    }
  }

  window.onkeyup = function(event) {
    switch(event.key) {
      case 'ArrowUp': // up
      case 'w':
        self.thrusting = false;
        break;
      case 'ArrowLeft': // left
      case 'a':
        self.steerLeft = false;
        break;
      case 'ArrowRight': // right
      case 'd':
        self.steerRight = false;
        break;
	  
    }
  }
}



/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Player.prototype.update = function(time) {
  // Apply angular velocity
  if(this.steerLeft) {
    this.angle += time * 0.005;
  }
  if(this.steerRight) {
    this.angle -= 0.1;
  }
  // Apply acceleration
  if(this.thrusting) {
    var acceleration = {
      x: Math.sin(this.angle)*this.speed,
      y: Math.cos(this.angle)*this.speed
    }
	if (this.velocity.x - acceleration.x > -6 && this.velocity.x - acceleration.x < 6)
    this.velocity.x -= acceleration.x;
	if (this.velocity.y - acceleration.y > -6 && this.velocity.y - acceleration.y < 6)
    this.velocity.y -= acceleration.y;
  }
  // Apply velocity
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
  // Wrap around the screen
  if(this.position.x < 0) this.position.x += this.worldWidth;
  if(this.position.x > this.worldWidth) this.position.x -= this.worldWidth;
  if(this.position.y < 0) this.position.y += this.worldHeight;
  if(this.position.y > this.worldHeight) this.position.y -= this.worldHeight;
  
  for (var i = 0; i < this.bullets.length ;i++ ){
	  this.bullets[i].position.x += this.bullets[i].velocity.x;
	  this.bullets[i].position.y += this.bullets[i].velocity.y;
	  
	  var t = this.bullets[i].position.x < 0 || this.bullets[i].position.x > this.worldWidth ||
			  this.bullets[i].position.y < 0||this.bullets[i].position.y > this.worldHeight;
	  if (t)
	  {
		this.bullets.splice(i, 1);  
		i--;
	  }
	//console.log(t);
  
	  
	  
  }
}

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Player.prototype.render = function(time, ctx) {
  ctx.save();

  
  // Draw player's ship
  ctx.translate(this.position.x, this.position.y);
  ctx.rotate(-this.angle);
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(-10, 10);
  ctx.lineTo(0, 0);
  ctx.lineTo(10, 10);
  ctx.closePath();
  ctx.strokeStyle = 'white';
  ctx.stroke();

  // Draw engine thrust
  if(this.thrusting) {
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(5, 10);
    ctx.arc(0, 10, 5, 0, Math.PI, true);
    ctx.closePath();
    ctx.strokeStyle = 'orange';
    ctx.stroke();
  }
  ctx.restore();
  ctx.save();
  for (var i = 0; i < this.bullets.length ;i++ ){
	  ctx.fillStyle = 'white';
	  ctx.fillRect(this.bullets[i].position.x,this.bullets[i].position.y, 3,3);
  }
  
  ctx.restore();
}
