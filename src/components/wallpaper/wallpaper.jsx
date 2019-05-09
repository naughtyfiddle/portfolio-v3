import React from 'react';
import PropTypes from 'prop-types';
import styles from './wallpaper.module.css';

export default function Wallpaper(props) {
	return (
		<div
			className={styles.wallpaper}
			onClick={props.onClick}
		/>
	);
}

Wallpaper.propTypes = {
	onClick: PropTypes.func
};
