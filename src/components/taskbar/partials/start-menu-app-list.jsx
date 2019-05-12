import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ArrowKeyFocus from '../../arrow-key-focus';
import Clickable from '../../clickable';

import styles from './start-menu-app-list.module.css';

export default function StartMenuAppList(props) {
	return (
		<ul
			className={classnames(styles.appList, {
				[styles.floating]: props.floating
			})}
		>
			<ArrowKeyFocus focusOnMount>
				{ props.apps.map((app) => (
					<Clickable
						element="li"
						className={styles.appListItem}
						onClick={(e) => {
							e.stopPropagation();
							props.launchApp(app);
						}}
						key={app.name}
					>
						<img
							src={app.iconSrc}
							alt=""
						/>
						<div className={styles.appName}>
							{app.name}
						</div>
						{ app.children ? (
							<>
								{'\u25b6'}
								<StartMenuAppList
									apps={app.children}
									launchApp={props.launchApp}
									floating
								/>
							</>
						) : null }
					</Clickable>
				)) }
			</ArrowKeyFocus>
		</ul>
	);
}

StartMenuAppList.propTypes = {
	apps: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			iconSrc: PropTypes.string.isRequired,
			children: PropTypes.arrayOf(PropTypes.object)
		})
	).isRequired,
	launchApp: PropTypes.func.isRequired,
	floating: PropTypes.bool
};
