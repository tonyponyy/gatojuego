function putenemy(){
    orientation =Math.random() > 0.5 ? true:false;
    enemy_created = new enemy(1, player.x,player.y,orientation,0.3)
    enemys_array.push(enemy_created)
}