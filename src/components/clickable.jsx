import PropTypes from 'prop-types';
import React from 'react';

const SPACE = 32;
const ENTER = 13;

export default class Clickable extends React.Component {

	static propTypes = {
		children: PropTypes.node,
		disabled: PropTypes.bool,
		className: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		element: PropTypes.string.isRequired
	}

	state = {
		hasFocus: false
	}

	onKeyDown = (e) => {
		if (this.state.hasFocus && (e.keyCode === SPACE || e.keyCode === ENTER)) {
			if (!this.props.disabled) {
				this.props.onClick(e);
			}
		}
		if (this.props.onKeyDown instanceof Function) {
			this.props.onKeyDown(e);
		}
	}

	onClick = (e) => {
		if (!this.props.disabled) {
			this.props.onClick(e);
		}
	}

	onFocus = (e) => {
		if (this.props.onFocus instanceof Function) {
			this.props.onFocus(e);
		}
		this.setState({hasFocus: true});
	}

	onBlur = (e) => {
		if (this.props.onBlur instanceof Function) {
			this.props.onBlur(e);
		}
		this.setState({hasFocus: false});
	}

	focus = () => {
		this.component.focus();
	}

	render() {
		const {
			element: Component,
			children,
			disabled,
			className,
			...passThroughProps
		} = this.props;

		let passClassName = className;
		if (disabled) {
			passClassName += ' disabled';
		}

		const props = {
			role: 'button',
			tabIndex: 0,
			...passThroughProps,
			onKeyDown: this.onKeyDown,
			onFocus: this.onFocus,
			onBlur: this.onBlur,
			onClick: this.onClick,
			className: passClassName
		};

		return (
			<Component
				{...props}
				ref={(e) => { this.component = e; }}
			>
				{children}
			</Component>
		);
	}
}
