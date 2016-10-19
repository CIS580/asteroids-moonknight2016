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