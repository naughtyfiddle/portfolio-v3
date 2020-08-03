import React, {useState, useEffect} from 'react';
import styles from './clock.module.css';

function getCurrentTime() {
	const date = new Date();
	return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

export default function Clock() {
	const [time, setTime] = useState(getCurrentTime());

	useEffect(() => {
		const interval = window.setInterval(() => {
			setTime(getCurrentTime());
		}, 1000);

		return () => window.clearInterval(interval);
	}, []);

	return (
		<div className={styles.clock}>
			<div className="center-vertical">
				{time}
			</div>
		</div>
	);
}
