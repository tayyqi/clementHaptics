
  //create feed button
  function createFeedCoral (x, y, w, h, text) {
    let feedButton = createButton(text, x, y, w, h);  //"", 220, 130, 100, 100
    feedButton.setStyle({
        fillBg: color(col,30),
        fillBgHover: color(col,30),
        fillBgActive: color(col,80),
        strokeBg: color(col,50),  //nostroke
        strokeBgHover: color(col,50),  //nostroke
        strokeBgActive: color(col,80),  //nostroke
        // strokeWeight: 10,
        rounding: w/2,  //change for circle
    });
    feedButton.onPress = function(){
      for(let i=0; i<random(5,10); i++){
        let feed = createSprite(feedButton.x, feedButton.y,10,10);
        feed.debug=true;
        feed.velocity.x = random(-7,7);
        feed.velocity.y = random(-7,7);
        foodArr.add(feed);
      }
      print("feed"); 
    }
    return feedButton;
   }
  
    //create enclosure button
  function createEnclosure(x, y, w, h){
    let enclosureButton = createButton("", width/2-100, height/2-100, 200, 200);
    enclosureButton.setStyle({
      fillBg: color(col,30),
      fillBgHover: color(col,30),
      fillBgActive: color(col,80),
      strokeBg: color(col,50),  //nostroke
      strokeBgHover: color(col,50),  //nostroke
      strokeBgActive: color(col,80),  //nostroke
      // strokeWeight: 10,
      rounding: w/2,  //change for circle
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

    return enclosureButton;
  }