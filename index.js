var spr;
var groundSprites;
var GROUND_WIDTH = 50;
var GROUND_HEIGHT = 50;
var numGroundSprites;
var ceilingSprites;
var obstacleSprites;
var switchGravity = -575   ;

window.setup = () => {
  createCanvas(600, 600);
  background(150, 200, 250);
  // creating the ground
  groundSprites = new Group();
  ceilingSprites = new Group();
  numGroundSprites = width / GROUND_WIDTH + 1;
  for (var n = 0; n < numGroundSprites; n++) {
    var groundSprite = createSprite(
      n * 50,
      height - 25,
      GROUND_WIDTH,
      GROUND_HEIGHT
    )
    groundSprites.add(groundSprite);
    var ceilingSprite = createSprite(
      n * 50,
      25,
      GROUND_WIDTH,
      GROUND_HEIGHT
    )
    ceilingSprites.add(ceilingSprite);
  }

  // //creating the player
  spr = createSprite(100, height - 75, 50, 50);

};

window.draw = () => {
  background(150, 200, 250);

  if (groundSprites.overlap(spr)) {
    spr.velocity.y = 0;
    spr.position.y = height - 50 - spr.height / 2;
  } else if (ceilingSprites.overlap(spr)) { // this keeps the ceiling things not from doing that cool breaking thing but currently it just disappears forever into the void
    spr.velocity = 0;
    spr.position.y = 25;
  }




  if (keyboard.pressed('space')) {
    spr.velocity.y = switchGravity;
  }

  spr.position.x = spr.position.x + 5;
  camera.position.x = spr.position.x + (width / 4);
  var firstGroundSprite = groundSprites[0];
  var firstCeilingSprite = ceilingSprites[0];
  if (firstGroundSprite.position.x <= camera.position.x - (width / 2 + firstGroundSprite.width / 2)) {
    groundSprites.remove(firstGroundSprite);
    ceilingSprites.remove(firstCeilingSprite);
    firstGroundSprite.position.x = firstGroundSprite.position.x + (numGroundSprites * firstGroundSprite.width);
    groundSprites.add(firstGroundSprite);
    ceilingSprites.add(firstCeilingSprite);
  }
  drawSprites();
};