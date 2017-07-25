import React from 'react';

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
