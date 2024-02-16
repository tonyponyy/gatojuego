class enemy {
  constructor(type, x, y, orientation, vel,width) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.vel = vel;
    this.orientation = orientation;
    this.seed = parseInt(Math.random() * 5);
    this.width = width;
  }
  mostrar() {
    var enemys = [0, enemy_1, boss_1,enemy_2];
    frames = enemys[this.type].width / this.width;
    let frame = parseInt((frameCounter / 7 + this.seed) % frames);
    if (this.orientation) {
      ctx.drawImage(
        enemys[this.type],
        frame * this.width,
        0,
        this.width,
        this.width,
        parseInt(this.x - camera.x),
        parseInt(this.y -this.width+32 - camera.y),
        this.width,
        this.width 
      );
    } else {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(
        enemys[this.type],
        frame * this.width,
        0,
        this.width,
        this.width,
        -1 * (parseInt(this.x - camera.x) + this.width/2),
        parseInt(this.y -this.width+32 - camera.y),
        this.width,
        this.width
      );
      ctx.restore();
    }
  }
  move() {
    // esto es si el enemigo vuela ( no le afecta si hay suelo debajo )
    if (this.type == 3){
             if (colision_enemy(0, 0, this) || colision_enemy(32, 0, this)) {
            this.orientation = !this.orientation;
        } 
    }else{
    if (
      colision_enemy(0, 0, this) ||
      colision_enemy(32, 0, this) ||
      !colision_enemy(32, 32, this) ||
      !colision_enemy(0, 32, this)
    ) {
      this.orientation = !this.orientation;
    }
  }
    if (this.orientation) {
      this.x += this.vel;
    } else {
      this.x -= this.vel;
    }
  
  }
  kill() {
    
      hit_sound.play();
      hit_sound.currentTime = 0
    var enemys_part = [0, enemy_1_part,boss_1_part,enemy_2_part];
    var enemy_death = [0, enemy_1_death,boss_1_death,enemy_2_part]
    let part_img = enemys_part[this.type]
    let enemy_death_img = enemy_death[this.type]
    console.log(this.x+" "+player.x)
    for (let i = 0; i < 2; i++) {
    let part = new particula(part_img, this.x, this.y, 6+getRandomInt(-6,6), -12+getRandomInt(-12,6), 200, false);
    let part1 = new particula(part_img, this.x, this.y, -6+getRandomInt(-6,6), -12+getRandomInt(-16,6), 200, false);
    let part2 = new particula(part_img, this.x, this.y, 0+getRandomInt(-6,6), -12+getRandomInt(-16,6), 200, false);
    let part3 = new particula(part_img, this.x, this.y, 3+getRandomInt(-6,6), -12+getRandomInt(-16,6), 200, false);
    let part4 = new particula(part_img, this.x, this.y, -3+getRandomInt(-6,6), -12+getRandomInt(-16,6), 200, false);
    particles_array.push(part);
    particles_array.push(part1);
    particles_array.push(part2);
    particles_array.push(part3);
    particles_array.push(part4);
    }
    let death_enemy = new particula(enemy_death_img, this.x, this.y, 0+getRandomInt(-6,6), -12+getRandomInt(-6,6), 400, false);
    particles_array.push(death_enemy);
  }
  check_colision(){
    for (let i = 0; i < hitbox_array.length; i++) {
      if (hitbox_array[i] !=false){
      let hit_x = hitbox_array[i].x;
      let hit_y = hitbox_array[i].y;

      var offset = !this.orientation ? -22 : 0;
    var offset_player = 0


    var col_vert_body =
      hit_y > this.y - 1 && hit_y < this.y + 32 ? true : false;
    var col_hor_body =
      hit_x + offset_player > this.x + offset &&
      hit_x + offset_player < this.x + offset + 32
        ? true
        : false;
    var col_vert = hit_y > this.y - 12 && hit_y < this.y ? true : false;
    var col_hor =
      hit_x + offset_player > this.x - 12 + offset &&
      hit_x + offset_player < this.x + 12 + offset + 32
        ? true
        : false;


        if (col_vert_body && col_hor_body){
          return true
        }
      }    
 
      
    }

  }

  check_player() {
    var offset = !this.orientation ? -22 : 0;
    var offset_player = player.orientation ? +16 : 0;
    show_colision(this.x - 12 + offset, this.y, 44, 12, "blue");
    show_colision(this.x + offset, this.y -this.width+32, this.width, this.width, "red");

    var col_vert_body =
      player.y > this.y - 1 && player.y < this.y + 32 ? true : false;
    var col_hor_body =
      player.x + offset_player > this.x + offset &&
      player.x + offset_player < this.x + offset + 32
        ? true
        : false;
    var col_vert = player.y > this.y - 12 && player.y < this.y ? true : false;
    var col_hor =
      player.x + offset_player > this.x - 12 + offset &&
      player.x + offset_player < this.x + 12 + offset + 32
        ? true
        : false;

    if (col_vert_body) {
      console.log("vertical");
    }
    if (col_hor_body) {
      console.log("horizontal");
    }

    if (col_vert && col_hor && !player.sliding) {
     death()
    }
  }
}
