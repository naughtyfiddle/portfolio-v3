export default {
	controls: {
		pause: 27,  // esc
		left: 37,  // left arrow
		up: 38,    // up arrow
		right: 39, // right arrow
		down: 40,  // down arrow
		fire1: 88, // x
		fire2: 90  // z
	},
	scene: {
		color: 'white',
		cellCount: 35,
		updateStep: 33 // ~30 fps
	},
	score: {
		color: 'black',
		font: '20px wendy'
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
		color1: '#1daeec',
		color2: '#fc6a21'
	},
	worm: {
		size: 1,
		growthRate: 4,
		color: 'black'
	},
	titleScreen: {
		src: 'static/img/worm/splash.png'
	}
};
