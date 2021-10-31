fisharray =[];
colorarray = ['#b04119','yellow','blue'];
let fish;
let fish_swim;
let escaped = false;
let currentPage = 0;
let callNextPage = false;

let gates;
let gateOpen = true;
let pages = [];
let buttons = [];

let gui;
let joystick;
let col = 255;  //base col button white

var foodArr;

function preload() {
    let swimSpritesheet = loadSpriteSheet("assets/fish_Spritesheet2.png", 449, 1000/4, 4);
    fish_swim = loadAnimation(swimSpritesheet);
}

function setup() {
  // createCanvas(1024, 6/8*768);
  createCanvas(1536,864);//acer aspire14 aspect ratio
  // frameRate(10);
  foodArr = new Group();
  gates = new Group();

  //each page is a new group for sprites
  for(let i=0; i<5; i++){
    pages.push(new Group());
  }

  for(i=0; i<5; i++){
    buttons.push([]);
    let posX = width - 20 + i*width;
    let gate = createSprite(posX, height/2, 20, height/4);
    gate.shapeColor = color(255,50);  //transparent white
    gate.page = i;
    gate.debug=true;
    // gate.setCollider = true;
    gates.add(gate);
    pages[i].add(gate);
  }

  fish_swim.frameDelay = 10;
  fish = createSprite(width/2, height/2, 1000/2, 449);
  fish.addAnimation("swim", fish_swim);
  fish.setCollider('rectangle', 0,0, 400,100);
  fish.debug = true;
  fish.scale = 0.5;
  fish.score = 0;
    
  
  point = 0;
  gui = createGui();
  
  //create page1 feeding ground
  for(let i=0; i<3; i++){
    let posX = 400 + i*300;
    let feedButton = createFeedCoral(posX+width, 80, 150,150, "coral");
    buttons[1].push(feedButton);
  }
  for(let i=0; i<3; i++){
    let posX = 200 + i*300;
    let feedButton = createFeedCoral(posX+width, 650, 150,150, "coral");
    buttons[1].push(feedButton);
  }

  //create page2 sea urchins
  let wVal = [50,200,125,150];
  let posX = 200 + 2*width;
  let posY = 100;
  for(let i=0; i<7; i++){
    let w = wVal[i%4];
    let seaUrchinTop = createSeaUrchin(posX, posY, w,w);
    buttons[2].push(seaUrchinTop);
    posX = posX + w*1.4;
  }

  posX = 100 + 2*width;
  posY = 500;
  for(let i=0; i<6; i++){
    let val = i+2;
    let w = wVal[val%4];
    posY = 800 - w;
    let seaUrchin = createSeaUrchin(posX, posY, w,w);
    buttons[2].push(seaUrchin);
    posX = posX + w*1.4;
    // newposX = newposX + w*1.4;
  }



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
  
}


//fullscreen - doesnt work on ios...
function touchStarted () {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

// /* full screening will change the size of the canvas */
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   // print(windowWidth, windowHeight)
// }

function draw() {
  background(0,0,50);

  push();
  fill(255);
  text("curPage: " + currentPage, width/2, 100);
  pop();

  if(joystick.valX<0){
    fish.changeAnimation('swim');
    fish.mirrorX(-1);
  } else if(joystick.valX>0) {
    fish.changeAnimation('swim');
    fish.mirrorX(1);
  }else{
    fish.changeAnimation('swim');
  }

  fish.position.x += joystick.valX;
  fish.position.y += joystick.valY;

  
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

  let page1Buttons = buttons[1]
  for(let i=0; i<page1Buttons.length; i++){
    let button = page1Buttons[i];
    // button.x -= 10;
  }

  if(callNextPage){
    for(gate of gates){

      let newPosX = gate.position.x - width;
      while(gate.position.x > newPosX){
        gate.position.x-- ;
      }
      print("gate" + gate.page + ": " + gate.position)
      
    }
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
    callNextPage = false;
    gateOpen = false;
  }

  fish.overlap(foodArr, eat);


  noStroke();
  drawSprites();
  drawGui();

}

function nextPage(fish, gate){
  currentPage += 1;
  // for(let i=0; i<width; i++) {
  //   gate.position.x -=i;  //change to slow moving animation
  // }
  gateOpen = false;
  callNextPage = true;
  print("nextpage")
}

function eat(fish, feed) {
  feed.remove();
  fish.score++;
  print("point: " + fish.score);
}


function keyTyped() {
  if(key == '1'){
    gateOpen = true;
  }
}