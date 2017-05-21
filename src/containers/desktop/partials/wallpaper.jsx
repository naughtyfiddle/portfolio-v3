import React from 'react';
import PropTypes from 'prop-types';

export default function Wallpaper(props) {
	return <div className="wallpaper" onClick={props.onClick}/>;
}

Wallpaper.propTypes = {
	onClick: PropTypes.func
};
