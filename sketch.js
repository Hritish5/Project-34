//Create variables here
var database;
var dog, happydog, database, foodS, foodStock, dogImg, dogImg2, foodS;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  database=firebase.database();
  console.log(database);

  dog = createSprite(250,250,20,15);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
//foodS = 0;
}


function draw() {  
  if(foodS !== undefined){
    text("Food Remaining: " + foodS, 150,140);
  }
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }
  drawSprites();
  //add styles here
}

function readStock(data){
  foodS=data.val();
  console.log(foodS);
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
  x = x - 1;
  }
  database.ref('/').update({
  Food:x
  })
}