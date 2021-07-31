var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //create feed the dog button here

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  addFeed = createButton("Feed The Dog");
  addFeed.position(700, 95);
  addFeed.mousePressed(fedDog);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //write code to read fedtime value from the database 

  var FeedTimeRef = database.ref('FeedTime');
  FeedTimeRef.on("value", function (data) {
    lastFed = data.val();
  })



  if (lastFed >= 12) {
    
    text("last  Fed : "+lastFed5%12+"PM", 350, 30);
  } else if (lastFed == 0) {
    text("last  Fed :12 PM", 350, 30);

  } else {
    text("last  Fed : "+lastFed+"AM", 350, 30);
  }
  drawSprites();
}


//write code to display text lastFed time here





//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function fedDog() {
  dog.addImage(happyDog);
  //function to add food in stock
  var food_stock_val = foodObj.getFoodStock();;

  //write code here to update food stock and last fed time
  if (food_stock_val <= 0) {
    foodObj.updateFoodStock(food_stock_val * 0);
  } else {
    foodObj.updateFoodStock(food_stock_val - 1);
  }


}


function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
  drawSprites();
}

