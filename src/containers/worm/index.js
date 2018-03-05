import Bullet from './actors/bullet';
import Food from './actors/food';
import Portal from './actors/portal';
import Worm from './actors/worm';
import Config from './config';
import EventBus from './lib/event-bus';
import Vector from './lib/vector';
import Direction from './lib/direction';
import Canvas from './lib/canvas';

export default function Game(canvas) {
	Canvas.load(canvas);
	this.state = this.createNewGameState();
	EventBus.on('food_eaten', () => { this.state.score += 10; });
	EventBus.on('worm_dead', () => { this.state = this.createNewGameState(); });

	// bind handlePlayerInput here so we can remove the event listener later
	this.handlePlayerInput = this.handlePlayerInput.bind(this);
	window.addEventListener('keydown', this.handlePlayerInput);
}

Game.prototype.createNewGameState = function() {
	return {
		actors: {
			worm: new Worm(),
			food: new Food(),
			bullets: [],
			portal1: new Portal(new Vector(), Direction.RIGHT, Config.portal.color1),
			portal2: new Portal(new Vector(), Direction.LEFT, Config.portal.color2)
		},
		score: 0,
		shouldTween: false,
		lastUpdateTs: 0,
		isPaused: true
	};
};

Game.prototype.doCollisions = function() {
	const {worm, bullets, food, portal1, portal2} = this.state.actors;

	if (worm.isColliding(food)) {
		EventBus.emit('food_eaten');
	}

	if (worm.isColliding(portal1)) {
		worm.teleport(portal1, portal2);
	} else if (worm.isColliding(portal2)) {
		worm.teleport(portal2, portal1);
	}

	// remove offscreen bullets
	this.state.actors.bullets = bullets.reduce((acc, bullet) => {
		if (!bullet.shouldRemove) {
			acc.push(bullet);
		}
		return acc;
	}, []);
};

Game.prototype.update = function() {
	for (const actorKey in this.state.actors) {
		const actor = this.state.actors[actorKey];
		if (Array.isArray(actor)) {
			actor.forEach((e) => e.update());
		} else {
			actor.update();
		}
	}
	this.state.shouldTween = !this.state.shouldTween;
};

Game.prototype.render = function() {
	Canvas.clear();

	for (const actorKey in this.state.actors) {
		const actor = this.state.actors[actorKey];
		if (Array.isArray(actor)) {
			actor.forEach((e) => e.draw());
		} else {
			actor.draw();
		}
	}

	Canvas.drawText(`Score: ${this.state.score}`, Config.score.font, Config.score.color, 0, 0);
};

Game.prototype.doGameLoop = function(frameTs = 0) {
	if (!Canvas.isLoaded) {
		return;
	}

	if (frameTs - this.state.lastUpdateTs >= Config.scene.updateStep) {
		this.update();
		this.doCollisions();
		this.render();
		this.state.lastUpdateTs = frameTs;
	}

	if (!this.state.isPaused) {
		window.requestAnimationFrame((frameTs) => this.doGameLoop(frameTs));
	} else {
		Canvas.clear();
		Canvas.drawText('Paused', Config.score.font, Config.score.color, 0, 0);
	}
};

Game.prototype.handlePlayerInput = function(e) {
	const {bullets, worm} = this.state.actors;

	switch (e.keyCode) {
		case Config.controls.pause:
			this.state.isPaused ? this.play() : this.pause();
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
			if (worm.canShoot) {
				bullets.push(
					new Bullet(worm.head.pos, worm.dir, Config.portal.color1)
				);
			}
			break;
		case Config.controls.fire2:
			if (worm.canShoot) {
				bullets.push(
					new Bullet(worm.head.pos, worm.dir, Config.portal.color2)
				);
			}
			break;
		default:
			break;
	}
};

Game.prototype.play = function() {
	if (this.state.isPaused) {
		this.state.isPaused = false;
		this.doGameLoop();
	}
};

Game.prototype.pause = function() {
	this.state.isPaused = true;
};

Game.prototype.end = function() {
	window.removeEventListener('keydown', this.handlePlayerInput);
	EventBus.clear();
	Canvas.unload();
};
