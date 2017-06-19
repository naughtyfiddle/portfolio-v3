import Actor from './actor';
import Rect from '../lib/rect';
import EventBus from '../lib/event-bus';
import {sizeToCanvas} from '../lib/utils';
import Config from '../config';

export default function Portal(canvas, pos, dir, color) {
	const ctx = canvas.getContext('2d');

	const getWidth = (dir) => Math.abs(dir.y) * sizeToCanvas(canvas, Config.portal.width) + sizeToCanvas(canvas, Config.portal.depth);
	const getHeight = (dir) => Math.abs(dir.x) * sizeToCanvas(canvas, Config.portal.width) + sizeToCanvas(canvas, Config.portal.depth);

	const portal = Object.assign(Actor(), {
		pos, dir,
		bounds: Rect(pos.x, pos.y, getWidth(dir), getHeight(dir)),

		draw() {
			ctx.fillStyle = color;
			ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
		},

		move(bullet) {
			if (bullet.color === color) {
				this.dir = bullet.dir.multiply(-1);

				if (bullet.pos.x < 0) {
					this.pos.x = 0;
				} else if (bullet.pos.x >= canvas.clientWidth) {
					this.pos.x = canvas.clientWidth - this.w;
				} else {
					this.pos.x = bullet.pos.x;
				}

				if (bullet.pos.y < 0) {
					this.pos.y = 0;
				} else if (bullet.pos.y >= canvas.clientHeight) {
					this.pos.y = canvas.clientHeight - this.h;
				} else {
					this.pos.y = bullet.pos.y;
				}

				this.bounds.moveTo(this.pos.x, this.pos.y, this.w, this.h);
			}
		}
	});

	Object.defineProperty(portal, 'w', {
		get: function() {
			return getWidth(this.dir);
		}
	});

	Object.defineProperty(portal, 'h', {
		get: function() {
			return getHeight(this.dir);
		}
	});

	EventBus.on('bullet_offscreen', portal.move.bind(portal));
	return portal;
}
