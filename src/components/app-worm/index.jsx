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
			<div className="worm-app">
				<canvas
					className="worm-canvas"
					ref={(e) => { this.canvas = e; }}
				/>
				<div className="desktop-controls">
					<div className="worm-desc">
						<div>
							A game by Christian Dinh
						</div>
						<div>
							<a href="https://github.com/bass-dandy/w0rm" target="blank">
								github.com/bass-dandy/w0rm
							</a>
						</div>
					</div>
					<table className="controls-table">
						<tbody>
							<tr>
								<td>arrow keys</td>
								<td>move</td>
							</tr>
							<tr>
								<td>z, x</td>
								<td>shoot portals</td>
							</tr>
							<tr>
								<td>esc</td>
								<td>pause</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
