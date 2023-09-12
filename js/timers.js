can_press = true
function press_key(key,callback){
  if  (keysDown[key] && can_press){
    can_press = false
    setTimeout(() => {
        can_press = true;
        callback()
      }, "400");
      
  }
}