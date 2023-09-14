var scene = "splash"
var hitbox_array = []
var game_load;



function select_scene(){
    if (scene == "splash"){
        fadeOut()
        splash_escene();
    }

    if (scene == "level"){
        startGame();
        loop_level();
    }
   
  }
  
var splash_escene =() =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(splash_img,0, 0); 
    print_text("PULSA *(UNO)* PARA INICIAR JUEGO", 20,  130);
    transition()
    press_key(49, function(){change_scene("level")})
    frameCounter++;
    if (scene == "splash"){
        party_settings.animation_loop = window.requestAnimationFrame(splash_escene);
    }
}

function change_scene(scene_string){
    scene = scene_string
    select_scene()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

var startGame = () => {
  map_string = '0$684,36$6,0$54,24,0$22,44,0$9,27,28,27,26,29,26$2,6,0$15,35$8,0$16,7,0$39,8,0$2,19,0$41,30,0$8,22,4,0$29,19,0$8,22,9,0$38,22,9,0$24,43,0,42,0$4,19,0$6,22,9,34,0$16,39,0$6,4,2,3,0$7,31,0$3,22,9,15,0$14,43,4,3,0,4,16,0$2,17,1$3,16,0$4,14,18,16,0$3,22,9,1,15,0$13,4,1,10,0,7,0$4,12,13,11,0$4,14,10,23,0$4,22,9,1$2,15,0,32,0$3,37,24,25,0$4,9,1,10,0,7,0$4,21$3,0$3,14,1,10,23,0$4,22,9,1$3,2$7,3,0,38,0$2,9,1,10,20,7,20,6,41,0$5,40,14,1$2,10,23,0$4,22,9,1$11,2$4,1$3,2,1,2,1,2$17,1$321'
  map_string = "0$34,7,0$33,26,0$2,24,0$2,8,0$19,27,0,24,0$3,36$13,0$3,7,0$7,36$15,0$14,30,0$2,7,0$17,24,0$20,22,7,0$4,35$12,33$2,0$18,30,0,22,7,0$17,35,26$3,35$2,0,35$5,0$7,30,0,22,7,0$38,22,7,0$24,36$11,0,30,0,22,7,0$17,36$6,0$15,22,7,0$36,30,0,22,7,0$12,35$3,24,0$22,22,7,0$15,35,27,35,27,35,27,35$2,0$9,24,0$3,30,0,22,8,0$24,35$3,27,35,27,35$4,26,35$3,0$385,6,0$39,7,0$39,7,0$39,7,0$39,7,0$39,7,0$39,7,0$39,7,0$39,7,0$31,14,2,15,0$4,4,1,3,0$8,14,2,15,0$7,2$12,1$3,2$15,1$3,2$7,1$240" 
  map_string = "0$6,33,0$4,33,0$4,33,0$6,33,0$5,33,0$3,33,0,33$2,0$5,32,0$3,33,0$4,33,0$4,33,0$6,33,0$5,33,0$3,33,0,33$2,0$3,2$17,0$6,33,0$5,33,0$3,33,0$2,33,0$20,2$7,0$5,33,0$3,33,0$2,33,0$27,2$6,0$3,33,0$2,33,0$33,2$4,0$2,33,0$37,2$3,33$979,33,0$8,33,0$30,33,0$8,33,0$30,33,0$8,33,0$25,33,0$4,33,0$3,33,0$4,33,0$5,33,0$19,33,0$4,33,0$3,33,0$4,33,0$5,33,0$16,33,0$2,33,0$4,33,0$3,33,0$4,33,0$5,33,0$7,33,0$8,33,0$2,33,0$4,33,0$3,33,0$4,33,0$5,33,0$4,33,0$2,33,34,0$3,31,0$3,33,0$2,33,0$4,33,0$3,33,0$4,33,0$5,33,0,44,0$2,33,0$2,33,2$40" 
  // 60 ancho x 40
  map_string ="0$2009,14,3,0$55,39,0,14,1,10,0$51,14,2$5,1$2,10,0$50,14,1$8,10,0$31,34,0$17,14,1$10,15,0$31,31,0$11,37,0$3,14,1$12,15,0$6,33$15,0$3,32,0$2,2$19,1$14,2$27" 
  //200 ancho x 20
  map_string ="0$791,44,0$198,17,18,16,0$35,14,2$2,33$2,15,0$191,14,2$2,1$3,33$2,1,15,0$189,14,1$6,33$2,1$2,15,37,0$186,14,1$2,13$2,1$2,13,33$2,13,1$2,16,0$185,14,1$2,10,31,0,9,10,23,33$2,22,9,10,0$50,33,0$132,14,2$2,1$4,3,0,9,10,23,33$2,22,9,10,0$50,33,0$131,14,1$7,10,0,9,10,23,33$2,22,9,10,20$11,0$39,33,0$130,14,1$8,10,0,12,11,23,33$2,22,9,1,18$10,16,0$29,33,0$9,33,0$95,14,3,0$32,14,1$9,10,0$4,33$2,0,12,11,0$10,27,0$18,33,0$10,33,0$9,33,0$94,14,1$2,15,0$30,14,1$10,10,0$4,33$2,0$2,26,0$10,27,0$10,33,0$7,33,0$10,33,0$9,33,0$10,14,2,15,0$80,14,1$4,2,15,0$13,34,32,0$4,39,0$3,37,0$3,14,1$11,10,0$4,33$2,0,24,26,0$6,39,0$2,24,27,0$2,37,0$2,39,0$4,33,0$5,39,0,33,0$7,38$2,0,33,0$6,39,0$2,33,0$9,14,1$3,15,0$3,37,0$7,41,0$6,39,0$7,37,0$51,14,1$7,15,0$2,41,0$2,43,0$6,2$7,3,20$2,4,2$15,1,2$69,1$5,2$78,1$9,2$12,1$8,2$2,1$590" 
  map_string ="0$791,44,0$198,17,18,16,0$35,14,2$2,33$2,15,0$191,14,2$2,1$3,33$2,1,15,0$189,14,1$6,33$2,1$2,15,37,0$186,14,1$2,13$2,1$2,13,33$2,13,1$2,16,0$185,14,1$2,10,32,0,9,10,23,33$2,22,9,10,0$50,33,0$132,14,2$2,1$4,3,0,9,10,23,33$2,22,9,10,0$50,33,0$131,14,1$7,10,0,9,10,23,33$2,22,9,10,20$11,0$39,33,0$130,14,1$8,10,0,12,11,23,33$2,22,9,1,18$10,16,0$29,33,0$9,33,0$95,14,3,0$32,14,1$9,10,0$4,33$2,0,12,11,0$10,27,0$18,33,0$10,33,0$9,33,0$94,14,1$2,15,0$30,14,1$10,10,0$4,33$2,0$2,26,0$10,27,0$10,33,0$7,33,0$10,33,0$9,33,0$10,14,2,15,0$80,14,1$4,2,15,0$13,34,31,0$4,39,0$3,37,45,0,45,14,1$11,10,0$4,33$2,0,24,26,0$6,39,0$2,24,27,0$2,37,0$2,39,0,45$2,0,33,0$5,39,0,33,0$7,38$2,0,33,0$3,45$3,39,45,0,33,0$4,45$3,0$2,14,1$3,15,0$3,37,0$7,41,0$6,39,0$7,37,0$14,45$12,0$25,14,1$7,15,0$2,41,0$2,43,0$6,2$7,3,20$2,4,2$15,1,2$69,1$5,2$78,1$9,2$12,1$8,2$2,1$590" 
  // constructor(environment, sky, weather, fuel, map_tiles, height, width)

  game_load = new GameLoad(getRandomInt(1, 5), getRandomInt(1, 5), 2, 50, map_string, 20, 200);
  constants.MAP_COLUMNS = game_load.width;
  constants.MAP_ROWS = game_load.height;
  map = [...game_load.map_tiles];
  //setting_img
  image_fondo = game_load.sky_img;
  image_tiles = game_load.tiles_img;
  paralax1 = game_load.paralax1_img;
  paralax2 = game_load.paralax2_img;
  hitbox_array = []
  party_settings.restart = false;
  frameCounter = 0;
  party_settings.cleared = false;
  party_settings.time_finish = false;
  party_settings.animation_loop = null;

  for (let i = 0; i < map.length; i++) {
    if(map[i] == 45){
      enemy_coordenades = getTileCordenades(i);
      orientation = Math.random() > 0.5 ? true : false;
      enemy_created = new enemy(1, enemy_coordenades.x, enemy_coordenades.y+17, orientation, 0.3);
      enemys_array.push(enemy_created)
    }
    
  }
  
  ;



  player_cor = getTileCordenades(map.indexOf(34));

  set_player_start_level( game_load.fuel,player_cor)
  //nieve
  snow_array=[]
  if (game_load.enviroment == "SNOW"){
  snow = new Snow();
  snow.start(); 
  }
  fadeOut();
};

function set_player_start_level(jetpack_fuel,player_cor){
  player.alive = true;
  player.jetpack_fuel = jetpack_fuel
  player.x = player_cor.x;
  player.y = player_cor.y;
  player.cadencia_timer = 0
}




//pv = 145
function loop_level() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintBackBackground(image_fondo);
    drawParallax(paralax1, 105, 12);
    drawParallax(paralax2, 145, 8);
    paintMap();
    if (game_load.enviroment == "SNOW"){
    snow.show_snow()
    }
    for (let i = 0; i < sandevistan_array.length; i++) {
      sandevistan_array[i].tiempo--;
      sandevistan_array[i].mostrar();
      if (sandevistan_array[i].tiempo <= 0) {
        sandevistan_array.splice(i, 1);
      }
    }
    for (let i = 0; i < hitbox_array.length; i++) {
      if (hitbox_array[i].time <= 0){
        hitbox_array[i] = false
      }
      if (hitbox_array[i] != false){
        hitbox_array[i].show()
        hitbox_array[i].colision_check()
        hitbox_array[i].timer()
      }
    }
    
    for (let i = 0; i < enemys_array.length; i++) {
      enemys_array[i].mostrar();
      enemys_array[i].move();
      enemys_array[i].check_player();
      if (enemys_array[i].check_colision() === true){
        enemys_array[i] = false
      }
    }
        //borramos las hitbox que se han puesto a false

    hitbox_array = hitbox_array.filter(e => e !== false); 
    enemys_array = enemys_array.filter(e => e !== false); 
  
    if (player.alive) {
      fisicasplayer();
      paintPlayer();
    }
  
    if (player.alive && !player.killfalling) {
      player.is_jetpack = false
      player.atacking = false
      if (keysDown[37]) {
        if (!(player.sliding && player.orientation ===false)){
          player.sliding = false  
          move("left");
          camera.side += 0.05;
        }
       
      } else if (keysDown[39]) {
        if (!(player.sliding && player.orientation=== true)){
        player.sliding = false  
        move("right");
        camera.side -= 0.05;
        }
      }
      if (keysDown[38]) {
        if (
          getTile(player.x, player.y) != 23 &&
          getTile(player.x, player.y) != 24
        )
          move("jump");
      } else if (keysDown[32]) {
        move("jetpack");
      }
      if (keysDown[65]) {
        move("brick");
      }
      if (keysDown[66]) {
          move("attack");
        }
        if (keysDown[40] ) {
          if (player.vy !=0 && (player.vx < 3 && player.vx > -3)){
            player.sliding=false
          player.killfalling = true
          player.vy = 8
          player.vx = 0
          }else{
            if ( !player.killfalling && !player.sliding && !(player.vx <3 && player.vx >-3)){
              rect = player.orientation ?1:-1
              player.vx =rect*8
              player.vy= 3
              player.sliding = true
            }
          }
        }
        if (player.vx <3 && player.vx >-3){
          player.sliding = false
        }


        

    }
  
    if (player.y < 0) {
      ctx.drawImage(
        arrow_img,
        parseInt(player.x - camera.x),
        parseInt(-player.y / 4)
      );
    }
  
    for (let i = 0; i < particles_array.length; i++) {
      particles_array[i].mostrar();
      particles_array[i].fisicas2();
      if (particles_array[i].tiempo <= 0 || particles_array[i].destroy) {
        particles_array.splice(i, 1);
      }
    }
    if (party_settings.cleared == false) {
      refreshCamera();
    }
    //level UI
    //timer
      min = format_time(parseInt(frameCounter / 3600))
      sec = format_time(parseInt((frameCounter / 60) % 60))
      sec_dec = format_time(parseInt((frameCounter % 60) * 1.66))
    print_text(min +":" +sec + ":" +sec_dec,0, 5);
    show_jetpack_bar(0,15)

    //si el jugador gana
    if (party_settings.cleared == true && !party_settings.time_finish) {
      party_settings.time_finish = frameCounter;
    }
    if (party_settings.cleared == true) {
      menu_x = parseInt(canvas.width / 2 - winner_img.width / 2);
      menu_y = parseInt(canvas.height / 2 - winner_img.height / 2);
      time =
        ("00" + parseInt(party_settings.time_finish / 3600)).slice(-2) +
        ":" +
        ("00" + (parseInt(party_settings.time_finish / 60) % 60)).slice(-2) +
        ":" +
        ("00" + parseInt((party_settings.time_finish % 60) * 1.66)).slice(-2);
  
      ctx.drawImage(winner_img, menu_x, menu_y);
      print_text("congratulations", menu_x + 40, menu_y + 30);
      print_text("new record !!", menu_x + 60, menu_y + 40);
      print_text(time, menu_x + 70, menu_y + 55);
      print_text("actual record:" + time, menu_x + 10, menu_y + 110);
      print_text("back to menu", menu_x + 20, menu_y + 120);
    }
    //pulsar r para reset partida
    if (keysDown[82]) {
      party_settings.restart = true;
    }
    press_key(49, function(){change_scene("splash")})
    frameCounter++;
    transition();
  
    if (party_settings.restart) {
      startGame();
    }
  if (scene == "level"){
    party_settings.animation_loop = window.requestAnimationFrame(loop_level);
  }
  }

  function show_jetpack_bar(x,y){
    if (player.jetpack_fuel > 0){
        ["red","green","orange"]
        if (player.jetpack_fuel > 60){
          ctx.fillStyle = "green";
        }else if (player.jetpack_fuel > 20){
          ctx.fillStyle = "orange";
        }else{
          ctx.fillStyle = "red";
        }
        size = parseInt((player.jetpack_fuel /100) *70)
        ctx.fillRect(x+21, y+5, size, 12);
        ctx.drawImage(jetpack_bar_img,x, y);
        //void ctx.fillRect(x, y, width, height);
    }
   
  }
  function format_time(n){
    string = n.toString()
    string = string.length == 1 ? "0"+string: string
    return string 
  }