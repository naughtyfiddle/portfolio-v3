import React from 'react';
import {connect} from 'react-redux';

import {
	reset,
	navigate,
	setUrl,
	goForward,
	goBackward
} from '../../redux/web-browser';

class WebBrowser extends React.Component {

	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentWillMount() {
		this.props.reset();
	}

	handleKeyDown(e) {
		if (e.keyCode === 13) {
			this.props.navigate();
			e.preventDefault();
		}
	}

	render() {
		return (
			<div className="web-browser">
				<div className="url-bar-wrapper">
					<button
						className="back"
						onClick={this.props.goBackward}
					>
						{'<'}
					</button>
					<button
						className="forward"
						onClick={this.props.goForward}
					>
						{'>'}
					</button>
					<input
						type="text"
						className="url-bar"
						value={this.props.url}
						onChange={(e) => this.props.setUrl(e.target.value)}
						onKeyDown={this.handleKeyDown}
					/>
				</div>
				<iframe src={this.props.location}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		url: state.webBrowser.url,
		location: state.webBrowser.location
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setUrl(url) {
			return dispatch(setUrl(url));
		},
		reset() {
			return dispatch(reset());
		},
		navigate() {
			return dispatch(navigate());
		},
		goForward() {
			return dispatch(goForward());
		},
		goBackward() {
			return dispatch(goBackward());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WebBrowser);
