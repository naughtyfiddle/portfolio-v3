import Config from '../config';

export function sizeToCanvas(canvas, size) {
	return (canvas.clientWidth / Config.scene.resolution) * size;
}
