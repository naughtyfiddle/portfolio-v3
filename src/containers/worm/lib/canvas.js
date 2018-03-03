import Config from '../config';

let Canvas;

export default {
	get isLoaded() {
		return !!Canvas;
	},

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
	},

	drawText(text, font, color, x, y) {
		this.context.fillStyle = color;
		this.context.font = font;
		this.context.textBaseline = 'hanging';
		this.context.fillText(text, x, y);
	},

	clear() {
		this.context.fillStyle = Config.scene.color;
		this.context.fillRect(0, 0, Canvas.clientWidth, Canvas.clientHeight);
	},

	unload() {
		Canvas = null;
	}
};
