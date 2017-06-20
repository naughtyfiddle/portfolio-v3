import Actor from './actor';
import EventBus from '../lib/event-bus';
import Rect from '../lib/rect';
import Config from '../config';
import {getCanvasUnit} from '../lib/utils';

export default function Bullet(canvas, pos, dir, color) {
	const ctx = canvas.getContext('2d');
	const unit = getCanvasUnit(canvas);
	const size = unit * Config.bullet.size;

	return Object.assign(Actor(), {
		pos, size, dir, color,
		bounds: Rect(pos.x, pos.y, size, size),
		shouldRemove: false,

		update() {
			this.pos = this.pos.add(this.dir.multiply(unit * Config.bullet.speed));
			this.bounds.moveTo(this.pos.x, this.pos.y);

			if (this.bounds.isOffscreen(canvas)) {
				EventBus.emit('bullet_offscreen', this);
				this.shouldRemove = true;
			}
		},

		draw() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
		}
	});
}
