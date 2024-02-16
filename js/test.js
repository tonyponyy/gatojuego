function putenemy() {
  orientation = Math.random() > 0.5 ? true : false;
  enemy_created = new enemy(1, player.x + 64, player.y, orientation, 0.3,32);
  enemys_array.push(enemy_created);
}
