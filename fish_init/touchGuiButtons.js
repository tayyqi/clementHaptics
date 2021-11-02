
//create feed button
function createFeedCoral (x, y, w, h, text) {
  let feedButton = createButton("", x, y, w, h);  //("", 220, 130, 100, 100)
  feedButton.name = text;
  feedButton.setStyle({
      fillBg: color(0,0,colB,30),
      fillBgHover: color(0,0,colB,30),
      fillBgActive: color(0,0,colB,80),
      strokeBg: color(0,0,colB,50),  //nostroke
      strokeBgHover: color(0,0,colB,50),  //nostroke
      strokeBgActive: color(0,0,colB,80),  //nostroke
      // strokeWeight: 10,
      rounding: w/2,  //change for circle
  });
  
  feedButton.onPress = function(){
    for(let i=0; i<random(5,10); i++){
      let feed = createSprite(feedButton.x+w/2, feedButton.y+w/2,20,20);
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
let col = 255;
function createSeaCreature(x, y, w, i, name) {
  let seaCreatureButton = createButton("", x, y, w, w);
  seaCreatureButton.name = name;
  seaCreatureButton.life = 10;
  seaCreatureButton.index = i;
  seaCreatureButton.setStyle({
    fillBg: color(col,50),
    fillBgHover: color(col,50),
    fillBgActive: color(col,80),
    strokeBg: color(col,50),  //nostroke
    strokeBgHover: color(col,60),  //nostroke
    strokeBgActive: color(col,80),  //nostroke
    // strokeWeight: 10,
    rounding: w/2,  //change for circle 
  });
  seaCreatureButton.onPress = function(){
    if(seaCreatureButton.name == "Octopus"){
      if(seaCreatureButton.life > 0 && fish.hide == false){
        fish.score += 10;
        seaCreatureButton.life -= 1;
        octopus.scale *=0.8;
        //when octopus 0 lives
        if(seaCreatureButton.life === 0){
          //remove sprite
          octopus.remove();
          seaCreatureButton.setStyle({  //invisible button
            fillBg: color(col,0),
            fillBgHover: color(col,0),
            fillBgActive: color(col,0),
            strokeBg: color(col,0),  //nostroke
            strokeBgHover: color(col,0),  //nostroke
            strokeBgActive: color(col,0),  //nostroke
          });
          gateOpen = true;
        }
      }
    } else if(seaCreatureButton.name == "Sea Urchin"){
      if (seaCreatureButton.index == luckyUrchin){
        gateOpen = true;
      }
      let sprite = seaUrchins[seaCreatureButton.index];
      if(sprite.scale > 3){
        sprite.scale -= 2;
      } else if(sprite.scale<0.5){
        sprite.scale += 0.5;
      } else{
        sprite.scale += random(-0.5, 0.5);
      }
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
      fish.hide = false;
    }  else{
      fish.position.x = enclosureButton.x + enclosureButton.w/2;
      fish.position.y = enclosureButton.y + enclosureButton.h/2 + 20; //translate downwards as spritesheet is not centered
      fish.hide = true;
    }
  }

  enclosureButton.onRelease = function(){
    fish.peek = false;
  }

  return enclosureButton;
}