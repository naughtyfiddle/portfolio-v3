import React from 'react';
import PropTypes from 'prop-types';

import MinimizeIcon from 'static/img/minimize.png';
import MaximizeIcon from 'static/img/maximize.png';
import RestoreDownIcon from 'static/img/restore_down.png';
import CloseIcon from 'static/img/close.png';
import styles from './title-buttons.module.css';

export default class TitleButtons extends React.Component {

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
		return (
			<div className={styles.titleButtons}>
				<button
					className={styles.minimize}
					onClick={this.props.onMinimize}
				>
					<img src={MinimizeIcon} alt="minimize window"/>
				</button>
				{ this.props.canMaximize ? (
					<button
						className={styles.maximize}
						onClick={this.props.onMaximize}
					>
						<img
							src={this.props.isMaximized ? RestoreDownIcon : MaximizeIcon}
							alt="maximize window"
						/>
					</button>
				) : null }
				<button
					className={styles.close}
					onClick={this.props.onClose}
					ref={(e) => { this.closeButton = e; }}
				>
					<img src={CloseIcon} alt="close window"/>
				</button>
			</div>
		);
	}
}
