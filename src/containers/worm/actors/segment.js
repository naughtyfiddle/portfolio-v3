import Actor from './actor';
import Config from '../config';
import Rect from '../lib/rect';
import Canvas from '../lib/canvas';

export default function Segment(pos) {
	this.size = Canvas.unit * Config.worm.size;
	this.pos = pos;
	this.bounds = new Rect(this.pos.x, this.pos.y, this.size, this.size);
	this.color = Config.worm.color;
}

Segment.prototype = Object.create(Actor.prototype);

Segment.prototype.draw = function() {
	Canvas.drawRect(this.color, this.pos.x, this.pos.y, this.size, this.size);
};

Segment.prototype.tween = function(dir) {
	const transform = dir.multiply(this.size / 2);
	const tweenedPos = this.pos.add(transform);
	Canvas.drawRect(this.color, tweenedPos.x, tweenedPos.y, this.size, this.size);
};
