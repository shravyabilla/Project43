
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;
var dart, board; 
var dart_img, board_img, background_img;
var slingShot;
var score = 0;
var bg = "images/light.jpg";


function preload(){
 getBackgroundImage();
 dart_img=loadImage("images/dart.png");
 board_img=loadImage("images/board.png");

}

function setup() {
	createCanvas(1350, 650);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);

  board = Bodies.rectangle(50,200,20);
  World.add(world,board);

  dart = Bodies.circle(50,200,20);
  World.add(world,dart);
  
  slingShot = new Slingshot(this.dart,{x:100,y:200});
  
}


function draw() {
  text(mouseX + ',' + mouseY, 10, 15);
  textSize(20);
  fill("black");
  text("DRAG THE DART TO AIM AND THEN LET GO",300,30);
  text("SCORE : "+score,750,40);
  textSize(10);
  text("Press Space to get a second Chance to play!",650 ,350);

    if (dart.body.position.y>760){
          if (dart.body.position.x < 300) {
              score=score+10;      
              dart=null;                      
          }
          if (dart.body.position.x < 300) {
            score=score+10;      
            dart=null;                      
          }
          else if (dart.body.position.x < 600 && dart.body.position.x > 301 ) {
            score = score + 20;
            dart=null;
          }
          else if (dart.body.position.x < 900 && dart.body.position.x > 601 ){
            score = score + 20;
            dart=null;            
          }
          else if (dart.body.position.x < 600 && dart.body.position.x > 301 ) {
            score = score + 30;
            dart=null;
          }
          else if (dart.body.position.x < 900 && dart.body.position.x > 601 ){
            score = score + 30;
            dart=null;            
          }

    }
    
  slingShot.display();

  if(background_img){
    background(background_img);
  }
  
  drawSprites();
}

function mouseDragged(){
  Matter.Body.setPosition(this.dart,{x:mouseX,y:mouseY});
}
function mouseReleased(){
  slingShot.fly();
}
function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(this.dart);
  }
}

async function getBackgroundImage(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/America/Chicago");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);
  //console.log(hour);

  if (hour >= 06 && hour <= 18) {
   bg = "images/light.jpg";
 } else {
   bg = "images/dark.jpg";
 }

  background_img = loadImage(bg);
  console.log(background_img);
}



