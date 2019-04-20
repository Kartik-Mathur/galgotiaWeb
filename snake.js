function init() {
	canvas = document.getElementById("mycanvas")
	pen = canvas.getContext("2d")
	W = canvas.width
    H = canvas.height
    food = getFood();

	snake = {
		init_length: 5,
        color: "green",
        score:5,
		cells: [],
		direction: "right",
		createSnake: function() {
			for (var i = this.init_length - 1; i >= 0; i--) {
				this.cells.push({ x: i, y: 0 })
			}
		},
		drawSnake: function() {
			for (var i = 0; i < this.cells.length; i++) {
                pen.strokeStyle = "brown";
                
                pen.fillStyle = this.color;
                pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
				pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
			}
		},
		updateSnake: function() {
			headX = this.cells[0].x;
            headY =this.cells[0].y;
            if(headX == food.x && headY== food.y){
                food=getFood();
                score++;
            }
            else{
                this.cells.pop();
            }

            if(this.direction == 'up'){
                nextX = headX;
                nextY = headY-1;
            }
            else if(this.direction == 'down'){
                nextX = headX;
                nextY = headY +1 ;
            }
            else if(this.direction == 'right'){
                nextX = headX +1;
                nextY =headY;
            }
            else{
                nextX = headX -1;
                nextY = headY;
            }
			
			this.cells.unshift({ x: nextX, y: nextY })
		}
	}

	snake.createSnake()

	function Keypressed(e) {
		if(e.key == "ArrowUp"){
            snake.direction = 'up';
        }
        else if(e.key == "ArrowDown"){
            snake.direction = 'down';
        }
        else if(e.key == "ArrowRight"){
            snake.direction= 'right';
        }
        else{
            snake.direction='left';
        }
	}

	document.addEventListener("keydown", Keypressed)
}

function draw() {
	// console.log('We are drawing');
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);
    // pen.fontStyle= "14px Roboto";
    // pen.fillText("Score : "+score,10,10);
}

function update() {
	console.log("We are updating")
	snake.updateSnake()
}

function gameLoop() {
	draw()
	update()
}

function getFood(){
    foodX = Math.round(Math.random()*(W-10)/10);
    foodY = Math.round(Math.random()*(H-10)/10);

    var food = {
        x:foodX,
        y:foodY,
        color:"yellow"
    }
    return food;
}

init()
setInterval(gameLoop, 100)
