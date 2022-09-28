const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine;
var world; 
var bg_Img;
var monster, monsterV0;
var monsterDead;
var slime;
var slimeDead
var jason;
var jasonLeft, jasonRight;
var invisibleGround1, groundInvisible;
var invisibleGround2;
var invisibleGround3;
var invisibleGround4;
var invisibleEdge1;
var invisibleEdge2;
var edgePortal1;
var edgePortal2;
var invisible;
var paredeInvisivel;
var laser, laserImg, laserGroup, laserD, laserDImg, laserDGroup;
var fireBall, fireBallImg, fireBallGroup;
var cloudsGroup;
var cloudImg;
var cloud;
var solo, ground, tower, twImage, support, supportImg;
var coracao;
var saude, saude1, saude2, saude3, saude4;
var shooting;
var gameover;
var bg_sound;
var jump;
var die;
var cage, cageOpen, cageGround, prision, prisionOpen;
var princessSad, princessHappy, princessSadImg, princessHappImg, helpPrincessSong;
var edgeVisible1, edgeVisible2;
var lifeJason = 5;
var lifeMonster = 100;
var gameState = "serve";

function preload(){
  bg_Img = loadImage("background.jpg");
  monster = loadAnimation("glob-monster1.png", "glob-monster2.png", "glob-monster3.png", "glob-monster4.png");
  monsterV0 = loadImage("glob-monster1.png");
  monsterDead = loadImage("glob_monster_dead.png");
  tp1 = loadImage("poço.png");
  tp2 = loadImage("poço.png");
  laserImg = loadImage("laser.png");
  laserDImg = loadImage("laserD.png");
  fireBallImg = loadImage("fireball.png")
  coracao = loadImage("life-jason.png");
  jasonLeft = loadAnimation("jason1-left.png", "jason2-left.png");
  jasonRight = loadAnimation("jason1-right.png", "jason2-right.png")
  cloudImg = loadImage("cloud.png");
  solo = loadImage("ground.png");
  twImage = loadImage("tower.png");
  supportImg = loadImage("support.png")
  prision = loadImage("cage.png");
  princessSadImg = loadImage("princess-sad.png");
  princessHappImg = loadImage("princess-happy.png");
  prisionOpen = loadImage("cage-open.png");
  shooting = loadSound("shooting-laser.wav");
  jump = loadSound("jump.flac");
  gameover = loadSound("jason.game-over.wav");
  bg_sound = loadSound("bg-music.wav");
  roar = loadSound("monster-roar.mp3");
  die = loadSound("die.mp3");
  helpPrincessSong = loadSound("help-princess.wav");
}

function setup() {
 canvas = createCanvas(1525,700);
 engine = Engine.create();
 world = engine.world;

 bg_sound.play();
 bg_sound.setVolume(0);

 portal1 = createSprite(100,582);
 portal1.addImage(tp1);
 portal1.scale = 0.50;
 portal1.setCollider("circle", 0,0,227);

 portal2 = createSprite(1390,582);
 portal2.addImage(tp2);
 portal2.scale = 0.50;
 portal2.setCollider("circle",0,0,227);

 jason = createSprite(762,1);
 jason.addAnimation("running", jasonRight);
 jason.scale = 0.60;
 jason.setCollider("rectangle",0,0,jason.width=90,jason.height=130);

 slime = createSprite(762,530);
 slime.addAnimation("running", monster);
 slime.scale = 7;
 slime.velocityX = -3;

 slime.setCollider("circle",0,0,16)

  saude = createSprite(45,35,40,40);
  saude.addImage(coracao);
  saude.scale = 0.4;

  saude1 = createSprite(82,35,40,40);
  saude1.addImage(coracao);
  saude1.scale = 0.4;

  saude2 = createSprite(119,35,40,40);
  saude2.addImage(coracao);
  saude2.scale = 0.4;

  saude3 = createSprite(156,35,40,40);
  saude3.addImage(coracao);
  saude3.scale = 0.4;

  saude4 = createSprite(193,35,40,40);
  saude4.addImage(coracao);
  saude4.scale = 0.4;

 invisibleGround1 = createSprite(763,664,1525,70);
 invisibleGround1.visible = false;

 groundInvisible = createSprite(763,605,1525,1)
 groundInvisible.visible = false;

 ground = createSprite(763,380,420,50);
 ground.addImage("ground", solo);
 ground.setCollider("rectangle",0,0,ground.width=300, ground.height=40)

 tower = createSprite(1539,317);
 tower.addImage(twImage);
 tower.scale = 0.8;
 tower.setCollider("rectangle",0,0,tower.width=125, tower.height=800);

 support = createSprite(1285,150)
 support.addImage(supportImg);
 support.scale = 1;
 support.setCollider("rectangle",0,0,support.width=470, support.height=50);

 princessSad = createSprite(1180,95);
 princessSad.addImage(princessSadImg);
 princessSad.scale = 0.2;

 cage = createSprite(1195,80);
 cage.addImage(prision);
 cage.scale = 0.5;
 cage.setCollider("rectangle",0,0,cage.width=260, cage.height=180)

 cageGround = createSprite(1195,118,120,1);
 cageGround.visible = true;
 
 invisibleGround3 = createSprite(99,630,155,10);
 invisibleGround3.visible = false;

 invisibleGround4 = createSprite(1405,630,200,10);
 invisibleGround4.visible = false;

 invisibleEdge1 = createSprite(1,350,2,700);
 invisibleEdge1.visible = false;

 invisibleEdge2 = createSprite(1524,350,2,700);
 invisibleEdge2.visible = false;

 edgePortal1 = createSprite(195,585,2,87);
 edgePortal1.visible = false;

 edgePortal2 = createSprite(1296,585,2,87);
 edgePortal2.visible = false;

 edgeVisible1 = createSprite(99,530,155,10)
 edgeVisible1.visible = false;
  
 edgeVisible2 = createSprite(1390,530,155,10)
 edgeVisible2.visible = false;

 invisible = createSprite(1190,170,100,2);
 invisible.visible = false;

 cloudsGroup = createGroup();
 laserGroup = createGroup();
 laserDGroup = createGroup();
 fireBallGroup = createGroup();
 }


function draw() {
   background(bg_Img);
   Engine.update(engine);

   /*if(gameState==="serve"){
    jason.addImage("running", coracao);
    slime.velocityX = 0;
    slime.addImage("running", monsterV0);
   }*/

  if(gameState==="depth") {
    
    textSize(20);
    fill("black")
    text("aperte espaço para destruir a torre da princesa e a salve",500,200);
    
    if(keyDown("space")) {
      shooting.play();
      laserD = createSprite(150, width/2, 50,20);
      laserD.y = jason.y-20;
      laserD.x = jason.x+59;
      laserD.addImage(laserDImg);
      laserD.scale = 0.9;
      laserD.velocityX = 10;
      laserD.velocityY = -10
      laserD.depth = jason.depth;
      laserD.depth = laserD.depth + 10
      laserDGroup.add(laserD);
      slime.destroy();
    }
      
  }
  if(cage.isTouching(invisibleGround1)) {
    cage.destroy();
    princessSad.addImage("happy", princessHappImg);
  }

  if(laserDGroup.isTouching(support)) {
    support.velocityY = 1000;
    cage.velocityY = 15;
    cageGround.velocityY = 15;
    princessSad.velocityY = 15;
  }
   
  if(keyDown("up_arrow")&& jason.y >= 570) {
    jason.velocityY = -25;
    jump.play();
  }
  jason.velocityY = jason.velocityY +1;

  if(keyDown("down_arrow")) {
    jason.velocityY = 20;
  }
  
   if(keyDown("left_arrow")) {
    jason.x = jason.x -10;
    jason.addAnimation("running", jasonLeft);
    gameState = "play";
  }

   if(keyDown("right_arrow")) {
    jason.x = jason.x +10;
    jason.addAnimation("running", jasonRight);
    gameState = "play";
  }

  if(jason.isTouching(fireBallGroup)){
    jason.x = 762;
    jason.y = 1;
    die.play();
    lifeJason=lifeJason-2;
  }

  if(jason.isTouching(slime)) {
    jason.x = 762;
    jason.y = 348;
    die.play();
    lifeJason=lifeJason-1;
  }

  if(jason.isTouching(invisibleGround3)) {
    jason.x = 1423;
    jason.y = 580;
    jason.visible = false;
    jason.velocityY = -24;
  }

  if(jason.isTouching(invisibleGround4)) {
    jason.x = 99;
    jason.y = 580;
    jason.visible = false;
    jason.velocityY = -24;
  }
  if(jason.isTouching(edgeVisible1)||(edgeVisible2)) {
    jason.visible = true;
  }

  if(slime.isTouching(portal1)) {
    slime.velocity.x = 15;
  }
  
  if(slime.isTouching(portal2)) {
    slime.velocity.x = -13;
    //roar.play();
    shoootFireBall();
  }

  if(slime.isTouching(laserGroup)) {
    lifeMonster=lifeMonster-1;
  }
  
  if(lifeMonster<=200 && slime.isTouching(portal2)) {
    slime.velocityY = -10;
    slime.velocityX = 0;
  }

  if(lifeMonster===600) {
    helpPrincessSong.play();
  }
  
  if(lifeMonster===90) {
    helpPrincessSong.play();
  }

  if(slime.isTouching(invisible)) {
    slime.velocityY = +10;
    shoootFireBall(); 
  }

 if(keyWentDown("z")) {
  shooting.play();
  laser = createSprite(150, width/2, 50,20);
  laser.y = jason.y+10;
  laser.x = jason.x-59;
  laser.addImage(laserImg);
  laser.scale = 0.9;
  laser.velocityX = -15;
  laser.depth = jason.depth;
  laser.depth = laser.depth + 10
  laserGroup.add(laser);
 }
 if(keyWentDown("x")) {
  shooting.play();
  laser = createSprite(150, width/2, 50,20);
  laser.y = jason.y+10;
  laser.x = jason.x+59;
  laser.addImage(laserImg);
  laser.scale = 0.9;
  laser.velocityX = 15;
  laser.depth = jason.depth;
  laser.depth = laser.depth + 10
  laserGroup.add(laser);
 }

 if(lifeJason===5){
  saude.visible = true;
  saude1.visible = true;
  saude2.visible = true;
  saude3.visible = true;
  saude4.visible = true;
}

if(lifeJason===4){
  saude.visible = true;
  saude1.visible = true;
  saude2.visible = true;
  saude3.visible = true;
  saude4.visible = false;
}

if(lifeJason===3){
  saude.visible = true;
  saude1.visible = true;
  saude2.visible = true;
  saude3.visible = false;
  saude4.visible = false;
}

if(lifeJason===2){
  saude.visible = true;
  saude1.visible = true;
  saude2.visible = false;
  saude3.visible = false;
  saude4.visible = false;
}

if(lifeJason===1){
  saude.visible = true;
  saude1.visible = false;
  saude2.visible = false;
  saude3.visible = false;
  saude4.visible = false;
}

if(lifeJason===0) {
  saude.visible = false;
  jason.visible = false;
  slime.velocityX = 0;
  gameState = "end";
  slime.addImage("running", monsterV0);
  slime.velocityY = 0;
  gameOver();
  laserGroup.destroyEach();
  shooting.pause();
  //roar.play();
}

if(lifeJason===-1) {
  saude.visible = false;
  jason.visible = false;
  slime.velocityX = 0;
  slime.velocityY = 0;
  gameState = "end";
  slime.addImage("running", monsterV0);
  gameOver();
  laserGroup.destroyEach();
  shooting.pause();
  //roar.play();
}

if(lifeMonster===0) {
  slime.addImage("running", monsterDead);
  slime.velocityX = 0;
  slime.velocityY = 0;
  laserGroup.destroyEach();
  shooting.pause();
  gameState = "depth";
}

spawnClouds();

 cloudsGroup.setLifetimeEach(-1);

 cloudsGroup.setVelocityXEach(-4);

jason.collide(invisibleGround1);
jason.collide(ground);
jason.collide(invisibleEdge1);
jason.collide(invisibleEdge2);
jason.collide(edgePortal1);
jason.collide(edgePortal2);
jason.collide(tower);
jason.collide(cage);
cage.collide(tower);
cage.collide(invisibleGround1);
cageGround.collide(invisibleGround1);
cage.collide(support);
cageGround.collide(support);
princessSad.collide(cageGround);


if(gameState==="serve") {
  textSize(20);
   fill('black')
  text("Use as setas para se mover, ",640,120);
  
  textSize(20);
  fill('black')
  text("aperte Z para atirar para esquerda e",600,145);
  
  textSize(20);
  fill('black')
  text("aperte X para atirar para direita !!",620,170);

  textSize(20);
  fill('red');
  text("vidas:"+lifeJason,-65,100)
}
  drawSprites()
}

function spawnClouds() {
  if(gameState==="play") {
  //código para gerar as nuvens
  if (frameCount % 60 === 0) {
     cloud = createSprite(1590,250,40,10);
    cloud.y = Math.round(random(50,200));
    cloud.addImage(cloudImg);
    cloud.scale = 2;
    cloud.velocityX = -10;
    
     //atribuir tempo de vida à variável
    cloud.lifetime = 900;
    
    //ajustar a profundidade
    cloud.depth = jason.depth;
    jason.depth = jason.depth + 1;
    
    //adicionando nuvem ao grupo
   cloudsGroup.add(cloud);
  }
}
}

function shoootFireBall() {
  
  fireBall = createSprite(150,width/2, 50,20);
  fireBall.x = slime.x+1;
  fireBall.y = slime.y+50;
  fireBall.addImage(fireBallImg);
  fireBall.scale = 0.9;
  fireBall.velocityX = -20;
  fireBallGroup.add(fireBall);
}

function showLifeMonster() {
  push();
  image(monsterV0, width / 2 - 130, height - laser.positionY - 350, 20, 20);
  fill("white");
  rect(width / 2 - 100, height - laser.positionY - 350, 185, 20);
  fill("green");
  rect(width / 2 - 100, height - laser.positionY - 350, laser.lifeMonster, 20);
  noStroke();
  pop();
}

function reset() {
  
}

function gameOver() {
  if(gameState==="end") {
  swal({
    title: `Fim de Jogo`,
    text: "Não desista, a princesa precisa da sua ajuda!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Tentar novamente"
  });
}
}
