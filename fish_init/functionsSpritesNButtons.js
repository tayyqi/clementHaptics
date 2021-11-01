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
        urchinSprite.setCollider("circle", 0,0, seaUrchInnerRad*0.8);
        urchinSprite.immovable = true;
        urchinSprite.debug = true;
        pages[pageNum].add(urchinSprite);
        seaUrchins.add(urchinSprite);
        let seaUrchinButton = createSeaCreature(posX, posY, w, startCount+i, "Sea Urchin");
        buttons[pageNum].push(seaUrchinButton);
        posX = posX + w*1.4;
      }
}


//seaweeds
function createSeaweed(pageNum, posX, posY, count){
    posX += pageNum*width;
    for(let i=0; i<count; i++){
        let seaweedSprite = createSprite(posX + 50, posY, 150,150);
        seaweedSprite.addAnimation("still", seaweed);
        seaweedSprite.scale = 0.8;
        pages[pageNum].add(seaweedSprite);
        seaweeds.add(seaweedSprite);
        let feedButton = createFeedCoral(posX, posY, 150,150, "Seaweed");
        buttons[pageNum].push(feedButton);

        posX += 300;
      }
}


//hiding enclosure
function createHideEnclosure(pageNum, posX, posY, yDrxn, count){
    posX += pageNum*width;
    for(let i=0; i<2; i++){1//top row
        let hideSprite = createSprite(posX + i*400 + 75, posY + yDrxn*i*60 + 75, 207,216);
        hideSprite.addAnimation("still", enclosure);
        hideSprite.scale = 1;
        pages[pageNum].add(hideSprite);
        enclosures.add(hideSprite);
        let enclosureButton = createEnclosure(posX + i*400, posY + yDrxn*i*60, 150);
        buttons[pageNum].push(enclosureButton);
      }
}