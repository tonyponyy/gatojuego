class GameLoad {
  constructor(environment, sky, weather, fuel, map_tiles, height, width) {
    switch (environment) {
      case 1:
        //campo
        this.tiles_img = field_tiles_img;
        this.paralax1_img = field_paralax1_img;
        this.paralax2_img = field_paralax2_img;
        this.enviroment ="FIELD"
        break;
      case 2:
        //desierto
        this.tiles_img = desert_tiles_img;
        this.paralax1_img = desert_paralax1_img;
        this.paralax2_img = desert_paralax2_img;
        this.enviroment ="DESERT"
        break;
      case 3:
        //ruinas
        this.tiles_img = ruins_tiles_img;
        this.paralax1_img = ruins_paralax1_img;
        this.paralax2_img = ruins_paralax2_img;
        this.enviroment ="RUINS"
        break;
      case 4:
        //nieve
        this.tiles_img = snow_tiles_img;
        this.paralax1_img = snow_paralax1_img;
        this.paralax2_img = snow_paralax2_img;
        this.enviroment ="SNOW"
        break;
      default:
        this.tiles_img = field_tiles_img;
        this.paralax1_img = field_paralax2_img;
        this.paralax2_img = field_paralax2_img;
        this.enviroment ="FIELD"
        break;
    }
    switch (sky) {
      case 1:
        //dia
        this.sky_img = sunny_sky_img;
        break;
      case 2:
        //tarde
        this.sky_img = afternoon_sky_img;
        break;
      case 3:
        //noche
        this.sky_img = night_sky_img;
        break;
      case 4:
        //nublado
        this.sky_img = cloudy_sky_img;
        break;
      default:
        this.sky_img = sunny_sky_img;
        break;
    }

    this.weather = weather;
    this.fuel = fuel * 25;
    this.map_tiles = decompress_map(map_tiles);
    this.height = height;
    this.width = width;
  }
}

function compress_map(array) {
  let valores = [];
  let contador = 0;
  for (let i = 0; i < array.length; i++) {
    let valorActual = array[i];
    contador++;
    if (valorActual !== array[i + 1] || i === array.length - 1) {
      if (contador > 1) {
        valores.push(`${valorActual}$${contador}`);
      } else {
        valores.push(valorActual);
      }
      contador = 0;
    }
  }
  return valores.toString();
}

function decompress_map(map) {
  let decompressed_map = [];
  map = map.split(",");
  for (let i = 0; i < map.length; i++) {
    let actual_value = map[i];
    if (typeof actual_value === "string" && actual_value.includes("$")) {
      let [value, iterations] = actual_value.split("$");
      for (let j = 0; j < parseInt(iterations); j++) {
        decompressed_map.push(parseInt(parseInt(value)));
      }
    } else {
      decompressed_map.push(parseInt(actual_value));
    }
  }
  return decompressed_map;
}
