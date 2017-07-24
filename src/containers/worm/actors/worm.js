import Actor from './actor';
import Segment from './segment';
import EventBus from '../lib/event-bus';
import Vector from '../lib/vector';
import {getCanvasUnit} from '../lib/utils';
import Config from '../config';
import {direction} from '../constants';

export default function Worm(canvas) {
	const unit = getCanvasUnit(canvas);
	const screenMiddle = unit * Config.scene.resolution / 2;
	const tail = [Segment(canvas, Vector(screenMiddle, screenMiddle))];

	const worm = Object.assign(Actor(), {
		dir: Vector(0, -1),
		tail,
		head: tail[0],

		get canShoot() {
			return this.tail.every((seg) => !seg.isDetached);
		},

		get isDead() {
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

		teleport(entrance, exit) {
			this.dir = exit.dir;

			let offset;

			if (entrance.dir.equals(direction.LEFT) || entrance.dir.equals(direction.RIGHT)) {
				offset = this.head.pos.y - entrance.pos.y;
			} else {
				offset = this.head.pos.x - entrance.pos.x;
			}

			this.head.pos = exit.pos
				.add(exit.dir.multiply(unit * Config.portal.depth))
				.add(exit.dir.getPositivePerpendicular().multiply(offset));

			this.tail.forEach((seg, i) => {
				seg.isDetached = seg !== this.head;
			});
		},

		setDir(dir) {
			if (!this.dir.equals(dir.multiply(-1))) {
				this.dir = dir;
			}
		},

		addSegment() {
			const newSegmentPos = this.head.pos.add(this.dir.multiply(unit * Config.worm.size));
			const newSegment = Segment(canvas, newSegmentPos);
			this.tail.push(newSegment);
			this.head = newSegment;
		},

		update() {
			this.addSegment();
			this.tail.shift();
			if (this.isDead) {
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
