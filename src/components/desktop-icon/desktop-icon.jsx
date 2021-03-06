import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {useDispatch} from 'react-redux';

import {launchApp} from 'src/redux/windows';

import styles from './desktop-icon.module.css';

export default function DesktopIcon(props) {
	const dispatch = useDispatch();
	const icon = useRef(null);

	useEffect(() => {
		const focusKilled = (e) => {
			if (e.detail === props.app.name) {
				icon.current.focus();
			}
		};
		window.addEventListener('appkilled', focusKilled);
		return () => window.removeEventListener('appkilled', focusKilled);
	}, []);

	return (
		<button
			ref={icon}
			className={classnames(styles.desktopIcon, props.className, {
				[styles.darkText]: props.darkText
			})}
			onClick={() => dispatch(launchApp(props.app))}
		>
			<img
				src={props.app.iconSrc}
				alt=""
			/>
			{props.app.name}
		</button>
	);
}

DesktopIcon.propTypes = {
	app: PropTypes.shape({
		iconSrc: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	darkText: PropTypes.bool,
	className: PropTypes.string
};
