
			window.onload = function(){
				document.querySelector('.start').style.display = 'block';
				setTimeout(() => {
					document.querySelector('.start').style.display = 'none';
					Game.init();

					}, 2000);						
			}
			VAR = {
				rand:function(min, max){
					return Math.floor(Math.random()*(max-min+1))+min;
				},
				fps:20,
				W: 0,
				H:0,
				lastTime: 0,
				lastTimeF: 0,
				scale: 35,
				count: 0
			}
			Game = {
				init: function(){
					Game.canvas = document.createElement('canvas');
					Game.ctx = Game.canvas.getContext('2d');
					window.addEventListener("keyup",Game.onKey,false);
					window.addEventListener("keydown",Game.onKey,false);
					window.addEventListener("resize",Game.layout,false);
					Game.layout();
					document.body.appendChild(Game.canvas);
					Game.snake = new Snake();
					Game.snake.update();
					
					Game.animationLoop();
				},
				onKey: function(ev){
					//

					if (ev.keyCode === 37 || ev.keyCode === 38 || ev.keyCode === 39 || ev.keyCode === 40){
						if(ev.type = 'keydown' && !Game['key_'+ev.keyCode]){
							Game['key_'+ev.keyCode] = true;

							if(ev.keyCode==37){


								Game.key_38 = false;
								Game.key_40 = false;
						}else if(ev.keyCode==39){


								Game.key_38 = false;
								Game.key_40 = false;
						}else if(ev.keyCode==38){

								Game.key_39 = false;
								Game.key_37 = false;

						}else if(ev.keyCode==40){

								Game.key_37 = false;

								Game.key_39 = false;
						} else if(ev.type = 'keyup'){
							Game['key_'+ev.keyCode] = false;
						}
					}
					}
				},
				layout: function(ev){

					VAR.H = 525;
					VAR.W = 700;

					Game.ctx.fillStyle = 'red';
					Game.ctx.strokeStyle = 'black';
					Game.ctx.lineWidth = 1;
					Game.ctx.lineJoin = 'round'
					Game.canvas.width = VAR.W;
					Game.canvas.height = VAR.H;
					Game.col = (Math.floor(VAR.W/VAR.scale));
					Game.row = (Math.floor(VAR.H/VAR.scale));


				},
				 animationLoop: function(time){

					window.requestAnimationFrame(Game.animationLoop);
						if (time - VAR.lastTime >= 1000/VAR.fps){
						VAR.lastTime = time;
						Game.ctx.clearRect(0,0,VAR.W,VAR.H);
						//VAR.count = VAR.count + 1;
						mapAndFood();	
						Game.snake.draw();

							
					}
				
			}}
