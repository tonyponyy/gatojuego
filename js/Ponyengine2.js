//canvas fullscreen

function fullscreen() {
  var el = document.getElementById("canvas");

  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  } else {
    el.mozRequestFullScreen();
  }
}

canvas.addEventListener("click", fullscreen);
//
var snow_array = []
var snow;
var col_down = false;
var col_left = false;
var col_up = false;
var col_right = false;

var debuuger = false;
var frameCounter = 1;

var physics = {
  gravity: 1,
  friction: 0.5,
  friction_hielo: 0.05,
  sliding_friction: 0.05,
  friction_aire: 0.3,
};

downloaded_map = TileMaps.test_pruebas.layers[0].data;
map = [];
var tilesettings = {
  solid: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,16,17,18,19,26,28,35,36,33],
  dead: [20,21,22,23],
};

var tile_names = {
  left_ramp:14,
  right_ramp:15,
  spike_up:20,
  spike_down:22,
  skipe_left:23,
  spike_right:24,
  boton_1:25,
  boton_2:26
}


var party_settings = {
  cleared: false,
  time_finish: false,
  restart: false,
  animation_loop: null,
};

var transtion_settings = {
  fade_in: true,
  frame_end: false,
};
var constants = {
  SANDEVISTAN_TIME: 44,
  CANVAS_WIDTH: 1920 / 3,
  CANVAS_HEIGHT: 1080 / 3,
  ZOOM: 1,
  TILES_WIDTH: 48,
  TILES_HEIGHT: 48,
  MAP_COLUMNS: 40,
  MAP_ROWS: 40,
};
var camera = {
  x: 0,
  y: 0,
  side: 1.5,
};
var player = {
  cadencia:20,
  cadencia_timer: 0,
  sliding:false,
  killfalling:false,
  hot:false,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  limit: 8,
  limit_jetpack:9,
  landed: false,
  orientation: true,
  jumpduration_set: 24,
  jumpduration: 84,
  jumpforce: 0,
  jetpack_fuel: 100,
  alive: true,
  jumpforce: 16,
  jumping: false,
  clicked: false,
  canclick: true,
  candoor: true,
  click_duration: 60,
  springing: false,
  spring_duration: 12,
  spring_force: 1,
  spring_set: 12,
  spring_y: 0,
  canjump: true,
  jetpack: 0,
  is_jetpack: false,
  canjetpack: true,
  atacking: false,
  sandevistan: false,
  spring() {
    if (this.springing && this.spring_duration != 0) {
      this.spring_y -=
        this.spring_force * ((this.spring_set - this.spring_duration) * 4);
      if (this.spring_duration == 1) {
        resetspring();
      }
      this.spring_duration--;
    }
  },

  jump() {
    if (this.jumpduration > 0 && this.jumping == true) {
      if (this.jumpduration == this.jumpduration_set) {
        this.y -= this.jumpforce * 2;
      }
      this.vy -=
        this.jumpforce * (this.jumpduration / this.jumpduration_set / 2);
      console.log(this.vy);
      this.jumpduration--;
    } else {
      this.jumping = false;
      resetjump();
    }
  },
  click() {
    if (this.clicked == true && this.click_duration == 60) {
      tileswitcher();
      this.canclick = false;
    }
    this.click_duration--;
    if (this.click_duration == 0) {
      this.clicked = false;
      this.canclick = true;
      this.click_duration = 60;
    }
  },
};

function resetjump() {
  player.jumpduration = player.jumpduration_set;
}

function resetspring() {
  player.springing = false;
  player.spring_duration = player.spring_set;
  player.spring_y = 0;
}

mousex = 0;
mousey = 0;
//función raton
document.addEventListener("mousemove", () => {
  mousex = event.clientX; // Gets Mouse X
  mousey = event.clientY; // Gets Mouse Y
});

var refreshCamera = () => {
  //limitando en la izquierda

  if (camera.side > 3.5) {
    camera.side = 3.5;
  }
  if (camera.side < 1.5) {
    camera.side = 1.5;
  }

  camera.x =
    player.x -
    (constants.CANVAS_WIDTH - constants.CANVAS_WIDTH / camera.side) +
    constants.TILES_WIDTH / 2;

  camera.y =
    player.y - constants.CANVAS_HEIGHT / 1.7 + constants.TILES_HEIGHT / 2;
  if (camera.y < 0) camera.y = 0;
  if (camera.x < 0) camera.x = 0;

  //if (player.X< constants.CANVAS_WIDTH/2){ camera.x = 0}
  if (
    camera.x >
    constants.MAP_COLUMNS * constants.TILES_WIDTH - constants.CANVAS_WIDTH
  ) {
    camera.x =
      constants.MAP_COLUMNS * constants.TILES_WIDTH - constants.CANVAS_WIDTH;
  }
  //if (player.Y< constants.CANVAS_HEIGHT/2){ camera.y = 0}
  if (
    camera.y >
    constants.MAP_ROWS * constants.TILES_HEIGHT - constants.CANVAS_HEIGHT
  ) {
    camera.y =
      constants.MAP_ROWS * constants.TILES_HEIGHT - constants.CANVAS_HEIGHT;
  }
};

var particles_array = [];
var sandevistan_array = [];
var enemys_array = [];

window.addEventListener(
  "load",
  function () {
    load_params();
  },
  false
);

function load_params(){
  canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = constants.CANVAS_WIDTH;
    canvas.height = constants.CANVAS_HEIGHT;
    canvas.style.width = constants.CANVAS_WIDTH * constants.ZOOM + "px";
    canvas.style.height = constants.CANVAS_HEIGHT * constants.ZOOM + "px";

    imageQueue = 3;

    //paralax
    field_paralax1_img = new Image();
    field_paralax1_img.onload = onLoadImage;
    field_paralax1_img.src = "img/paralax/field_paralax1.png";
    field_paralax2_img = new Image();
    field_paralax2_img.onload = onLoadImage;
    field_paralax2_img.src = "img/paralax/field_paralax2.png";

    desert_paralax1_img = new Image();
    desert_paralax1_img.onload = onLoadImage;
    desert_paralax1_img.src = "img/paralax/desert_paralax1.png";
    desert_paralax2_img = new Image();
    desert_paralax2_img.onload = onLoadImage;
    desert_paralax2_img.src = "img/paralax/desert_paralax2.png";

    ruins_paralax1_img = new Image();
    ruins_paralax1_img.onload = onLoadImage;
    ruins_paralax1_img.src = "img/paralax/ruins_paralax1.png";
    ruins_paralax2_img = new Image();
    ruins_paralax2_img.onload = onLoadImage;
    ruins_paralax2_img.src = "img/paralax/ruins_paralax2.png";

    snow_paralax1_img = new Image();
    snow_paralax1_img.onload = onLoadImage;
    snow_paralax1_img.src = "img/paralax/snow_paralax1.png";
    snow_paralax2_img = new Image();
    snow_paralax2_img.onload = onLoadImage;
    snow_paralax2_img.src = "img/paralax/snow_paralax2.png";

    // tiles_img
    //to_do añadir imagenes en la carpeta
    field_tiles_img = new Image();
    field_tiles_img.onload = onLoadImage;
    field_tiles_img.src = "img/environment/field_tiles.png";

    desert_tiles_img = new Image();
    desert_tiles_img.onload = onLoadImage;
    desert_tiles_img.src = "img/environment/desert_tiles.png";

    ruins_tiles_img = new Image();
    ruins_tiles_img.onload = onLoadImage;
    ruins_tiles_img.src = "img/environment/ruins_tiles.png";

    snow_tiles_img = new Image();
    snow_tiles_img.onload = onLoadImage;
    snow_tiles_img.src = "img/environment/snow_tiles.png";

    // sky_img
    sunny_sky_img = new Image();
    sunny_sky_img.onload = onLoadImage;
    sunny_sky_img.src = "img/sky/sunny_sky.png";

    night_sky_img = new Image();
    night_sky_img.onload = onLoadImage;
    night_sky_img.src = "img/sky/night_sky.png";

    cloudy_sky_img = new Image();
    cloudy_sky_img.onload = onLoadImage;
    cloudy_sky_img.src = "img/sky/cloudy_sky.png";

    afternoon_sky_img = new Image();
    afternoon_sky_img.onload = onLoadImage;
    afternoon_sky_img.src = "img/sky/afternoon_sky.png";

    //
    enemy_1 = new Image();
    enemy_1.onload = onLoadImage;
    enemy_1.src = "img/enemy1.png";

    image_player = new Image();
    image_player.onload = onLoadImage;
    image_player.src = "img/player.png";

    image_fondo = new Image();
    image_fondo.onload = onLoadImage;
    image_fondo.src = "img/fondo.png";

    font_img = new Image();
    font_img.onload = onLoadImage;
    font_img.src = "img/font.png";

    star_img = new Image();
    star_img.onload = onLoadImage;
    star_img.src = "img/estrella.png";

    arrow_img = new Image();
    arrow_img.onload = onLoadImage;
    arrow_img.src = "img/arrow.png";

    image_trans = new Image();
    image_trans.onload = onLoadImage;
    image_trans.src = "img/transc.png";

    image_tiles = new Image();
    image_tiles.onload = onLoadImage;
    image_tiles.src = "img/tileset.png";

    image_canica = new Image();
    image_canica.onload = onLoadImage;
    image_canica.src = "img/canica.png";

    mini = new Image();
    mini.onload = onLoadImage;
    mini.src = "img/mini.png";

    winner_img = new Image();
    winner_img.onload = onLoadImage;
    winner_img.src = "img/winnermenu.png";

    part_mini = new Image();
    part_mini.onload = onLoadImage;
    part_mini.src = "img/part1.png";

    paralax1 = new Image();
    paralax1.onload = onLoadImage;
    paralax1.src = "img/parallax1.png";

    paralax2 = new Image();
    paralax2.onload = onLoadImage;
    paralax2.src = "img/parallax2.png";

    snowflake_img = new Image();
    snowflake_img.onload = onLoadImage;
    snowflake_img.src = "img/snowflake.png";

    snowflake_img2 = new Image();
    snowflake_img2.onload = onLoadImage;
    snowflake_img2.src = "img/snowflake2.png";

    hitbox_img = new Image();
    hitbox_img.onload = onLoadImage;
    hitbox_img.src = "img/hitbox.png";


    splash_img = new Image();
    splash_img.onload = onLoadImage;
    splash_img.src = "img/splash.png";

    ice_piece_img = new Image();
    ice_piece_img.onload = onLoadImage;
    ice_piece_img.src = "img/ice_piece.png";

    ice_piece2_img = new Image();
    ice_piece2_img.onload = onLoadImage;
    ice_piece2_img.src = "img/ice_piece2.png";

    ice_piece3_img = new Image();
    ice_piece3_img.onload = onLoadImage;
    ice_piece3_img.src = "img/ice_piece3.png";

    jetpack_bar_img = new Image();
    jetpack_bar_img.onload = onLoadImage;
    jetpack_bar_img.src = "img/jetpackbar.png";

    bomb_img = new Image();
    bomb_img.onload = onLoadImage;
    bomb_img.src = "img/bomb.png";
 
 
    image_explosion = new Image();
    image_explosion.onload = onLoadImage;
    image_explosion.src = "img/exp.png";
    
}




var onLoadImage = () => {
  imageQueue--;
  if (imageQueue == 0) {
    select_scene()
  }
};





diff = parseInt(+player.x + canvas.width / 2 + camera.x);

var paintPlayer = () => {
  frame = 5 * 32;

  if (player.vx != 0 && !player.jumping) {
    //frame = (5+ ((frameCounter/10)%7) )  *32
    frame = (7 + (parseInt(frameCounter / 8) % 8)) * 32;
  }

  if (player.vx == 0 && !player.jumping) {
    frame = (parseInt(frameCounter / 60) % 4) * 32;
  }

  //salto
  if (player.jumping || !player.canjump) {
    frame = (5 + (parseInt(frameCounter / 8) % 2)) * 32;
  }

  if (player.atacking){
    if (player.cadencia_timer <= frameCounter){
    frame = (15 + (parseInt(frameCounter / 8) % 4)) * 32;
    x_force = player.orientation ? 15:-15
    rect_x = getRandomInt(-3,3)
    rect_y = getRandomInt(-3,3)
    bomb = new particula(bomb_img, player.x, player.y, x_force+rect_x, -10+rect_y, 400, true,2);
    particles_array.push(bomb);
    player.cadencia_timer = frameCounter+player.cadencia
  }
  }
  if (player.killfalling){
    frame = (20 + (parseInt(frameCounter / 8) % 2)) * 32;
  }
  if (player.sliding){
    frame = (23 + (parseInt(frameCounter / 8) % 2)) * 32;
  }


  //faltan imagenes de la caida

  if (player.orientation) {
    x = parseInt(player.x - camera.x);
    y = parseInt(player.y - camera.y);
    ctx.drawImage(image_player, frame, 0, 32, 32, x - 16, y, 32, 32);
  } else {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(
      image_player,
      frame,
      0,
      32,
      32,
      -1 * parseInt(player.x - camera.x) - 32,
      parseInt(player.y - camera.y),
      32,
      32
    );
    ctx.restore();
  }
  if (player.sandevistan) {
    sandevistan(
      frame,
      player.x,
      player.y - 0,
      frameCounter % 60,
      !player.orientation
    );
  }
};

function getTile(x, y) {
  return map[
    parseInt(x / constants.TILES_WIDTH) +
      parseInt(y / constants.TILES_HEIGHT) * constants.MAP_COLUMNS
  ];
}

function colisionPlayer(x, y) {
  x = player.x + x;
  y = player.y + y;

  tile =
    map[
      parseInt(x / constants.TILES_WIDTH) +
        parseInt(y / constants.TILES_HEIGHT) * constants.MAP_COLUMNS
    ];

  if (tilesettings.solid.indexOf(tile) != -1) {
    return true;
  } else {
    return false;
  }
}

function colision_enemy(x, y, enemy) {
  x = enemy.x + x;
  y = enemy.y + y;

  tile =
    map[
      parseInt(x / constants.TILES_WIDTH) +
        parseInt(y / constants.TILES_HEIGHT) * constants.MAP_COLUMNS
    ];

  if (tilesettings.solid.indexOf(tile) != -1 || tile == 21 || tile == 22) {
    return true;
  } else {
    return false;
  }
}

function getTilePosition(x, y) {
  return (r =
    parseInt(x / constants.TILES_WIDTH) +
    parseInt(y / constants.TILES_HEIGHT) * constants.MAP_COLUMNS);
}


function getTileCordenades(pos) {
  const r = {
    x: (pos % constants.MAP_COLUMNS) * constants.TILES_WIDTH,
    y: Math.floor(pos / constants.MAP_COLUMNS) * constants.TILES_HEIGHT,
  };

  return r;
}




function sandevistan(frame, x, y, color, invert) {
  if (frameCounter % 4 == 0) {
    image = new sandevistan_part(
      frame,
      x,
      y,
      constants.SANDEVISTAN_TIME,
      color * 6,
      invert
    );
    sandevistan_array.push(image);
  }
}



function paintBackBackground(image) {
  ctx.fillStyle = ctx.createPattern(image, "repeat");
  ctx.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
}
var temp = 8;

var paintMap = () => {
  var width = constants.MAP_ROWS;
  var height = constants.MAP_COLUMNS;
  var t_width = 48;
  var t_height = 48;
  var sum = 0;
  var counter = 0;

// Calcula las columnas que deben dibujarse en función de la cámara
var column_start = Math.max(0, Math.floor(camera.x / constants.TILES_WIDTH));
var column_end = Math.min(constants.MAP_COLUMNS, Math.ceil((camera.x + constants.CANVAS_WIDTH) / constants.TILES_WIDTH));

// Calcula las filas que deben dibujarse en función de la cámara
var row_start = Math.max(0, Math.floor(camera.y / constants.TILES_HEIGHT));
var row_end = Math.min(constants.MAP_ROWS, Math.ceil((camera.y + constants.CANVAS_HEIGHT) / constants.TILES_HEIGHT));

var sum = 0;
var waveAmplitude = 1; // Ajusta el valor según la intensidad deseada



// Itera a través de las filas y columnas necesarias
for (var row = row_start; row < row_end; row++) {
  for (var col = column_start; col < column_end; col++) {
    var tileIndex = row * constants.MAP_COLUMNS + col;
    if (map[tileIndex] !== 0) {
      var tileX = col * constants.TILES_WIDTH - camera.x;

      // Aplicar ondulación solo cuando debug esté activado
      var tileY = row * constants.TILES_HEIGHT - camera.y;
      if (player.hot) {
        tileY += waveAmplitude * Math.sin(tileX / 20); // Ajusta la frecuencia de la ondulación
      }

      ctx.drawImage(
        image_tiles,
        (map[tileIndex] - 1) * constants.TILES_HEIGHT,
        0,
        constants.TILES_WIDTH,
        constants.TILES_HEIGHT,
        parseInt(tileX),
        parseInt(tileY),
        constants.TILES_WIDTH,
        constants.TILES_HEIGHT
      );
      sum++;
    }
  }
}
  

  if (debug) {
    print_text("TILES DRAWN: " + sum, 0, 60);
    print_text("Vy player: " + player.vy, 0, 80);
    print_text("Vx player: " + player.vx, 0, 100);
    print_text("Is jumping? " + player.jumping, 0, 120);
  }

  /*
  if (counter % row_start == 0) {
    i += width;
    console.log("w")
  }*/
};


//teclas
var keysDown = new Array(256);
for (var i = 0; i < 256; i++) keysDown[i] = 0;

document.onkeydown = function (e) {
  keysDown[e.keyCode]++;
};
document.onkeyup = function (e) {
  keysDown[e.keyCode] = 0;
};

function isKeyDown(k) {
  return keysDown[k] === 1;
}
function isKeyHold(k) {
  return keysDown[k];
}

//player

var move = (e) => {
  switch (e) {
    case "left":
      player.vx -= 1;
      player.orientation = false;
      break;
    case "right":
      player.vx += 1;
      player.orientation = true;
      break;
    case "jump":
      if (player.canjump) {
        player.jump();
        player.jumping = true;
      }
      break;
    case "jetpack":
      if (player.jetpack_fuel > 0) {
        player.is_jetpack = true;
        player.jetpack -= 3;
        player.jetpack_fuel -= 0.1;
        rect_x = player.orientation ? -12:24;
        rect_y = 0;
        if (player.sliding){
          rect_y = -20
          rect_x =  player.orientation ? player.orientation -20: player.orientation +30
        }
        part = new particula(
          mini,
          player.x + rect_x,
          player.y + 34+rect_y,
          -player.vx,
          player.vy + Math.random() * 5,
          6,
          false
        );
        //constructor(imagen, x,y, vx,vy, tiempo,solido)
        player.vy -= 12;
        if (player.sliding){
          rect = player.orientation ? 1:-1
          player.vx = 12*rect
        }
        particles_array.push(part);
        //eliminar después
      }
      break;
    case "brick":
      map[getTilePosition(player.x + 48, player.y)] = 33;
      break;
      case "attack":
      player.atacking = true
      break;
    default:
      break;
  }
};
dif = 6;
function hitbox_player(down=false){
  var x_rectificacion = player.orientation ? 42: -42
    var y_rectification = 16
    if (down){
      x_rectificacion = 0
      y_rectification = +62
    }
    hit_x= parseInt(player.x+x_rectificacion)
    hit_y= parseInt(player.y+y_rectification)

  hitbox_array.push(new Hitbox(hit_x,hit_y,1))
}


var fisicasplayer = () => {
  var col_left = false;
  var col_right = false;
  var col_up = false;
  var col_down = false;
  width = 48;
  height = 48;

  if ( player.killfalling){
    hitbox_player(true) 
  }
  if ( player.sliding){
    hitbox_player()
  }
   

  if (colisionPlayer(0, -32)) {
    col_up = true;
  }
  if (colisionPlayer(0, 32)) {
    col_down = true;
  }

  if (colisionPlayer(32, 0)) {
    col_left = true;
  }
  if (colisionPlayer(0, 0) || player.x + 32 <= 0) {
    col_right = true;
  }

  if (getTile(player.x, player.y + (player.x % 48)) == 21) {
    col_down = true;
  }
  if (getTile(player.x + 12, player.y + (48 - ((player.x + 12) % 48))) == 22) {
    col_down = true;
  }

  if (col_down) {
    if (colisionPlayer(0, 32) && colisionPlayer(0, 31)) {
      player.y -= 1;
    }
  }

  //muerte jugador
  if (
    tilesettings.dead.indexOf(getTile(player.x, player.y + 2)) != -1 ||
    tilesettings.dead.indexOf(getTile(player.x + 34, player.y)) != -1 ||
    tilesettings.dead.indexOf(getTile(player.x - 2, player.y)) != -1 ||
    tilesettings.dead.indexOf(getTile(player.x, player.y + 32)) != -1
  ) {
    death();
  }

  if (col_left || col_right) {
    player.vx = 0;
  }
  if (col_up || col_down) {
    player.vy = 0;
  }

  if (col_up) {
    player.jumping = false;
    resetspring();
  }

  if (col_left) {
    player.x -= 1;
  }
  if (col_right) {
    player.x += 1;
  }

  if (col_down && !player.canjump) {
    player.y = parseInt(player.y);
  }

  if (!col_down) {
    player.vy += physics.gravity / 1.5;

    player.canjump = false;
  } else {
    player.canjump = true;
  }

  if (player.jumping) {
    player.jump();
  }

  if (player.springing) {
    player.spring();
  }

  //debugger
  if (debug){
  print_text("fuel :" + parseInt(player.jetpack_fuel) + "%", 0, 0);
  print_text("down :" + col_down, 0, 140);
  print_text("up :" + col_up, 0, 160);
  print_text("left :" + col_left, 0, 180);
  print_text("right :" + col_right, 0, 200);
  print_text("tile_player :" + getTile(player.x, player.y), 0, 220);
  print_text(
    "time :" +
      parseInt(frameCounter / 3600) +
      ":" +
      (parseInt(frameCounter / 60) % 60) +
      ":" +
      parseInt((frameCounter % 60) * 1.66),
    0,
    240
  );}

  //limitadores
  if (player.is_jetpack && player.sliding){
    limit = player.limit_jetpack
    if (player.vx > 9 || player.vx<-9){
      player.hot = true
    }
   
  }else{
    limit = player.limit
    player.hot = false
  }

  if (player.spring_y < -20) {
    player.spring_y = -20;
  }

  if (player.vy > limit) {
    player.vy = limit;
  }
  if (player.vy < -limit) {
    player.vy = -limit;
  }
  if (player.vx > limit) {
    player.vx = limit;
  }
  if (player.vx < -limit) {
    player.vx = -limit;
  }
  if (player.vx > -0.4 && player.vx < 0.4) {
    player.vx = 0;
  }

  //cintas
  if (getTile(player.x, player.y + 32) == 35 && !col_left) {
    player.vx = player.vx + 4;
  }
  if (getTile(player.x, player.y + 32) == 36 && !col_right) {
    player.vx = player.vx - 4;
  }

  // clicka botones

  if ((getTile(player.x, player.y) == 24 || getTile(player.x, player.y) == 25)  && player.canclick) {
    click_status = getTile(player.x, player.y)
    click_status = click_status == 24 ? 25:24;
    map[getTilePosition(player.x, player.y)] = click_status
    player.clicked = true;
  }
  if (player.clicked) {
    player.click();
  }

  if (getTile(player.x, player.y) == 30) {
    player.springing = true;
  }

  //porta magica
  if (
    getTile(player.x, player.y) == 31 &&
    
    player.candoor &&
    map.indexOf(32) != -1 &&
    keysDown[38] != 0
  ) {
    console.log("puerta a")
     player.jumping = false
     player.canjump= false
    player.candoor = false;
    closedoor();
    door_cor = getTileCordenades(map.indexOf(32));
    fadeOut();
    player.x = door_cor.x+16;
    player.y = door_cor.y;
  }
  //porta magica
  if (
    getTile(player.x, player.y) == 32 &&
    player.candoor &&
    map.indexOf(31) != -1 &&
    keysDown[38] != 0
  ) {
    console.log("puerta b")
     player.jumping = false
     player.canjump= false
    player.candoor = false;
    closedoor();
    door_cor = getTileCordenades(map.indexOf(31));
    fadeOut();
    player.x = door_cor.x+16;
    player.y = door_cor.y;
  }

  if (getTile(player.x, player.y) == 43 && player.jetpack_fuel != 100) {
    player.jetpack_fuel = 100;
    map[getTilePosition(player.x, player.y)] = 0;
  }
  // win
  if (getTile(player.x, player.y) == 44) {
    map[getTilePosition(player.x, player.y)] = 44;
    win();
  }

  //aplicamos inercia


  if (!col_down) {
    friction = physics.friction_aire;
  } else {
    friction = physics.friction;
    if (getTile(player.x, player.y + 32) == 33) {
      friction = physics.friction_hielo;
    }
  }

  if (player.sliding){
    friction = physics.sliding_friction
  }

  if (player.vx > 0) {
    player.vx -= friction;
  }
  if (player.vx < 0) {
    player.vx += friction;
  }

  player.y += player.spring_y;
/*
const tile14 = 14;
const tile15 = 15;
let ramp_stuck = getTile(player.x, player.y - 3) === tile14 || getTile(player.x, player.y - 3) === tile15;

if (ramp_stuck) {
  while (getTile(player.x, player.y - 3) === tile14 || getTile(player.x, player.y - 3) === tile15) {
    player.y -= 1;
  }
}*/

  rampa_derecha =
    getTile(player.x + 12, player.y + ((player.x + 12) % 48)) == 14
      ? true
      : false;
  rampa_izquierda =
    getTile(player.x + 12, player.y + (48 - ((player.x + 11) % 48))) == 15
      ? true
      : false;

  if (!(rampa_derecha || rampa_izquierda)) {
    player.y += player.vy + player.spring_y;
    player.x += player.vx;
    if (player.vx < 0.5 && player.vx > -0.5) {
      player.vx = 0;
    }
  }

  //rampas
  //rampa a la derecha subida

  if (rampa_derecha) {
    player.canjump = true;
    player.landed = true;
    if (player.vx < 0) {
      player.x += player.vx;
      player.y -= player.vx;
    } else {
      player.x += player.vx / 2;
      player.y -= player.vx / 2;
    }
  }

  //rampa a la izquierda subida

  if (rampa_izquierda) {
    player.canjump = true;
    player.landed = true;
    if (player.vx < 0) {
      player.x += player.vx / 2;
      player.y += player.vx / 2;
    } else {
      player.x += player.vx;
      player.y += player.vx;
    }
  }

    //quitar el estado de killerjump
    if (player.killfalling && (col_down || rampa_derecha || rampa_izquierda)){
      player.killfalling = false
    }
    //quitar el estado de sliding
    if (player.sliding && (player.vx ==0 )){
      player.sliding = false;
    }



};

function death() {
  player.alive = false;

  for (let i = 0; i < 30; i++) {
    r = Math.random() * (1 + Math.random() * 1.3);
    r2 = Math.random();
    p1 = new particula(
      part_mini,
      player.x,
      player.y,
      r2 + -player.vx * r,
      -15 * r2 + -player.vy * r,
      400,
      true
    );

    particles_array.push(p1);
  }
}

function closedoor() {
  setTimeout(function () {
    player.candoor = true;
  }, 500);
}

function tileswitcher() {
  for (let i = 0; i < map.length; i++) {
    if (map[i] == 26 || map[i] == 28) {
      map[i] = map[i] + 1;
    } else if (map[i] == 27 || map[i] == 29) {
      map[i] = map[i] - 1;
    }
  }
}

function print_text(string_text, x, y) {
  font_map = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ":",
    "*",
    ".",
    "%",
  ];
  for (let i = 0; i < string_text.length; i++) {
    ctx.drawImage(
      font_img,
      font_map.indexOf(string_text[i].toUpperCase()) * 10,
      0,
      10,
      10,
      x + i * 10,
      y,
      10,
      10
    );
  }
}

function drawParallax(image, y, speed) {
  var temp = parseInt(-camera.x / speed);
  ctx.drawImage(image, temp % image.width, y);

  for (let i = 0; i < parseInt(canvas.width / image.width) + 1; i++) {
    ctx.drawImage(image, (temp % image.width) + image.width * i, y);
  }
}

function transition() {
  if (transtion_settings.frame_end > frameCounter) {
    diferencial_frame = transtion_settings.frame_end - frameCounter;
    frame_trans = 50 - diferencial_frame;
    if (transtion_settings.fade_in == true) {
      frame_trans = parseInt((50 - diferencial_frame) / 5);
    } else {
      frame_trans = 4 - parseInt((50 - diferencial_frame) / 5);
    }

    for (let i = 0; i < parseInt(canvas.width / 31) + 1; i++) {
      for (let e = 0; e < canvas.height / 31 + 1; e++) {
        ctx.drawImage(
          image_trans,
          frame_trans * 31,
          0,
          31,
          31,
          i * 31,
          e * 31,
          31,
          31
        );
      }
    }

    if (frame_trans == 4 && transtion_settings.fade_in == true) {
      return true;
    }
    if (frame_trans == 0 && transtion_settings.fade_in == false) {
      return true;
    }
  }
}

function fadeIn() {
  transtion_settings.fade_in = true;
  transtion_settings.frame_end = frameCounter + 50;
}
function fadeOut() {
  transtion_settings.fade_in = false;
  transtion_settings.frame_end = frameCounter + 50;
}
function win() {
  party_settings.cleared = true;
  r = getRandomInt(12,34)
  star = new particula(star_img, player.x, player.y, 12, 12, 400, false);
  particles_array.push(star);
  star = new particula(star_img, player.x, player.y, -12, 12, 400, false);
  particles_array.push(star);
  star = new particula(star_img, player.x, player.y, 12, -12, 400, false);
  particles_array.push(star);
  star = new particula(star_img, player.x, player.y, -12, -12, 400, false);
  particles_array.push(star);

  star = new particula(star_img, player.x, player.y, 24, 12, 400, false);
  particles_array.push(star);
  star = new particula(star_img, player.x, player.y, -24, 12, 400, false);
  particles_array.push(star);
  star = new particula(star_img, player.x, player.y, 24, -12, 400, false);
  particles_array.push(star);
  star = new particula(star_img, player.x, player.y, -24, -12, 400, false);
  particles_array.push(star);
}

function show_colision(x, y, w, h, color) {
  if (debug) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(x - camera.x, y - camera.y, w, h);
    ctx.stroke();
  }
}
var debug = false;
