var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var restart_img, GameOver_img, restart, gameover;
var score, depth, speed = 6   ,hiscore=0;
var play = 1,
  end = 0,
  GameState = play;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  restart_img = loadImage("restart.png");
  GameOver_img = loadImage("gameOver.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -speed;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  restart = createSprite(width / 2, height / 1.5);
  restart.addImage("restart", restart_img);
  restart.visible = false;

  gameover = createSprite(width / 2, height / 3);
  gameover.addImage("go", GameOver_img);
  gameover.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(250);
  if (GameState == play) {
    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("space")) {
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawnClouds();
    spawnObstacles();
    if (trex.isTouching(obstaclesGroup)) {
      GameState = end
    }
  }
  if (GameState == end) {
    trex.setVelocity(0,0);
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided);
    restart.visible = true;
    gameover.visible = true;
    restart.depth = depth + 1;
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  if(score>hiscore){
    hiscore = score
  }
  trex.collide(invisibleGround);
  drawSprites();
  text("Score: " + score, 500, 50);
  text("HI Score: " + hiscore, 350, 50);
}

function reset() {
  trex.changeAnimation("running", trex_running);
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  ground.velocityX = -speed;
  restart.visible = false;
  gameover.visible = false;
  score = 0;
  GameState = play;
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(speed/1.5);

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -speed ;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }
    depth = obstacle.depth;
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}