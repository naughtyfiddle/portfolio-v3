import Actor from './actor';
import Config from '../config';
import EventBus from '../lib/event-bus';
import Rect from '../lib/rect';
import Vector from '../lib/vector';
import {getCanvasUnit} from '../lib/utils';

export default function Food(canvas) {
	const ctx = canvas.getContext('2d');

	const size = getCanvasUnit(canvas) * Config.food.size;
	const sprite = new Image();
	sprite.src = Config.food.src;

	const randomizePos = () => {
		const x = Math.random() * (canvas.clientWidth - size);
		const y = Math.random() * (canvas.clientHeight - size);
		return Vector(x, y);
	};

	const pos = randomizePos();

	const food = Object.assign(Actor(), {
		pos, size, sprite,
		bounds: Rect(pos.x, pos.y, size, size),

		draw() {
			ctx.drawImage(sprite, this.pos.x, this.pos.y, this.size, this.size);
		},

		move() {
			this.pos = randomizePos();
			this.bounds.moveTo(this.pos.x, this.pos.y);
		}
	});

	EventBus.on('food_eaten', food.move.bind(food));
	return food;
}
