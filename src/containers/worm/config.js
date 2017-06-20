export default {
	controls: {
		quit: 27,  // esc
		left: 37,  // left arrow
		up: 38,    // up arrow
		right: 39, // right arrow
		down: 40,  // down arrow
		fire1: 88, // x
		fire2: 90  // z
	},
	scene: {
		color: 'white',
		resolution: 50
	},
	bullet: {
		size: 1,
		speed: 2 // in units per tick
	},
	food: {
		size: 4,
		src: 'static/img/worm/cake.png'
	},
	portal: {
		radius: 2, // number of units from the center to either edge
		depth: 1,
		color1: '#b1c1c4',
		color2: '#e1caa8'
	},
	worm: {
		size: 1,
		color: 'gray'
	}
};
