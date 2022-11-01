//canvas fullscreen

 
function fullscreen(){
    var el = document.getElementById('canvas');

    if(el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    }
   else {
      el.mozRequestFullScreen();
   }            
}

canvas.addEventListener("click",fullscreen)
//

var col_down=false;
var col_left=false;
var col_up=false;
var col_right=false;




var debuuger = false;
var frameCounter = 1;

var physics = {
gravity : 2,
friction: 0.5,
friction_hielo : 0.05,
friction_aire : 0.01
}


downloaded_map = TileMaps.test_pruebas.layers[0].data
map = []
var tilesettings ={
solid : [1,2,3,4,5,6,7,8,9,10,12,14,15,19,20],
dead: [10]
}

var party_settings={
    cleared:false,
    time_finish:false,
    restart:false,
    animation_loop: null
}


var transtion_settings ={
    fade_in:true,
    frame_end: false
}
var constants = { 
SANDEVISTAN_TIME: 44,
CANVAS_WIDTH: 1920/4,
CANVAS_HEIGHT: 1080/4,
ZOOM : 2,
TILES_WIDTH:48,
TILES_HEIGHT:48,
MAP_COLUMNS : 40,
MAP_ROWS:40
}
var camera = {
x:0,
y:0,
side:1.5

}
var player ={
x:0,
y:0,
vx:0,
vy:0,
limit:8,
landed:false,
orientation:true,
jumpduration_set : 24,
jumpduration:44,
jumpforce:12,
jetpack_fuel: 100,
alive:true,
jumpforce:16,
jumping:false,
clicked:false,
canclick:true,
candoor:true,
click_duration: 60,
springing:false,
spring_duration:12,
spring_force:1,
spring_set:12,
spring_y :0,
canjump:true,
jetpack:0,
canjetpack:true,
sandevistan: false,
spring(){
if (this.springing && this.spring_duration != 0){
 
 this.spring_y -= this.spring_force * ((this.spring_set-this.spring_duration )*4  )
 if (this.spring_duration == 1){
     resetspring()
 }
 this.spring_duration--

}
},

jump(){
 if (this.jumpduration >0 && this.jumping == true){
     if (this.jumpduration == this.jumpduration_set){
         this.y -=this.jumpforce *2
   
     }
     this.vy -=this.jumpforce* ((this.jumpduration/ this.jumpduration_set)/2);
     console.log(this.vy)
     this.jumpduration--
 }else{
     this.jumping = false
     resetjump()
 }

},
click(){
if ( this.clicked == true && this.click_duration == 60){
 tileswitcher()
 this.canclick = false;
}
this.click_duration --
if (this.click_duration == 0){
 this.clicked = false;
 this.canclick = true;
 this.click_duration = 60
}


}



}

function resetjump(){
player.jumpduration = player.jumpduration_set
}

function resetspring(){
player.springing = false
player.spring_duration = player.spring_set
player.spring_y = 0
}


mousex = 0
mousey = 0
//función raton
document.addEventListener("mousemove", () => {
mousex = event.clientX; // Gets Mouse X
mousey = event.clientY; // Gets Mouse Y

});


var refreshCamera = () =>{


//limitando en la izquierda

if (camera.side > 3.5){camera.side = 3.5}
if (camera.side < 1.5){camera.side = 1.5}

camera.x = (player.x -(constants.CANVAS_WIDTH-constants.CANVAS_WIDTH/camera.side))+constants.TILES_WIDTH/2

camera.y =  (player.y -(constants.CANVAS_HEIGHT/2))+constants.TILES_HEIGHT/2
if(camera.y<0)camera.y=0;
if(camera.x<0)camera.x=0;

//if (player.X< constants.CANVAS_WIDTH/2){ camera.x = 0}
if (camera.x> constants.MAP_COLUMNS*constants.TILES_WIDTH -constants.CANVAS_WIDTH){ 
 camera.x = constants.MAP_COLUMNS*constants.TILES_WIDTH-constants.CANVAS_WIDTH}
//if (player.Y< constants.CANVAS_HEIGHT/2){ camera.y = 0}
if (camera.y> constants.MAP_ROWS*constants.TILES_HEIGHT  -constants.CANVAS_HEIGHT ){
  camera.y = constants.MAP_ROWS*constants.TILES_HEIGHT-constants.CANVAS_HEIGHT}

}


var particles_array = [];
var sandevistan_array = [];
var enemys_array = [];

window.addEventListener('load', function(){

canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
canvas.width = constants.CANVAS_WIDTH;
canvas.height = constants.CANVAS_HEIGHT;
canvas.style.width=(constants.CANVAS_WIDTH*constants.ZOOM)+'px';
canvas.style.height=(constants.CANVAS_HEIGHT*constants.ZOOM)+'px';

imageQueue = 3;

enemy_1 = new Image();
enemy_1.onload=onLoadImage;
enemy_1.src="img/enemy1.png";


image_player = new Image();
image_player.onload=onLoadImage;
image_player.src="img/player.png";

image_fondo = new Image();
image_fondo.onload=onLoadImage;
image_fondo.src="img/fondo.png";

font_img = new Image();
font_img.onload=onLoadImage;
font_img.src="img/font.png";

star_img = new Image();
star_img.onload=onLoadImage;
star_img.src="img/estrella.png";

arrow_img = new Image();
arrow_img.onload=onLoadImage;
arrow_img.src="img/arrow.png";

image_trans = new Image();
image_trans.onload=onLoadImage;
image_trans.src="img/transc.png";



image_tiles = new Image();
image_tiles.onload=onLoadImage;
image_tiles.src="img/tileset.png";

image_canica = new Image();
image_canica.onload=onLoadImage;
image_canica.src="img/canica.png";

mini = new Image();
mini.onload=onLoadImage;
mini.src="img/mini.png";

winner_img = new Image();
winner_img.onload=onLoadImage;
winner_img.src="img/winnermenu.png";

part_mini = new Image();
part_mini.onload=onLoadImage;
part_mini.src="img/part1.png";


paralax1 = new Image();
paralax1.onload=onLoadImage;
paralax1.src="img/parallax1.png";

paralax2 = new Image();
paralax2.onload=onLoadImage;
paralax2.src="img/parallax2.png";



}, false);


//var particles_array;
var onLoadImage=()=>{
imageQueue--;
if(imageQueue==0){
 
 startGame()
 loop()
}
}

var startGame = () =>{
party_settings.restart = false;    
frameCounter = 0;
map = [...downloaded_map]
party_settings.cleared = false;
party_settings.time_finish = false;  
party_settings.animation_loop = null
player.alive=true   
player_cor = getTileCordenades(map.indexOf(11))
player.x = player_cor.x
player.y = player_cor.y
console.log("restart ?"+party_settings.restart)    
fadeOut()    
}


diff = parseInt(+player.x + canvas.width/2 + camera.x)


var paintPlayer = ()=>{
frame=5*32

if (player.vx != 0 && !player.jumping){
//frame = (5+ ((frameCounter/10)%7) )  *32
frame = (7 + ( parseInt(frameCounter/ 8))%8  )*32
}

if (player.vx == 0 && !player.jumping){
 frame = ( ( parseInt(frameCounter/ 60))%4  )*32
}


//salto
if (player.jumping  || !player.canjump){
 frame = (5 + ( parseInt(frameCounter/ 8))%2  )*32
}
//faltan imagenes de la caida



if (player.orientation){
    x = parseInt(player.x-camera.x)
    y =  parseInt(player.y-camera.y)
    ctx.drawImage(image_player, frame,0,32,32, x,y,32, 32);
    
    

}else{
    ctx.save(); 
    ctx.scale(-1, 1);
    ctx.drawImage(image_player, frame,0,32,32, (-1* parseInt(player.x-camera.x))-16, parseInt(player.y-camera.y),32, 32);
    ctx.restore()

}
if (player.sandevistan){
    sandevistan(frame,player.x,player.y-0,frameCounter%60,!player.orientation)
}


}


function getTile(x,y){
return map[
 parseInt(x/constants.TILES_WIDTH)
 +
 parseInt(y/constants.TILES_HEIGHT)*constants.MAP_COLUMNS
]

}


function colisionPlayer(x,y){
x= player.x +x
y= player.y +y


tile= map[
 parseInt(x/constants.TILES_WIDTH)
 +
 parseInt(y/constants.TILES_HEIGHT)*constants.MAP_COLUMNS
]

if ( tilesettings.solid.indexOf(tile) != -1){
 return true;
 }else{
 return false;        
 }
}

function colision_enemy(x,y,enemy){
    x= enemy.x +x
    y= enemy.y +y
    
    
    tile= map[
     parseInt(x/constants.TILES_WIDTH)
     +
     parseInt(y/constants.TILES_HEIGHT)*constants.MAP_COLUMNS
    ]
    
    if ( tilesettings.solid.indexOf(tile) != -1 || tile==21 || tile == 22 ) {
     return true;
     }else{
     return false;        
     }
    }



function getTilePosition(x,y){
return r =
 parseInt(x/constants.TILES_WIDTH)
 +
 parseInt(y/constants.TILES_HEIGHT)*constants.MAP_COLUMNS


}

function getTileCordenades(pos){
r = {
 y:  parseInt(pos/constants.MAP_ROWS)*constants.TILES_HEIGHT,
 x:  parseInt(pos%constants.MAP_COLUMNS)*constants.TILES_WIDTH
}

return r

}

function sandevistan(frame,x,y,color,invert){
    if (frameCounter%4 == 0){
            image = new  sandevistan_part(frame,x,y,constants.SANDEVISTAN_TIME,color*6,invert) 
            sandevistan_array.push(image)

    }
}



//pv = 145
function loop() {

ctx.clearRect(0, 0, canvas.width, canvas.height);
paintBackBackground(image_fondo)
drawParallax(paralax1,60,12)
drawParallax(paralax2,145,8)
paintMap()

for (let i = 0; i < sandevistan_array.length; i++) {
    sandevistan_array[i].tiempo -- 
    sandevistan_array[i].mostrar();
    if (sandevistan_array[i].tiempo <=0 ) {
        sandevistan_array.splice(i,1)
    }
   
   }

   for (let i = 0; i < enemys_array.length; i++) {
    enemys_array[i].mostrar();
    enemys_array[i].move();
    }
   


if (player.alive){
 fisicasplayer()
 paintPlayer()
}

if (player.alive  ){
if(keysDown[37]){
 move('left');
 camera.side +=0.05
}else if(keysDown[39]){
 move('right');
 camera.side -=0.05
}
if(keysDown[38]){
 if (getTile(player.x,player.y)!=23 && getTile(player.x,player.y)!=24)
 move('jump');
}else if(keysDown[32]){
 move('jetpack');
}
if (keysDown[65]){
 move('brick')
}
}

if (player.y<0){
    ctx.drawImage(arrow_img,parseInt(player.x- camera.x),parseInt((-player.y)/4))

}





for (let i = 0; i < particles_array.length; i++) {

 particles_array[i].mostrar();
 particles_array[i].fisicas2();
 if (particles_array[i].tiempo <=0 ) {
     particles_array.splice(i,1)
 }

}
if (party_settings.cleared == false){
    refreshCamera()
}

//si el jugador gana
if (party_settings.cleared == true && !party_settings.time_finish){
    party_settings.time_finish = frameCounter;
}
if (party_settings.cleared == true){
    menu_x = parseInt(canvas.width/2 - winner_img.width/2)
    menu_y = parseInt( canvas.height/2 - winner_img.height/2)
    time = ("00"+parseInt(party_settings.time_finish/3600)).slice(-2)+":"+("00"+parseInt(party_settings.time_finish/60)%60).slice(-2)+":"+("00"+parseInt((party_settings.time_finish%60)*1.66)).slice(-2)
   
    ctx.drawImage(winner_img,menu_x,menu_y)
    print_text("congratulations" ,menu_x+40,menu_y+30)
    print_text("new record !!" ,menu_x+60,menu_y+40)
    print_text(time ,menu_x+70,menu_y+55)
    print_text( "actual record:"+time ,menu_x+10,menu_y+110)
    print_text( "back to menu",menu_x+20,menu_y+120)
}
//pulsar r para reset partida
if(keysDown[82]){
party_settings.restart = true;
}
frameCounter ++
transition()



if (party_settings.restart){
   startGame()
}

party_settings.animation_loop = window.requestAnimationFrame(loop)

}







function paintBackBackground(image){

ctx.fillStyle = ctx.createPattern(image,"repeat");
             ctx.fillRect(0,0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
}
var temp = 8 ;
var paintMap=()=>{
width = 40;
height = 40
t_width = 48;
t_height = 48;


var  colum_start = parseInt(camera.y/t_height)*width ;
var	 colum_end =  parseInt(camera.y/t_height)*width+1 + (parseInt(constants.CANVAS_HEIGHT/t_height)*height)*2
var  fila_start = parseInt(camera.x/t_width)*width ;
var  fila_end =   parseInt(camera.x/t_width)*width 

sum= 0;
counter = 0;

for (i = colum_start; i < colum_end ; i++) {

 if ( i%width < parseInt( constants.CANVAS_WIDTH/t_width )+
      parseInt(camera.x/t_width)+1
      &&
      i%width > parseInt(camera.x/t_width)-1
      ){

 if (map[i] !=0 && map[i] != null ){

 ctx.drawImage(
             image_tiles,
             (map[i]-1)*t_height,
             0,
             t_width,
             t_height,
             parseInt(  ((i%width)* t_width )- camera.x),
             parseInt( ((parseInt(i/width))* t_width)- camera.y),
             t_width,
             t_height,
             );
             sum++
   }           
 
 
}
}


print_text(sum+"%",0,60)
print_text("Vy player :"+player.vy,0,80)
print_text("Vx player :"+player.vx,0,100)
print_text("Is jumping? :"+player.jumping,0,120)


 
 if (counter%fila_start == 0 ){i = i+width} 

}

//teclas
var keysDown=new Array(256);
for(var i=0; i<256; i++)
keysDown[i]=0;

document.onkeydown = function(e) {
keysDown[e.keyCode]++;
};
document.onkeyup = function(e) {
keysDown[e.keyCode]=0;
}

function isKeyDown(k){
return keysDown[k]===1;
}
function isKeyHold(k){
return keysDown[k];
}

//player

var move=(e)=>{

switch (e) {
 case "left":
     player.vx -=1
     player.orientation=false;
     break;
 case "right":
     player.vx +=1
     player.orientation=true;
 break;
 case "jump":
     if (player.canjump) {player.jump(); player.jumping = true}
 break;
 case "jetpack":
    if (player.canjetpack && player.jetpack_fuel > 0){ player.jetpack -=3
     player.jetpack_fuel -= 0.1
     part = new particula(mini,
                         player.x+8,
                         player.y+34,
                         -player.vx,
                         (player.vy+Math.random()*5),
                         6,
                         false,
                         )
     //constructor(imagen, x,y, vx,vy, tiempo,solido)
     player.vy -=12
     particles_array.push(part)
  //eliminar después
  
 }
 break;
 case "brick" :   
 map[getTilePosition(player.x+48,player.y)]=1
 break

 default:
     break;
}
}
dif= 6

var fisicasplayer=()=>{

 var col_left =false;
 var col_right =false;
 var col_up =false;
 var col_down = false;    
 width = 48
 height = 48
 

 if (colisionPlayer(0,-32)){
     col_up = true
 }
 if (colisionPlayer(0,32)){
     col_down = true
 }
 
 if (colisionPlayer(32,0)){
     col_left = true
 }
 if (colisionPlayer(0,0)|| player.x+32 <=0){
     col_right = true
 }

 if (getTile(player.x,player.y+player.x%48) == 21){
     col_down= true;
 
 }
 if (getTile(player.x+12,player.y+(48-(player.x+12)%48)) == 22){
     col_down= true;
 
 }

if (col_down){
 if (colisionPlayer(0,32) && colisionPlayer(0,31)){
     player.y -=1
 }

}

 //muerte jugador
 if ( tilesettings.dead.indexOf(getTile(player.x,player.y+2)) !=-1
 || tilesettings.dead.indexOf(getTile(player.x+34,player.y)) !=-1
 || tilesettings.dead.indexOf(getTile(player.x-2,player.y)) !=-1
 ||tilesettings.dead.indexOf(getTile(player.x,player.y+32)) !=-1    
 ){
 death()

}


 if (col_left || col_right){
     player.vx=0;
 }
 if (col_up || col_down){
     player.vy=0;
 }


 if(col_up){
     player.jumping= false
     resetspring()
 }

 if(col_left){player.x -=1}
 if(col_right){player.x +=1}
 
 if (col_down && !player.canjump){
     player.y = parseInt(player.y)
 }


 if (!col_down){
   
        player.vy +=physics.gravity

    player.canjump = false
 }else{
     player.canjump = true
 }

 if (player.jumping){
     player.jump()
 }

 if (player.springing){
     player.spring()
 }

 //debugger
 print_text("fuel :"+parseInt(player.jetpack_fuel)+"%",0,0)
 print_text("down :"+col_down,0,140)
 print_text("up :"+col_up,0,160)
 print_text("left :"+col_left,0,180)
 print_text("right :"+col_right,0,200)
 print_text("tile_player :"+getTile(player.x,player.y),0,220)
 print_text("time :"+parseInt(frameCounter/3600)+":"+parseInt(frameCounter/60)%60+":"+parseInt((frameCounter%60)*1.66) ,0,240)

 

 //limitadores

 if (player.spring_y< -20){
     player.spring_y = -20
 }

 if (player.vy> player.limit){
     player.vy = player.limit
 }
 if (player.vy< -player.limit){
     player.vy = -player.limit
 }
 if (player.vx> player.limit){
     player.vx = player.limit
 }
 if (player.vx< -player.limit){
     player.vx = -player.limit
 }
 if (player.vx> -0.4 && player.vx< 0.4){
     player.vx=0
 }

 //cintas
 if (getTile(player.x,player.y+32)==14 && !col_left){
     player.vx =player.vx +4
 }
 if (getTile(player.x,player.y+32)==15 && !col_right){
     player.vx =player.vx -4
 }

 // clicka botones


      if (getTile(player.x,player.y)==16 && player.canclick){
         player.clicked = true;
     }
     if (player.clicked){
         player.click()
     }

     if (getTile(player.x,player.y)==13){
         player.springing = true;
     }

 //porta magica
 if (getTile(player.x,player.y)==23 && player.candoor  && map.indexOf(24) !=-1 && keysDown[38] !=0){
     player.candoor = false;
     closedoor();
     door_cor = getTileCordenades(map.indexOf(24))
     fadeOut()
     player.x = door_cor.x
     player.y = door_cor.y
     
 }
      //porta magica
      if (getTile(player.x,player.y)==24 && player.candoor && map.indexOf(23) !=-1 && keysDown[38] !=0){
         player.candoor = false;
         closedoor();
         door_cor = getTileCordenades(map.indexOf(23))
        fadeOut()
         player.x = door_cor.x
         player.y = door_cor.y
     }

     if (getTile(player.x,player.y)==31 && player.jetpack_fuel!=100){
         player.jetpack_fuel = 100;
         map[getTilePosition(player.x,player.y)] = 0 

     }
// win
     if (getTile(player.x,player.y)==32 ){
        map[getTilePosition(player.x,player.y)] = 33 
        win()
    }



 //aplicamos inercia
 friction = physics.friction

 if(!col_down){
     friction = physics.friction_aire
 }else{
     if (getTile(player.x,player.y+32)==12){
         friction = physics.friction_hielo
     }

 }

 

 if (player.vx>0){
     player.vx -= friction
 }
 if (player.vx<0){
     player.vx += friction
 }

 player.y +=player.spring_y


 rampa_derecha = getTile(player.x+12,player.y+(player.x+12)%48) == 21 ? true:false;
 rampa_izquierda = getTile(player.x+12,player.y+(48-(player.x+12)%48)) == 22 ? true:false;

 if (!(rampa_derecha || rampa_izquierda)) {
 player.y +=player.vy +player.spring_y
 player.x +=player.vx
 if (player.vx< 0.50 && player.vx> -0.50){
     player.vx= 0
 }

 }

  //rampas 
 //rampa a la derecha subida

 if (rampa_derecha){
     player.canjump=true    
     if (player.vx<0){
         player.x +=player.vx
         player.y -=player.vx
         
     }else{
         player.x +=player.vx/2
         player.y -=player.vx/2
     }
     

 }

 //rampa a la izquierda subida

 if (rampa_izquierda){
 player.canjump=true
     if (player.vx<0){
         player.x +=player.vx/2
         player.y +=player.vx/2
         
     }else{
         player.x +=player.vx
         player.y +=player.vx
     }
     

 }







}

function death(){
player.alive=false;

for (let i = 0; i < 30; i++) {
r= Math.random()*(1+ Math.random()*1.3)
r2 = Math.random()
p1 =  new particula(part_mini,player.x,player.y,r2+(-player.vx*r),((-15)*r2)+(-player.vy*r),400,true)

particles_array.push(p1)
}




}

function closedoor(){
setTimeout(function (){player.candoor = true}, 500)
}

function tileswitcher(){
for (let i = 0; i < map.length; i++) {
 if ( map[i]== 19 || map[i] == 20){
     map[i] = map[i]-2
 } else if ( map[i]== 17 || map[i] == 18){
     map[i] = map[i]+2
 } 


 
}
}

function print_text(string_text,x,y){

 font_map= ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0",'1','2','3','4','5','6','7','8','9',":","*",".","%"]
for (let i = 0; i < string_text.length; i++) {
ctx.drawImage(font_img, font_map.indexOf(string_text[i].toUpperCase() )*10, 0, 10, 10, x+(i*10), y, 10, 10);   
}
}


function drawParallax(image,y,speed){
    var temp=parseInt(-camera.x/ speed);
	ctx.drawImage(image,(temp%image.width),y);

    for (let i = 0; i < parseInt(canvas.width/image.width)+1; i++) {
        
        ctx.drawImage(image,((temp%image.width))+image.width*i,y);
       
    }

}

function transition(){
    if ( transtion_settings.frame_end > frameCounter ){
        diferencial_frame = transtion_settings.frame_end - frameCounter
        frame_trans = 50 - diferencial_frame 
        if (transtion_settings.fade_in == true){
            frame_trans = parseInt((50-diferencial_frame)/5)
        }else{
            frame_trans = 4 - parseInt((50-diferencial_frame)/5)
        }
        
        for (let i = 0; i < parseInt(canvas.width/31)+1; i++) {
            for (let e = 0; e < (canvas.height/31)+1; e++) {
                ctx.drawImage(image_trans, frame_trans*31, 0, 31, 31, i*31, e*31,31, 31);
                
            }
           
        }
       
        if (frame_trans == 4 && transtion_settings.fade_in == true){
            return true
        }
        if (frame_trans == 0 && transtion_settings.fade_in == false){
            return true
        }


        }

       
}

function fadeIn(){
    transtion_settings.fade_in = true
    transtion_settings.frame_end = frameCounter+50 

}
function fadeOut(){
    transtion_settings.fade_in = false
    transtion_settings.frame_end = frameCounter+50 

}
function win(){
    party_settings.cleared = true
    star =  new particula(star_img,player.x,player.y,12,12,400,false)
    particles_array.push(star)
    star =  new particula(star_img,player.x,player.y,-12,12,400,false)
    particles_array.push(star)
    star =  new particula(star_img,player.x,player.y,12,-12,400,false)
    particles_array.push(star)
    star =  new particula(star_img,player.x,player.y,-12,-12,400,false)
    particles_array.push(star)

    star =  new particula(star_img,player.x,player.y,24,12,400,false)
    particles_array.push(star)
    star =  new particula(star_img,player.x,player.y,-24,12,400,false)
    particles_array.push(star)
    star =  new particula(star_img,player.x,player.y,24,-12,400,false)
    particles_array.push(star)
    star =  new particula(star_img,player.x,player.y,-24,-12,400,false)
    particles_array.push(star)
}