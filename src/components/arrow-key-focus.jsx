import React from 'react';
import PropTypes from 'prop-types';

// keycodes
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const TAB = 9;

export default class ArrowKeyFocus extends React.Component {

	static propTypes = {
		// for this to work properly, each child must either be a native DOM element or a React component that
		// 1) has a focus() method
		// 2) passes an onKeyDown prop to a native DOM element
		children: PropTypes.node.isRequired,
		focusOnMount: PropTypes.bool,
		preventTab: PropTypes.bool
	};

	componentDidMount() {
		if (this.props.focusOnMount) {
			this.focusables[0].focus();
		}
	}

	focusItem = (i) => {
		let focusIndex = i;

		// wrap the focus at the beginning and end of the list
		if (i >= this.focusables.length) {
			focusIndex = 0;
		} else if (i < 0) {
			focusIndex = this.focusables.length - 1;
		}

		this.focusables[focusIndex].focus();
	}

	render() {
		// an array of refs to our children, each wrapped by an ArrowKeyFocusItem
		this.focusables = [];

		return React.Children.map(this.props.children, (child, i) => {
			const wrappedChild = (
				<ArrowKeyFocusItem
					key={i}
					ref={(e) => { this.focusables[i] = e; }}
					focusNext={() => this.focusItem(i + 1)}
					focusPrev={() => this.focusItem(i - 1)}
					preventTab={this.props.preventTab}
					index={i}
				>
					{child}
				</ArrowKeyFocusItem>
			);
			return wrappedChild;
		});
	}
}

class ArrowKeyFocusItem extends React.Component {

	static propTypes = {
		focusNext: PropTypes.func.isRequired,
		focusPrev: PropTypes.func.isRequired,
		children: PropTypes.node.isRequired,
		index: PropTypes.number.isRequired
	};

	componentDidMount() {
		// throw an error if the child does not have a focus method exposed
		if (typeof this.item.focus !== 'function') {
			throw new Error(
				'Each child of ArrowKeyFocus must be a native DOM element and/or have a focus() method exposed'
			);
		}
	}

	focus = () => {
		this.item.focus();
	}

	render() {
		const Child = React.Children.only(this.props.children);

		// In order to get a ref to our child, we have to clone the child and
		// pass a new ref prop to the clone.
		return Child ? React.cloneElement(Child, {
			ref: (e) => {
				this.item = e;

				// cloning the child and passing a new ref prop overwrites any refs passed
				// to the child by other components. Here we check if there are existing
				// callback-style refs and preserve them on the clone. For more info, see
				// https://github.com/facebook/react/issues/8873#issuecomment-275423780
				const existingRef = Child.ref;
				if (typeof existingRef === 'function') {
					existingRef(e);
				}
			},
			onKeyDown: (e) => {
				if (e.keyCode === LEFT || e.keyCode === UP || (!this.props.preventTab && e.shiftKey && e.keyCode === TAB)) {
					e.preventDefault();
					this.props.focusPrev();
				} else if (e.keyCode === RIGHT || e.keyCode === DOWN || (!this.props.preventTab && e.keyCode === TAB)) {
					e.preventDefault();
					this.props.focusNext();
				}
				// preserve existing onKeyDown props
				if (typeof Child.props.onKeyDown === 'function') {
					Child.props.onKeyDown(e);
				}
			},
			// we control the focus once the user tabs to the first item
			tabIndex: this.props.index === 0 ? 0 : -1
		}) : null;
	}
}
