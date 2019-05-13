const MIN_INTENSITY = 69;
const PIXEL_SIZE = 3;
const CREST_HEIGHT = PIXEL_SIZE * 2;
const SEAFOAM_HEIGHT = PIXEL_SIZE * 2;

const WET_SAND_COLOR = 'rgb(235,225,184)';
const CREST_COLOR = '#ffffff';
const SEAFOAM_COLOR = '#ccf2ff';
const SHALLOW_WATER_COLOR = '#99e6ff';
const WATER_COLOR = '#80dfff';
const DEEP_WATER_COLOR = '#4dd2ff';

// an audio visualization that looks like a pixelated beach 8)
export default function Visualization() {
	this.wetSandHeights = [];
	this.wetSandUpdates = [];
	this.draw = this.draw.bind(this);
}

// constrain value to "pixel" bounds
Visualization.prototype.pixelize = function(value) {
	return value - (value % PIXEL_SIZE);
};

// this should be the only public method
Visualization.prototype.draw = function(canvas, frequencyData) {
	this.width = canvas.clientWidth;
	this.height = canvas.clientHeight;
	const ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, this.width, this.height);

	let x = 0; // could be done with just i, but using x separately saves calculations
	let i = 0;

	while (x < this.width) {
		const waveHeight = this.pixelize(
			// normalize frequency (plus min intensity) to canvas height; frequency is a byte (max=255)
			(frequencyData[i] + MIN_INTENSITY) * this.height / (255 + MIN_INTENSITY)
		);

		if (waveHeight >= (this.wetSandHeights[i] || 0)) {
			this.wetSandHeights[i] = waveHeight;
			this.wetSandUpdates[i] = Date.now();
		}

		// draw wet sand
		ctx.fillStyle = WET_SAND_COLOR;
		ctx.fillRect(x, this.height - this.wetSandHeights[i] - 2, PIXEL_SIZE, this.wetSandHeights[i]);
		// draw wave crest
		ctx.fillStyle = CREST_COLOR;
		ctx.fillRect(x, this.height - waveHeight, PIXEL_SIZE, waveHeight);
		// draw seafoam
		ctx.fillStyle = SEAFOAM_COLOR;
		ctx.fillRect(x, this.height - waveHeight + CREST_HEIGHT, PIXEL_SIZE, waveHeight);
		// draw shallow water
		ctx.fillStyle = SHALLOW_WATER_COLOR;
		ctx.fillRect(x, this.height - waveHeight + CREST_HEIGHT + SEAFOAM_HEIGHT, PIXEL_SIZE, waveHeight);
		// draw water
		ctx.fillStyle = WATER_COLOR;
		ctx.fillRect(x, this.height - this.pixelize(waveHeight / 2), PIXEL_SIZE, waveHeight);
		// draw deep water
		ctx.fillStyle = DEEP_WATER_COLOR;
		ctx.fillRect(x, this.height - this.pixelize(waveHeight / 4), PIXEL_SIZE, waveHeight);

		if (Date.now() - this.wetSandUpdates[i] > 100) {
			this.wetSandHeights[i] = this.wetSandHeights[i] - PIXEL_SIZE;
			this.wetSandUpdates[i] = Date.now();
		}

		x += PIXEL_SIZE;
		i++;
	}
};
