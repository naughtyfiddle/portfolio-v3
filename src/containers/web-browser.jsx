import React from 'react';
import {connect} from 'react-redux';
import WebBrowser from '../components/app-web-browser';

import {
	reset,
	navigate,
	setUrl,
	goForward,
	goBackward
} from '../redux/web-browser';

class WebBrowserContainer extends React.Component {

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
			<WebBrowser
				goBackward={this.props.goBackward}
				goForward={this.props.goForward}
				setUrl={this.props.setUrl}
				handleKeyDown={this.handleKeyDown}
				url={this.props.url}
				location={this.props.location}
			/>
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

export default connect(mapStateToProps, mapDispatchToProps)(WebBrowserContainer);
