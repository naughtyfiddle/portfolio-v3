import Config from '../config';

let Canvas;

export default {
	get isLoaded() {
		return !!Canvas;
	},

	get context() {
		return Canvas.getContext('2d');
	},

	load(canvas) {
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		Canvas = canvas;
	},

	toCanvas(gridUnits) {
		const gridToCanvas = Canvas.clientWidth / Config.scene.cellCount;
		return gridUnits * gridToCanvas;
	},

	drawRect(color, x, y, w, h) {
		this.context.fillStyle = color;
		this.context.fillRect(this.toCanvas(x), this.toCanvas(y), this.toCanvas(w), this.toCanvas(h));
	},

	drawImage(sprite, x, y, w, h) {
		this.context.drawImage(sprite, this.toCanvas(x), this.toCanvas(y), this.toCanvas(w), this.toCanvas(h));
	},

	drawText(text, font, color, x, y) {
		this.context.fillStyle = color;
		this.context.font = font;
		this.context.textBaseline = 'hanging';
		this.context.fillText(text, this.toCanvas(x), this.toCanvas(y));
	},

	clear() {
		this.context.fillStyle = Config.scene.color;
		this.context.fillRect(0, 0, Canvas.clientWidth, Canvas.clientHeight);
	},

	unload() {
		Canvas = null;
	}
};
