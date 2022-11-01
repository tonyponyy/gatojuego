class enemy {
    constructor(type, x,y,orientation,vel) {
      this.x = x;
      this.y = y;
      this.type = type; 
      this.vel = vel;
      this.orientation = orientation;
      this.seed = parseInt(Math.random()*5) 
    }
    mostrar(){
        var enemys=[0,enemy_1]
        frames = enemys[this.type].width/32
        frame =  parseInt(((frameCounter/7)+this.seed)%frames)
        if (this.orientation){
            ctx.drawImage(enemys[this.type],frame*32 ,0,32,32, parseInt(this.x -camera.x), parseInt(this.y -camera.y),32, 32);
        }else{
            ctx.save(); 
            ctx.scale(-1, 1);
            ctx.drawImage(enemys[this.type],frame*32 ,0,32,32, -1*(parseInt(this.x -camera.x)+16), parseInt(this.y -camera.y),32, 32);
            ctx.restore()
        }
    }
    move(){
        if (colision_enemy(0,0,this) || colision_enemy(32,0,this) ||  !colision_enemy(32,32,this) ||  !colision_enemy(0,32,this) ){
           this.orientation = !this.orientation
        }
       


        if (this.orientation){
            this.x += this.vel
        }else{
            this.x -= this.vel
        }

        
    }


}

