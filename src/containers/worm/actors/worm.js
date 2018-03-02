import Actor from './actor';
import Segment from './segment';
import EventBus from '../lib/event-bus';
import Vector from '../lib/vector';
import Canvas from '../lib/canvas';
import Direction from '../lib/direction';
import Config from '../config';

export default function Worm() {
	const screenMiddle = Canvas.unit * Config.scene.resolution / 2;
	this.tail = [new Segment(new Vector(screenMiddle, screenMiddle))];
	this.dir = Direction.UP;
	this.head = this.tail[0];

	EventBus.on('food_eaten', this.addSegment.bind(this));
}

Worm.prototype = Object.create(Actor.prototype);

Worm.prototype.constructor = Worm;

Object.defineProperties(Worm.prototype, {
	canShoot: {
		get: function() {
			return this.tail.every((seg) => !seg.isDetached);
		}
	},
	isDead: {
		get: function() {
			if (this.head.bounds.isOffscreen) {
				return true;
			}
			this.tail.forEach((seg) => {
				if (this.head.bounds.overlaps(seg.bounds)) {
					return true;
				}
			});

			return false;
		}
	}
});

Worm.prototype.isColliding = function(other) {
	return this.head.bounds.overlaps(other.bounds);
};

Worm.prototype.teleport = function(entrance, exit) {
	this.dir = exit.dir;

	let offset;

	if (entrance.dir.equals(Direction.LEFT) || entrance.dir.equals(Direction.RIGHT)) {
		offset = this.head.pos.y - entrance.pos.y;
	} else {
		offset = this.head.pos.x - entrance.pos.x;
	}

	this.head.pos = exit.pos
		.add(exit.dir.multiply(Canvas.unit * Config.portal.depth))
		.add(exit.dir.getPositivePerpendicular().multiply(offset));

	this.tail.forEach((seg, i) => {
		seg.isDetached = seg !== this.head;
	});
};

Worm.prototype.setDir = function(dir) {
	if (!this.dir.equals(dir.multiply(-1))) {
		this.dir = dir;
	}
};

Worm.prototype.addSegment = function() {
	const newSegmentPos = this.head.pos.add(this.dir.multiply(Canvas.unit * Config.worm.size));
	const newSegment = new Segment(newSegmentPos);
	this.tail.push(newSegment);
	this.head = newSegment;
};

Worm.prototype.update = function() {
	this.addSegment();
	this.tail.shift();
	if (this.isDead) {
		EventBus.emit('worm_dead');
	}
};

Worm.prototype.draw = function() {
	this.tail.forEach((seg) => seg.draw());
};
