import React from 'react';
import WormGame from '@bass_dandy/w0rm';
import Controls from './partials/controls';
import styles from './worm.module.css';

export default class Worm extends React.Component {

	state = {
		game: null,
		score: 0
	}

	componentDidMount() {
		const game = new WormGame(
			this.canvas,
			(score) => this.setState({score})
		);
		game.enableKeyboardControls();
		this.setState({game});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isFocused && !this.props.isFocused) {
			this.state.game.pause();
			this.state.game.disableKeyboardControls();
		} else if (!prevProps.isFocused && this.props.isFocused) {
			this.state.game.enableKeyboardControls();
		}
	}

	componentWillUnmount() {
		this.state.game.end();
	}

	render() {
		return (
			<div className={styles.worm}>
				<div className={styles.scoreContainer}>
					Score:
					<div className={styles.score}>
						{this.state.score * 100}
					</div>
				</div>
				<canvas
					className={styles.canvas}
					ref={(e) => { this.canvas = e; }}
				/>
				{ this.state.game ? (
					<Controls game={this.state.game}/>
				) : null }
			</div>
		);
	}
}
