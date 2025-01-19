const { Engine, World, Bodies, MouseConstraint, Mouse, Constraint, Body, Composites, Composite, Events } = Matter;
let engine, world, ground, bird, slingshot,mc ;
let  boxImg, groundImg ;
let birdImg = [];
let boxes = [];

function setup() {
	const canvas = createCanvas(500, 300);
  bg = loadImage('img/bg.jpg');
	boxImg = loadImage('img/box.png');
  pigAlive = loadImage('img/pigAlive.png');
  pigDead = loadImage('img/pigDead.png');
	woodImg = loadImage('img/wood1.png');
	groundImg = loadImage('img/alpha.png');
	slingSimg = loadImage('img/slingshot.png');
	birdImg = [
		loadImage('img/red.webp'),
		loadImage('img/yellow.webp')
	];

	engine = Engine.create();
	world = engine.world;

	const mouse = Mouse.create(canvas.elt);
	mouse.pixelRatio = pixelDensity();
	mc = MouseConstraint.create(engine, { 
		mouse,
		collisionFilter: {
			mask: 0x0002
		}
	});
	World.add(world, mc);

	ground = new Ground(width / 2, height -15, width, 50, groundImg);

	for (let i = 0; i <= 2; i++) {
    boxes.push(new Box(300, height - 40 * i, 40, 40, boxImg));
		boxes.push(new Box(380, height - 40 * i, 40, 40, boxImg));
	}
  boxes.push(new Box(340, height-90 , 90, 13, woodImg));

	bird = new Bird(100, 200, 15, birdImg[0]);
  pig = new Pig(340, height-95 , 15, pigAlive, pigDead);
	slingshot = new Slingshot( bird);
  slingSimgBox = new Box(95, 222, 30, 75, slingSimg , {
    isStatic: true,
    collisionFilter: {
      mask: 0x0001
    }
  });
	// Events.on(engine, 'afterUpdate', () => slingshot.fly(mc));
}

function draw() {
	background(bg);
	Engine.update(engine);
	slingshot.fly(mc);

  if(!slingshot.sling.bodyB){
    pig.checkState();
    for (let box of boxes) {
      box.checkState();
    }
  }
	for (let box of boxes) {
		box.show();
	}

  slingSimgBox.show();
	bird.show();
  pig.show();
	ground.show();
	slingshot.show();
}

function keyPressed() {
	if (key === ' ') {
		bird.clear();
		const index = floor(random(0, birdImg.length));
		bird = new Bird(100, 200, 15, birdImg[index]);	
		slingshot.attack(bird);
	}
}
