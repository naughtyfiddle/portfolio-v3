import React from 'react';
import PropTypes from 'prop-types';

export default function WebBrowser(props) {
	return (
		<div className="web-browser">
			<div className="url-bar-wrapper">
				<button
					className="back"
					onClick={props.goBackward}
				>
					{'<'}
				</button>
				<button
					className="forward"
					onClick={props.goForward}
				>
					{'>'}
				</button>
				<input
					type="text"
					className="url-bar"
					value={props.url}
					onChange={(e) => props.setUrl(e.target.value)}
					onKeyDown={props.handleKeyDown}
				/>
			</div>
			<iframe src={props.location}/>
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
