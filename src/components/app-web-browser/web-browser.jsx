import React from 'react';
import PropTypes from 'prop-types';
import styles from './web-browser.module.css';

export default function WebBrowser(props) {
	return (
		<div className={styles.webBrowser}>
			<div className={styles.urlBarWrapper}>
				<button onClick={props.goBackward}>
					{'<'}
				</button>
				<button onClick={props.goForward}>
					{'>'}
				</button>
				<input
					type="text"
					className={styles.urlBar}
					value={props.url}
					onChange={(e) => props.setUrl(e.target.value)}
					onKeyDown={props.handleKeyDown}
				/>
			</div>
			<iframe
				className={styles.frame}
				src={props.location}
			/>
		</div>
	);
}

WebBrowser.propTypes = {
	goBackward: PropTypes.func.isRequired,
	goForward: PropTypes.func.isRequired,
	setUrl: PropTypes.func.isRequired,
	handleKeyDown: PropTypes.func.isRequired,
	url: PropTypes.string,
	location: PropTypes.string
};
