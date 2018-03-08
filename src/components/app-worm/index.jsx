import React from 'react';
import WormGame from '../../worm';

export default class Worm extends React.Component {
	componentDidMount() {
		this.game = new WormGame(this.canvas);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isFocused && !this.props.isFocused) {
			this.game.pause();
		}
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
