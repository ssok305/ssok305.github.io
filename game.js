document.body.style.textAlign = 'center';

const canvas = document.getElementById('pong')
const content = canvas.getContext('2d');

var winningScore = 5;
var winningScreen = false;


// Pong Game Function
function pongGame(canvas){
    const user = {
        x:0,
        y: canvas.height/2 - (100/2),
        width: 20,
        height: 100,
        color: '#66FF00',
        score: 0,

    }

    const computer = {
        x: canvas.width - 20,
        y: canvas.height/2 - 100/2,
        width:20,
        height: 100,
        color: '#66FF00',
        score: 0,
    

    }

    const ball = {
        x: canvas.width/2,
        y: canvas.height/2,
        radius: 10,
        speed: 5,
        velocityX: 5,
        velocityY: 5,
        color: 'white'
    }

    const net = {
        x: canvas.width/2 - 1,
        y: 0,
        width: 2,
        height: 10, 
        color:'white'
    }
    const fps = 60;
    setInterval(game,1000/fps);

    
    canvas.addEventListener("mousemove", movePaddle);
    canvas.addEventListener('mousedown', handleMouseClick);
// handles the event listener when the user uses the click button on the mouse.
    function handleMouseClick(event) {
        if (winningScreen) {
            user.score = 0;
            computer.score = 0;
            winningScreen = false;
        }
    }


    function movePaddle(event){
        var rect = canvas.getBoundingClientRect();
        user.y = event.clientY - rect.top - user.height/2;
    }

    function drawNet(){
        for(let i = 0; i<= canvas.height; i+=15){
            drawRect(net.x,net.y + i,net.width,net.height,net.color);
        }
    }

    function drawRect(x,y,width,height,color){
        content.fillStyle = color;
        content.fillRect(x,y,width,height);
    }

    function drawCircle(x,y,r,color){
        content.fillStyle = color;
        content.beginPath();
        content.arc(x,y,r,0,Math.PI * 2, false);
        content.closePath();
        content.fill();
    }

    function drawText(text,x,y,color){
        content.fillStyle = color;
        content.font = ('45px OCR A Std');
        content.fillText(text,x,y);
    }


    function collision(ball,object){
        ball.top = ball.y - ball.radius;
        ball.bottom = ball.y + ball.radius;
        ball.left = ball.x - ball.radius;
        ball.right = ball.x + ball.radius;

        object.top = object.y;
        object.bottom = object.y + object.height;
        object.left = object.x;
        object.right = object.x + object.width;

        return ball.right > object.left && ball.bottom > object.top && ball.left < object.right && ball.top < object.bottom;
    }

    function resetBall(){
        if(user.score >= winningScore || computer.score >= winningScore ){
            winningScreen = true;
        }

        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        ball.velocityX = -ball.velocityX;
        ball.speed = 5;

       
    }


    function draw(){
        drawRect(0,0,canvas.clientWidth, canvas.clientHeight, "BLACK");

    // This checks if the computer or user has a winning score and creates a new canvas screen to showcas it.
        if(winningScreen){
            content.fillStyle = 'white';


            if(user.score >= winningScore){
                content.fillText("You won, congratulations!", 0, canvas.height/2);
            }
            else if(computer.score >= winningScore){
                content.fillText("You lost, better luck next time.", 0, canvas.height/2);
            }
            content.fillText("Click to continue", 0, canvas.height);
            return;
        }


        drawNet();

        drawText(user.score, canvas.width/4, canvas.height/8, 'WHITE');
        drawText(computer.score,3*canvas.width/4, canvas.height/8, 'WHITE');

        drawRect(user.x,user.y,user.width,user.height, user.color);
        drawRect(computer.x,computer.y, computer.width,computer.height, computer.color);

        drawCircle(ball.x,ball.y,ball.radius,ball.color);

    }


    function update(){
        if(winningScreen){
            return;
        }

        if(ball.x - ball.radius < 0){
            computer.score++;
            resetBall();
        }
        else if(ball.x + ball.radius > canvas.width){
            user.score++;
            resetBall();
        }

        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

// This line statement is the computer AI
        computer.y +=(ball.y -(computer.y + computer.height/2)) * 0.07;

        if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
            ball.velocityY = -ball.velocityY;
        }

        let player = (ball.x + ball.radius < canvas.width/2) ? user:computer;

// This scope handles the collision of when the ball hits an object or box within canvas
        if(collision(ball,player)){

            let collidePoint = (ball.y - (player.y + player.height/2));
            collidePoint = collidePoint/(player.height/2);

            let anglePoint = (Math.PI/4) * collidePoint;

            let direction = (ball.x + ball.radius < canvas.width/ 2) ? 1 : -1;
            ball.velocityX = direction * ball.speed * Math.cos(anglePoint);
            ball.velocityY = ball.speed * Math.sin(anglePoint);


            ball.speed += 0.5;
        }

        if(ball.speed >= 50){
            ball.speed = 50;
        }
    }

    function game(){
        update();
        draw();
    }
}

window.onload = function () {
    let a  = document.getElementById('pong');
    let game1 = new pongGame(a);
}




