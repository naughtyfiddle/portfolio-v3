import React from 'react';
import PropTypes from 'prop-types';

export default function DesktopIcon(props) {
	return (
		<button
			className="desktop-icon"
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
