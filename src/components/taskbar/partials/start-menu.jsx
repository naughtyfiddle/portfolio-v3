import React, {useRef, useEffect}  from 'react';
import PropTypes from 'prop-types';

import Apps from '../../../apps';
import ArrowKeyFocus from '../../arrow-key-focus';
import StartMenuAppList from './start-menu-app-list';

import styles from './start-menu.module.css';

export default function StartMenu(props) {
	const menu = useRef(null);

	useEffect(() => {
		const rootClose = (e) => {
			if (menu.current !== e.target && !menu.current.contains(e.target)) {
				props.close();
			}
		};
		document.addEventListener('click', rootClose);

		return () => {
			document.removeEventListener('click', rootClose);
		};
	}, []);

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
