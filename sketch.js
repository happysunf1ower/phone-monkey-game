var monkey, monkey_running;

var bananaImage, bananaGroup;

var obstacleImage, obstacleGroup;
var ground;
var score = 0;
var survivalTime = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameover, gameoverImage;

function preload()
{  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
gameoverImage = loadImage("gameover.png");
}



function setup() 
{
createCanvas(windowWidth, windowHeight);

monkey = createSprite(height-100, 350, 20, 20);
monkey.addAnimation("moving", monkey_running);
monkey.scale = 0.1;

ground = createSprite(height-400, 400, 800, 10);



obstaclesGroup = createGroup();
bananasGroup = createGroup();
}


function draw() 
{
  background("white");
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  //fill("white");
  text("Score: " + score, 600, 50);
  
  //stroke("black");
  //textSize(20);
  //fill("black");
  //survivalTime = Math.ceil(frameCount/frameRate()); 
  
  if (gameState === PLAY)
  {
      Obstacles();
      Bananas();
     
      
  
      if(touches.length > 0 || keyWentDown("space")) 
      {
        monkey.velocityY = -12;
        touches();
      }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
   if (bananasGroup.isTouching(monkey))
     {
       bananasGroup.destroyEach();
       score = score + 1;
     }
    
    if(obstaclesGroup.isTouching(monkey))
    {
    gameState = END;
    }
  
  
  } else if (gameState === END)
    {
      monkey.destroy();
      obstaclesGroup.destroyEach();
      bananasGroup.destroyEach();
      ground.destroy();
      
      gameover = createSprite(400, 200, 200, 200);
      gameover.addImage(gameoverImage);
      gameover.scale = 3;
    }
  
  
  createEdgeSprites();
  drawSprites();
 
  
  
}

function Obstacles()
{

   if (frameCount % 300 === 0)
  {
  var obstacle = createSprite(height-800, 370, 50, 50);
  
  obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
  obstacle.velocityX = -7;
  obstacle.lifetime = 400;
  obstaclesGroup.add(obstacle);
  }
  
  
}

function Bananas()
{
  if (frameCount % 80 === 0)
  {
  var banana = createSprite(height-800, 200, 20, 20);
  banana.y = Math.round(random(150, 250));
  banana.addImage(bananaImage);
    
  banana.velocityX = -banana.y/100*4;
  banana.lifetime = 400;
  banana.scale = 0.1;
  bananasGroup.add(banana);
  }
  
   
}


