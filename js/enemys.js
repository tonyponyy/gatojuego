class enemy {
    constructor(type, x,y,orientation,vel) {
      this.x = x;
      this.y = y;
      this.type = type; 
      this.vel = vel;
      this.orientation = orientation;
    }
    mostrar(){
        var enemys=[0,enemy_1]
        if (this.orientation){
            ctx.drawImage(enemys[this.type], parseInt(this.x -camera.x), parseInt(this.y -camera.y),32, 32);
        }else{
            ctx.save(); 
            ctx.scale(-1, 1);
            ctx.drawImage(enemys[this.type], -1*(parseInt(this.x -camera.x)+16), parseInt(this.y -camera.y),32, 32);
            ctx.restore()
        }
    }
    move(){
        if (colision_enemy(this.x,this.y,this) ||colision_enemy(0,0,this) ){
           this.orientation = !this.orientation
        }


        if (this.orientation){
            this.x += this.vel
        }else{
            this.x -= this.vel
        }

        
    }


}

