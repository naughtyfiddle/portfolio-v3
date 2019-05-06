import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';

import MinimizeIcon from 'static/img/minimize.png';
import MaximizeIcon from 'static/img/maximize.png';
import RestoreDownIcon from 'static/img/restore_down.png';
import CloseIcon from 'static/img/close.png';
import styles from './title-buttons.module.css';

function TitleButtons(props, ref) {
	const closeButton = useRef(null);

	useImperativeHandle(ref, () => ({
		focus() {
			closeButton.current.focus();
		}
	}));

	return (
		<div className={styles.titleButtons}>
			<button
				className={styles.minimize}
				onClick={props.onMinimize}
				aria-label="minimize window"
			>
				<img src={MinimizeIcon} alt=""/>
			</button>
			{ props.canMaximize ? (
				<button
					className={styles.maximize}
					onClick={props.onMaximize}
					aria-label="maximize window"
				>
					<img
						src={props.isMaximized ? RestoreDownIcon : MaximizeIcon}
						alt=""
					/>
				</button>
			) : null }
			<button
				className={styles.close}
				onClick={props.onClose}
				ref={closeButton}
				aria-label="close window"
			>
				<img src={CloseIcon} alt=""/>
			</button>
		</div>
	);
}

TitleButtons = forwardRef(TitleButtons);

TitleButtons.propTypes = {
	appName: PropTypes.string.isRequired,
	onMinimize: PropTypes.func.isRequired,
	onMaximize: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	canMaximize: PropTypes.bool
};

export default TitleButtons;
