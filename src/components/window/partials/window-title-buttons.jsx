import React from 'react';
import PropTypes from 'prop-types';

export default function WindowTitleButtons(props) {
	const maximizeFileName = props.isMaximized ? 'restore_down' : 'maximize';

	const maximize = props.canMaximize ? (
		<button
			className="window-title-button"
			onClick={props.onMaximize}
		>
			<img
				src={`static/img/${maximizeFileName}.png`}
				alt="maximize window"
			/>
		</button>
	) : null;

	return (
		<div className="window-title-buttons">
			<button
				className="window-title-button"
				onClick={props.onMinimize}
			>
				<img src="static/img/minimize.png" alt="minimize window"/>
			</button>
			{maximize}
			<button
				className="window-title-button"
				onClick={props.onClose}
			>
				<img src="static/img/close.png" alt="close window"/>
			</button>
		</div>
	);
}

WindowTitleButtons.propTypes = {
	onMinimize: PropTypes.func.isRequired,
	onMaximize: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	canMaximize: PropTypes.bool
};
