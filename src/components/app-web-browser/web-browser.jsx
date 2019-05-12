import React from 'react';
import {connect} from 'react-redux';

import {
	reset,
	navigate,
	setUrl,
	goForward,
	goBackward
} from '../../redux/web-browser';

import styles from './web-browser.module.css';

const ENTER = 13;

class WebBrowser extends React.Component {

	componentWillUnmount() {
		this.props.reset();
	}

	render() {
		return (
			<div className={styles.webBrowser}>
				<div className={styles.urlBarWrapper}>
					<button onClick={this.props.goBackward}>
						{'<'}
					</button>
					<button onClick={this.props.goForward}>
						{'>'}
					</button>
					<input
						type="text"
						className={styles.urlBar}
						value={this.props.url}
						onChange={(e) => this.props.setUrl(e.target.value)}
						onKeyDown={(e) => {
							if (e.keyCode === ENTER) {
								e.preventDefault();
								this.props.navigate();
							}
						}}
					/>
				</div>
				<iframe
					className={styles.frame}
					src={this.props.location}
				/>
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
