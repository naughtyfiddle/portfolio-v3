import React from 'react';
import Controls from './partials/controls';
import WormGame from '../../worm';

export default class Worm extends React.Component {

	state = { game: null }

	componentDidMount() {
		this.setState({ game: new WormGame(this.canvas) });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isFocused && !this.props.isFocused) {
			this.state.game.pause();
		}
	}

	componentWillUnmount() {
		this.state.game.end();
	}

	render() {
		return (
			<div className="worm-app">
				<canvas
					className="worm-canvas"
					ref={(e) => { this.canvas = e; }}
				/>
				{ this.state.game ? (
					<Controls game={this.state.game}/>
				) : null }
			</div>
		);
	}
}
