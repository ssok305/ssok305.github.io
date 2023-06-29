document.body.style.textAlign = 'center';

const canvas = document.getElementById('pong')
const content = canvas.getContext('2d');

var winningScore = 3;
var winningScreen = false;

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


canvas.addEventListener("mousemove", movePaddle);
canvas.addEventListener("click", handleMouseClick);

function handleMouseClick(event){
    if(winningScreen){
        user.score = 0;
        computer.score = 0;
        winningScore = false;
    }
}


function movePaddle(event){
    let rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height/2;
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
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 5;

    if(user.score >= winningScore || computer.score >= winningScore ){
        winningScreen = true;
    }

}



function menu(){
    drawRect(0,0,canvas.clientWidth, canvas.clientHeight, "BLACK");

    drawNet();

    drawText(user.score, canvas.width/4, canvas.height/8, 'WHITE');
    drawText(computer.score,3*canvas.width/4, canvas.height/8, 'WHITE');

    drawRect(user.x,user.y,user.width,user.height, user.color);
    drawRect(computer.x,computer.y, computer.width,computer.height, computer.color);

    drawCircle(ball.x,ball.y,ball.radius,ball.color);

    

    // content.fillText('Click the mouse to Begin',canvas.width / 2, canvas.height / 2 + 15 );
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


    computer.y +=(ball.y -(computer.y + computer.height/2)) * 0.1;

    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x + ball.radius < canvas.width/2) ? user:computer;


    if(collision(ball,player)){

        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint/(player.height/2);

        let anglePoint = (Math.PI/4) * collidePoint;

        let direction = (ball.x + ball.radius < canvas.width/ 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(anglePoint);
        ball.velocityY = ball.speed * Math.sin(anglePoint);


        ball.speed += 1;
    }

    if(ball.speed >= 50){
        ball.speed = 50;
    }
    
    if(winningScreen){
        content.font = '10px Arial';
        content.fillStyle = 'white';

        if(user.score >= winningScore){
           content.fillText("You won!", 350, 200); 
        }
        else if(computer.score >= winningScore){
            content.fillText("Comuter Won, better luck next time.");
        }

        content.fillText("click to continue", 350, 500);
        return;
    }

   
}



// function render() {
    
//     drawRect(0,0,canvas.clientWidth, canvas.clientHeight, "BLACK");

//     drawNet();

//     drawText(user.score, canvas.width/4, canvas.height/8, 'WHITE');
//     drawText(computer.score,3*canvas.width/4, canvas.height/8, 'WHITE');

//     drawRect(user.x,user.y,user.width,user.height, user.color);
//     drawRect(computer.x,computer.y, computer.width,computer.height, computer.color);

//     drawCircle(ball.x,ball.y,ball.radius,ball.color);
// }

function game(){
    update();
    // render();
    menu();
}

const fps = 60;
setInterval(game,1000/fps);


