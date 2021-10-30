fisharray =[];
colorarray = ['#b04119','yellow','blue'];
let fish;
let fish_swim;

let gui;
let joystick;
let feedButton;
let enclosureButton;
let col = 255;  //base col button white

var foodArr = [];

function preload() {
    let swimSpritesheet = loadSpriteSheet("assets/fish_Spritesheet2.png", 449, 1000/4, 4);
    fish_swim = loadAnimation(swimSpritesheet);
}

function setup() {
  // setInterval(spawn,1000)
  // createCanvas(1024, 6/8*768);
  createCanvas(1536,864);//acer aspire14 aspect ratio
  // frameRate(10);
  
//   fish = new Fish(width/2-20, height/2, colorarray[1], 0,90);
//   fisharray.push(fish);
    fish_swim.frameDelay = 7;
    fish = createSprite(width/2, height/2, 1000/2, 449);
    fish.addAnimation("swim", fish_swim);
    fish.setCollider('rectangle', 0,0, 400,100);
    fish.debug = true;
    fish.scale = 0.5;
    
    // fish.rotateToDirection = true;
  
  gui = createGui();
  
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

  
  //create feed button
  feedButton = createButton("", 220, 130, 100, 100);
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
     for(let i=0; i<random(20,40); i++){
          let food = new Food(random(10,20), colorarray[2]);
          foodArr.push(food);
        }
        print("feed");
  }
  
    //create enclosure button
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
}

class Food{
  constructor(size, color){
    this.x = 100;
    this.y = 100;
    this.velX = random(1,4);
    this.velY = random(1,4);
    this.size = size;
    
    this.color = color
  }
  
  spawn(){
    this.x += this.velX;
    this.y += this.velY;
    
    push();
    fill(this.color);
    circle(this.x, this.y, this.size);
    pop();
  }
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
  background(0,0,100);

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
  
  for(var i=0; i<foodArr.length; i++){
    let food = foodArr[i];
    food.spawn();
    
    //remove food when overlap with fish body
    //remove food when oob
    if(food.x > fish.x-fish.size/2 && food.x < fish.x+fish.size/2 && food.y > fish.y-fish.size/4 && food.y < fish.y+fish.size/4 ||
      food.x > width || food.y > height){
      foodArr.splice(i,1);
    }

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

  noStroke();
  drawSprites();
  drawGui();

}
