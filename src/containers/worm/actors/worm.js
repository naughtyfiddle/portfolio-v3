import Actor from './actor';
import Segment from './segment';
import EventBus from '../lib/event-bus';
import Vector from '../lib/vector';
import {sizeToCanvas} from '../lib/utils';
import Config from '../config';

export default function Worm(canvas) {
	const screenMiddle = sizeToCanvas(canvas, Config.scene.resolution / 2);
	const tail = [Segment(canvas, Vector(screenMiddle, screenMiddle))];

	const worm = Object.assign(Actor(), {
		dir: Vector(0, -1),
		tail,
		head: tail[0],

		isDead() {
			if (this.head.bounds.isOffscreen(canvas)) {
				return true;
			}
			this.tail.forEach((seg) => {
				if (this.head.bounds.overlaps(seg.bounds)) {
					return true;
				}
			});

			return false;
		},

		isColliding(other) {
			return this.head.bounds.overlaps(other.bounds);
		},

		canShoot() {
			return this.tail.every((seg) => !seg.isDetached);
		},

		teleport(dest) {
			this.dir = dest.dir;
			this.head.pos = dest.pos.add(dest.dir.multiply(10));
			this.tail.forEach((seg, i) => { seg.isDetached = i !== tail.length - 1; });
		},

		setDir(dir) {
			if (!this.dir.equals(dir.multiply(-1))) {
				this.dir = dir;
			}
		},

		addSegment() {
			const newSegmentPos = this.head.pos.add(this.dir.multiply(sizeToCanvas(canvas, Config.worm.size)));
			const newSegment = Segment(canvas, newSegmentPos);
			this.tail.push(newSegment);
			this.head = newSegment;
		},

		update() {
			this.addSegment();
			this.tail.shift();
			if (this.isDead()) {
				EventBus.emit('worm_dead');
			}
		},

		draw() {
			this.tail.forEach((seg) => seg.draw());
		}
	});

	EventBus.on('food_eaten', worm.addSegment.bind(worm));
	return worm;
}
