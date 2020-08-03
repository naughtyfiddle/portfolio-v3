import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {clamp} from 'src/util';
import styles from './scrubber.module.css';

function formatTime(seconds) {
	const minute = Math.floor(seconds / 60);

	// remaining seconds in this minute, prepended with a 0 if less than 2 digits
	const minuteSeconds = `0${Math.floor(seconds % 60)}`.slice(-2);

	return `${minute}:${minuteSeconds}`;
}

export default class Scrubber extends React.Component {

	static propTypes = {
		disabled: PropTypes.bool,
		seeking: PropTypes.bool, // true if the <audio> element itself is performing a seek operation
		currentTime: PropTypes.number,
		duration: PropTypes.number,
		onSeek: PropTypes.func.isRequired
	};

	state = {
		isSeeking: false,
		seekPosition: 0
	};

	track = React.createRef();

	componentDidMount() {
		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mouseup', this.endSeek);
	}

	componentWillUnmount() {
		document.addEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mouseup', this.endSeek);
	}

	onMouseMove = (e) => {
		if (this.state.isSeeking) {
			this.seek(e);
		}
	}

	beginSeek = (e) => {
		// add .seeking to the body since the cursor can easily leave the scrubber
		document.body.classList.add(styles.seeking);
		this.setState({ isSeeking: true });
		this.seek(e);
	}

	seek = (e) => {
		const rect = this.track.current.getBoundingClientRect();

		// we want to use the clientX position of the cursor in case it moves off the track,
		// so minX and maxX both represent values in client space
		const minX = rect.left;
		const maxX = rect.left + rect.width;

		this.setState({
			// however, we want seekPosition to be in offset space; subtract the client left
			seekPosition: clamp(e.clientX, minX, maxX) - minX
		});
	}

	endSeek = () => {
		if (this.state.isSeeking) {
			document.body.classList.remove(styles.seeking);

			// get playhead position as a percentage of the track width
			const trackWidth = this.track.current.getBoundingClientRect().width;
			const seekPercentage = this.state.seekPosition / trackWidth;

			// seek to chosen position
			this.props.onSeek(seekPercentage * this.props.duration);
			this.setState({ isSeeking: false });
		}
	}

	render() {
		// || 0 to filter out NaN
		const currentTime = this.props.currentTime || 0;
		const duration = this.props.duration || 0;

		// if we're currently seeking, playhead position is stored in state
		let playheadPosition = this.state.seekPosition;

		// if we're not seeking, playhead position is based on currentTime and duration
		if (!this.state.isSeeking && !this.props.seeking) {
			playheadPosition = duration > 0 ? `${currentTime / duration * 100}%` : '0%';
		}

		return (
			<div className={styles.scrubber}>
				<div className={styles.time}>
					{formatTime(currentTime)}
				</div>
				<div
					className={styles.track}
					ref={this.track}
				>
					<div
						className={classnames(styles.playhead, {
							[styles.seeking]: this.state.isSeeking,
							[styles.disabled]: this.props.disabled
						})}
						style={{ left: playheadPosition }}
						onMouseDown={this.props.disabled ? null : this.beginSeek}
					/>
				</div>
				<div className={styles.time}>
					{formatTime(duration)}
				</div>
			</div>
		);
	}
}
