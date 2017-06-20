import Actor from './actor';
import Config from '../config';
import Rect from '../lib/rect';
import {getCanvasUnit} from '../lib/utils';

export default function Segment(canvas, pos) {
	const ctx = canvas.getContext('2d');
	const size = getCanvasUnit(canvas) * Config.worm.size;

	return Object.assign(Actor(), {
		pos, size,
		bounds: Rect(pos.x, pos.y, size, size),

		draw() {
			ctx.fillStyle = Config.worm.color;
			ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
		}
	});
}


Segment.prototype.tween = function(ctx, dir) {
	ctx.fillStyle = Config.worm.color;
	const transform = dir.multiply(this.size / 2);
	const tweenedPos = this.pos.add(transform);
	ctx.fillRect(tweenedPos.x, tweenedPos.y, this.size, this.size);
};
