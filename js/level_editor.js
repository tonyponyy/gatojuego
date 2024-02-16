var CANVAS_HEIGHT_TEMP = constants.CANVAS_HEIGHT;
var temp_map;
var CANVAS_WIDTH_TEMP =constants.CANVAS_WIDTH;
var ZOOM_TEMP = constants.ZOOM;
var mouseX = 0;
var mouseY = 0;
var edit_level;
var default_settings={
    tile_group: 1,
    selected_tool :"pencil",
    selected_tile : 1,
    map_string :"0$791,44,0$198,17,18,16,0$35,14,2$2,33$2,15,0$191,14,2$2,1$3,33$2,1,15,0$189,14,1$6,33$2,1$2,15,37,0$186,14,1$2,13$2,1$2,13,33$2,13,1$2,16,0$185,14,1$2,10,32,0,9,10,23,33$2,22,9,10,0$50,33,0$132,14,2$2,1$4,3,0,9,10,23,33$2,22,9,10,0$50,33,0$131,14,1$7,10,0,9,10,23,33$2,22,9,10,20$11,0$39,33,0$130,14,1$8,10,0,12,11,23,33$2,22,9,1,18$10,16,0$29,33,0$9,33,0$95,14,3,0$32,14,1$9,10,0$4,33$2,0,12,11,0$10,27,0$18,33,0$10,33,0$9,33,0$94,14,1$2,15,0$30,14,1$10,10,0$4,33$2,0$2,26,0$10,27,0$10,33,0$7,33,0$10,33,0$9,33,0$10,14,2,15,0$80,14,1$4,2,15,0$13,34,31,0$4,39,0$3,37,49,46,45,14,1$11,10,0$4,33$2,0,24,26,0$6,39,0$2,24,27,0$2,37,0$2,39,0,45$2,0,33,0$5,39,0,33,0$7,38$2,0,33,0$3,45$3,39,45,0,33,0$4,45$3,0$2,14,1$3,15,0$3,37,0$7,41,0$6,39,0$7,37,0$14,45$12,0$25,14,1$7,15,0$2,41,0$2,43,0$6,2$7,3,20$2,4,2$15,1,2$69,1$5,2$78,1$9,2$12,1$8,2$2,1$590",
    environment: 3,
    sky: 2,
    weather: 2,
    fuel:50,
    height: 20,
    width: 200
}
var map_settings ;

var editor_config ={
    level_width:100,
    level_height: 20,
    biome:1,
    jetpack_fuel:100
}

var tileset_menu =[
    [],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,43,44],
    [37,38,39,40,41,42],
    [45,46,47,48,49]
  ]
  



function resize(width,height,zoom){
    constants.CANVAS_WIDTH = width;
    constants.CANVAS_HEIGHT = height;
    constants.ZOOM = zoom;

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width * zoom + "px";
    canvas.style.height = height * zoom + "px";

}

function resize_to_normal(){
    resize(CANVAS_WIDTH_TEMP,CANVAS_HEIGHT_TEMP,ZOOM_TEMP)
}



canvas.addEventListener('mousemove', function(event) {
    if(FULLSCREEN){
        var x_m,y_m;
        var element = event.target;
        let br = element.getBoundingClientRect();
        let ratio = window.innerHeight/canvas.height;
        let offset = (window.innerWidth-(canvas.width*ratio))/2;
        x_m = map_cor(event.clientX-br.left-offset,0,canvas.width*ratio,0,element.width);
        y_m = map_cor(event.clientY-br.top,0,canvas.height*ratio,0,element.height);
        mouseX = x_m;
        mouseY = y_m;
    } else {
    var rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    }
}, false);


canvas.addEventListener('mousemove', function(event) {
    if (isLoopLevelEditorRunning && event.buttons === 1  && !in_menu()) {
        tool_move();
    }
}, false);

canvas.addEventListener('click', function(event) {
    if (isLoopLevelEditorRunning && in_menu()) {
        menu_click(mouseX,mouseY)
    }
}, false);

function in_menu(){
    let res = mouseX > canvas.width-300 && mouseY < canvas.height-370 ? true:false;
    return res;
}

function menu_click(x,y){
   
    if (y > 30 && y < 50){
        // tool selector

        //eraser :
        if (x > 1030 && x <1055){  map_settings.selected_tool  = "eraser"}
        //pencil :
        if (x > 1000 && x <1022){  map_settings.selected_tool  = "pencil"}
        //paint_bucket :
        if (x > 1065 && x <1088){  map_settings.selected_tool  = "paint_bucket";}

        // select environment 1

        //forest :
        if (x > 1127 && x <1150){  map_settings.environment  = 1; reload_map(map_settings)}
        //desert :
        if (x > 1162 && x <1183){  map_settings.environment  = 2; reload_map(map_settings)}

        // select ambient 1

        //sunny :
        if (x > 1204 && x <1223){  map_settings.sky  = 1; reload_map(map_settings)}
        //cloud :
        if (x > 1236 && x <1259){  map_settings.sky  = 4; reload_map(map_settings)}
    }

    if (y>60 && y< 80){
        // select environment 1

        //tropical :
        if (x > 1127 && x <1150){  map_settings.environment  = 3; reload_map(map_settings)}
        //winter :
        if (x > 1162 && x <1183){  map_settings.environment  = 4; reload_map(map_settings)}

        // select ambient 1

        //afternoon :
        if (x > 1204 && x <1223){  map_settings.sky  = 2; reload_map(map_settings)}
        //night :
        if (x > 1236 && x <1259){  map_settings.sky  = 3; reload_map(map_settings)}

    }
    if (y>73 && y< 90){
    //tileset carrousel
    if (x > 996 && x <1012){  map_settings.tile_group  = 1; }
    if (x > 1019 && x <1039){  map_settings.tile_group  = 2; }
    if (x > 1044 && x <1060){  map_settings.tile_group  = 3; }
    if (x > 1066 && x <1084){  map_settings.tile_group  = 4; }
    }
    if (y> 96 && y<305){
        if (x > 999 && x< 1264){
            select_tile = get_tile_in_menu_selector(x,y);
            if (select_tile){
                map_settings.selected_tile = select_tile;
                console.log("selected tile --> "+select_tile)
            }
        }

    }

    //play and save
    //play
    if (y>313 && y< 337){
        if (x > 996 && x <1012){  test_level()}
    }
    
}

function test_level(){
    reload_map(map_settings)
    temp_map = map;
    level_play = edit_level;
    scene = "level"
    resize_to_normal()
    select_scene(true);
}

function start_level_editor(from_editor = false){
    
    if (!from_editor){
      reload_map(default_settings,true)
      map_settings = default_settings;  
    }else{
        map = temp_map
        reload_map(map_settings)
    }
    loop_level_editor()
}

function reload_map(settings, default_map = false){
    if (default_map){
        map_string = settings.map_string
    }else{
        map_string = compress_map(map)
    }
    
    edit_level = new GameLoad(settings.environment, settings.sky, settings.weather, settings.fuel, map_string, settings.height, settings.width);
    constants.MAP_COLUMNS = edit_level.width;
    constants.MAP_ROWS = edit_level.height;
    image_fondo = edit_level.sky_img;
    image_tiles = edit_level.tiles_img;
    layer_img = edit_level.layer_img
    paralax1 = edit_level.paralax1_img;
    paralax2 = edit_level.paralax2_img;
    map = [...edit_level.map_tiles];
    map_layer= generate_layer()
}

xp = 0
yp = 0
function loop_level_editor() {
    isLoopLevelEditorRunning = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffe4c4";
    ctx.fillRect(0,0, edit_level.width*48-camera.x, edit_level.height*48-camera.y);
    paintBackBackground(image_fondo);
    //drawParallax(paralax1, 105, 12);
    //drawParallax(paralax2, 145, 8);
    //drawParallax(paralax2, 200, 6,-120);
    //drawParallax(paralax2, 260, 4,-60);
    //paintBackBackground(blanktile);
    ctx.fillStyle = ctx.createPattern(blanktile,"repeat");
	ctx.fillRect(0,0, edit_level.width*48-camera.x, edit_level.height*48-camera.y);
    paintMapLayer()
    paintMap(true)
    editor_menu()
    tileset_menu_view()
      
    if(keysDown[37]){
		camera.x -=48;
	}else if(keysDown[39]){
		camera.x +=48;
	}
	if(keysDown[38]){
		camera.y -=48;
	}else if(keysDown[40]){
		camera.y +=48;
	}
    if (camera.y < 0) camera.y = 0;
    if (camera.y >= edit_level.height*48 ) camera.y = edit_level.height*48 ;
    if (camera.x >= edit_level.width*48 ) camera.x = edit_level.width*48 ;
    if (camera.x < 0) camera.x = 0;
    print_text("x:"+mouseX+" y:"+mouseY,0,40)
    //print_text("TILE MOUSE :"+getTile(mouseX+camera.x,mouseY+camera.y),0,40)
    print_text("level editor fr :"+frameCounter,0,5);
    print_text("width:"+edit_level.width,1080,333);
    print_text("height:"+edit_level.height,1080,314);

    if (scene == "level_editor"){
    frameCounter++;
    window.requestAnimationFrame(loop_level_editor);
    }
    //console.log("level_editor_running")
}

function tileset_menu_view(){
    //tileset_menu
    x = 1000;
    y = 100;
    rows = 5;
    columns = 4;
    separation_x = constants.TILES_WIDTH +5;
    separation_y = constants.TILES_HEIGHT +4;

    for (let i = 0; i < tileset_menu[map_settings.tile_group].length; i++) {
        ctx.drawImage(
            image_tiles,
            (tileset_menu[map_settings.tile_group][i]-1) * constants.TILES_WIDTH,
            0,
            constants.TILES_WIDTH,
            constants.TILES_HEIGHT,
            x+ ((i%rows)*separation_x),
            //y+ ((i%rows)*separation_x),
            y+ ((parseInt(i/rows))*separation_y),
            constants.TILES_WIDTH,
            constants.TILES_HEIGHT
          );
         // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);   
    }
}

function get_tile_in_menu_selector(mouse_x,mouse_y){
    x = 1000;
    y = 100;
    rows = 5;
    columns = 4;
    separation_x = constants.TILES_WIDTH +5;
    separation_y = constants.TILES_HEIGHT +4;

    for (let i = 0; i < tileset_menu[map_settings.tile_group].length; i++) {
        console.log("array length ->"+tileset_menu[map_settings.tile_group].length+" i="+i)
        console.log("x -->"+x+ ((i%rows)*separation_x)+"/"+(x+ ((i%rows)*separation_x)+constants.TILES_WIDTH))
        if (mouse_x >= x+ ((i%rows)*separation_x) && mouse_x <= (x+ ((i%rows)*separation_x)+constants.TILES_WIDTH)){
            if(mouse_y >= y+ ((parseInt(i/rows))*separation_y) && mouse_y <= y+ ((parseInt(i/rows))*separation_y)+ constants.TILES_HEIGHT ){
                return tileset_menu[map_settings.tile_group][i]
            }
        }
        
    }
    return false;

}


function resize_map(width, height) {
    var resized_map;
    var bidimensional_map = [];

    var width_dif = width - map_settings.width;
    var height_dif = height - map_settings.height;

    //convertir el mapa en bidemensional
    for (let i = 0; i < map_settings.height; i++) {
        bidimensional_map[i] = []
        for (let j = 0; j < map_settings.width; j++) {
            bidimensional_map[i][j] = map[i * map_settings.width + j];
        }
    }
    // eliminamos los tiles sobrantes al height
    if (height_dif < 0){
        bidimensional_map.splice(0,-height_dif)
    }
     // anyadimos los que faltan
     if (height_dif > 0){
        let array_temp = Array(map_settings.width).fill(0)
        for (let i = 0; i < height_dif; i++) {
            bidimensional_map.unshift(array_temp)
        }
    }

    for (let i = 0; i < bidimensional_map.length; i++) {
        // Eliminar los tiles sobrantes al width
        if (width_dif < 0) {
            bidimensional_map[i].splice(width);
        }

        // Añadir los que faltan al width
        if (width_dif > 0) {
            bidimensional_map[i] = bidimensional_map[i].concat(Array(width_dif).fill(0));
        }
    }

    //convertir mapa en unidimensional
    resized_map = bidimensional_map.flat()
    // Actualizar las propiedades del mapa_settings
    map_settings.width = width;
    map_settings.height = height;
    map_settings.map_string = compress_map(resized_map);
    // Recargar el mapa con las nuevas configuraciones
    reload_map(map_settings);
}



function editor_menu(){
    ctx.drawImage(editor_menu_img,980,0)
}

// esto gestiona los eventos como pintar o borrar
function tool_move(){
    if (map_settings.selected_tool == "pencil"){
        tile_position = getTilePosition(mouseX+camera.x,mouseY+camera.y)
        if (map_settings.selected_tile == 1){
            automap(mouseX+camera.x,mouseY+camera.y)
        }else{
            map[tile_position] = map_settings.selected_tile
        }
        
    }else if(map_settings.selected_tool == "eraser"){
        automap(mouseX+camera.x,mouseY+camera.y,true)
    }
    map_layer= generate_layer()

}

function automap(x,y,eraser = false){
    // posicion de las variables
    //      [tu]  
    // [tl] [tc] [tr]
    //      [td]  
    //
    tc = automap_aux(x,y)
    if (!eraser){
        map[tc.position] =1;
    }else{
        map[tc.position] =0;
    }
    
    tc = automap_aux(x,y)
    tl = automap_aux(x-constants.TILES_WIDTH,y)
    tr = automap_aux(x+constants.TILES_WIDTH,y)
    tu = automap_aux(x,y+constants.TILES_HEIGHT)
    td = automap_aux(x,y-constants.TILES_HEIGHT)
    tl_c = {x :x-constants.TILES_WIDTH,y:y}
    tr_c = {x:x+constants.TILES_WIDTH,y:y}
    tu_c = {x:x,y:y+constants.TILES_HEIGHT}
    td_c = {x:x,y:y-constants.TILES_HEIGHT}
    automap_repaint(x,y)
    automap_repaint(td_c.x, td_c.y);
    automap_repaint(tl_c.x, tl_c.y);
    automap_repaint(tr_c.x, tr_c.y);
    automap_repaint(tu_c.x, tu_c.y);
    automap_repaint(td_c.x, td_c.y);

    
    console.log("up-->"+map[getTilePosition(tu_c.x,tu_c.y)])
    

    
/*
    if (tl.blank && tr.blank && tu.blank&& td.blank){
        automap_repaint(x,y)
    }
    if (tl.blank && tr.blank && tu.blank&& !td.blank){
        automap_repaint(td_c.x, td_c.y);
        automap_repaint(td_c.x, td_c.y);
        automap_repaint(x,y)
        console.log(td_c)
    }
    if (tl.blank && tr.blank && !tu.blank&& !td.blank){
        automap_repaint(td_c.x, td_c.y);
        automap_repaint(tu_c.x, tu_c.y);
        automap_repaint(x,y)
    }
    */

    /*
    map[tc.position] =1 ;
    map[tl.position] =1 ;
    map[tr.position] =1 ;
    map[tu.position] =1 ;
    map[td.position] =1 ;
    */
}

function automap_repaint(x,y){
    tc = automap_aux(x,y)
    tl = automap_aux(x-constants.TILES_WIDTH,y)
    tr = automap_aux(x+constants.TILES_WIDTH,y)
    tu = automap_aux(x,y-constants.TILES_HEIGHT)
    td = automap_aux(x,y+constants.TILES_HEIGHT)
    
    if (!tc.blank){
    if (tl.blank && tr.blank && tu.blank && td.blank){
        map[tc.position] =19 ;
        return;
    }
    if (tl.blank && tr.blank && tu.blank && !td.blank){
        map[tc.position] =6 ;
        return;
    }
    if (tl.blank && tr.blank && !tu.blank && td.blank){
        map[tc.position] =8 ;
        return;
    }
    if (tl.blank && tr.blank && !tu.blank && !td.blank){
        map[tc.position] =7 ;
        return;
    }
    if (tl.blank && !tr.blank && tu.blank && td.blank){
        map[tc.position] =17 ;
        return;
    }
    if (tl.blank && !tr.blank && tu.blank && !td.blank){
        map[tc.position] =4 ;
        return;
    }
    if (tl.blank && !tr.blank && !tu.blank && td.blank){
        map[tc.position] =12 ;
        return;
    }
    if (tl.blank && !tr.blank && !tu.blank && !td.blank){
        map[tc.position] =9 ;
        return;
    }
    //
    if (!tl.blank && tr.blank && tu.blank && td.blank){
        map[tc.position] =16 ;
        return;
    }
    if (!tl.blank && tr.blank && tu.blank && !td.blank){
        map[tc.position] =3 ;
        return;
    }
    if (!tl.blank && tr.blank && !tu.blank && td.blank){
        map[tc.position] =11 ;
        return;
    }
    if (!tl.blank && tr.blank && !tu.blank && !td.blank){
        map[tc.position] =10 ;
        return;
    }
    if (!tl.blank && !tr.blank && tu.blank && td.blank){
        map[tc.position] =18 ;
        return;
    }
    if (!tl.blank && !tr.blank && tu.blank && !td.blank){
        map[tc.position] =2 ;
        return;
    }
    if (!tl.blank && !tr.blank && !tu.blank && td.blank){
        map[tc.position] =13 ;
        return;
    }
    if (tl.blank && !tr.blank && !tu.blank && !td.blank){
        map[tc.position] =1 ;
        return;
    }


    }

}

function automap_aux(x,y){
    tile_searched = map[getTilePosition(x,y)]
    blank_res = tileset_menu[1].indexOf(tile_searched) == -1 ? true:false;
    return {position: getTilePosition(x,y) ,blank: blank_res }
}

function generate_layer(){
    var layer = Array(map.length).fill(0);
    //llenar el fondo de 1
    tileset_for_background = [1,2,3,4,5,6,7,8,9,10,11,12,13,16,17,18,19]
    for (let i = 0; i < map.length; i++) {
        if (tileset_for_background.indexOf(map[i]) != -1 && tileset_for_background.indexOf(map[i+constants.MAP_COLUMNS]) == -1 ){
            layer[i] = 1;
            e=1;
            while (tileset_for_background.indexOf(map[i+(constants.MAP_COLUMNS*e)]) == -1) {
                
                if (i+(constants.MAP_COLUMNS*e) > layer.length){
                    break;
                }else{
                    layer[i+(constants.MAP_COLUMNS*e)] = 1
                }
             e++   
            }
        }
    }
    //redibujar los lados del fondo
    for (let i = 0; i < layer.length; i++) {
        if (layer[i] != 0) {
            if (i < layer.length - 1 && i > 0) {
                if (layer[i + 1] == 0 && layer[i - 1] == 0 && tileset_for_background.indexOf(map[i+1]) == -1 && tileset_for_background.indexOf(map[i-1]) == -1) {
                    layer[i] = 4;
                } else if (layer[i + 1] == 0 && tileset_for_background.indexOf(map[i+1]) == -1) {
                    layer[i] = 3;
                } else if (layer[i - 1] == 0 && tileset_for_background.indexOf(map[i-1]) == -1) {
                    layer[i] = 2;
                }
            } else if (i == 0) {
                if (layer[i + 1] == 0) {
                    layer[i] = 3;
                }
            } else if (i == layer.length - 1) {
                if (layer[i - 1] == 0) {
                    layer[i] = 2;
                }
            }
        }
    }



    return layer
}