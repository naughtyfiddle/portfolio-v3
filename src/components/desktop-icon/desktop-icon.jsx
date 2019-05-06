import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './desktop-icon.module.css';

export default function DesktopIcon(props) {
	const icon = useRef(null);

	useEffect(() => {
		const focusKilled = (e) => {
			if (e.detail === props.app.name) {
				icon.current.focus();
			}
		}
		window.addEventListener('appkilled', focusKilled);
		return () => window.removeEventListener('appkilled', focusKilled);
	}, []);

	return (
		<button
			ref={icon}
			className={styles.desktopIcon}
			onClick={() => props.launchApp(props.app)}
		>
			<img src={props.app.iconSrc} alt=""/>
			<br/>
			{props.app.name}
		</button>
	);
}

DesktopIcon.propTypes = {
	launchApp: PropTypes.func.isRequired,
	app: PropTypes.shape({
		iconSrc: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
};
