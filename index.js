var spr;
var groundSprites;
var GROUND_WIDTH = 50;
var GROUND_HEIGHT = 50;
var numGroundSprites;
var ceilingSprites;
var obstacleSprites;
var switchGravity = -250;

let colors = ["#EBA048", "#5AB3DC", "#E16540", "#B2D6BC", "#E378AA", "#CFC37D", "#C1A939", "#FF9900", "#FFCCCC", "#FDC500", "#FFD60A"];

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
    groundSprite.shapeColor = colors[floor(random(colors.length))];
    groundSprite.stroke = 'none';
    groundSprites.add(groundSprite);
    var ceilingSprite = createSprite(
      n * 50,
      25,
      GROUND_WIDTH,
      GROUND_HEIGHT
    )
    ceilingSprite.shapeColor = colors[floor(random(colors.length))];
    ceilingSprite.stroke = 'none';
    ceilingSprites.add(ceilingSprite);
  }

  // //creating the player
  spr = createSprite(100, height - 75, 50);
  spr.shapeColor = colors[floor(random(colors.length))];
  spr.stroke = 'none';


};

window.draw = () => {
  background(150, 200, 250);

  if (keyboard.pressed('space')) {
    spr.velocity.y = switchGravity;
    switchGravity = (-1) * switchGravity;
  }

  if (spr.overlap(ceilingSprites)) { // this keeps the ceiling things not from doing that cool breaking thing but currently it just disappears forever into the void
    spr.velocity.y = 0;
    spr.position.y = 50 + 25;
  } else if (spr.overlap(groundSprites)) {
    spr.velocity.y = 0;
    spr.position.y = height - 50 - 25;
  }


  spr.position.x = spr.position.x + 3;
  camera.position.x = spr.position.x + width / 4;
  var firstGroundSprite = groundSprites[0];
  var firstCeilingSprite = ceilingSprites[0];
  if (firstGroundSprite.position.x <=
    camera.position.x - (width / 2 + firstGroundSprite.width / 2)) {
      // console.log("before removing: " + groundSprites[numGroundSprites-1]);
    groundSprites.remove(firstGroundSprite);
    // console.log("after removing: " + groundSprites[numGroundSprites-1]);
    ceilingSprites.remove(firstCeilingSprite);
    firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites * firstGroundSprite.width;
    // console.log(groundSprites[numGroundSprites-1]);
    groundSprites.add(firstGroundSprite);
    // spr.shapeColor = 'yellow';
    // console.log(firstGroundSprite.color.levels);
    ceilingSprites.add(firstCeilingSprite);
  }
  // if the sprite is not currently in that space (position.y = whatever), and the colors align, then you get a plus point
  // how do i get a grasp of what the indexing is for each thing generated? can i reference the id number?

};