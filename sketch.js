//Create variables here
var dog, happyDog, database, foodStock;
var dogImg, happyDogImg;
var feed, addFood;
var fedTime, lastFed, foodObj;
var database;
var foodS = 0;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1200, 500);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(950, 250, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  feed = createButton("Feed your Dog");
  feed.position(930,65);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(1045,65);
  addFood.mousePressed(addFoods);
  
}


function draw() {
  background(46, 139, 87);

  drawSprites();
  //add styles here

  foodObj.display();

  fedTime  = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  push();
  textSize(15);
  fill("white");
  text("Food Stock: "+ foodS, 550, 100);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 400, 60);
  pop();

  push();
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Fed: "+ lastFed%12 + " PM", 395, 30);
  }
  else if(lastFed === 0)
  {
    text("Last Fed: 12 AM", 395, 30);
  }
  else
  {
    text("Last Fed: "+ lastFed + " AM", 395, 30);
  }
  pop();

}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x)
{

  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog()
{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
