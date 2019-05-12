import React from 'react';
import PropTypes from 'prop-types';
import DesktopIcon from '../desktop-icon';

import styles from './directory.module.css';

export default function Directory(props) {
	return (
		<div className={styles.directory}>
			{ props.contents.map((app) => (
				<DesktopIcon
					key={app.name}
					app={app}
					className={styles.appIcon}
					darkText
				/>
			)) }
		</div>
	);
}

Directory.propTypes = {
	contents: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired
	}))
};

Directory.defaultProps = {
	contents: []
};
