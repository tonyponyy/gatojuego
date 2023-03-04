class enemy {
  constructor(type, x, y, orientation, vel) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.vel = vel;
    this.orientation = orientation;
    this.seed = parseInt(Math.random() * 5);
  }
  mostrar() {
    var enemys = [0, enemy_1];
    frames = enemys[this.type].width / 32;
    frame = parseInt((frameCounter / 7 + this.seed) % frames);
    if (this.orientation) {
      ctx.drawImage(
        enemys[this.type],
        frame * 32,
        0,
        32,
        32,
        parseInt(this.x - camera.x),
        parseInt(this.y - camera.y),
        32,
        32
      );
    } else {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(
        enemys[this.type],
        frame * 32,
        0,
        32,
        32,
        -1 * (parseInt(this.x - camera.x) + 16),
        parseInt(this.y - camera.y),
        32,
        32
      );
      ctx.restore();
    }
  }
  move() {
    if (
      colision_enemy(0, 0, this) ||
      colision_enemy(32, 0, this) ||
      !colision_enemy(32, 32, this) ||
      !colision_enemy(0, 32, this)
    ) {
      this.orientation = !this.orientation;
    }

    if (this.orientation) {
      this.x += this.vel;
    } else {
      this.x -= this.vel;
    }
  }
  kill() {
    enemys_array.pop(enemys_array.indexOf(this));
  }

  check_player() {
    var offset = !this.orientation ? -22 : 0;
    var offset_player = player.orientation ? +16 : 0;
    show_colision(this.x - 12 + offset, this.y, 44, 12, "blue");
    show_colision(this.x + offset, this.y, 32, 32, "red");

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

    if (col_vert && col_hor && player.vy > 0) {
      console.log("muerto");
      this.kill();
      player.jump();
      player.jumping = true;
      return;
    } else {
      if (col_vert_body && col_hor_body && player.vy <= 0) {
        console.log("player muerto" + player.vy);
        death();
      }
    }
  }
}
