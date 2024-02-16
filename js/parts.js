class sandevistan_part {
  constructor(frame, x, y, tiempo, color, invert) {
    this.x = x;
    this.y = y;
    this.frame = frame;
    this.tiempo = tiempo;
    this.color = color;
    this.invert = invert;
  }
  mostrar() {
    ctx.save();
    ctx.filter = "sepia(100) hue-rotate(" + this.color + "deg) saturate(20)";
    ctx.globalCompositeOperation = "hard-light";
    if (!this.invert) {
      ctx.drawImage(
        image_player,
        this.frame,
        0,
        32,
        32,
        parseInt(this.x - camera.x) - 16,
        parseInt(this.y - camera.y),
        32,
        32
      );
    } else {
      ctx.scale(-1, 1);
      ctx.drawImage(
        image_player,
        this.frame,
        0,
        32,
        32,
        -1 * (parseInt(this.x - camera.x) + 32),
        parseInt(this.y - camera.y),
        32,
        32
      );
    }
    ctx.restore();
  }
}

class Explosion{
  constructor(x,y){
    this.imagen = image_explosion
    this.x =x-42
    this.y = y-32
    this.tiempo =20
    this.frame = 0  
    this.size = 1
    let hitbox = new Hitbox(this.x+12,this.y+16,40)
    hitbox_array.push(hitbox)
    let hitbox2 = new Hitbox(this.x-24,this.y+16,40)
    hitbox_array.push(hitbox2)
    let hitbox3 = new Hitbox(this.x+44,this.y+16,40)
    hitbox_array.push(hitbox3)
    let hitbox4 = new Hitbox(this.x+12,this.y+52,40)
    hitbox_array.push(hitbox4)
    let hitbox5 = new Hitbox(this.x+12,this.y-22,40)
    hitbox_array.push(hitbox5)
  }
  mostrar(){
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.imagen, this.frame*48, 0, 48, 48, parseInt(this.x - camera.x), parseInt(this.y - camera.y), 48*this.size, 48*this.size);
  }
  
  fisicas2(){
    if (frameCounter% 8 == 0){
      this.frame ++
    }
    if (this.frame >= 7){
      console.log("tiempo 0")
      this.tiempo = 0
    }
  }
}


class particula {
  constructor(imagen, x, y, vx, vy, tiempo, solido,type = 1) {
    //tipo 1 (defecto) --> particulas normales, solo visual
    //tipo 2 --> bombas
    //tipo 3 --> artefactos que pueden herir al player
    this.imagen = imagen;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.tiempo = tiempo;
    this.solido = solido;
    this.type = type
    this.destroy = false
  }

  fisicas2() {
    var width = this.imagen.width;
    var height = this.imagen.height;

    var col_left = false;
    var col_right = false;
    var col_up = false;
    var col_down = false;
    

    let pos_left = map[getTilePosition(this.x,this.y)]
    let pos_right = map[getTilePosition(this.x - width, this.y)]
    let pos_up = map[getTilePosition(this.x, this.y)]
    let pos_down = map[getTilePosition(this.x, this.y + height)]


    if  (tilesettings.solid.indexOf(pos_left) != -1 || pos_left == 15 || pos_left == 14) {
      col_left = true;
    }
    if (tilesettings.solid.indexOf(pos_right) != -1 || pos_right == 15 || pos_right == 14) {
      col_right = true;
    }
    if (tilesettings.solid.indexOf(pos_up) != -1 || pos_up == 15 || pos_up == 14) {
      col_up = true;
    }
    if (tilesettings.solid.indexOf(pos_down) != -1 || pos_down == 15 || pos_down == 14) {
      col_down = true;
    }
    //bomba lanzada por el player
    if (this.type== 2){
      if (col_left || col_right ||col_down || col_up){
        this.detone_bomb()
        this.destroy = true;

      }
    }

    if (this.tiempo) {
      this.tiempo--;
    }

    if (this.solido) {
      //gravedad
      if (!col_down) {
        this.vy += physics.gravity;
      }

      //colision vertical
      if (col_up || col_down) {
        this.vy = -this.vy / 2;
        this.vx = -this.vx * 1.5;
      }
      //colision horizontal
      if (col_left || col_right) {
        this.vx = -this.vx / 1.3;
        this.vy = -this.vy * 1.2;
      }

      //antistuck
      if (col_up && col_down && col_left && col_right) {
        this.y = this.y - height;
      }
      //aplicamos la fricción
      if (col_down && this.vx != 0) {
        this.x > 0
          ? (this.vx += physics.friction / 4)
          : (this.vx = physics.friction);
        this.x < 0
          ? (this.vx += physics.friction / 4)
          : (this.vx = physics.friction);
      }
      //paramos cuando hay velocides muy pequeñas
      if (this.vx < physics.friction * 2 && this.vx > -physics.friction * 2) {
        this.vx = 0;
      }
      if (this.vy < physics.friction * 2 && this.vy > -physics.friction * 2) {
        this.vy = 0;
      }
    } else {
      this.vy += physics.gravity / 3;
    }
    //aplicamos las fisicas
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
  detone_bomb(){
   let explosion = new Explosion(this.x,this.y);
   explosion_sound.currentTime = 0
   explosion_sound.play();
    particles_array.push(explosion);
  
  }
  fisicas() {
    var width = this.imagen.width;
    var height = this.imagen.height;
    this.x += this.vx;
    this.y += this.vy;
    //algoritmo david bootcamp
    if (this.vx) {
      this.vx > 0
        ? (this.vx -= physics.friction)
        : (this.vx += physics.friction);
      this.vx < 0
        ? (this.vx += physics.friction)
        : (this.vx += physics.friction);
    }
    if (getTile(this.x, this.y - width * 2) != 0) {
      this.vy += physics.gravity;
    }

    if (this.vx < 0.3 && this.vx > -0.3) {
      this.vx = 0;
    }

    //colision suelo
    if (this.solido) {
      if (getTile(this.x + width, this.y + height) == 0) {
        this.vy += physics.gravity;
      } else {
        this.vy = -this.vy / 2;
      }

      if (this.vy > -0.005 && this.vy < 0.005) {
        this.vy = 0;
      }

      //colision lateral

      if (
        getTile(this.x + width, this.y) != 0 ||
        getTile(this.x, this.y) != 0
      ) {
        this.vx = -this.vx;
      }
    }
  }
  mostrar() {
    drawRotatedImage(
      this.imagen,
      this.x - camera.x,
      this.y - camera.y,
      angulo(this.vx, this.vy)
    );
  }
}
var TO_RADIANS = Math.PI / 180;

function drawRotatedImage(image, x, y, angle) {
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
  ctx.imageSmoothingQuality = "low";
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, -(image.width / 2), -(image.height / 2));

  // and restore the co-ords to how they were when we began
  ctx.restore();
}
rectificacion = 90;
function angulo(x, y) {
  if (x == 0 && y == 0) {
    return 0;
  }

  x == 0 ? (x = x + 1) : "";
  y == 0 ? (y = y + 1) : "";

  if (x > 0 && y > 0) {
    // entre 0 y 90
    res = x * (90 / (x + y)) + rectificacion;

    return parseInt(res);
  }
  if (x > 0 && y < 0) {
    //entre 90 y 180
    res = x * (90 / (x + -y));
    return parseInt(180 - res) - rectificacion;
  }
  if (x < 0 && y > 0) {
    // entre 180 y 270
    res = x * (90 / (-x + y));
    return parseInt(180 + -res) - rectificacion;
  }
  if (x < 0 && y < 0) {
    // entre 270 y 360
    res = x * (90 / -(-x - y));
    return parseInt(360 - res) - rectificacion;
  }
}

class Hitbox{
  constructor( x,y,time){
    this.image = hitbox_img
    this.x=x
    this.y= y
    this.time=time
  }
  timer(){
    this.time --
  }

  show(){
    ctx.drawImage(this.image,  parseInt(this.x-camera.x),  parseInt(this.y-camera.y));
  }

  colision_check(){
    //bloque de hielo
    let tile_pos = getTilePosition(this.x, this.y)
    if (map[tile_pos] == 33){
      break_sound.currentTime = 0
      break_sound.play();
      map[tile_pos] = 0
      for (let i = 0; i <16; i++) {
        let r_x = Math.random() * (4 - 1) + 1;
        let r_y = Math.random() * (4 - -4) + -4;
        let x_mov = -player.vx*r_x
        let y_mov = -player.vy*r_y
        x_mov = x_mov == 0 ? r_x : x_mov
        y_mov = y_mov == 0 ? r_y : y_mov
        let img_ice = [ice_piece_img,ice_piece2_img,ice_piece3_img]  
        let p1 = new particula(
          img_ice[getRandomInt(0,3)],
          this.x,
          this.y,
          x_mov,
          y_mov,
          400,
          true
        );
        particles_array.push(p1);
      }
    } 
  }
}



class Snowflake {
  constructor(x, y) {
    let images = [snowflake_img, snowflake_img2];
    this.imagen = images[Math.floor(Math.random() * 2)];
    this.x = x;
    this.y = y;
    this.vy = Math.random() * (2 - 1) + 1;
  }
}

class Snow {
  start() {
    for (var i = 0; i < 100; i++) {
      var flake = new Snowflake(
        Math.random() * game_load.width * 48,
        Math.random() * game_load.height * 48
      );
      snow_array.push(flake);
    }
  }

  show_snow() {
    for (var i = 0; i < snow_array.length; i++) {
      ctx.drawImage(
        snow_array[i].imagen,
        parseInt(snow_array[i].x - camera.x),
        parseInt(snow_array[i].y - camera.y)
      );
      snow_array[i].y += snow_array[i].vy;
      if (
        snow_array[i].y >= game_load.height * 48 ||
        tilesettings.solid.indexOf( map[getTilePosition(snow_array[i].x, snow_array[i].y)]) !=-1

      ) {
        snow_array[i].y = 0;
      }
    }
  }
}
