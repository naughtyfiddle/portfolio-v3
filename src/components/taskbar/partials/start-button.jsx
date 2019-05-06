import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StartMenu from './start-menu';

import StartIcon from 'static/img/start.png';
import styles from './start-button.module.css';

const ESC = 27;

export default function StartButton(props) {
	const [isOpen, setIsOpen] = useState(false);
	const startButton = useRef(null);

	return (
		<div
			className={styles.wrapper}
			onKeyDown={(e) => {
				if (isOpen && e.keyCode === ESC) {
					setIsOpen(false);
					startButton.current.focus();
				}
			}}
		>
			<button
				ref={startButton}
				className={classnames(styles.startButton, {
					[styles.active]: isOpen
				})}
				onClick={() => setIsOpen(!isOpen)}
				aria-label="open app drawer"
			>
				<img src={StartIcon} alt=""/>
				Start
			</button>
			{ isOpen ? (
				<StartMenu
					launchApp={(app) => {
						// timeout prevents the window from closing as soon as it opens when using keyboard controls
						window.setTimeout(props.launchApp, 10, app);
						setIsOpen(false);
					}}
					close={() => setIsOpen(false)}
				/>
			) : null }
		</div>
	);
}

StartButton.propTypes = {
	launchApp: PropTypes.func.isRequired
};
