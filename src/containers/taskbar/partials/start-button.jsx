import React from 'react';
import StartMenu from './start-menu';

export default class StartButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	render() {
		return (
			<div
				className={`start-button${this.state.open ? ' active' : ''}`}
				onClick={() => this.setState({open: !this.state.open})}
			>
				<img src="./static/img/start.png"/>
				<div className="center-vertical">
					Start
				</div>
				{
					this.state.open ? (
						<StartMenu
							launchApp={this.props.launchApp}
							open={this.state.open}
							close={() => this.setState({open: false})}
						/>
					) : null
				}
			</div>
		);
	}
}
