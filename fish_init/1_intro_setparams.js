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

let point = 0;

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
  gates = new Group();

  //each page is a new group
  for(let i=0; i<5; i++){
    pages.push(new Group());
  }

  for(i=0; i<5; i++){
    let gate = createSprite(width-20 + i*width, height/2, 20, height/4);
    gate.shapeColor = color(255,80);  //transparent white
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
    
  
  point = 0;
  gui = createGui();
  
  //create page


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


  // for(let i=0; i<foodArr.length; i++){
  //   if(feed.position.x>width || feed.position.x<0 || feed.position.y<0 || feed.position.y>height){
  //     feed.remove();
  // }

  // for(var i=0; i<foodArr.length; i++){
  //   let food = foodArr[i];
  //   food.spawn();
    
  //   //remove food when overlap with fish body
  //   //remove food when oob
  //   if(food.x > fish.x-fish.size/2 && food.x < fish.x+fish.size/2 && food.y > fish.y-fish.size/4 && food.y < fish.y+fish.size/4 ||
  //     food.x > width || food.y > height){
  //     foodArr.splice(i,1);
  //   }

  // }
  
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

  if(gateOpen){
    let curGate = gates[currentPage];
    curGate.shapeColor = color(100,200,200);
    fish.overlap(gates, nextPage);
  }


  noStroke();
  drawSprites();
  drawGui();

}

function nextPage(fish, gate){
  currentPage += 1;
  while(gate.position.x>0){
    gate.position.x -=.01;  //change to slow moving animation
  }
  
  gateOpen = false;
}
