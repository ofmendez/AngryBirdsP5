const { Engine, World, Bodies, MouseConstraint, Mouse, Constraint, Body, Composites, Composite, Events } = Matter;
let engine, world, ground, bird, slingshot,mc ;
let  boxImg, groundImg ;
let birdImg = [];
let boxes = [];

function setup() {
	const canvas = createCanvas(500, 300);
	boxImg = loadImage('img/box.png');
	groundImg = loadImage('img/ground.jpg');
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

	ground = new Ground(width / 2, height - 10, width, 20, groundImg);

	for (let i = 0; i <= 6; i++) {
		boxes.push(new Box(400, height - 40 * i, 40, 40, boxImg));
		boxes.push(new Box(440, height - 40 * i, 40, 40, boxImg));
	}
	bird = new Bird(100, 200, 15, birdImg[0]);
	slingshot = new Slingshot( bird);

	// Events.on(engine, 'afterUpdate', () => slingshot.fly(mc));
}

function draw() {
	background('#A0E9FF');
	Engine.update(engine);
	slingshot.fly(mc);

	for (let box of boxes) {
		box.show();
	}

	bird.show();
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
