import React from 'react';
import PropTypes from 'prop-types';

export default function Wallpaper(props) {
	return (
		<div
			className="wallpaper"
			onClick={props.onClick}
		>
			<img src="static/img/wallpaper.png" alt=""/>
		</div>
	);
}

Wallpaper.propTypes = {
	onClick: PropTypes.func
};
