import React from 'react';
import PropTypes from 'prop-types';

export default function Controls(props) {
	return (
		<>
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
			<div className="mobile-controls">
				<div className="dpad">
					<button className="dpad-up" onClick={props.game.up}/>
					<button className="dpad-left" onClick={props.game.left}/>
					<button className="dpad-right" onClick={props.game.right}/>
					<button className="dpad-down" onClick={props.game.down}/>
				</div>
				<div className="fire">
					<button className="fire1" onClick={props.game.fire1}/>
					<button className="fire2" onClick={props.game.fire2}/>
				</div>
			</div>
		</>
	);
}

Controls.propTypes = {
	game: PropTypes.object.isRequired
};
