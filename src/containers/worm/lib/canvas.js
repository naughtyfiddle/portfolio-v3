import Config from '../config';

let Canvas;

export default {
	get unit() {
		return Canvas.clientWidth / Config.scene.resolution;
	},

	get context() {
		return Canvas.getContext('2d');
	},

	get clientWidth() {
		return Canvas.clientWidth;
	},

	get clientHeight() {
		return Canvas.clientHeight;
	},

	load(canvas) {
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		Canvas = canvas;
	},

	drawRect(color, x, y, w, h) {
		this.context.fillStyle = color;
		this.context.fillRect(x, y, w, h);
	},

	drawImage(sprite, x, y, w, h) {
		this.context.drawImage(sprite, x, y, w, h);
	}
};
