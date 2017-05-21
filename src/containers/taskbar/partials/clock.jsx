import React from 'react';

export default class Clock extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			time: this.getCurrentTime(),
			interval: null
		};
	}

	componentWillMount() {
		const interval = window.setInterval(() => {
			this.setState({
				time: this.getCurrentTime()
			});
		}, 1000);
		this.setState({interval});
	}

	componentWillUnmount() {
		window.clearInterval(this.state.interval);
	}

	getCurrentTime() {
		const date = new Date();
		return date.toLocaleTimeString();
	}

	render() {
		return (
			<div className="clock">
				<div className="center-vertical">
					{this.state.time}
				</div>
			</div>
		);
	}
}
