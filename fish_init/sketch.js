fisharray =[];
colorarray = ['#b04119','yellow','blue'];
let fish;
let v;  //translation vector for fish to move wrt joystick

var buttonList = [];
let button_enclosure;
let button_joystick;
let button_feed

var foodArr = [];

// // prevent scrolling of page
// document.ontouchmove = function(event){
//   event.preventDefault();
// }

function touchMove(event){
  event.preventDefault();
}

function gestureChange(event){
  event.preventDefault();
}

function setup() {
  // setInterval(spawn,1000)
  createCanvas(1024, 6.5/8*768);
  // frameRate(10);
  
  fish = new Fish(width/2-20, height/2, colorarray[1], 0,90);
  fisharray.push(fish);
  
  button_enclosure = new Button("enclosure", "press", width/2-20, height/2, 200);
  button_joystick = new Button("joystick", "joystick", width-180, height-160, 100);
  button_feed = new Button("feed", "press", 120, 120, 100);
  
  buttonList.push(button_enclosure, button_joystick, button_feed);
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
    // this.vTranslate = createVector(0,0);
    
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
       this.y = height - this.size/4
     }
    
    if(this.escape){  //escape enclosure
      if(v){
        let vector = v.normalize();
        this.speedX = 5*vector.x;
        this.speedY = 5*vector.y;
      }else{
        this.speedX = 0;
        this.speedY = 0;
      }
      
    }else{  //within enclosure
      if(this.peek){
        this.speedX = -2;
        this.speedY = -2;
        if(this.x == this.x_init-50 && this.y == this.y_init-50){
          this.speedX = 0;
          this.speedY = 0;
        }
      }else{
        this.speedX = 2;
        this.speedY = 2;
        if(this.x == this.x_init && this.y == this.y_init){
          this.speedX = 0;
          this.speedY = 0;
          if(v != null && v.x<0 ){
            this.escape = true;
            print("escape")
          }
        }
      }
    }
    
    this.x += this.speedX;
    this.y += this.speedY;
  }
  
  drawFish(){
    // push();
    // translate(this.vTranslate);
  fill(this.filler);
    ellipse(this.x,this.y,this.size,this.size-((this.size)/2));
    triangle(this.x+30,this.y,this.x+80,this.y-30,this.x+80,this.y+30);
  fill(20);
    ellipse(this.x-20,this.y,10,10);
    // pop();
    // fill(100, 80)
    // rect(this.x-this.size/2, this.y-this.size/4, this.size, this.size/2);// body region
  }
  
}

// function spawn(){
//   var h = new Fish(random(500,700),random(1,400),random(colorarray),random(1,4),random(90,130))
//   fisharray.push(h)
// }

class Button {
  constructor(name, type, x, y, size){
    this.name = name;
    this.type = type;
    this.x = x;
    this.y = y;
    this.size = size;
    
    this.pressed = false;
  }
  
  display(){
    let baseColor = color(250,80);
    if(this.type == "press"){
      stroke(baseColor);
      strokeWeight(5);
      noFill();
      ellipse(this.x, this.y , this.size, this.size);
    } else if(this.type == "joystick"){
      stroke(baseColor);
      strokeWeight(5);
      noFill();
      let outerDiameter = this.size *1.5;
      //outer rim
      ellipse(this.x, this.y , outerDiameter, outerDiameter);
      
      noStroke();
      if(this.pressed){
        fill(250);
      }else{
        fill(baseColor);
      }
      //joystick moving part
      v = null;
      push();
      if(this.pressed){
        let d;
        d = dist(this.x, this.y, mouseX, mouseY);
        v = createVector(mouseX-this.x, mouseY-this.y);
        if(d>this.size){
          v = v.normalize() * this.size;
          
        // print(v);
        }    
        translate(v);
      }
      ellipse(this.x, this.y , this.size, this.size);
      pop();
    }
  }
  
  checkPressed(touch){
    if(touch.x>this.x-this.size/2 && touch.x<this.x+this.size/2 && touch.y>this.y-this.size/2 && touch.y<this.y+this.size/2){
      this.pressed = true;
      
      if(this.name == "enclosure"){
        fish.peek = true;
        print("peek");
      } else if(this.name == "feed"){
        for(let i=0; i<random(20,40); i++){
          let food = new Food(random(10,20), colorarray[2]);
          foodArr.push(food);
        }
        print("feed");
      }

    }
    
    if(this.type == "joystick"){
      if(touch.x>this.x-this.size && touch.x<this.x+this.size && touch.y>this.y-this.size && touch.y<this.y+this.size){
        this.pressed = true;

      }
    }
  }
  
  checkReleased(){
    if(this.pressed){
    this.pressed = false;
      if(this.name == "enclosure"){
        fish.peek = false;
        print("return");
      }
    }
    // if(mouseX>=this.x-this.size/2 && mouseX<=this.x+this.size/2 && mouseY>=this.y-this.size/2 && mouseY<=this.y+this.size/2){
    //   this.pressed = false;
    //   if(this.name == "enclosure"){
    //     fish.peek = false;
    //     print("return");
    //   }
    // }
    
//     if(this.type == "joystick"){
//       if(mouseX>this.x-this.size && mouseX<this.x+this.size && mouseY>this.y-this.size && mouseY<this.y+this.size){
//         this.pressed = false;

//       }
//     }
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

// function touchStarted(){
//   for(var button of buttonList){
//       button.checkPressed();
//     }
//   // for(var i=0; i < touches.length; i++){
//   //   print("checking")
//   //   let touch = touches[i];
//   //     for(var button of buttonList){
//   //     button.checkPressed();
//   //       print("checking")
//   //   }
//   // }
  
  
//   return false;
// }



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
}

function touchEnded(){
  for(var button of buttonList){
      button.checkReleased();
    }
  for(var i=0; i < touches.length; i++){
    let touch = touches[i];
    
  }
  
  return false;
}



function draw() {
  background(0);
  
  for(var i=0; i < touches.length; i++){
    let touch = touches[i];
      for(var button of buttonList){
      button.checkPressed(touch);
        print("checking")
    }
  }
  
  for(var button of buttonList){
    button.display();
  }
  
  for(var i=0; i<foodArr.length; i++){
    let food = foodArr[i];
    food.spawn();
    
    //remove food when overlap with fish body
    //remove food when out of bounds
    if(food.x > fish.x-fish.size/2 && food.x < fish.x+fish.size/2 && food.y > fish.y-fish.size/4 && food.y < fish.y+fish.size/4 ||
      food.x>width || food.y > height){
      foodArr.splice(i,1);
    }

  }
  
  noStroke()
  fish.drawFish();
  fish.swim();
  // for(var h of fisharray){
  //   h.drawFish()
  //   h.swim()
  // }

}
