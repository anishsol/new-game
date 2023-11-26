var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie;

var life = 5;
var bullets=13;




function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg=loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1Img=loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_1.png");
  heart3Img=loadImage("assets/heart_1.png");
  heart4Img=loadImage("assets/heart_1.png");
  heart5Img=loadImage("assets/heart_1.png");
  lostbgImg=loadImage("assets/download.jpg");
  bulletsImg = loadImage("assets/bullets.jpg");
  restartImg = loadImage("assets/restart.png")
  bulletfiring = loadImage("assets/bullet_firing.png");
  bulletscollectImg=loadImage("assets/bullets_collect.png");
  losesound=loadSound("assets/losing.wav");
  bulletsound=loadSound("assets/explosion.mp3");


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
 
  player.debug = true
   // player.debug = false
    // player.Debug =false
    // Player.debug = true

   //player.Collider("rectagle",0,0,300,300)
   //player.setcollider("rectangle",0,0)
   player.setCollider("rectangle",0,0,300,300)
  // player.Setcollider("rectangle",0,0,300,300)


  var heart1 = createSprite(1000,70,50,20);
  heart1.addImage(heart1Img);
  heart1.scale = 0.3;
  
  
  
  var heart2=createSprite(1080,70,50,20);
  heart2.addImage(heart2Img);
  heart2.scale=0.3;
  
  
  var heart3=createSprite(1150,70,50,20);
  heart3.addImage(heart2Img);
  heart3.scale=0.3;


  heart4=createSprite(1230,70,50,20);
  heart4.addImage(heart4Img);
  heart4.scale=0.3;

  heart5=createSprite(1300,70,50,20);
  heart5.addImage(heart5Img);
  heart5.scale=0.3;

  

zombieGroup=new Group();

bulletsGroup=new Group();

lifeGroup=new Group();
lifeGroup.add(heart1);

lifeGroup2=new Group();
lifeGroup2.add(heart2);

lifeGroup3=new Group();
lifeGroup3.add(heart3);

lifeGroup4=new Group();
lifeGroup4.add(heart4);

lifeGroup5=new Group();
lifeGroup5.add(heart5);

bulletscollectGroup=new Group();



}

function draw() {
  background(0); 


  
  text("LIFE :"+life,50,10)
  stroke("white");



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")&& bullets > 0){
player.addImage(shooter_shooting);
bulletsound.play();
bullet = createSprite(displayWidth-1150,player.y-30,20,10);
bullet.addImage(bulletfiring);
bullet.scale = 0.3;
bullet.velocityX=20;

bulletsGroup.add(bullet);
player.depth+=2
bullets-=1;



}




//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  //player.addImage( shooter_shooting )
 // player.addImage()
  player.addImage(shooterImg)
 //player.addImage(shooter_1.png)

}



//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletsGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletsGroup)){
        zombieGroup[i].destroy()
        bulletsGroup.destroyEach()
       
        } 

      }
    }


if(zombieGroup.isTouching(player)){
for(var i=0;i<zombieGroup.length;i++){

if(zombieGroup[i].isTouching(player)){
zombieGroup[i].destroy();
lifeGroup.destroyEach();
life-=1;

}
}
}



if(bulletscollectGroup.isTouching(player)){
  for(var i=0;i<bulletscollectGroup.length;i++){
  
  if(bulletscollectGroup[i].isTouching(player)){
  bulletscollectGroup[i].destroy();
 
  bullets+=4;
  
  }
  }
  }



if(bullets < 0){
 textSize(50)
fill("pink");
text("YOU RAN OUT OF BULLETS",400,300)
player.destroy();
zombieGroup.destroyEach();
 bulletGroup.destroyEach();
   
  
}

  



reducelife();
spawncollectbullets();
spawnZombies();

drawSprites();

textSize(30);
stroke("white")
text("BULLETS :"+bullets,100,50)

}




function spawnZombies(){

if(frameCount % 80 === 0){

zombie = createSprite(random(500,1100),random(100,500),40,40)
 zombie.addImage(zombieImg)
 zombie.scale=0.1;
 zombie.velocityX-=7;
 zombie.setCollider("rectangle",0,0,500,1000);
 zombie.debug=true;
 zombie.lifetime = 400;

 zombieGroup.add(zombie);


}


}



function reducelife(){

if(life < 2){
  lifeGroup4.destroyEach(); 
    
  }

if(life < 3){
lifeGroup3.destroyEach(); 

 }


if(life < 4){
lifeGroup2.destroyEach();

}

if(life < 1){
textSize(50);
text("YOU LOST",500,200);
losesound.play();
lifeGroup5.destroyEach();
player.destroy();
zombieGroup.destroy();

}

  }


function spawncollectbullets(){


  if(frameCount % 350 === 0){

 bulletscollect = createSprite(random(300,1100),random(100,600),40,40);
 bulletscollect.addImage(bulletscollectImg);
 bulletscollect.scale=0.3;
 bulletscollect.velocityX-=3
 bulletscollect.setCollider("rectangle",0,0,200,200);
 bulletscollect.debug=true;
 bulletscollect.lifetime = 500;

 bulletscollectGroup.add(bulletscollect);


}

}







