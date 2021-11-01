
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
      let feed = createSprite(feedButton.x, feedButton.y,20,20);
      // feed.debug=true;
      feed.velocity.x = random(-7,7);
      feed.velocity.y = random(-7,7);
      foodArr.add(feed);
    }
    print("feed"); 
  }
  return feedButton;
}

// create sea creature
// sea Creature bubbles when touched -- get points?
//minus points whn bump into sea Creature
function createSeaCreature(x, y, w, h, name) {
  let seaCreatureButton = createButton(name, x, y, w, h);
  seaCreatureButton.setStyle({
    fillBg: color(col,30),
    fillBgHover: color(col,30),
    fillBgActive: color(col,80),
    strokeBg: color(col,50),  //nostroke
    strokeBgHover: color(col,50),  //nostroke
    strokeBgActive: color(col,80),  //nostroke
    // strokeWeight: 10,
    rounding: w/2,  //change for circle 
  });
  seaCreatureButton.onPress = function(){
    fish.score++;
  }

  // seaCreatureButton.onRelease = function(){
  //   fish.peek = false;
  // }

  return seaCreatureButton;
}


//create enclosure button
function createEnclosure(x, y, w){
  let enclosureButton = createButton("", x, y, w, w);
  //store prev pos of fish
  enclosureButton.xInit = 0;
  enclosureButton.yInit = 0;
  //set style
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
    if(fish.hide){
      fish.x = enclosureButton.xInit;
      fish.y = enclosureButton.yInit;
      enclosureButton.xInit = 0;
      enclosureButton.yInit = 0;
    }  else{
      enclosureButton.xInit = fish.x;
      enclosureButton.yInit = fish.y;
      fish.x = enclosureButton.x + enclosureButton.w;
      fish.y = enclosureButton.y + enclosureButton.h;
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