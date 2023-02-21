var isGameOver;
var score;
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
  isGameOver = false;
  score = 0;
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
    );
    groundSprite.shapeColor = colors[floor(random(colors.length))];
    groundSprite.stroke = 'none';
    groundSprites.add(groundSprite);
    var ceilingSprite = createSprite(
      n * 50,
      25,
      GROUND_WIDTH,
      GROUND_HEIGHT
    );
    ceilingSprite.shapeColor = colors[floor(random(colors.length))];
    ceilingSprite.stroke = 'none';
    ceilingSprites.add(ceilingSprite);
  }

  //creating the player
  spr = createSprite(100, height - 75, 50);
  spr.shapeColor = colors[floor(random(colors.length))];
  spr.stroke = 'none';

  // create obstacle group
  obstacleSprites = new Group();
};

window.draw = () => {
  if (isGameOver) {
    background(0);
    fill(255);
    textAlign(CENTER);
    text("Your score was: " + score, width/2, height/2);
    text("Game Over! Click anywhere to restart", width/2, height/2 + 20);
    spr.remove();
    obstacleSprites.remove();
    if (mouseIsPressed) {
      isGameOver = false;
      score = 0;
      groundSprites.remove();
      ceilingSprites.remove();
      groundSprites = new Group();
      ceilingSprites = new Group();
      numGroundSprites = width / GROUND_WIDTH + 1;
      for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(
          n * 50,
          height - 25,
          GROUND_WIDTH,
          GROUND_HEIGHT
        );
        groundSprite.shapeColor = colors[floor(random(colors.length))];
        groundSprite.stroke = 'none';
        groundSprites.add(groundSprite);
        var ceilingSprite = createSprite(
          n * 50,
          25,
          GROUND_WIDTH,
          GROUND_HEIGHT
        );
        ceilingSprite.shapeColor = colors[floor(random(colors.length))];
        ceilingSprite.stroke = 'none';
        ceilingSprites.add(ceilingSprite);
      }
      //creating the player
      spr = createSprite(100, height - 75, 50);
      spr.shapeColor = colors[floor(random(colors.length))];
      spr.stroke = 'none';
      // create obstacle group
      obstacleSprites = new Group();
    }
  } else {
    background(150, 200, 250);
    if (keyboard.pressed('space')) {
      score = score + 1;
      spr.text = score;
      spr.velocity.y = switchGravity;
      switchGravity = (-1) * switchGravity;
    }
    if (spr.overlap(ceilingSprites)) {
      spr.velocity.y = 0;
      spr.position.y = 50 + 25;
    } else if (spr.overlap(groundSprites)) {
      spr.velocity.y = 0;
      spr.position.y = height - 50 - 25;
    }
    spr.position.x = spr.position.x + 5;
    camera.x = spr.position.x + width / 4;
    var firstGroundSprite = groundSprites[0];
    var firstCeilingSprite = ceilingSprites[0];
    if (firstGroundSprite.position.x <=
      camera.x - (width / 2 + firstGroundSprite.width / 2)) {
      groundSprites.remove(firstGroundSprite);
      ceilingSprites.remove(firstCeilingSprite);
      firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites * firstGroundSprite.width;
      firstCeilingSprite.position.x = firstCeilingSprite.position.x + numGroundSprites * firstCeilingSprite.width;
      groundSprites.add(firstGroundSprite);
      ceilingSprites.add(firstCeilingSprite);
    }
    if (random() > 0.97) {
      var obstacle = createSprite(camera.x + width, random(0, (height-50)-10), 30);
      obstacleSprites.add(obstacle);
    }
    var firstObstacle = obstacleSprites[0];
    if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.x - (width/2 + firstObstacle.width/2)) {
        obstacleSprites.remove(firstObstacle);
    }
    for (var i = 0; i < obstacleSprites.length; i++) {
      obstacleSprites[i].overlap(spr, endGame);
    }
  }
};
function endGame() {
  isGameOver = true;
}
