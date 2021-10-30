
  //create feed button
  function createCoral (x, y, w, h) {
    let feedButton = createButton("", x, y, w, h);  //"", 220, 130, 100, 100
    feedButton.setStyle({
        fillBg: color(col,30),
        fillBgHover: color(col,30),
        fillBgActive: color(col,80),
        strokeBg: color(col,50),  //nostroke
        strokeBgHover: color(col,50),  //nostroke
        strokeBgActive: color(col,80),  //nostroke
        // strokeWeight: 10,
        rounding: 50,  //change for circle
    });
    feedButton.onPress = function(){
      for(let i=0; i<random(5,10); i++){
        let feed = createSprite(220,130,30,30);
        feed.velocity.x = random(3,7);
        feed.velocity.y = random(1,7);
        foodAll.add(feed);

        print("feed");
      }
        
    }
   }
  
    //create enclosure button
  function createEnclosure(x, y, w, h){
    enclosureButton = createButton("", width/2-100, height/2-100, 200, 200);
    enclosureButton.setStyle({
      fillBg: color(col,30),
      fillBgHover: color(col,30),
      fillBgActive: color(col,80),
      strokeBg: color(col,50),  //nostroke
      strokeBgHover: color(col,50),  //nostroke
      strokeBgActive: color(col,80),  //nostroke
      // strokeWeight: 10,
      rounding: 100,  //change for circle
    });
    enclosureButton.onPress = function(){
      if(fish.escape){
        fish.x = fish.x_init;
        fish.y = fish.y_init;
        fish.escape = false;
      }  else{
        fish.peek = true;
      }
    }

    enclosureButton.onRelease = function(){
      fish.peek = false;
    }

    function eat(fish, feed){
      feed.remove();
      // point +=1;
    }
  }