
//create feed button
function createFeedCoral (x, y, w, h, text) {
  let feedButton = createButton("", x, y, w, h);  //("", 220, 130, 100, 100)
  feedButton.name = text;
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
function createSeaCreature(x, y, w, i, name) {
  let seaCreatureButton = createButton("", x, y, w, w);
  seaCreatureButton.name = name;
  seaCreatureButton.life = 10;
  seaCreatureButton.index = i;
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
    if(seaCreatureButton.name == "Octopus"){
      fish.score+=10;
      seaCreatureButton.life -= 1;
    } else if(seaCreatureButton.name == "Sea Urchin"){
      let sprite = seaUrchins[seaCreatureButton.index];
      sprite.scale += 0.5;
      sprite.debug = true;
    }
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
      fish.position.x = enclosureButton.xInit;
      fish.position.y = enclosureButton.yInit;
      enclosureButton.xInit = 0;
      enclosureButton.yInit = 0;
      fish.hide = false;
    }  else{
      enclosureButton.xInit = fish.position.x;
      enclosureButton.yInit = fish.position.y;
      fish.position.x = enclosureButton.x + enclosureButton.w/2;
      fish.position.y = enclosureButton.y + enclosureButton.h/2;
      fish.hide = true;
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