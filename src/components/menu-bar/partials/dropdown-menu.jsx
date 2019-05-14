import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Clickable from '../../clickable';

import styles from './dropdown-menu.module.css';

export default function DropdownMenu(props) {
	return (
		<Clickable
			element="li"
			className={classnames(styles.menuBarItem, {
				[styles.open]: props.isOpen
			})}
			onClick={props.isOpen ? props.onClose : props.onOpen}
			onMouseOver={props.onHover}
			onFocus={props.onHover}
		>
			{props.label}
			<ul
				className={styles.dropdownMenu}
				onClick={(e) => {
					// slight hack to stop clicks on disabled items from closing the menu
					e.stopPropagation();
				}}
			>
				{ props.options.map((option) => (
					<Clickable
						element="li"
						className={classnames(styles.dropdownMenuItem, {
							[styles.disabled]: option.disabled
						})}
						onClick={() => {
							option.onClick();
							props.onClose();
						}}
						disabled={option.disabled}
						key={option.label}
					>
						{option.label}
					</Clickable>
				)) }
			</ul>
		</Clickable>
	);
}

DropdownMenu.propTypes = {
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			onClick: PropTypes.func.isRequired,
			disabled: PropTypes.bool
		})
	).isRequired,
	onOpen: PropTypes.func.isRequired,
	isOpen: PropTypes.bool
};
