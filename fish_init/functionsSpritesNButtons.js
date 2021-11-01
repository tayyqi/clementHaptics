let wVal = [50,200,125,150];    //list of width values of sea urchins
let seaUrchInnerRad = 180;

function createSeaUrchins(pageNum, posX, posY, count, startCount, startWidthIndex, row){
    posX +=pageNum*width
    for(let i=0; i<count; i++){
        let val = i + startWidthIndex
        let w = wVal[val%4];
        if(row == "BOTTOM"){
            posY = 800 - w; //hard coded
        }
        let urchinSprite = createSprite(posX+w/2, posY+w/2,w,w);
        urchinSprite.addAnimation("urchin", seaUrchin);
        urchinSprite.scale = w/seaUrchInnerRad;
        urchinSprite.index = startCount + i;   //used to identify sprite to button press
        pages[2].add(urchinSprite);
        seaUrchins.add(urchinSprite);
        let seaUrchinButton = createSeaCreature(posX, posY, w, i, "Sea Urchin");
        buttons[2].push(seaUrchinButton);
        posX = posX + w*1.4;
      }
}

function createSeaweed(pageNum, posX, posY, count){
    posX += pageNum*width;
    for(let i=0; i<count; i++){
        let seaweedSprite = createSprite(posX + 50, posY, 150,150);
        seaweedSprite.addAnimation("still", seaweed);
        seaweedSprite.scale = 0.8;
        pages[1].add(seaweedSprite);
        seaweeds.add(seaweedSprite);
        let feedButton = createFeedCoral(posX, posY, 150,150, "Seaweed");
        buttons[1].push(feedButton);

        posX += 300;
      }
}