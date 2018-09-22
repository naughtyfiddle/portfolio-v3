import React from 'react';
import PropTypes from 'prop-types';
import StartMenu from './start-menu';

export default class StartButton extends React.Component {

	static propTypes = {
		launchApp: PropTypes.func.isRequired
	}

	state = { open: false }

	render() {
		const startMenu = this.state.open ? (
			<StartMenu
				launchApp={this.props.launchApp}
				open={this.state.open}
				close={() => this.setState({open: false})}
			/>
		) : null;

		return (
			<div className="start-button-wrapper">
				<button
					className={`start-button${this.state.open ? ' active' : ''}`}
					onClick={() => this.setState({open: !this.state.open})}
				>
					<img src="./static/img/start.png" alt=""/>
					Start
				</button>
				{startMenu}
			</div>
		);
	}
}
