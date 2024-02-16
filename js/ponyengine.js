// ______ _                              _            
// | ___ (_)                            (_)           
// | |_/ /_ _ __  _ __   ___ _ __   __ _ _ _ __   ___ 
// |  __/| | '_ \| '_ \ / _ \ '_ \ / _` | | '_ \ / _ \
// | |   | | |_) | |_) |  __/ | | | (_| | | | | |  __/
// \_|   |_| .__/| .__/ \___|_| |_|\__, |_|_| |_|\___|
//        | |   | |                __/ |             
//        |_|   |_|               |___/              ( 2019 )

var constants = { 
    
	CANVAS_WIDTH: 400,
	CANVAS_HEIGHT: 300,
	ZOOM : 2,
	TILES_WIDTH:48,
	TILES_HEIGHT:48,
	MAP_COLUMNS : 20,
	MAP_ROWS : 20,
	POINTS_X : 170,
	POINTS_Y : 8,
	POINTS :000,
	MAP_X : 0,
	MAP_Y : 0,
	LAYER_SPEEDS : [
		6,
		3,
		4,
	],
	LAYER_Y : [
		-15,
		0,
		100,
	],
	
	VELOCITY_SCROLL : 3,
	LEVEL_N : 0,
	TEXT_X :10,
	TEXT_Y :50,
}

var player = {
	SPEED : 40,
	X : 0,
	Y : 0,
	VERTICAL_ACEL :0,
	HORIZONTAL_ACEL :0,
	GRAVITY : 1,
	HORIZONTAL_ACEL_SPEED : 1.5,
	VERTICAL_ACEL_SPEED : 0.1,
	JUMP : 15,
	JUMPING : false,
	MAX_SPEED :3,
	FRICTION : 0.1,
	ORIENTATION : true,
	ANIMATION_RUN:[10,11,12,13,14,15,16,17,18],
	ANIMATION_JUMP:[19,20,21,22],
	ANIMATION_STOP:[1,2,3,4,5,6,7,8],
	ANIMATION_SPEED : 6,
	PORTAL_ANIMATION :[4,5],
	DEATH_ANIMATION : [24,25,26,27,28,29],
	PI:0,
	FRAME :0,
	I:0,
	jumper : false,
	POINTS : 0,
	SPRING : 70,
	LIMIT_JETPACK_SPEED : 2
}

lives = 5
canpasslevel = false
var stat =0
player_death = false

function checkStat(){
	//estado titulo
	if (stat == 0 ) {
		loopTitle()
	}
	//estado pantalla de carga de nivel
	if (stat == 1 && lives> -1) {
		player_death = false
		map =maps[constants.LEVEL_N]
		startingPoint=locate(mapSettings.PLAYER,player);
		map[startingPoint ]=mapSettings.PLAYER
		loopLoadlevel()
	}
	// Nivel
	if (stat == 2&& lives> -1) {
		
		loopGame()
	}

	// Game Over
	if (stat ==4) {
		loopGameOver()
	}
	// Congratulations	
	if (stat ==3){
		loopCongratulations()

	}
}

function death(){
 	if (lives >-1){
	lives -=1
	stat =1
	checkStat()}
	if (lives <0){
	stat =4
	checkStat()}
	
	
}


var camera = {
	x:0,
	y:0,
	
}
var mapSettings = {
	
	PLAYER : [1],
	SOLIDS : [2,3,4,5,6,7,8,9,10,11],
	COINS : [20,21,22,23,24],
	DOOR : [30,31],
	DEATH : [18,19,36,37,38],
	SPRING :[26],
	ONEUP : [25],
	
}

map = [];
maps = [];
maps[0] =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 12, 13, 14, 0, 0, 0, 0, 0, 6, 3, 3, 4, 0, 0, 22, 0, 0, 3, 4, 0, 15, 16, 17, 0, 0, 18, 18, 18, 7, 2, 2, 5, 0, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 18, 6, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
maps[1] =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 3, 4, 0, 0, 0, 0, 6, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 0, 7, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 9, 10, 10, 8, 0, 0, 0, 0, 7, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 38, 38, 38, 38, 0, 0, 0, 0, 9, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8, 36, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 6, 3, 4, 18, 0, 0, 4, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 2, 2, 4, 0, 0, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 6, 2, 2, 2, 5, 0, 0, 5, 36, 0, 0, 0, 0, 35, 0, 0, 0, 0, 0, 37, 7, 2, 2, 2, 5, 0, 0, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 2, 2, 2, 5, 0, 0, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 2, 2, 2, 5, 0, 0, 2, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 37, 7, 2, 2, 2, 5, 18, 18, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
maps[2] =[11, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 36, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 18, 18, 0, 38, 38, 38, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 38, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 4, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 5, 18, 18, 18, 18, 0, 0, 7, 2, 3, 3, 3, 3, 3, 3, 3, 4, 0, 7, 2, 2, 3, 3, 3, 4, 18, 18, 7, 2, 2, 2, 2, 2, 2, 2, 2, 5, 18, 9, 10, 10, 10, 10, 10, 10, 3, 3, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 4]
maps[3] =[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 8, 25, 7, 2, 2, 2, 5, 36, 0, 0, 0, 0, 0, 7, 2, 2, 2, 2, 2, 5, 36, 0, 9, 10, 10, 10, 8, 36, 0, 0, 0, 0, 30, 7, 2, 2, 2, 2, 2, 8, 0, 0, 38, 38, 38, 38, 38, 0, 0, 6, 3, 3, 3, 2, 2, 2, 2, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 10, 10, 10, 10, 2, 2, 8, 0, 0, 0, 0, 0, 0, 34, 0, 0, 6, 3, 2, 5, 0, 0, 0, 0, 2, 5, 0, 0, 0, 0, 0, 0, 6, 3, 3, 3, 2, 2, 2, 5, 0, 0, 0, 1, 2, 5, 0, 0, 0, 0, 0, 0, 9, 10, 10, 10, 10, 10, 2, 5, 0, 0, 6, 3, 2, 5, 0, 0, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8, 0, 0, 7, 2, 2, 5, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 5, 0, 0, 7, 5, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 2, 2, 5, 0, 0, 7, 2, 3, 3, 3, 3, 4, 36, 0, 6, 3, 3, 3, 2, 2, 2, 2, 5, 0, 0, 7, 2, 2, 2, 2, 2, 5, 36, 32, 7, 2, 10, 10, 10, 2, 2, 2, 5, 0, 0, 9, 10, 10, 10, 10, 2, 5, 36, 0, 7, 5, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 0, 0, 0, 37, 7, 5, 36, 0, 9, 8, 0, 0, 20, 7, 2, 2, 5, 0, 0, 0, 0, 0, 25, 37, 7, 5, 36, 0, 0, 0, 0, 0, 6, 2, 2, 2, 2, 3, 4, 18, 18, 18, 18, 18, 7, 5, 36, 0, 0, 0, 0, 6, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
maps[4] =[0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 25, 11, 11, 0, 0, 0, 0, 0, 11, 0, 0, 30, 0, 0, 11, 0, 0, 0, 0, 11, 11, 38, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 11, 0, 0, 11, 11, 11, 0, 11, 11, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 6, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 11, 0, 0, 11, 11, 0, 0, 0, 0, 7, 2, 2, 2, 2, 2, 5, 0, 0, 0, 0, 11, 11, 0, 38, 0, 0, 0, 0, 0, 9, 8, 0, 0, 0, 9, 8, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 11, 11, 11, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 11, 11, 11, 0, 0, 0, 38, 38, 38, 0, 0, 0, 0, 11, 25, 11, 0, 0, 0, 0, 38, 38, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 25, 11, 25, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 25, 11, 25, 11, 25, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 25, 11, 25, 11, 25, 11, 25, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 10, 10, 10, 10, 10, 10, 10, 10, 8, 0, 0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
maps[5] =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 25, 0, 0, 0, 0, 0, 3, 3, 4, 0, 0, 0, 0, 0, 6, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 32, 0, 0, 9, 10, 10, 10, 10, 10, 8, 0, 0, 32, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 18, 0, 0, 24, 0, 0, 18, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 6, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 7, 2, 2, 2, 2, 2, 5, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 7, 2, 2, 2, 2, 2, 5, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 9, 10, 10, 10, 10, 10, 8, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 5, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]        
maps[6] =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 4, 36, 0, 0, 37, 6, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 8, 36, 0, 0, 37, 9, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 35, 0, 7, 5, 38, 0, 0, 0, 0, 38, 7, 5, 0, 35, 0, 0, 0, 1, 0, 0, 32, 0, 7, 5, 0, 0, 0, 0, 0, 0, 7, 5, 0, 32, 0, 0, 30, 3, 4, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 6, 3, 2, 5, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 7, 5, 0, 0, 22, 0, 0, 0, 7, 5, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 7, 5, 18, 0, 0, 0, 0, 18, 7, 5, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 7, 2, 3, 3, 3, 3, 3, 3, 2, 5, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 9, 10, 10, 10, 10, 10, 10, 10, 10, 8, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 5, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 7, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2]  
maps[7] =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 6, 4, 0, 0, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 7, 5, 0, 0, 7, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 5, 7, 5, 0, 0, 7, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 5, 7, 5, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 7, 5, 0, 0, 7, 5, 0, 0, 6, 3, 3, 3, 3, 3, 3, 4, 0, 0, 7, 5, 7, 5, 0, 0, 7, 5, 0, 0, 7, 2, 10, 10, 10, 10, 2, 5, 0, 0, 7, 5, 7, 5, 0, 0, 7, 5, 0, 0, 7, 5, 0, 0, 0, 38, 7, 5, 0, 0, 7, 5, 7, 5, 0, 0, 7, 5, 0, 0, 7, 5, 24, 0, 0, 0, 7, 5, 0, 0, 7, 5, 7, 5, 0, 0, 7, 5, 0, 0, 7, 2, 3, 4, 0, 0, 7, 5, 0, 0, 7, 5, 7, 5, 0, 0, 7, 5, 0, 0, 9, 10, 10, 8, 0, 0, 7, 5, 0, 0, 7, 5, 7, 5, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 7, 5, 7, 5, 0, 0, 7, 5, 18, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 7, 5, 7, 5, 0, 0, 7, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 5, 0, 0, 7, 5, 7, 5, 0, 0, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8, 0, 0, 7, 5, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 7, 5, 7, 5, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 7, 5, 7, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 5, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8]       
maps[8] =[6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 7, 2, 8, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 9, 2, 5, 7, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 5, 7, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 37, 7, 5, 7, 5, 36, 0, 0, 0, 0, 0, 18, 0, 0, 18, 0, 0, 0, 0, 0, 37, 7, 5, 7, 5, 36, 0, 0, 18, 0, 37, 11, 36, 37, 11, 36, 0, 18, 18, 0, 37, 7, 5, 7, 5, 36, 0, 37, 11, 36, 37, 11, 36, 37, 11, 36, 37, 11, 11, 36, 37, 7, 5, 7, 5, 36, 0, 0, 38, 0, 37, 11, 36, 37, 11, 36, 0, 38, 38, 0, 37, 7, 5, 7, 5, 36, 0, 0, 0, 0, 37, 11, 36, 37, 11, 36, 0, 0, 0, 0, 37, 7, 5, 7, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 5, 7, 5, 36, 0, 18, 0, 0, 0, 0, 33, 0, 0, 0, 0, 0, 18, 0, 37, 7, 5, 7, 5, 36, 37, 11, 36, 0, 18, 0, 0, 0, 0, 18, 0, 37, 11, 0, 37, 7, 5, 7, 5, 36, 0, 38, 0, 37, 11, 36, 0, 0, 37, 11, 36, 0, 38, 0, 37, 7, 5, 7, 5, 36, 0, 0, 0, 0, 38, 0, 1, 22, 0, 38, 0, 0, 0, 0, 37, 7, 5, 7, 5, 36, 0, 0, 0, 0, 0, 37, 11, 11, 36, 11, 25, 0, 0, 0, 37, 7, 5, 7, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 0, 0, 0, 37, 7, 5, 7, 2, 4, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 6, 2, 5, 7, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 5, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8]
maps[9] =[6, 3, 4, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 18, 7, 2, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 6, 4, 7, 2, 5, 36, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 37, 7, 5, 7, 2, 5, 36, 0, 0, 0, 0, 0, 6, 3, 3, 3, 4, 0, 0, 0, 37, 7, 5, 7, 2, 5, 36, 0, 0, 0, 0, 0, 9, 10, 10, 10, 8, 0, 0, 0, 37, 7, 5, 9, 10, 8, 36, 0, 0, 0, 0, 0, 38, 38, 38, 38, 38, 0, 0, 0, 37, 7, 5, 38, 38, 38, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 37, 7, 5, 0, 0, 0, 0, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 5, 0, 0, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 37, 6, 3, 3, 3, 4, 36, 0, 0, 37, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 37, 9, 10, 10, 10, 8, 36, 0, 0, 37, 7, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 38, 38, 38, 38, 38, 0, 0, 0, 37, 7, 5, 0, 6, 3, 3, 3, 4, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 37, 7, 5, 0, 7, 2, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 7, 5, 0, 7, 2, 2, 2, 5, 0, 0, 0, 18, 18, 18, 18, 18, 0, 0, 0, 37, 7, 5, 18, 7, 2, 2, 2, 5, 18, 18, 18, 6, 3, 3, 3, 4, 18, 18, 18, 18, 7, 5, 3, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 5]       
maps[10] = [11, 11, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 21, 0, 0, 38, 38, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 36, 0, 0, 6, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 0, 0, 0, 7, 2, 2, 2, 2, 2, 2, 10, 10, 2, 10, 10, 2, 2, 2, 2, 5, 0, 0, 0, 7, 2, 2, 2, 2, 2, 5, 0, 0, 10, 0, 0, 7, 2, 2, 2, 5, 0, 0, 37, 7, 2, 2, 10, 10, 10, 5, 0, 0, 0, 0, 0, 7, 2, 2, 2, 5, 0, 0, 0, 9, 10, 8, 38, 38, 38, 2, 4, 0, 0, 0, 6, 2, 2, 2, 2, 5, 0, 0, 0, 38, 0, 0, 0, 0, 0, 2, 2, 4, 0, 6, 2, 2, 2, 10, 10, 8, 36, 0, 0, 0, 0, 0, 0, 0, 30, 2, 2, 2, 3, 2, 10, 10, 8, 38, 0, 0, 0, 35, 0, 0, 0, 0, 0, 6, 3, 2, 2, 10, 10, 8, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 0, 7, 2, 10, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 0, 7, 5, 0, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 0, 7, 5, 0, 7, 5, 0, 7, 2, 0, 0, 0, 0, 0, 0, 6, 4, 0, 7, 5, 0, 7, 5, 0, 7, 5, 0, 7, 2, 0, 0, 0, 6, 4, 0, 7, 5, 0, 7, 5, 0, 7, 5, 0, 7, 5, 0, 7, 2, 0, 1, 0, 7, 5, 19, 7, 5, 19, 7, 5, 19, 7, 5, 19, 7, 5, 19, 7, 2, 3, 3, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2]
maps[11] =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 4, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 2, 3, 3, 3, 4, 18, 18, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 2, 2, 10, 10, 10, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 7, 2, 2, 2, 5, 38, 38, 38, 9, 10, 10, 10, 10, 10, 10, 10, 8, 0, 0, 0, 7, 2, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 2, 5, 36, 0, 0, 6, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 7, 2, 2, 2, 5, 0, 0, 0, 7, 2, 10, 10, 10, 10, 10, 2, 5, 0, 0, 0, 7, 2, 2, 2, 5, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 7, 2, 2, 2, 5, 0, 0, 37, 7, 5, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 7, 2, 2, 2, 5, 0, 0, 0, 7, 5, 0, 30, 0, 0, 0, 7, 5, 0, 0, 0, 9, 10, 10, 10, 5, 0, 0, 0, 7, 2, 3, 3, 4, 0, 0, 7, 5, 0, 0, 0, 38, 38, 38, 38, 5, 36, 0, 0, 9, 10, 10, 10, 8, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 18, 18, 18, 6, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 2, 2]
maps[12] =[4, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 30, 0, 37, 11, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 5, 0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5, 0, 0, 0, 6, 3, 4, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 36, 0, 37, 9, 10, 8, 37, 11, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 18, 18, 18, 18, 18, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 18, 0, 0, 18, 0, 6, 3, 3, 3, 4, 11, 11, 0, 0, 11, 11, 7, 5, 36, 37, 11, 36, 37, 11, 36, 9, 10, 10, 10, 8, 38, 38, 0, 0, 38, 38, 7, 5, 0, 0, 38, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 18, 18, 18, 18, 18, 0, 0, 18, 18, 0, 0, 7, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2]
maps[13] = [3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 6, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 5, 0, 0, 30, 0, 1, 0, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 0, 0, 0, 0, 0, 0, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 32, 32, 6, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 2, 5, 0, 0, 7, 2, 10, 10, 10, 10, 10, 2, 2, 2, 8, 38, 38, 38, 38, 38, 7, 5, 0, 0, 7, 5, 38, 38, 38, 38, 38, 9, 2, 5, 38, 0, 0, 0, 0, 0, 9, 8, 0, 0, 9, 8, 0, 0, 0, 0, 0, 38, 7, 5, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 37, 11, 36, 0, 0, 0, 0, 37, 11, 36, 0, 0, 0, 0, 7, 5, 0, 18, 0, 20, 0, 38, 0, 0, 0, 0, 0, 0, 38, 0, 25, 18, 0, 0, 7, 5, 37, 11, 36, 0, 0, 18, 0, 0, 0, 0, 0, 0, 18, 0, 37, 11, 36, 0, 7, 5, 0, 0, 0, 0, 37, 11, 36, 0, 0, 0, 0, 37, 11, 36, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 7, 5, 0, 18, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 18, 0, 7, 5, 37, 11, 36, 0, 37, 11, 36, 0, 0, 0, 0, 37, 11, 36, 0, 37, 11, 36, 7, 5, 0, 38, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 38, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 18, 18, 7, 2, 3, 3, 4, 18, 18, 18, 18, 18, 0, 0, 18, 18, 18, 18, 18, 6, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2]
maps[14] =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 6, 3, 4, 36, 0, 6, 4, 0, 19, 19, 19, 19, 19, 19, 0, 0, 0, 0, 11, 11, 7, 5, 38, 0, 0, 7, 5, 0, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 37, 6, 2, 5, 0, 0, 0, 0, 0, 19, 19, 19, 19, 19, 19, 0, 0, 7, 5, 0, 0, 38, 7, 5, 0, 0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 0, 0, 7, 5, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 35, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 7, 5, 0, 19, 19, 19, 19, 19, 19, 0, 0, 19, 0, 19, 0, 7, 2, 4, 36, 0, 7, 5, 0, 11, 11, 11, 11, 11, 11, 0, 0, 11, 23, 11, 0, 7, 2, 38, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 0, 7, 5, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 6, 2, 5, 0, 0, 0, 0, 0, 0, 19, 19, 19, 19, 19, 19, 0, 7, 5, 0, 0, 38, 7, 5, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 0, 7, 5, 1, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 2, 2, 3, 3, 3, 2, 5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11]     
maps[15] =[6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2, 10, 10, 10, 10, 10, 2, 5, 0, 0, 0, 38, 38, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 7, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 0, 9, 8, 6, 4, 0, 0, 0, 0, 0, 19, 19, 0, 0, 38, 38, 0, 0, 0, 0, 0, 38, 38, 9, 8, 0, 0, 0, 0, 0, 6, 4, 0, 0, 0, 0, 0, 25, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 30, 0, 0, 19, 19, 19, 19, 7, 5, 19, 19, 19, 19, 19, 7, 5, 19, 19, 0, 0, 6, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 2, 2, 3, 4, 0, 0, 9, 10, 10, 10, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 2, 10, 2, 5, 0, 0, 38, 38, 38, 38, 38, 38, 38, 7, 5, 38, 38, 38, 9, 2, 5, 38, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8, 0, 0, 0, 38, 9, 8, 0, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 38, 0, 0, 0, 0, 38, 38, 0, 38, 38, 0, 0, 0, 0, 0, 19, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 6, 4, 0, 0, 0, 0, 0, 19, 19, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 0, 7, 5, 0, 0, 0, 0, 0, 6, 4, 0, 0, 19, 19, 0, 0, 0, 0, 7, 5, 19, 7, 5, 19, 25, 0, 19, 19, 7, 5, 19, 19, 6, 4, 19, 19, 19, 19, 7, 2, 3, 2, 2, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 3, 4, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8]       
maps[16] = [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 11, 36, 5, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 5, 0, 0, 0, 11, 0, 0, 0, 18, 18, 0, 37, 11, 11, 11, 36, 0, 0, 0, 0, 5, 18, 0, 11, 11, 11, 11, 11, 11, 11, 36, 0, 38, 38, 38, 0, 18, 0, 0, 18, 5, 11, 36, 38, 38, 38, 38, 38, 38, 38, 0, 0, 0, 0, 0, 37, 11, 36, 0, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 7, 5, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 7, 5, 37, 11, 36, 0, 0, 37, 11, 36, 37, 11, 11, 36, 0, 18, 0, 0, 0, 0, 7, 5, 0, 38, 0, 0, 0, 0, 38, 0, 0, 38, 38, 0, 37, 11, 36, 0, 18, 0, 7, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 11, 36, 7, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 7, 5, 36, 25, 0, 18, 18, 18, 18, 18, 18, 0, 0, 0, 18, 18, 0, 0, 0, 0, 7, 2, 4, 18, 18, 6, 3, 3, 3, 3, 4, 18, 0, 18, 6, 4, 18, 0, 0, 0, 7, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 4, 36, 0, 37, 7, 2, 10, 10, 10, 10, 38, 38, 38, 38, 10, 10, 10, 10, 10, 10, 5, 36, 0, 37, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 38, 38, 38, 38, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 18, 18, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 7, 5, 18, 0, 1, 0, 6, 4, 18, 18, 18, 18, 18, 18, 18, 3, 18, 18, 24, 18, 7, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2]

history_text = ["I crashed the ship","Where is the missing piece ?","Bounce !","What is this misterious cave ?","A piece of cake","Space rodeo", "Pretty hard","Don't give up!!","ups...","Gravity falls","Space Turism","Enter the void","I miss home","ARGHHHH...","Spikes and sapikes...","Save our souls","I miss home","I miss home 2 ","Un-holy days","Back to the Black","Mooncake","I miss home","I miss home","I miss home","I miss home","I miss home","I miss home","I miss home","I miss home"]
   
canpasslevel = false
var startingPoint;


var background = [];
var canvas ;
var frameCounter=0;
var ctx ;


function paintBackBackground(){
	
	ctx.fillStyle = ctx.createPattern(image_backbackground,"repeat");
						ctx.fillRect(0,0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
}

function startGame(){
        
			//SetLevel()
			checkStat()

	}



function SetLevel(){
	if (constants.LEVEL_N == 0){ map = MAPS1 
	locate(mapSettings.PLAYER,player);
			checkStat()
	}
	if (constants.LEVEL_N == 1){ map = MAPS2 
	locate(mapSettings.PLAYER,player);
			checkStat()
	}
	if (constants.LEVEL_N == 2){ map = MAPS3 
	locate(mapSettings.PLAYER,player);
			checkStat()
	}



}






//indexOf <----

function getTile(x,y){
	return map[
		parseInt(x/constants.TILES_WIDTH)
		+
		parseInt(y/constants.TILES_HEIGHT)*constants.MAP_COLUMNS
	]
	
}

function getTilePosition(x,y){
	return r =
		parseInt(x/constants.TILES_WIDTH)
		+
		parseInt(y/constants.TILES_HEIGHT)*constants.MAP_COLUMNS

	
}

function getTxY(x,y){
	return r =parseInt(x/constants.TILES_WIDTH)+ parseInt(y/constants.TILES_HEIGHT)*constants.MAP_COLUMNS
	
	
}


	function onLoadImage(){
		imageQueue--;
		if(imageQueue==0){
			startGame()
			
		}
	}

	function paintMap(){
		var  colum_start = 0 ;
		var	 colum_end = constants.MAP_COLUMNS*constants.TILES_WIDTH ;
	
		for (i = 0; i < colum_end ; i++) {
			if (parseInt(  ((i%constants.MAP_COLUMNS)* constants.TILES_WIDTH )- camera.x) >= 0){			
				colum_start = i-1
				break
			}
		}
		
		for (i = 0; i < colum_end ; i++) {
			if (parseInt(  ((i%constants.MAP_COLUMNS)* constants.TILES_WIDTH )- camera.x) <= constants.CANVAS_WIDTH-constants.TILES_WIDTH){			
				colum_END = i+1
				break
			}
		}

		for (i = colum_start; i < colum_end ; i++) {
		if (mapSettings.PLAYER !== map[i] && map[i] !==0  ){
		if (map[i] == mapSettings.DOOR[0] && canpasslevel == true){ map[i] = mapSettings.DOOR[1]}
		
		
		ctx.drawImage(
					image_tiles,
					map[i]*constants.TILES_HEIGHT,
					0,
					constants.TILES_WIDTH,
					constants.TILES_HEIGHT,
					parseInt(  ((i%constants.MAP_COLUMNS)* constants.TILES_WIDTH )- camera.x),
					parseInt( ((parseInt(i/constants.MAP_COLUMNS))* constants.TILES_WIDTH)- camera.y),
					constants.TILES_WIDTH,
					constants.TILES_HEIGHT,
					);
		
		
		}
	
	
	}};
	
		function apaintMap(){
		
		for (i = 0; i < constants.MAP_COLUMNS*constants.MAP_ROWS ; i++) {
		if (mapSettings.PLAYER !== map[i] || map[i] !==0  ){
		ctx.drawImage(
					image_tiles,
					map[i]*constants.TILES_HEIGHT,
					0,
					constants.TILES_WIDTH,
					constants.TILES_HEIGHT,
					parseInt(  ((i%constants.MAP_COLUMNS)* constants.TILES_WIDTH )- camera.x),
					parseInt( ((parseInt(i/constants.MAP_COLUMNS))* constants.TILES_WIDTH)- camera.y),
					constants.TILES_WIDTH,
					constants.TILES_HEIGHT,
					);
		
		
		}
	
	
	}};
	
	
	


	function paintPlayer(){
// MIRA LA ORIENTACION DEL PERSONAJE
	if (player.ORIENTATION == true){
		X = image_player_iz
	}
	
	if (player.ORIENTATION == false){
		X = image_player_de
	}
	
// MIRA EL NUMERO DE TILE QUE LE CORRESPONDE
if	 (frameCounter%player.ANIMATION_SPEED==0){
			player.I+=1;
	}

if (player.HORIZONTAL_ACEL>0){
	if (player.JUMPING == false && player_death == false) {
		if (player.I >  player.ANIMATION_RUN[player.ANIMATION_RUN.length-1] || player.I <  player.ANIMATION_RUN[0]){ 
		player.I=player.ANIMATION_RUN[0]
		}}}
		
if (player.HORIZONTAL_ACEL<0&& player_death == false){
	if (player.JUMPING == false) {
		if (player.I >  player.ANIMATION_RUN[player.ANIMATION_RUN.length-1]|| player.I <  player.ANIMATION_RUN[0]){ 
		player.I=player.ANIMATION_RUN[0]
		SASA = player.I
		}}}



if (player.JUMPING == true&& player_death == false){
	if (player.I >  player.ANIMATION_JUMP[player.ANIMATION_JUMP.length-1] || player.I <  player.ANIMATION_JUMP[0]){ 
	player.I=player.ANIMATION_JUMP[0]
	SASA = player.I}}

if (player.HORIZONTAL_ACEL==0&& player_death == false){
	if (player.JUMPING == false) {
		if (player.I >  player.ANIMATION_STOP[player.ANIMATION_STOP.length-1] ){ 
		player.I=player.ANIMATION_STOP[0]
		SASA = player.I
}}}

if (player_death == true && player.I<player.DEATH_ANIMATION[0] ){

	player.I = player.DEATH_ANIMATION[0]
	
	SASA = player.I
	//death

}

if ( player.I > player.DEATH_ANIMATION[player.DEATH_ANIMATION.length-1] ){ death()}

		ctx.drawImage(
		 
					X,
					player.I*constants.TILES_WIDTH,
					0,
					constants.TILES_WIDTH,
					constants.TILES_HEIGHT,
					parseInt(player.X-camera.x ),
					parseInt(player.Y-camera.y),
					constants.TILES_WIDTH,
					constants.TILES_HEIGHT,
					);
		}



	function locate(tile,name){
	for (i = 0; i < constants.MAP_COLUMNS*constants.MAP_ROWS ; i++) {
	if (tile == map[i] ){
		name.X = constants.MAP_X+ (i%constants.MAP_COLUMNS)* constants.TILES_WIDTH
		name.Y = constants.MAP_Y+ (parseInt(i/constants.MAP_COLUMNS))* constants.TILES_WIDTH
		map[i] = 0
		return i;
	
	}}}





function drawParallax(i){
    var temp=parseInt(-camera.x/ constants.LAYER_SPEEDS[i]);
	var layer_y = constants.CANVAS_HEIGHT-background[i].height
	ctx.drawImage(background[i],(temp%(background[i].width)),layer_y+constants.LAYER_Y[i]);
	ctx.drawImage(background[i],(temp%(background[i].width))+background[i].width*1,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))-background[i].width*1,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))-background[i].width*2,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))+background[i].width*2,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))+background[i].width*3,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))+background[i].width*4,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))+background[i].width*5,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))+background[i].width*6,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))+background[i].width*7,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))+background[i].width*8,layer_y+constants.LAYER_Y[i] );
	ctx.drawImage(background[i],(temp%(background[i].width))+background[i].width*10,layer_y+constants.LAYER_Y[i] );

}





function loopGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    
	if(keysDown[37]){
		move('left');
	}else if(keysDown[39]){
		move('right');
	}
	if(keysDown[38]){
		move('jump');
	}else if(keysDown[40]){
		move('down');
	}
	refreshCamera()
	colisionDetector()
	moveplayer()
	
paintBackBackground()
drawParallax(0)
drawParallax(1)
drawParallax(2)
drawParallax(3)
	paintMap()
	paintPlayer()
	frameCounter ++
	if (stat ==2 ){window.requestAnimationFrame(loopGame)};
	
	
}


function loopTitle() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    
	if(keysDown[37]){
		stat = 1
		checkStat();
		
	}else if(keysDown[39]){
		stat = 1
		checkStat();
		
	}
	if(keysDown[38]){
		stat = 1
		checkStat();
		
	}else if(keysDown[40]){
		stat = 1
		checkStat();
		
	}
	drawTitle()
	if ( stat == 0 ){window.requestAnimationFrame(loopTitle)};
	
	
}

function drawTitle(){
	
	ctx.drawImage(image_titleframe,0,0);
}

function drawGameOver(){
	ctx.drawImage(image_gameover,0,0);
	
}


function loopGameOver() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    
	if(keysDown[37]){
location.reload()
	}else if(keysDown[39]){
location.reload()
	}
	if(keysDown[38]){
location.reload()
	}else if(keysDown[40]){
location.reload()
	}
	drawGameOver()
	if ( stat == 4 ){window.requestAnimationFrame(loopGameOver)}
	
	
}

function loopLoadlevel() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image_leveltitle,0,0);
  	ctx.font = "10px Courier";
	ctx.fillStyle = "#ff00ff"
	ctx.fillText("You have "+lives+" lives, good luck", constants.TEXT_X, constants.TEXT_Y); 
	 ctx.drawImage(image_loading,100,120);
	 ctx.font = "10px Courier";
	ctx.fillStyle = "#ff00ff"
	ctx.fillText("level "+constants.LEVEL_N+": "+history_text[constants.LEVEL_N], 150, 210); 
  window.setTimeout( changer,3000);
  if ( stat == 1 ){window.requestAnimationFrame(loopLoadlevel)
   }else{ checkStat()};

}


function changer(){
	
	
	stat = 2
}






function refreshCamera(){
//limitando en la izquierda
	camera.x = (player.X -(constants.CANVAS_WIDTH/2))+constants.TILES_WIDTH/2
	camera.y =  (player.Y -(constants.CANVAS_HEIGHT/2))+constants.TILES_HEIGHT/2
	if(camera.x<0)camera.x=0;
	//if (player.X< constants.CANVAS_WIDTH/2){ camera.x = 0}
	if (camera.x> constants.MAP_COLUMNS*constants.TILES_WIDTH -constants.CANVAS_WIDTH){ camera.x = constants.MAP_COLUMNS*constants.TILES_WIDTH-constants.CANVAS_WIDTH}
	//if (player.Y< constants.CANVAS_HEIGHT/2){ camera.y = 0}
	if (camera.y> constants.MAP_ROWS*constants.TILES_HEIGHT  -constants.CANVAS_HEIGHT ){ camera.y = constants.MAP_ROWS*constants.TILES_HEIGHT-constants.CANVAS_HEIGHT}

	
	
//constants.MAP_COLUMNS*constants.TILES_WIDTH

	
	
	
}

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



function move(key){
	if (key == 'left' ){
		player.ORIENTATION = true
		if( mapSettings.SOLIDS.indexOf(getTile(player.X+12, player.Y+32))==-1 && player_death == false){
			player.HORIZONTAL_ACEL -= player.HORIZONTAL_ACEL_SPEED 
			// SI ESTÃ PARADO INICIA LA MARCHA CON UN EMPUJÃ“N

		}
	}else if (key == 'right' ){
		player.ORIENTATION = false
		if(mapSettings.SOLIDS.indexOf(getTile(player.X+52, player.Y+32))==-1&& player_death == false){	
			player.HORIZONTAL_ACEL += player.HORIZONTAL_ACEL_SPEED 
			// SI ESTÃ PARADO INICIA LA MARCHA CON UN EMPUJÃ“N
			if ( player.HORIZONTAL_ACEL == 0){
				player.HORIZONTAL_ACEL += player.MAX_SPEED
		}
	}
}
	
	if (key == 'jump' ){
	//if (player.JUMPING == false){
	if(mapSettings.SOLIDS.indexOf(getTile(player.X+32, player.Y-1))==-1&& player_death == false){
		//player.VERTICAL_ACEL -=3
		player.jumper = true
		jumper()
	}//}
	}else if (key == 'down' ){
		
	}
	


}

function jumper(){

	player.VERTICAL_ACEL -= player.JUMP/100

}



function moveplayer(){
	//movemos al player
	player.X +=player.HORIZONTAL_ACEL	
	player.Y +=player.VERTICAL_ACEL
	
	// reduce la velocidad a 0 para calculos innecesarios
if (player.HORIZONTAL_ACEL>-0.1 && player.HORIZONTAL_ACEL<0.1){
		player.HORIZONTAL_ACEL = 0
	}
	
// aÃ±adimos la fricciÃ³n
	if (player.JUMPING == false){
		player.jumper = false
	if (player.HORIZONTAL_ACEL> 0){
	player.HORIZONTAL_ACEL -= player.FRICTION
	}
	if (player.HORIZONTAL_ACEL< 0){
	player.HORIZONTAL_ACEL +=player.FRICTION
	}
}

if (player.JUMPING == true){
	if (player.HORIZONTAL_ACEL> 0){
	player.HORIZONTAL_ACEL -= player.FRICTION
	}
	if (player.HORIZONTAL_ACEL< 0){
	player.HORIZONTAL_ACEL +=player.FRICTION
	}
}
	
// MIRA SI HAY COLISION CON LOS MUROS, Y EN CASO DE HABERLA LO PARA POR COMPLETO
	
if( mapSettings.SOLIDS.indexOf(getTile(player.X+12, player.Y+40))!==-1 ||
	mapSettings.SOLIDS.indexOf(getTile(player.X+30, player.Y+35)) !==-1 ){
		player.HORIZONTAL_ACEL = -player.HORIZONTAL_ACEL/2
	}
		

// CODIGO ANTISTUCK ( IMPEDIR QUE SE QUEDE ENGANCHADO EN LAS PAREDES )
// HORIZONTAL
if( mapSettings.SOLIDS.indexOf(getTile(player.X+6, player.Y+32)) !==-1 &&
    player.HORIZONTAL_ACEL == 0){
		
		player.X +=1
			

	}
	
if( mapSettings.SOLIDS.indexOf(getTile(player.X+40,player.Y)) !==-1){console.log("stuck") ; player.X -=1	}


if( mapSettings.SOLIDS.indexOf(getTile(player.X+6, player.Y+32)) !==-1 &&
    player.HORIZONTAL_ACEL == 0){
		
		player.X -=1
			
	}

//VERTICAL


if(mapSettings.SOLIDS.indexOf(getTile(player.X+32, player.Y+constants.TILES_HEIGHT-1))!==-1){	
	player.VERTICAL_ACEL=0
	player.Y -=1

}


if(mapSettings.SOLIDS.indexOf(getTile(player.X+32, player.Y-1))!==-1){	
	player.VERTICAL_ACEL=0
	player.Y +=1
}




	
	//aquÃ­ habrÃ­a la gravedad
	if(mapSettings.SOLIDS.indexOf(getTile(player.X+30, player.Y+48))==-1){
		player.JUMPING = true;
		player.VERTICAL_ACEL += player.GRAVITY/10
			player.Y +=player.VERTICAL_ACEL
		} else { player.JUMPING = false; player.VERTICAL_ACEL = 0 }
	
	
//  LIMITAMOS LA VELOCIDAD
if (player.HORIZONTAL_ACEL> player.MAX_SPEED){ player.HORIZONTAL_ACEL = player.MAX_SPEED}
if (player.HORIZONTAL_ACEL< -player.MAX_SPEED){ player.HORIZONTAL_ACEL = -player.MAX_SPEED}
if (player.VERTICAL_ACEL< -player.LIMIT_JETPACK_SPEED){player.VERTICAL_ACEL = -player.LIMIT_JETPACK_SPEED }
if (player.VERTICAL_ACEL> player.LIMIT_JETPACK_SPEED*2){player.VERTICAL_ACEL = player.LIMIT_JETPACK_SPEED*2 }
///
if (player.X> constants.TILES_WIDTH*(constants.MAP_ROWS-1)){ player.X = constants.TILES_WIDTH*(constants.MAP_COLUMNS-1)}
if (player.X< 0){ player.X = 0}
if (player.Y> constants.TILES_HEIGHT*(constants.MAP_COLUMNS+10)){ player.Y = constants.TILES_HEIGHT*(constants.MAP_COLUMNS+10)}
if (player.Y< 0){ player.Y = 0}

}

var SASA

function paintDebugger(){
ctx.font = "10px Arial";
ctx.fillStyle = "#ff00ff"
ctx.fillText("Horizontal Aceleration"+player.VERTICAL_ACEL, 10, 50); 
ctx.fillText("i"+SASA, 40, 90); 	

}



function colisionDetector(){
	//colision con monedas
	if(mapSettings.COINS.indexOf(getTile(player.X+21, player.Y+20))!==-1){ 
			player.POINTS +=5 
			canpasslevel = true;
			map[getTxY(player.X+21,player.Y+20)] = 0
			}
	//deteccion puerta
	if(mapSettings.DOOR.indexOf(getTile(player.X+21, player.Y+20))!==-1){ 
		if ( canpasslevel == true){
			canpasslevel = false
			stat =1
			constants.LEVEL_N +=1
			checkStat()
	}}
	//deteccion pinchos
	if(mapSettings.DEATH.indexOf(getTile(player.X+36, player.Y+20))!==-1 ){ 
			player_death = true
	
			}
	//detecction muelle
	if(mapSettings.SPRING.indexOf(getTile(player.X+36, player.Y+2))!==-1 && player.JUMPING == false){ 
			player.VERTICAL_ACEL -= player.SPRING
			}
	if(mapSettings.ONEUP.indexOf(getTile(player.X+36, player.Y+20))!==-1 ){ 
			lives +=1
			map[getTxY(player.X+36,player.Y+20)] = 0
			}

}

function nextLevel(){
	console.log("NEXT LEVEL")
}





// evento onload
window.addEventListener('load', function(){
	
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	canvas.width = constants.CANVAS_WIDTH;
	canvas.height = constants.CANVAS_HEIGHT;
	canvas.style.width=(constants.CANVAS_WIDTH*constants.ZOOM)+'px';
	canvas.style.height=(constants.CANVAS_HEIGHT*constants.ZOOM)+'px';

	
	imageQueue=10
	
	image_loading = new Image();
	image_loading.onload=onLoadImage;
	image_loading.src="loading.png";
	
	image_gameover = new Image();
	image_gameover.onload=onLoadImage;
	image_gameover.src="gameover.png";
	
	image_leveltitle = new Image();
	image_leveltitle.onload=onLoadImage;
	image_leveltitle.src="leveltitle.png";
	
	image_titleframe = new Image();
	image_titleframe.onload=onLoadImage;
	image_titleframe.src="titleframe.png";
	
	image_tiles = new Image();
	image_tiles.onload=onLoadImage;
	image_tiles.src="tiles.png";
	
	image_catcher = new Image();
	image_catcher.onload=onLoadImage;
	image_catcher.src="catcher.png";
	
	image_player_iz = new Image();
	image_player_iz.onload=onLoadImage;
	image_player_iz.src="player_iz.png";

	image_player_de = new Image();
	image_player_de.onload=onLoadImage;
	image_player_de.src="player_de.png";
	
	image_backbackground = new Image();
	image_backbackground.onload=onLoadImage;
	image_backbackground.src="backbackground.png";
	

for(i=0; i<3; i++ ){
		background[i] = new Image();
		background[i].onload=onLoadImage;
		background[i].src="background_" + i + ".png";
	}
	
	

	
}, false);
