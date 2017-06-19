import React from 'react';
import WormGame from '../../worm';

export default class Worm extends React.Component {
	componentDidMount() {
		this.game = WormGame(this.canvas);
		this.game.start();
	}

	componentWillUnmount() {
		this.game.end();
	}

	render() {
		return (
			<canvas
				className="worm-app"
				ref={(e) => { this.canvas = e; }}
			/>
		);
	}
}
