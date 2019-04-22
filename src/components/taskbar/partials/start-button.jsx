import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StartMenu from './start-menu';

import StartIcon from 'static/img/start.png';
import styles from './start-button.module.css';

export default class StartButton extends React.Component {

	static propTypes = {
		launchApp: PropTypes.func.isRequired
	}

	state = { open: false }

	render() {
		return (
			<div className={styles.wrapper}>
				<button
					className={classnames(styles.startButton, {
						[styles.active]: this.state.open
					})}
					onClick={() => this.setState({open: !this.state.open})}
				>
					<img src={StartIcon} alt=""/>
					Start
				</button>
				{ this.state.open ? (
					<StartMenu
						launchApp={this.props.launchApp}
						open={this.state.open}
						close={() => this.setState({open: false})}
					/>
				) : null }
			</div>
		);
	}
}
