import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from './partials/dropdown-menu';
import useClickOutside from 'src/hooks/useClickOutside';

import styles from './menu-bar.module.css';

export default function MenuBar(props) {
	const [isOpen, setIsOpen] = useState(false);
	const [openItem, setOpenItem] = useState(null);

	const menuBar = useRef(null);
	useClickOutside(menuBar, () => setIsOpen(false));

	return (
		<ul
			className={styles.menuBar}
			ref={menuBar}
		>
			{ Object.keys(props.options).map((label) => (
				<DropdownMenu
					key={label}
					label={label}
					options={props.options[label]}
					isOpen={isOpen && label === openItem}
					onOpen={() => setIsOpen(true)}
					onClose={() => setIsOpen(false)}
					onHover={() => setOpenItem(label)}
				/>
			)) }
		</ul>
	);
}

MenuBar.propTypes = {
	options: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				onClick: PropTypes.func.isRequired,
				disabled: PropTypes.bool
			})
		)
	).isRequired
};
