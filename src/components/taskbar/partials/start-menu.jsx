import React from 'react';
import PropTypes from 'prop-types';
import Apps from '../../../apps';
import Clickable from '../../clickable';

export default class StartMenu extends React.Component {

	static propTypes = {
		close: PropTypes.func.isRequired,
		launchApp: PropTypes.func.isRequired
	}

	componentDidMount() {
		document.addEventListener('click', this.rootClose);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.rootClose);
	}

	rootClose = (e) => {
		if (this.menu !== e.target && !this.menu.contains(e.target)) {
			this.props.close();
		}
	}

	launchApp = (app) => {
		// timeout prevents the window from closing as soon as it opens when using keyboard controls
		window.setTimeout(this.props.launchApp, 10, app);
		this.props.close();
	}

	render() {
		const apps = Apps.map((app) => {
			return (
				<Clickable
					element="li"
					className="start-menu-item"
					onClick={() => this.launchApp(app)}
					key={app.name}
				>
					<img src={app.iconSrc} alt=""/>
					<div className="start-menu-item-name">
						{app.name}
					</div>
				</Clickable>
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
				<ul className="start-menu-items">
					{apps}
				</ul>
			</div>
		);
	}
}
