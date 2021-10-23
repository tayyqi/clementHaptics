//Creative Coding Assignment 12: Sprite Animation

/*Assignment Instructions
Create an image sprite animation using p5.play. The animation must respond to keyboard and mouse interaction.
*/

//character assets from : https://bayat.itch.io/platform-game-assets/devlog/6987/character-animation-update

var blobSprite;
var blob_run;
var blob_jumpUp;
var blob_jumpDown;
var blob_blink;
var bg;
var platforms;
var coins;
var coin_animation;
var coin_slant;

var grassImg = [];

var gravity = 0.5;

function preload(){
  //load bg image
  bg = loadImage('assets/Background.png');

  grassImg.push(loadImage('assets/grass/GrassLeft.png'));
  grassImg.push(loadImage('assets/grass/GrassMid.png'));
  grassImg.push(loadImage('assets/grass/GrassRight.png'));
  
  //run animation
  let blobRunSpriteSheet = loadSpriteSheet('assets/run_spritesheet.png', 1668/6, 708/3, 18);
  blob_run = loadAnimation(blobRunSpriteSheet);
  
  // An animation with a single frame for jumping up
  blob_jumpUp = loadAnimation(new SpriteSheet('assets/jump_spritesheet.png',
    [{'name':'blob_jumpUp', 'frame':{'x':0, 'y': 0, 'width': 557/2, 'height': 238}}]));
  
  // An animation with a single frame for jumping down
  blob_jumpDown = loadAnimation(new SpriteSheet('assets/jump_spritesheet.png',
    [{'name':'blob_jumpDown', 'frame':{'x':557/2, 'y': 0, 'width': 557/2, 'height': 238}}]));
  
  //blink animation
  let blobIdleBlinkSpriteSheet = loadSpriteSheet('assets/idleblink_spritesheet.png', 1668/6, 472/2, 9);
  blob_blink = loadAnimation(blobIdleBlinkSpriteSheet);
  blob_blink.frameDelay = 3;
  
  //coin animation
  let coinSpriteSheet = loadSpriteSheet('assets/Coin_spritesheet.png', 2433/16, 144, 16);
  coin_animation = loadAnimation(coinSpriteSheet);
  coin_slant = loadImage('assets/Coin_slant.png');
}

function setup() {
  createCanvas(1920, 1024);
  
  //create platforms and 1 coin on each platform
  
  platforms = new Group();
  coins = new Group();
  
  //platform for floor
  createPlatforms(width/128, 128/2, height-128/2);
  //floating platforms
  createPlatforms(3, 128*4.5, height/2-128/2);
  createPlatforms(2, 128/2, height/4);
  createPlatforms(2, 128*9.5, height*3/4-128/2);
  createPlatforms(3, 128*12.5, height/3-128/2);
  
  //create blobSprite
  blobSprite = createSprite(100, height/2);
  blobSprite.addAnimation('blink', blob_blink);
  blobSprite.addAnimation('run', blob_run);
  blobSprite.addAnimation('jumpUp', blob_jumpUp);
  blobSprite.addAnimation('jumpDown', blob_jumpDown);
  blobSprite.setCollider('circle', 0,12, 100);
  blobSprite.scale = 1;
}


function draw() {
  clear();
  background(bg);
  
  //set animations and keyboard controls for movement
  if(keyDown(RIGHT_ARROW)){ //move to the right
    blobSprite.changeAnimation('run'); 
    blobSprite.mirrorX(1);
    blobSprite.velocity.x = 5;
  } else if(keyDown(LEFT_ARROW)){  //move to the left
    blobSprite.changeAnimation('run');
    blobSprite.mirrorX(-1);
    blobSprite.velocity.x = -5;
  } else{  //not moving
    blobSprite.changeAnimation('blink');
    
    //keyboard controls for scale
    if(keyDown(UP_ARROW) && blobSprite.scale <= 2){
      blobSprite.scale += 0.1;
    }else if(keyDown(DOWN_ARROW) && blobSprite.scale > 0.3){
      blobSprite.scale -= 0.1;
    }
    
    //pause at 1st frame after blink
    if(blobSprite.animation.getFrame() == blob_blink.getLastFrame()){
      blobSprite.animation.nextFrame();
    }
    
    //blink every 150 frames
    if(frameCount%150 == 0 && blobSprite.animation.getFrame()==0){
      blobSprite.animation.play();
    }

    blobSprite.velocity.x = 0;
  }
  
  //set x and y boundaries
  if(blobSprite.position.x <= blobSprite.scale*100){  //left boundary
    blobSprite.position.x = blobSprite.scale*100;
  } else if(blobSprite.position.x >= width - blobSprite.scale*100){  //right boundary
    blobSprite.position.x = width - blobSprite.scale*100;
  }
  if(blobSprite.position.y <= blobSprite.scale*100){  //top boundary
    blobSprite.position.y = blobSprite.scale*100;
    blobSprite.velocity.y = 0;
  }
  //bottom boundary is not set as bottom is currently lined with platforms
  
  //check position of blobSprite with respect to each platform
  platforms.forEach(function(platform){
    let platformTop = platform.position.y - 128/2;
    let platformBottom = platform.position.y + 128/2;
    let platformLeft = platform.position.x - 128/2;
    let platformRight = platform.position.x + 128/2;
    
    //when blobSprite is directly above or below platform
    if (blobSprite.position.x >= platformLeft && blobSprite.position.x <= platformRight){
      if(blobSprite.position.y >= platformTop - blobSprite.scale*115 && blobSprite.position.y <= platformTop){ //boundary is set so that blobSprite does not jump to higher platform when there are multiple platforms at the same x position
        blobSprite.position.y = platformTop - blobSprite.scale*115;  //when directly above platform, blobSprite can stand on platform
        blobSprite.velocity.y = 0;
      }else if (blobSprite.position.y >= platformBottom && blobSprite.position.y - blobSprite.scale*100 <= platformBottom){  //when blobSprite is below platform and hits bottom of platform
        blobSprite.velocity.y *= -1;  //bounce blobSprite away from platform
      }
    }else{ //when x pos of blobSprite is not within x pos of platforms
      if (platform.overlap(blobSprite)){  //overlap is used to mimic collision when blobSprite bumps into the left and right sides of platforms (complications were seen when bounce and collide were used)
        if(blobSprite.velocity.x < 0  &&  blobSprite.position.x > platform.position.x  ||  //if moving left and on the right of platform
          blobSprite.velocity.x > 0  &&  blobSprite.position.x < platform.position.x){  //if moving right and on the left of platform
          blobSprite.velocity.x *= -1;  //blob moves backward from current direction
        }
      }
    }
  });
  
  //set frames when jumping or falling
  if(blobSprite.velocity.y < 0){
    blobSprite.changeAnimation('jumpUp');
  }else if((blobSprite.velocity.y > 0)){
    blobSprite.changeAnimation('jumpDown');
  }

  blobSprite.velocity.y += gravity; //set constant gravity 
  
  //collect coins
  blobSprite.overlap(coins, collectCoins);
  
  // blobSprite.debug = true  //to show collision ellipse of blobSprite
  
  drawSprites();
}

//jump when mouse clicked, multiple clicks are allowed
function mouseClicked(){
  blobSprite.velocity.y = -15;
}

function createPlatforms(noOfUnits, startX, y){
  for(let i=0; i < noOfUnits; i++){
    var platform = createSprite(startX + i*128, y);
    if(i == 0){
      platform.addImage('grassLeft',grassImg[0]);  //when 1st block of full platform
    }else if(i == noOfUnits-1){
      platform.addImage('grassRight',grassImg[2]);  //when last block of full platform
    }else{
      platform.addImage('grassMid',grassImg[1]);   //blocks between 1st and last block
    }  
    platform.immovable = true;
    // platform.debug = true  //to show collision box of each platform
    platforms.add(platform);
    
    //create coin on each platform
    var coin = createSprite(startX + i*128, y-128);
    coin.addAnimation('spin', coin_animation);
    coin.scale = 0.3;
    coins.add(coin);
  }
}

function collectCoins(blobSprite, coin){
  coin.remove();
}

