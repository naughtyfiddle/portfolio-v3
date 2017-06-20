import Actor from './actor';
import Rect from '../lib/rect';
import EventBus from '../lib/event-bus';
import {getCanvasUnit} from '../lib/utils';
import Config from '../config';
import Direction from '../lib/direction';

export default function Portal(canvas, pos, dir, color) {
	const ctx = canvas.getContext('2d');
	const unit = getCanvasUnit(canvas);

	const getWidth = (dir) => {
		return Math.abs(dir.y) * 2 * Config.portal.radius * unit + unit;
	};

	const getHeight = (dir) => {
		return Math.abs(dir.x) * 2 * Config.portal.radius * unit + unit;
	};

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

				// center portal over bullet impact
				if (this.dir.equals(Direction.UP) || this.dir.equals(Direction.DOWN)) {
					this.pos.x = bullet.pos.x - unit * Config.portal.radius;
					this.pos.y = bullet.pos.y;
				} else {
					this.pos.y = bullet.pos.y - unit * Config.portal.radius;
					this.pos.x = bullet.pos.x;
				}

				// keep portal onscreen
				if (this.pos.x < 0) {
					this.pos.x = 0;
				} else if (this.pos.x > canvas.clientWidth - this.w) {
					this.pos.x = canvas.clientWidth - this.w;
				}

				if (this.pos.y < 0) {
					this.pos.y = 0;
				} else if (this.pos.y > canvas.clientHeight - this.h) {
					this.pos.y = canvas.clientHeight - this.h;
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
