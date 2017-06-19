import Bullet from './actors/bullet';
import Food from './actors/food';
import Portal from './actors/portal';
import Worm from './actors/worm';
import Config from './config';
import EventBus from './lib/event-bus';
import Vector from './lib/vector';
import Direction from './lib/direction';

function NewGameState(canvas) {
	return {
		actors: {
			worm: Worm(canvas),
			food: Food(canvas),
			bullets: [],
			portal1: Portal(canvas, Vector(), Direction.RIGHT, Config.portal.color1),
			portal2: Portal(canvas, Vector(), Direction.LEFT, Config.portal.color2)
		},
		score: 0,
		shouldTween: false,
		isEnded: false
	};
}

function doCollisions(state) {
	const {worm, bullets, food, portal1, portal2} = state.actors;

	if (worm.isColliding(food)) {
		EventBus.emit('food_eaten');
	}

	if (worm.isColliding(portal1)) {
		worm.teleport(portal2);
	} else if (worm.isColliding(portal2)) {
		worm.teleport(portal1);
	}

	// remove offscreen bullets
	state.actors.bullets = bullets.reduce((acc, bullet) => {
		if (!bullet.shouldRemove) {
			acc.push(bullet);
		}
		return acc;
	}, []);
}

function update(state) {
	if (!state.shouldTween) {
		for (const actorKey in state.actors) {
			const actor = state.actors[actorKey];
			if (Array.isArray(actor)) {
				actor.forEach((e) => e.update());
			} else {
				actor.update();
			}
		}
		/*
		const teleported = worm.doTeleporting();

		// if head went through a portal, set segment flags on other side of the portal
		if (teleported) {
			for (let i = 0; i < worm.tail.length - 1; i++) {
				worm.tail[i].throughPortal = true;
			}
		}
		*/
	}
	state.shouldTween = !state.shouldTween;
}

function render(canvas, state) {
	//console.log(state);
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = Config.scene.color;
	ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	for (const actorKey in state.actors) {
		const actor = state.actors[actorKey];
		if (Array.isArray(actor)) {
			actor.forEach((e) => e.draw());
		} else {
			actor.draw();
		}
	}
}

function doGameLoop(canvas, state) {
	update(state);
	doCollisions(state);
	render(canvas, state);
	if (!state.isEnded) {
		window.requestAnimationFrame(() => doGameLoop(canvas, state));
	}
}

export default function Game(canvas) {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	const handlePlayerInput = function(e) {
		const {bullets, worm} = this.state.actors;

		switch (e.keyCode) {
			case Config.controls.quit:
				this.quit();
				break;
			case Config.controls.left:
				worm.setDir(Direction.LEFT);
				break;
			case Config.controls.up:
				worm.setDir(Direction.UP);
				break;
			case Config.controls.right:
				worm.setDir(Direction.RIGHT);
				break;
			case Config.controls.down:
				worm.setDir(Direction.DOWN);
				break;
			case Config.controls.fire1:
				if (worm.canShoot()) {
					bullets.push(
						Bullet(canvas, worm.head.pos, worm.dir, Config.portal.color1)
					);
				}
				break;
			case Config.controls.fire2:
				if (worm.canShoot()) {
					bullets.push(
						Bullet(canvas, worm.head.pos, worm.dir, Config.portal.color2)
					);
				}
				break;
			default:
				break;
		}
	};

	return {
		state: {},

		start() {
			window.addEventListener('keydown', handlePlayerInput.bind(this));
			this.state = NewGameState(canvas);
			EventBus.on('food_eaten', () => { this.state.score += 10; });
			doGameLoop(canvas, this.state);
		},

		end() {
			window.removeEventListener('keydown', handlePlayerInput.bind(this));
			EventBus.clear();
			this.state.isEnded = true;
		}
	};
}
