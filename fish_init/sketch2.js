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
    let swimSpritesheet = loadSpriteSheet("assets/fish_Spritesheet.png", 1000/4, 449, 4);
    fish_swim = loadAnimation(swimSpritesheet);
}

function setup() {
  // setInterval(spawn,1000)
  // createCanvas(1024, 6/8*768);
  createCanvas(1536,864);//acer aspire14 aspect ratio
  // frameRate(10);
  
//   fish = new Fish(width/2-20, height/2, colorarray[1], 0,90);
//   fisharray.push(fish);
    fish = createSprite(width/2, height/2, 1000/2, 449);
    fish.addAnimation("swim", fish_swim);
    fish.scale = 0.5;
    fish.frameDelay = 100;
  
  gui = createGui();
  
  // Create Joystick.
  // The last four optional arguments define minimum and maximum values 
  // for the x and y axes; minX, maxX, minY, maxY
  // The default min and max values for all four are -1 and 1.
  joystick = createJoystick("Joystick", width*6.5/8, height*2.8/4, 175, 175, -1, 1, 1, -1);
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

class Fish {
  constructor(x,y,filler,speed,size){
    this.x_init = x;
    this.y_init = y;
    this.x = x;
    this.y = y;
    this.filler = filler;
    this.speedX = speed;
    this.speedY = speed;
    this.size = size;
    this.drxn = "left";  //direction faced
    
    this.peek = false;
    this.escape = false;
  }
  

  //movement
  swim(){
    //set x bound
    if(this.x-this.size/2<0){
      this.x = this.size/2;
    }else if(this.x+80>width){
      this.x = width-80;
    }
    //set y bound
    if(this.y-this.size/4<0) {
       this.y = this.size/4;
     }else if(this.y + this.size/4 > height){
       this.y = height - this.size/4;
     }
    
    if(this.escape){  //escape enclosure
      this.speedX = 5*joystick.valX;
      this.speedY = 5*joystick.valY;
      
    }else{  //within enclosure
      if(this.peek){
        this.speedX = -2;
        this.speedY = -2;
        if(this.x == this.x_init-50 && this.y == this.y_init-50){
          this.speedX = 0;
          this.speedY = 0;
          // this.speedX = 5*joystick.valX;
          // this.speedY = 5*joystick.valY;
          if(joystick.isPressed){
            this.escape = true;
          }
        }
      }else{
        this.speedX = 2;
        this.speedY = 2;
        if(this.x == this.x_init || this.y == this.y_init){
          this.x = this.x_init;
          this.y = this.y_init;
          this.speedX = 0;
          this.speedY = 0;
        }
      }
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
  
  drawFish(){
    // push();
  fill(this.filler);
    //body
    ellipse(this.x,this.y,this.size,this.size-((this.size)/2));
    //tail
    if(this.drxn == "left"){
      triangle(this.x+30,this.y,this.x+80,this.y-30,this.x+80,this.y+30);
    fill(20);
      //eyes
      ellipse(this.x-20,this.y,10,10);
    }else{
      //tail
      triangle(this.x-30,this.y,this.x-80,this.y-30,this.x-80,this.y+30);
    fill(20);
      //eyes
      ellipse(this.x+20,this.y,10,10);
    }
    
    
    // pop();
    // fill(100, 80)
    // rect(this.x-this.size/2, this.y-this.size/4, this.size, this.size/2);// body region
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
    fish.drxn = "left";
  } else if(joystick.valX>0) {
    fish.drxn = "right";
  }
  
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
  
  noStroke();
  drawSprites();
//   fish.drawFish();
//   fish.swim();
  // for(var h of fisharray){
  //   h.drawFish()
  //   h.swim()
  // }
  drawGui();

}
