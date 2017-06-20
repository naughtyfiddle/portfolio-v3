import Config from '../config';

export function getCanvasUnit(canvas) {
	return canvas.clientWidth / Config.scene.resolution;
}
