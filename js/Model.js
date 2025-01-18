// const {Engine, World, Bodies, Body, Constraint} = Matter;
class Bird {
	constructor(x, y, r, img) {
		this.body = Bodies.circle(x, y, r, { 
			restitution: 0.5,
			collisionFilter: {
				category: 0x0002,
			}
		 });
		Body.setMass(this.body, 2);
		World.add(world, this.body);
		this.r = r;
		this.img = img;
	}

	show() {
		const pos = this.body.position;
		const angle = this.body.angle;

		push();
		translate(pos.x, pos.y);
		rotate(angle);
		fill(255, 0, 0);
		if (this.img) {
			imageMode(CENTER);
			image(this.img, 0, 0, this.r * 2, this.r * 2);
		} else {
			ellipseMode(CENTER);
			ellipse(0, 0, this.r * 2);
		}
		pop();
	}

	clear() {
		World.remove(world, this.body);
	}
}

class Box {
	constructor(x, y, w, h, img, options = {}) {
		this.body = Bodies.rectangle(x, y, w, h, options);
		World.add(world, this.body);
		this.w = w;
		this.h = h;
		this.img = img;
	}

	show() {
		const pos = this.body.position;
		const angle = this.body.angle;

		push();
		translate(pos.x, pos.y);
		rotate(angle);

		fill(255);
		if (this.img) {
			imageMode(CENTER);
			image(this.img, 0, 0, this.w, this.h);
		}
		else {
			rectMode(CENTER);
			rect(0, 0, this.w, this.h);
		}
		pop();
	}

}

class Ground extends Box {
	constructor(x, y, w, h, img) {
		super(x, y, w, h, img, { isStatic: true })
	}

}

class Slingshot {
	constructor(bird, point) {
		const options = {
			pointA: {
				x: bird.body.position.x,
				y: bird.body.position.y
			},
			bodyB: bird.body,
			length: 5,
			stiffness: 0.01
		}
		this.sling = Constraint.create(options);
		World.add(world, this.sling);
	}

	show() {
		if (this.sling.bodyB) {
			const posA = this.sling.pointA;
			const posB = this.sling.bodyB.position;
			push();
			stroke(0);
			line(posA.x, posA.y, posB.x, posB.y);
			pop();
		}
	}

	fly(mc) {
		if (this.sling.bodyB &&
			(mc.mouse.button === -1 && this.sling.bodyB.position.x > this.sling.pointA.x + 10)
		) {
			this.sling.bodyB.collisionFilter.category = 1;
			this.sling.bodyB = null;
		}
	}

	attack(bird) {
		this.sling.bodyB = bird.body;
	}
}