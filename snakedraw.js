let map = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]
const sprite = document.querySelector(".sprite");
const audio = new Audio('sound.ogg');
let food = 0;
let space = false;
function Snake(){
	this.x = 70;
	this.y = 0;
	this.tail = [[this.x,this.y],[this.x-VAR.scale,this.y], [this.x-2*VAR.scale,this.y]];
	this.addX = 35;
	this.addY = 35;
	this.total = 0;
}

Snake.prototype.update = function(){
if (map[Game.snake.tail[0][1]/VAR.scale][Game.snake.tail[0][0]/VAR.scale] === 2){
	Game.snake.tail.unshift([Game.snake.tail[0][0], Game.snake.tail[0][1]]);
	map[Game.snake.tail[0][1]/VAR.scale][Game.snake.tail[0][0]/VAR.scale] = 0;
	audio.play();
	addFood();
	food = 0;
	Game.snake.total++;
}
	Game.snake.x = Game.snake.tail[0][0];
	Game.snake.y = Game.snake.tail[0][1];
	var tail = Game.snake.tail.pop();
	tail[0] = Game.snake.x;
	tail[1] = Game.snake.y;
	Game.snake.tail.unshift(tail);
	if (Game.key_39){
		Game.snake.tail[0][0] = Game.snake.tail[0][0] + Game.snake.addX;
	
	} else if (Game.key_38){
		Game.snake.tail[0][1] = Game.snake.tail[0][1] - Game.snake.addY;
		
	} else if (Game.key_37){
		Game.snake.tail[0][0] = Game.snake.tail[0][0] - Game.snake.addX;
	
	} else if (Game.key_40){
		Game.snake.tail[0][1] = Game.snake.tail[0][1] + Game.snake.addX;
	
	}
	
}
Snake.prototype.death = function(){
	if(Game.snake.total > 0){
	for (i=1; i<=Game.snake.tail.length-1; i++){
		if(Game.snake.tail[0][0] === Game.snake.tail[i][0] && Game.snake.tail[0][1] === Game.snake.tail[i][1]){
			Game.snake.addX = 0;
			Game.snake.addY = 0;
			VAR.fps = 4;
			setTimeout(() => {
				drawEnd();
				VAR.fps = 0;
			}, 1000);
		}
	}	
	} 
		if (Game.snake.tail[0][0] < 0 || Game.snake.tail[0][0] > VAR.W || Game.snake.tail[0][1] < 0 || Game.snake.tail[0][1] > VAR.H){			
			Game.snake.tail.pop();
			Game.snake.addX = 0;
			Game.snake.addY = 0;
			setTimeout(() => {
				drawEnd();
				VAR.fps = 0;
			}, 1000);
	}
}

Snake.prototype.draw = function(){
	Game.snake.update();
	Game.snake.death();
	addFood();	
	for (i=0; i<=Game.snake.tail.length-1; i++){
	let c = Game.snake.tail[i];
	let head = Game.snake.tail[0];
	Game.ctx.beginPath()
	Game.ctx.drawImage(sprite,167,0,135,135,c[0], c[1] , VAR.scale, VAR.scale);
	Game.ctx.drawImage(sprite,302,0,135,135,head[0],head[1], VAR.scale, VAR.scale);
	Game.ctx.closePath();
		}
	}

function addFood(){
let freespace = false;	
while(!freespace && food===0){
let ranX = (VAR.rand(0,(VAR.W/VAR.scale)-1))*VAR.scale;
let ranY = (VAR.rand(0,(VAR.H/VAR.scale)-1))*VAR.scale;
Game.snake.tail.forEach(t => {
	let x = t[0]/VAR.scale;
	let y = t[1]/VAR.scale;
	map[y][x] = 1;
});	
let snakeBody = false;
for(i=0; i<Game.snake.tail.length; i++){
	let SnakeX = Game.snake.tail[i][0];
	let SnakeY = Game.snake.tail[i][1];
	if(ranX === SnakeX && ranY ===SnakeY){
		snakeBody = true;
		break;
	}
}
if(!snakeBody && map[ranY/VAR.scale][ranX/VAR.scale] === 0){
map[ranY/VAR.scale][ranX/VAR.scale] = 2;
food += 1;	
}
}
}

function mapAndFood(){
	let grassY = 0;
	for(i=0;i<Game.col; i++){
		for(j=0; j<Game.row; j++){
			grassY = 0;
			i%2===0 ? grassY : grassY = grassY+135;
			Game.ctx.drawImage(sprite,570,grassY,137,139, i*VAR.scale,j*VAR.scale, VAR.scale, VAR.scale);	
			if (map[j][i] === 2){
					Game.ctx.drawImage(sprite,437,0,135,135, VAR.scale*i, VAR.scale*j, VAR.scale, VAR.scale);
			}		
		}
	}
}
function drawEnd(){
location.reload();
}
