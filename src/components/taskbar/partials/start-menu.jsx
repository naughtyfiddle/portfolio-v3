import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import Apps from '../../../apps';
import StartMenuAppList from './start-menu-app-list';
import useClickOutside from 'src/hooks/useClickOutside';

import styles from './start-menu.module.css';

export default function StartMenu(props) {
	const menu = useRef(null);
	useClickOutside(menu, props.close);

	return (
		<div
			className={styles.startMenu}
			ref={menu}
		>
			<div className={styles.menuLogo}>
				<div className={styles.verticalText}>
					pizza-pizza
				</div>
			</div>
			<StartMenuAppList
				apps={Apps}
				launchApp={props.launchApp}
			/>
		</div>
	);
}

StartMenu.propTypes = {
	launchApp: PropTypes.func.isRequired,
	close: PropTypes.func.isRequired
};
