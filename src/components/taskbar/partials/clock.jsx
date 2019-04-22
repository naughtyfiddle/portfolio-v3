import React from 'react';
import styles from './clock.module.css';

export default class Clock extends React.Component {

	state = {
		time: this.getCurrentTime(),
		interval: null
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
		return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
	}

	render() {
		return (
			<div className={styles.clock}>
				<div className="center-vertical">
					{this.state.time}
				</div>
			</div>
		);
	}
}
