import React from 'react';
import PropTypes from 'prop-types';
import Apps from '../../desktop/apps';

export default class StartMenu extends React.Component {

	constructor(props) {
		super(props);
		this.rootClose = this.rootClose.bind(this);
		this.launchApp = this.launchApp.bind(this);
	}

	componentDidMount() {
		document.addEventListener('click', this.rootClose);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.rootClose);
	}

	rootClose(e) {
		if (this.menu !== e.target && !this.menu.contains(e.target)) {
			this.props.close();
		}
	}

	launchApp(app) {
		this.props.launchApp(app);
		this.props.close();
	}

	render() {
		const apps = Apps.map((app) => {
			return (
				<div
					className="start-menu-item"
					onClick={() => this.launchApp(app)}
					key={app.name}
				>
					<img src={app.iconSrc} alt=""/>
					<div className="start-menu-item-name">
						{app.name}
					</div>
				</div>
			);
		});

		return (
			<div
				className="start-menu"
				ref={(e) => { this.menu = e; }}
			>
				<div className="start-menu-logo">
					<div className="vertical-text">
						pizza-pizza
					</div>
				</div>
				<div className="start-menu-items">
					{apps}
				</div>
			</div>
		);
	}
}

StartMenu.propTypes = {
	close: PropTypes.func.isRequired,
	launchApp: PropTypes.func.isRequired
};
