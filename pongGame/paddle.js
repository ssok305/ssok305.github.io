export class Paddle {
    constructor(side){
        this.x = x;
        this.y = height /2;
        this.height = 80;
        this.width = 20;
    }

    display(){
        fill(255);
        rect(this.x, this.y,this.width,this.height);
    }
}