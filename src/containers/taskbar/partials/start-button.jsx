import React from 'react';

export default class StartButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	render() {
		return (
			<div className="start-button">
				<img src="./static/img/start.png"/>
				<div className="center-vertical">
					Start
				</div>
			</div>
		);
	}
}
