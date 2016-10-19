(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict;"

/* Classes */
const Game = require('./game.js');
const Player = require('./player.js');
const Astro = require('./astro.js');
const Vector = require('./vector.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var player = new Player({x: canvas.width/2, y: canvas.height/2}, canvas);
var astros = [];
var state = 'new level screen';

var timer = 0;
var passedLevelTimer = 0;
var level = 1;
var lives = 3;
var score = 0;
var startNewLevelTimer = 0;
var diedScreenTimer = 0;

var astroCollidSound = new Audio();
  astroCollidSound.src = 'window-thump.wav';
  
var deathSound = new Audio();
deathSound.src = 'explosion00.wav';
/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
	
	timer++;
	//console.log(astros);
	switch(state)
	{
		case 'before game':
		
		for (var i = 0; i < level+2;i++)
		{
			astros[i]= new Astro({x: Math.floor(Math.random()*1000)%(canvas.width/3), y: Math.floor(Math.random()*1000)%(canvas.height/3)}, canvas);
			astros[i].size = Math.floor(Math.random()*100)%4+1;
			astros[i].velocity.x =Math.floor(Math.random()*100)%4+1;
			
			var sign = Math.floor(Math.random()*100)%2;
			
			if (sign == 0)
				sign = 1;
			else 
				sign = -1;
			astros[i].velocity.x *=sign;
				
			astros[i].velocity.y =Math.floor(Math.random()*100)%5;
			if (i>0)
			{
				for (j=0;j<i-1;j++)
				{
					var distSquared = 
					Math.pow(astros[i].position.x - astros[j].position.x, 2) +
					Math.pow(astros[i].position.y - astros[j].position.y, 2);
					var r1 = astros[i].size*15;
					var r2 = astros[j].size*15;
					r = r1*r1+r2*r2;
					
					var t = distSquared < r;
					if (t)
					{
						
						astros[i]= new Astro({x: Math.floor(Math.random()*1000)%(canvas.width/3), y: Math.floor(Math.random()*1000)%(canvas.height/3)}, canvas);
						astros[i].size = Math.floor(Math.random()*100)%4+1;
						astros[i].velocity.x =Math.floor(Math.random()*100)%4+1;
						astros[i].velocity.x *=sign;
						astros[i].velocity.y =Math.floor(Math.random()*100)%5;
						
						j = 0;
					}
					
				}
				
			}
			
		}
		
		for (var i = level+2; i < level+9;i++)
		{
			astros[i]= new Astro({x: Math.floor(Math.random()*1000)%(canvas.width/3), y: Math.floor(Math.random()*1000)%(canvas.height/3)}, canvas);
			astros[i].size = 1;
			astros[i].velocity.x =Math.floor(Math.random()*100)%4+1;
			
			var sign = Math.floor(Math.random()*100)%2;
			
			if (sign == 0)
				sign = 1;
			else 
				sign = -1;
			astros[i].velocity.x *=sign;
				
			astros[i].velocity.y =Math.floor(Math.random()*100)%5;
			
			
			if (i>0)
			{
				for (j=0;j<i-1;j++)
				{
					var distSquared = 
					Math.pow(astros[i].position.x - astros[j].position.x, 2) +
					Math.pow(astros[i].position.y - astros[j].position.y, 2);
					var r1 = astros[i].size*15;
					var r2 = astros[j].size*15;
					r = r1*r1+r2*r2;
					
					var t = distSquared < r;
					if (t)
					{
						
						astros[i]= new Astro({x: Math.floor(Math.random()*1000)%(canvas.width/3), y: Math.floor(Math.random()*1000)%(canvas.height/3)}, canvas);
						astros[i].size = 1;
						astros[i].velocity.x =Math.floor(Math.random()*100)%4+1;
						astros[i].velocity.x *=sign;
						astros[i].velocity.y =Math.floor(Math.random()*100)%5;
						
						j = 0;
					}
					
				}
				
			}
			
		}
		
		
		
		
		state = 'mid game';
		break;
		case 'mid game':
	
		if (timer > 100)
		{
			timer = 0;
			//breakAstro(0);
		}
		
		var s1 = [];
		var v1 = {x:5,y:7};
		var v2 = {x:15,y:7};
		var v3 = {x:15,y:15};
		var v4 = {x:5,y:15};
		s1[0]=v1;
		s1[1]=v2;
		s1[2]=v3;
		s1[3]=v4;
		
		var s2 = [];
		v1 = {x:20,y:7};
		v2 = {x:35,y:7};
		v3 = {x:35,y:13};
		v3 = {x:20,y:13};
		s2[0]=v1;
		s2[1]=v2;
		s2[2]=v3;
		s2[3]=v4;
		//console.log(testForShapeCollision(s1,s2));
		
		
		checkAstroCollision();
		checkBulletsCollision();
	    player.update(elapsedTime);
		for (var i = 0; i < astros.length;i++)
			astros[i].update(elapsedTime);
		
		if (astros.length<1)
			state = "finished level"
		for (var i = 0 ; i < astros.length;i++)
		{
			
		
			var circle = {x: astros[i].position.x, y: astros[i].position.y};
			var rect = {x: player.position.x, y: player.position.y, width:10 , height:10 }
			var rx ;//= Math.clamp(circle.x, rect.x, rect.x + rect.width);
			
			if (circle.x<rect.x)
			{
				rx = rect.x;
			}
			else
			{
				rx = rect.x + rect.width
			}
			
			
			var ry ;//= Math.clamp(circle.y, rect.y, rect.y + rect.height);
			
			if (circle.y<rect.y)
			{
				ry = rect.y;
			}
			else
			{
				ry = rect.y + rect.height
			}
			var distSquared =
			  Math.pow(rx - circle.x, 2) +
			  Math.pow(ry - circle.y, 2);
			
			
			var t = distSquared < Math.pow(astros[i].size*15, 2);
			if (t)
			{
				deathSound.play();
				state = 'died';
				lives--;
			}
		}
		break;
		
		case  "finished level":
		level++;
		
		state = 'finished level screen';
		break;
		case 'finished level screen':
		passedLevelTimer++;
		if (passedLevelTimer>70)
		{
			passedLevelTimer=0;
			state = 'new level screen';
			
		}
		break;
		
		case 'new level screen':
		startNewLevelTimer++;
		if (startNewLevelTimer>70)
		{
			startNewLevelTimer=0;
			state = 'before game';
			player = new Player({x: canvas.width/2, y: canvas.height/2}, canvas);
			astros = [];
			
		}
		break;
		case 'died':
		diedScreenTimer++;
		if (diedScreenTimer>70)
		{
			diedScreenTimer=0;
			state = 'new level screen';
			
		}
		break;
		
	}
  // TODO: Update the game objects
  
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
	switch(state)
	{	
		case 'mid game':
		  player.render(elapsedTime, ctx);
		  for (var i = 0; i < astros.length;i++)
			astros[i].render(elapsedTime,ctx);

			ctx.fillStyle = "white";
			ctx.font="20px Verdana";
			ctx.fillText("Lives:",canvas.width-200,30);
			ctx.fillText("Level:"+level,canvas.width-200,60);
			ctx.fillText("Score:"+score,canvas.width-200,90);
			ctx.save()
			
			for (var i = 0 ; i < lives ; i++)
			{
				ctx.save()
				ctx.translate(canvas.width-130+i*20,10);
				
				ctx.beginPath();
				//ctx.moveTo(0, 20);
				ctx.moveTo(5, 10);
				ctx.arc(0, 10, 5, 0, Math.PI, true);
				ctx.arc(10, 10, 5, 0, Math.PI, true);
				ctx.moveTo(15,10);
				ctx.lineTo(5,20);
				ctx.lineTo(-5,10);
				ctx.closePath();
				//ctx.closePath();
				ctx.fillStyle = 'pink';
				ctx.fill();
				ctx.restore();
			}
			break;
		case 'finished level screen':
		
			ctx.font="55px Verdana";
			// Create gradient
			var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			// Fill with gradient
			ctx.fillStyle=gradient;
			ctx.fillText("you passed the level",50,100);
		
		break;
		
		case 'died':
			ctx.font="55px Verdana";
			// Create gradient
			var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			// Fill with gradient
			ctx.fillStyle=gradient;
			ctx.fillText("You died :(",50,100);
		
		break;
		
		case 'new level screen':
			ctx.font="55px Verdana";
			// Create gradient
			var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			// Fill with gradient
			ctx.fillStyle=gradient;
			ctx.fillText("Level "+ level,50,100);
		
		break;
		
	}
	ctx.restore();
	
	ctx.save();
	
	
	ctx.restore();
}

// pass the asteroi's postion in the astros array
function breakAstro (x,breakAngle)
{
	var distance = 15;
	var astro = astros[x];
	astros.splice(x, 1);
	//console.log(x);
	//console.log(astros);
	if (astro.size >1 )
	{
		var a1 = new Astro({x: astro.position.x-distance*Math.cos(breakAngle)*astro.size, y: astro.position.y-distance*Math.sin(breakAngle)*astro.size}, canvas);
		a1.size = astro.size-1;
		var a2 = new Astro({x: astro.position.x+distance*Math.cos(breakAngle)*astro.size, y: astro.position.y+distance*Math.sin(breakAngle)*astro.size}, canvas);
		a2.size = astro.size-1;
		
		/*
		a1.velocity.x = -astro.velocity.x*Math.cos(breakAngle);
		a1.velocity.y = -astro.velocity.y*Math.sin(breakAngle);
		
		a2.velocity.x = astro.velocity.x*Math.cos(breakAngle);
		a2.velocity.y = astro.velocity.y*Math.sin(breakAngle);
		*/
		a1.velocity.x = -astro.velocity.x;
		a1.velocity.y = -astro.velocity.y;
		a2.velocity.x = astro.velocity.x;
		a2.velocity.y = astro.velocity.y;
		
		astros.push(a1);
		astros.push(a2);
	
		return 1;	
	}
	
	return -1;
}

function checkAstroCollision()
{
	for (var i = 0 ; i < astros.length;i++)
	{
		for (var j = i+1 ; j < astros.length;j++)
		{
			var distSquared = 0;
			Math.pow(astros[i].position.x - astros[j].position.x, 2) +
			Math.pow(astros[i].position.y - astros[j].position.y, 2);
			var r = 0;
			if (i<astros.length&&j<astros.length)
				{
					var dis1 = 0;//5*astros[i].size;
					var dis2 = 0;//5*astros[j].size;
					distSquared = 
					Math.pow(astros[i].position.x+dis1 - astros[j].position.x+dis2, 2) +
					Math.pow(astros[i].position.y+dis1 - astros[j].position.y+dis2, 2);
					var r1 = astros[i].size*15;
					var r2 = astros[j].size*15;
					r = r1*r1+r2*r2;//astros[i].size*astros[i].size+astros[j].size*astros[j].size;
					//r*=15;
					
				}
			
			if(distSquared < r)
			{
				if (i<astros.length&&j<astros.length)
				{
					//breakAstro (i,-99);
					//breakAstro (j-1,-99);
					
					/*
					
					
					*/
					astroCollidSound.play();
									var collisionNormal = {
					  x: astros[i].position.x - astros[j].position.x,
					  y: astros[i].position.y - astros[j].position.y
					}
					// calculate the overlap between balls
					var overlap = astros[i].size*18+astros[j].size*18 - Vector.magnitude(collisionNormal);
					var collisionNormal = Vector.normalize(collisionNormal);
					astros[i].position.x += collisionNormal.x * overlap / 2;
					astros[i].position.y += collisionNormal.y * overlap / 2;
					astros[j].position.x -= collisionNormal.x * overlap / 2;
					astros[j].position.y -= collisionNormal.y * overlap / 2;
					// Rotate the problem space so that the normal
					// of collision lies along the x-axis
					var angle = Math.atan2(collisionNormal.y, collisionNormal.x);
					var a = Vector.rotate(astros[i].velocity, angle);
					var b = Vector.rotate(astros[j].velocity, angle);
					// Solve the collision along the x-axis
					var s = a.x;
					a.x = b.x;
					b.x = s;
					// Rotate the problem space back to world space
					a = Vector.rotate(a, -angle);
					b = Vector.rotate(b, -angle);
					astros[i].velocity.x = a.x;
					astros[i].velocity.y = a.y;
					astros[j].velocity.x = b.x;
					astros[j].velocity.y = b.y;
					
					/*
					
					
					*/
					
					
				}
				
			}
			
		}
		
	}
}

function checkBulletsCollision()
{
	for (var i = 0 ; i < player.bullets.length;i++)
	{
		for (var j = 0 ; j < astros.length;j++)
		{
			var distSquared = 0;
			Math.pow(player.bullets[i].position.x - astros[j].position.x, 2) +
			Math.pow(player.bullets[i].position.y - astros[j].position.y, 2);
			var r = 0;
			if (j<astros.length)
				{
					var dis1 = 0;//5*astros[i].size;
					var dis2 = 0;//5*astros[j].size;
					distSquared = 
					Math.pow(player.bullets[i].position.x - astros[j].position.x, 2) +
					Math.pow(player.bullets[i].position.y - astros[j].position.y, 2);
					var r1 = 0;
					var r2 = astros[j].size*15;
					r = r1*r1+r2*r2;//astros[i].size*astros[i].size+astros[j].size*astros[j].size;
					//r*=15;
					
				}
			
			if(distSquared < r)
			{
				if (j<astros.length)
				{
					breakAstro (j,player.bullets[i].angle);
					
					score+=450;
					player.bullets.splice(i,1);
					j = astros.length;
					
					
				}
				
			}
			
		}
		
	}
	
}



function findAxes(shape) {
  var axes = [];
  shape.forEach(function(p1, i){
    // find the adjacent vertex
    var p2 = (shape.length == i+1) ? 0 : shape[i];
    var edge = Vector.subtract(p2, p1);
    var perp = Vector.perpendicular(edge);
    var normal = Vector.normalize(perp);
    axes.push(normal);
  });
  return axes;
}

function project(shape, axis){
  var min = Vector.dotProduct(shape[0], axis.x);
  var max = min;
  for(var i = 1; i < shape.length; i++){
    var p = Vector.dotProduct(shape[i], axis);
    if(p < min) min = p;
    else if(p > max) max = p;
  }
  return {min: min, max: max};
}

function testForShapeCollision(shape1, shape2) {
  var axes = findAxes(shape1) ;//+ findAxes(shape2);
  var axes2 = findAxes(shape2);
  for (var i = 0 ; i < axes2.length;i++)
  {
	  axes.push(axes2[i]);
  }
  for(var i = 0; i < axes.length; i++) {
    var proj1 = project(shape1, axes[i]);
    var proj2 = project(shape2, axes[i]);
    if(proj1.max < proj2.min || proj1.min > proj2.max) {
      return false;
    }
  }
  return true;
}
},{"./astro.js":2,"./game.js":3,"./player.js":4,"./vector.js":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
  this.update = updateFunction;
  this.render = renderFunction;

  // Set up buffers
  this.frontBuffer = screen;
  this.frontCtx = screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = screen.width;
  this.backBuffer.height = screen.height;
  this.backCtx = this.backBuffer.getContext('2d');

  // Start the game loop
  this.oldTime = performance.now();
  this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function(flag) {
  this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function(newTime) {
  var game = this;
  var elapsedTime = newTime - this.oldTime;
  this.oldTime = newTime;

  if(!this.paused) this.update(elapsedTime);
  this.render(elapsedTime, this.frontCtx);

  // Flip the back buffer
  this.frontCtx.drawImage(this.backBuffer, 0, 0);
}

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
/**
 * @module Vector
 * A library of vector functions.
 */
module.exports = exports = {
  rotate: rotate,
  dotProduct: dotProduct,
  magnitude: magnitude,
  normalize: normalize,
  subtract: subtract,
  perpendicular: perpendicular
}

/**
 * @function rotate
 * Rotates a vector about the Z-axis
 * @param {Vector} a - the vector to rotate
 * @param {float} angle - the angle to roatate by (in radians)
 * @returns a new vector representing the rotated original
 */
function rotate(a, angle) {
  return {
    x: a.x * Math.cos(angle) - a.y * Math.sin(angle),
    y: a.x * Math.sin(angle) + a.y * Math.cos(angle)
  }
}

/**
 * @function dotProduct
 * Computes the dot product of two vectors
 * @param {Vector} a the first vector
 * @param {Vector} b the second vector
 * @return the computed dot product
 */
function dotProduct(a, b) {
  return a.x * b.x + a.y * b.y
}

/**
 * @function magnitude
 * Computes the magnitude of a vector
 * @param {Vector} a the vector
 * @returns the calculated magnitude
 */
function magnitude(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

/**
 * @function normalize
 * Normalizes the vector
 * @param {Vector} a the vector to normalize
 * @returns a new vector that is the normalized original
 */
function normalize(a) {
  var mag = magnitude(a);
  return {x: a.x / mag, y: a.y / mag};
}


function subtract(a, b) {
  return {x: a.x - b.x , y: a.y - b.y};
}

function perpendicular(a) {
  //var mag = roatate(a,Math.PI/2);
  //return rotate(a,Math.PI/2);;
  return {x: -a.y , y: a.x };
}
},{}]},{},[1]);
