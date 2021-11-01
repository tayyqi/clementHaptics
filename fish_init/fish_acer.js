fisharray =[];
colorarray = ['#b04119','yellow','blue'];
let fish;
let fish_swim;
let seaweed;  //animation
let seaUrchin;  //animation
let octopus;
let octopus_ani;  //animation
let enclosure; //animation
let escaped = false;
let currentPage = 0;
let callNextPage = false;

let luckyUrchin;
let theta = 0;

let seaweeds; //group
let seaUrchins;//group
let enclosures; //group
let gates;  //group
let gateOpen = true;
let pages = []; //collection of sprites in each page, including gates, seaweed, sea urchins and octopus
let buttons = [];

let gui;
let joystick;
let col = 255;  //base col button white

var foodArr;

function preload() {
    let swimSpritesheet = loadSpriteSheet("assets/fish_Spritesheet.png", 7152/12, 4210/5, 53);  //white fish
    // let swimSpritesheet = loadSpriteSheet("assets/fish_Spritesheet2.png", 449, 1000, 4); //blue fish
    fish_swim = loadAnimation(swimSpritesheet);

    let seaweedSS = loadSpriteSheet("assets/seaweed.png", 199, 286, 1);
    seaweed = loadAnimation(seaweedSS);

    // let octopusSS = loadSpriteSheet("assets/octopus.png", 199, 286, 1);
    // octopus_ani = loadAnimation(octopusSS);
    octopus_ani = loadAnimation(seaweedSS);

    let seaUrchSS = loadSpriteSheet("assets/seaUrchin.png", 274, 288, 1);
    seaUrchin = loadAnimation(seaUrchSS);

    let enclosureSS = loadSpriteSheet("assets/enclosure.png", 207, 216, 1);
    enclosure = loadAnimation(enclosureSS);
}

// an array to add multiple particles
let particles = [];

function setup() {
  frameRate(80);
  // createCanvas(1024, 6/8*768);
  createCanvas(1536,864); //acer aspire14 aspect ratio
  foodArr = new Group();
  gates = new Group();
  seaweeds = new Group();
  seaUrchins = new Group();
  enclosures = new Group();

  //each page is a new group for sprites
  for(let i=0; i<5; i++){
    pages.push(new Group());
  }

  for(i=0; i<5; i++){
    buttons.push([]);
    let posX = width - 20 + i*width;
    let gate = createSprite(posX, height/2, 20, height/4);
    gate.shapeColor = color(255,20);  //transparent white
    gate.page = i;
    // gate.debug=true;
    // gate.setCollider = true;
    gates.add(gate);
    pages[i].add(gate);
  }

  // fish_swim.frameDelay = 10; //for bluefish
  fish_swim.frameDelay = 2;
  fish = createSprite(width/2, height/2, 1000/2, 449);
  fish.addAnimation("swim", fish_swim);
  fish.setCollider('rectangle', -5,-15, 350,180);
  fish.debug = true;
  fish.scale = 0.5;
  fish.score = 0;
  fish.hide = false;
    
  
  gui = createGui();
  
  //create page1 feeding ground
  createSeaweed(1, 400, 80, 3); //top row
  createSeaweed(1, 200, 650, 3); //bottom row

  //create page2 sea urchins
  let posX = 200;
  let posY = 100;
  //top row
  createSeaUrchins(2, posX, posY, 7, 0, 0, "TOP");
  // bottom row
  posX = 100;
  createSeaUrchins(2, posX, 800, 6, 7, 2, "BOTTOM");
  luckyUrchin = int(random(0, seaUrchins.length));
  print("luckyUrchin: " +luckyUrchin);


  //create page3 octopus, hiding
  let pageNum = 3;
  posX = width-600 + pageNum*width;
  posY = height/2-200;
  octopus = createSprite(posX+400/2, posY+400/2,400,400);
  octopus.start = false;
  octopus.addAnimation("octopus", octopus_ani);
  octopus.scale = 1;
  octopus.setCollider("circle", 0,0, 200);
  octopus.debug = true;
  pages[pageNum].add(octopus);
  let octopusButton = createSeaCreature(posX, posY, 400, 0, "Octopus");
  buttons[3].push(octopusButton);
  createHideEnclosure(3, 200, 70, 1, 2);  //top row
  createHideEnclosure(3, 200, height-200, -1, 2);  //bottom row



  // Create Joystick.
  // The last four optional arguments define minimum and maximum values 
  // for the x and y axes; minX, maxX, minY, maxY
  // The default min and max values for all four are -1 and 1.
  let maxDisp = 10;
  joystick = createJoystick("Joystick", width*6.5/8, height*2.8/4, 175, 175, -maxDisp, maxDisp, maxDisp, -maxDisp);
  joystick.setStyle({
    fillBg: color(col,30),
    fillBgHover: color(col,30),
    fillBgActive: color(col,60),
    strokeBg: color(col,50),  //nostroke
    strokeBgHover: color(col,50),  //nostroke
    // strokeWeight: 10,
    rounding: 87.5,  //change for circle
    fillHandle: color(col,50)
  });
  
  //create bg particles
  for(let i = 0;i<width/50;i++){
    particles.push(new Particle(random(0,width)));
  }
}


//fullscreen - doesnt work on ios...
function touchStarted () {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // print(windowWidth, windowHeight)
}

function draw() {
  background(0,0,50);

  //show particles as bg
  for(let i = 0;i<particles.length;i++) {
    let particle = particles[i];
    particle.createParticle();
    particle.moveParticle();
    if(particle.x < 0 || particle.x > width || particle.y < 0 || particle.y > height){
      particles.push(new Particle(width));
      particles.splice(i,1);
    }
        //   this.xSpeed*=-1;
        // if(this.y < 0 || this.y > height)
        //   this.ySpeed*=-1;
  }
  

  
  if(joystick.valX<0){
    fish.changeAnimation('swim');
    fish.mirrorX(1);
  } else if(joystick.valX>0) {
    fish.changeAnimation('swim');
    fish.mirrorX(-1);
  }else{
    fish.changeAnimation('swim');
  }

  if(fish.hide == false){   //fish cannot move if within enclosure
    fish.position.x += joystick.valX;
    fish.position.y += joystick.valY;
  }

  
  //set boundaries
  if(fish.position.x < 100){
    fish.position.x = 100;
  }else if(fish.position.x > width - 100) {
    fish.position.x = width - 100;
  }

  if(fish.position.y < 50){
    fish.position.y = 50;
  }else if(fish.position.y > height - 50) {
    fish.position.y = height - 50;
  }

  let curGate = gates[currentPage];
  if(gateOpen){
    curGate.shapeColor = color(100,200,200);
    fish.overlap(gates, nextPage);
  }else{
    curGate.shapeColor = color(100,50);
  }

  if(callNextPage){
    for(page of pages){
      for(sprite of page){
        let newPosX = sprite.position.x - width;
        while(sprite.position.x > newPosX){
          sprite.position.x-- ;
        }
        // print("gate" + gate.page + ": " + gate.position)
      }
    }
    // for(gate of gates){

    //   let newPosX = gate.position.x - width;
    //   while(gate.position.x > newPosX){
    //     gate.position.x-- ;
    //   }
    //   print("gate" + gate.page + ": " + gate.position)
      
    // }
    print("callnextpage")
    for(let i=0; i<buttons.length; i++){
      let curPageButtons = buttons[i];
      for(let j=0; j<curPageButtons.length; j++){
        let button = curPageButtons[j];
        let newPosX = button.x - width;
        // button.x -= 1;
        while(button.x > newPosX){
          button.x -= 1;
        }
      }
    }

    //reset fish to left most
    fish.position.x = 30;
    fish.position.y = height/2;

    callNextPage = false;
    gateOpen = false;
  }

  //food.overlap(fish) bcos fish is created before food
  // foodArr.overlap(fish.eat)  //some prob wif using this syntax
  for(food of foodArr){
    food.overlap(fish, eat);
  }

  //lose points when touch sea urchin or octopus
  fish.collide(seaUrchins, spritesCollide);
  

  if(fish.hide == false){
    fish.collide(enclosures, spritesCollide)
    fish.collide(octopus, spritesCollide);
  }
  if(currentPage == 3){
    if(octopus.start){
      if(octopus.position.x < octopus.scale*200 || octopus.position.x > width-octopus.scale*200){
        octopus.velocity.x *= -1;
      } else if(octopus.position.y < octopus.scale*200 || octopus.position.y > height-octopus.scale*200){
        octopus.velocity.y *= -1;
      }
    }else{
      octopus.velocity.x = -10;
      octopus.velocity.y = 5;
      octopus.start = true;
    }
 
    // if(octopus.position.x < 400){
    //   octopus.position.x = 400;
    // } else if(octopus.position.x > width-400){
    //   octopus.position.x = width-40;
    // } else if(octopus.position.y < 400){
    //   octopus.position.y = 200;
    // } else if(octopus.position.y > height-400){
    //   octopus.position.y = height-400;
    // }
    // octopus.scale += sin(theta)*0.01;
    // theta +=0.03;
  }else{
    theta = 0;
  }


  noStroke();
  drawSprites();
  drawGui();

  push();
  fill(255);
  textAlign(RIGHT);
  text("curPage: " + currentPage, width - 100, 100);
  text("Score: " + fish.score, width - 100, 150)
  pop();

}

function nextPage(fish, gate){
  currentPage += 1;
  gateOpen = false;
  callNextPage = true;
  console.log("nextpage " + currentPage);
}

function eat(feed, fish) {
  feed.remove();
  fish.score++;
  print("point: " + fish.score);
  if (fish.score > 20 && currentPage == 1){
    gateOpen = true;
  }
}

function spritesCollide(fish, creature){
  if(creature.getAnimationLabel() == "urchin"){
    fish.score -= 2;
  } else if(creature.getAnimationLabel() == "octopus"){
    fish.score -= 5;
  }

}

function loseUrchin(fish, creature){
  if(creature.getAnimationLabel() == "urchin"){
    fish.score -= 2;
  } else if(creature.getAnimationLabel() == "octopus"){
    fish.score -= 5;
  }

}


function keyTyped() {
  if(key == '1'){
    gateOpen = true;
  }
}