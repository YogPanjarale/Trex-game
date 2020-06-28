var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score,time;
var cloudsGroup, cloud_img;
var obstaclesGroup, ob1, ob2, ob3, ob4, ob5, ob6;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  frameRate(30);

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -7;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(250);

  if (keyDown("space")&&trex.y>= 155) {
    trex.velocityY = -12;
  }

  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  drawSprites();
  scoreboard();
}
function scoreboard(){
  score = round(frameCount/15)
  
text("Score: "+score,width-100,20);
}

function spawnClouds() {
  if (frameCount % 55 == 0) {
    var cloud = createSprite(width, random(50, 100), 10, 10);
    cloud.velocityX = ground.velocityX;
    cloud.addImage(cloud_img);
    cloud.scale = 0.6;
    cloud.lifetime = width / cloud.velocityX;
    trex.depth = cloud.depth + 1;
    cloudsGroup.add(cloud)
  }
}

function spawnObstacles() {
  if (frameCount % 60 == 0 && random(0, 2) != 1) {
    var obstacle = createSprite(random(width, width + 20), 160, 20, 20);
    obstacle.velocityX = ground.velocityX;
    var r = round(random(1, 6));
    //console.log(r)
    switch (r) {
      case 1:
        obstacle.addImage(ob1);
        break;
      case 2:
        obstacle.addImage(ob2);
        break;
      case 3:
        obstacle.addImage(ob3);
        break;
      case 4:
        obstacle.addImage(ob4);
        break;
      case 5:
        obstacle.addImage(ob5);
        break;
      case 6:
        obstacle.addImage(ob6);
        break;
        default:
        break;
    }
    obstacle.scale = 0.6;
    obstaclesGroup.add(obstacle);

  }
}