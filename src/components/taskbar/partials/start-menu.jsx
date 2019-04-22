import React from 'react';
import PropTypes from 'prop-types';
import Apps from '../../../apps';
import Clickable from '../../clickable';
import styles from './start-menu.module.css';

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
		return (
			<div
				className={styles.startMenu}
				ref={(e) => { this.menu = e; }}
			>
				<div className={styles.menuLogo}>
					<div className={styles.verticalText}>
						pizza-pizza
					</div>
				</div>
				<ul className={styles.menuItems}>
					{ Apps.map((app) => (
						<Clickable
							element="li"
							className={styles.menuItem}
							onClick={() => this.launchApp(app)}
							key={app.name}
						>
							<img src={app.iconSrc} alt=""/>
							<div className={styles.menuItemName}>
								{app.name}
							</div>
						</Clickable>
					)) }
				</ul>
			</div>
		);
	}
}
