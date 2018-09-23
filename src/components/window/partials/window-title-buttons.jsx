import React from 'react';
import PropTypes from 'prop-types';

export default class WindowTitleButtons extends React.Component {

	static propTypes = {
		onMinimize: PropTypes.func.isRequired,
		onMaximize: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
		canMaximize: PropTypes.bool
	}

	componentDidMount() {
		this.closeButton.focus();
	}

	render() {
		const maximizeFileName = this.props.isMaximized ? 'restore_down' : 'maximize';

		return (
			<div className="window-title-buttons">
				<button
					className="window-title-button"
					onClick={this.props.onMinimize}
				>
					<img src="static/img/minimize.png" alt="minimize window"/>
				</button>
				{ this.props.canMaximize ? (
					<button
						className="window-title-button"
						onClick={this.props.onMaximize}
					>
						<img
							src={`static/img/${maximizeFileName}.png`}
							alt="maximize window"
						/>
					</button>
				) : null }
				<button
					className="window-title-button"
					onClick={this.props.onClose}
					ref={(e) => { this.closeButton = e; }}
				>
					<img src="static/img/close.png" alt="close window"/>
				</button>
			</div>
		);
	}
}
