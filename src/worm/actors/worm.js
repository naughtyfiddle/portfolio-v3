import Actor from './actor';
import Segment from './segment';
import EventBus from '../lib/event-bus';
import Vector from '../lib/vector';
import Direction from '../lib/direction';
import Config from '../config';

export default function Worm() {
	const screenMiddle = Math.floor(Config.scene.cellCount / 2);
	this.tail = [new Segment(new Vector(screenMiddle, screenMiddle))];
	this.dir = Direction.UP;
	this.head = this.tail[0];
	this.segmentsToAdd = 0;

	EventBus.on('food_eaten', () => { this.segmentsToAdd += Config.worm.growthRate; });
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
			return this.tail.some((seg) => (
				seg !== this.head && this.head.bounds.overlaps(seg.bounds)
			));
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
		.add(exit.dir.multiply(Config.portal.depth))
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
	const newSegmentPos = this.head.pos.add(this.dir.multiply(Config.worm.size));
	const newSegment = new Segment(newSegmentPos);
	this.tail.push(newSegment);
	this.head = newSegment;
};

Worm.prototype.update = function() {
	this.addSegment();

	// If the worm does not need to grow, remove the last tail segment to offset
	// the new head segment we just added. Else "add" a segment by not deleting the tail.
	if (this.segmentsToAdd === 0) {
		this.tail.shift();
	} else {
		this.segmentsToAdd--;
	}

	if (this.isDead) {
		EventBus.emit('worm_dead');
	}
};

Worm.prototype.draw = function() {
	this.tail.forEach((seg) => seg.draw());
};
