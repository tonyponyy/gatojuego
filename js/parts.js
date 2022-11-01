class sandevistan_part {
    constructor(frame, x,y,tiempo,color,invert) {
      this.x = x;
      this.y = y;
      this.frame = frame; 
      this.tiempo = tiempo;
      this.color = color;
      this.invert = invert
    }
    mostrar(){

    ctx.save(); 
    ctx.filter = 'sepia(100) hue-rotate('+this.color+'deg) saturate(20)'
    ctx.globalCompositeOperation = "hard-light";
    if (!this.invert){
        ctx.drawImage(image_player, this.frame,0,32,32, parseInt(this.x -camera.x), parseInt(this.y -camera.y),32, 32);

    }else{
        ctx.scale(-1, 1);
        ctx.drawImage(image_player, this.frame,0,32,32, -1*(parseInt(this.x -camera.x)+16), parseInt(this.y -camera.y),32, 32);
    }
    ctx.restore()

     }

}


class particula {
    constructor(imagen, x,y, vx,vy, tiempo,solido) {
      this.imagen = imagen;
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;  
      this.tiempo = tiempo;
      this.solido = solido;
    }

    fisicas2(){
        var width = this.imagen.width
        var height = this.imagen.height
        
        var col_left =false;
        var col_right =false;
        var col_up =false;
        var col_down = false;    

        if (getTile(this.x,this.y)    ){col_left = true}
        if (getTile(this.x-width,this.y)){col_right = true}
        if (getTile(this.x,this.y)){col_up = true}
        if (getTile(this.x,this.y+height)){col_down = true
        }

        if (this.tiempo){
            this.tiempo--
        }
        
       
        if (this.solido){           
            //gravedad
            if ( !col_down){
                this.vy += physics.gravity ;  
            }    

        //colision vertical
        if ( col_up || col_down){
            this.vy = -this.vy/2 ;
            this.vx = -this.vx*1.5;  
        }
        //colision horizontal
        if ( col_left || col_right){
            this.vx = -this.vx/1.3 ;
            this.vy = -this.vy*1.2  
        }
        
        //antistuck
        if (col_up && col_down && col_left && col_right){
            this.y = this.y-height
            
        }
        //aplicamos la fricción
        if (col_down && this.vx !=0){
            this.x>0? this.vx +=physics.friction/4:this.vx =physics.friction;
            this.x<0? this.vx +=physics.friction/4:this.vx =physics.friction;
        }
        //paramos cuando hay velocides muy pequeñas
        if (this.vx< physics.friction*2 && this.vx>-physics.friction*2){this.vx = 0}
        if (this.vy< physics.friction*2 && this.vy>-physics.friction*2){this.vy = 0}
    } else {this.vy += physics.gravity/3 ;}
        //aplicamos las fisicas
        this.x = this.x+this.vx
        this.y = this.y+this.vy
        

    };

    fisicas() {
        
        var width = this.imagen.width
        var height = this.imagen.height
        this.x +=this.vx;
        this.y +=this.vy;

        if ( this.vx != 0){
            this.vx > 0 ? this.vx -= physics.friction : this.vx += physics.friction ; 
            this.vx<0? this.vx +=physics.friction:this.vx +=physics.friction;
        }
        if ( getTile(this.x,this.y-width*2)!= 0 ){
            this.vy += physics.gravity ;  
            
        }

        if (this.vx < 0.3 && this.vx > -0.3){
            this.vx = 0;
        }


        //colision suelo
        if (this.solido){

            if (getTile(this.x+width,this.y+height) == 0){
                this.vy += physics.gravity
                
            }else{
                 
                this.vy = -this.vy/2
                
            }
        
    
            if (this.vy > -0.005 && this.vy < 0.005){
                this.vy = 0;
            }
        
      

        //colision lateral

        if (getTile(this.x+width,this.y)!= 0 || 
            getTile(this.x,this.y ) != 0){
              
            this.vx = -this.vx
            
        
        }


    

    }
    



      }

    
    

      mostrar(){
         drawRotatedImage(this.imagen,this.x-camera.x, this.y-camera.y,angulo(this.vx,this.vy))
      }


  }
  var TO_RADIANS = Math.PI/180; 

  function drawRotatedImage(image, x, y, angle)
{ 
    // save the current co-ordinate system 
    // before we screw with it
    ctx.save(); 

    // move to the middle of where we want to draw our image
    ctx.translate(x, y);

    // rotate around that point, converting our 
    // angle from degrees to radians 
    ctx.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image 
    ctx.imageSmoothingQuality = "low"
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(image, -(image.width/2), -(image.height/2));

    // and restore the co-ords to how they were when we began
    ctx.restore(); 
}
rectificacion = 90
function  angulo(x,y){

    if (x ==0 && y==0){
        return 0
    }

    x ==0? x=x+1:"";
    y ==0? y=y+1:"";
    
    if (x>0 && y>0){
        // entre 0 y 90
        res = x*(90/(x+y))+rectificacion

        return parseInt(res)
    }
    if (x>0 && y<0){
        //entre 90 y 180
        res = x*(90/(x+(-y)))
        return parseInt(180-res)-rectificacion
    }
    if (x<0 && y>0){
        // entre 180 y 270
        res = x*(90/((-x)+y))
        return parseInt(180+(-res))-rectificacion
    }
    if (x<0 && y<0){
        // entre 270 y 360
        res = x*(90/(-(-x-y)))
        return parseInt(360-res)-rectificacion
    }
  
}