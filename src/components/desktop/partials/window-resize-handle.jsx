import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import styles from './window-resize-handle.module.css';

export default function WindowResizeHandle(props) {
	const [isResizing, setIsResizing] = useState(false);

	useEffect(() => {
		const handleMouseUp = () => {
			setIsResizing(false);
			props.onResizeEnd && props.onResizeEnd();
		};
		const handleWindowResize = (e) => {
			if (isResizing) {
				props.onResize(e);
			}
		};
		document.addEventListener('mousemove', handleWindowResize);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleWindowResize);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isResizing]);

	return (
		<div
			className={styles.resizeHandle}
			onMouseDown={(e) => {
				e.persist();
				props.onResizeStart && props.onResizeStart(e);
				setIsResizing(true);
			}}
		/>
	);
}

WindowResizeHandle.propTypes = {
	onResize: PropTypes.func.isRequired,
	onResizeStart: PropTypes.func,
	onResizeEnd: PropTypes.func
};
