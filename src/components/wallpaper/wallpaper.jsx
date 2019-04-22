import React from 'react';
import PropTypes from 'prop-types';
import WallpaperImg from 'static/img/wallpaper.png';
import styles from './wallpaper.module.css';

export default function Wallpaper(props) {
	return (
		<div
			className={styles.wallpaper}
			onClick={props.onClick}
		>
			<img src={WallpaperImg} alt=""/>
		</div>
	);
}

Wallpaper.propTypes = {
	onClick: PropTypes.func
};
