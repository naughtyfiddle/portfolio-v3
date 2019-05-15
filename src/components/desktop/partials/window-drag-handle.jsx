import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import styles from './window-drag-handle.module.css';

export default function WindowDragHandle(props) {
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const handleMouseUp = () => {
			setIsDragging(false);
			props.onDragEnd && props.onDragEnd();
		};
		const handleWindowDrag = (e) => {
			if (isDragging) {
				props.onDrag(e);
			}
		};
		document.addEventListener('mousemove', handleWindowDrag);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleWindowDrag);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging]);

	return (
		<div
			className={styles.windowHeader}
			onMouseDown={(e) => {
				e.persist();
				props.onDragStart && props.onDragStart(e);
				setIsDragging(true);
			}}
		>
			<img
				src={props.iconSrc}
				className={styles.icon}
				alt=""
			/>
			<h2 className={styles.title}>
				{props.title}
			</h2>
		</div>
	);
}

WindowDragHandle.propTypes = {
	title: PropTypes.string,
	iconSrc: PropTypes.string,
	onDrag: PropTypes.func.isRequired,
	onDragStart: PropTypes.func,
	onDragEnd: PropTypes.func
};
