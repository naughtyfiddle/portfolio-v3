import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import WindowTitleButtons from './partials/window-title-buttons';

function clamp(val, min, max) {
	return Math.max(
		Math.min(val, max),
		min
	);
}

export default class Window extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			top: 0,
			left: 0,
			right: this.props.containerWidth - this.props.app.width,
			bottom: this.props.containerHeight - this.props.app.height,
			isDragging: false,
			isResizing: false
		};

		this.focusWindow = this.focusWindow.bind(this);
		this.startDrag = this.startDrag.bind(this);
		this.startResize = this.startResize.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMinimize = this.handleMinimize.bind(this);
		this.handleMaximize = this.handleMaximize.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	componentWillUnmount() {
		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('mouseup', this.handleMouseUp);
	}

	get width() {
		return this.props.containerWidth - this.state.left - this.state.right;
	}

	get height() {
		return this.props.containerHeight - this.state.top - this.state.bottom;
	}

	focusWindow() {
		this.props.focusApp(this.props.app);
	}

	startDrag(e) {
		this.setState({isDragging: true});
		e.preventDefault();
	}

	startResize() {
		this.setState({isResizing: true});
	}

	handleMouseUp() {
		this.setState({
			isDragging: false,
			isResizing: false
		});
	}

	handleMinimize(e) {
		this.props.minimizeApp(this.props.app);
		e.stopPropagation();
	}

	handleMaximize(e) {
		if (this.props.app.isMaximized) {
			this.props.unmaximizeApp(this.props.app);
		} else {
			this.props.maximizeApp(this.props.app);
		}
	}

	handleClose(e) {
		this.props.killApp(this.props.app);
		e.stopPropagation();
	}

	handleMouseMove(e) {
		if (this.state.isDragging) {
			if (this.props.app.isMaximized) {
				this.props.unmaximizeApp(this.props.app);
			}

			const left = this.state.left + e.movementX;
			const top = Math.max(this.state.top + e.movementY, 0);

			this.setState({
				top,
				left,
				right: this.props.containerWidth - left - this.width,
				bottom: this.props.containerHeight - top - this.height
			});
		} else if (this.state.isResizing) {
			const maxRight = this.props.containerWidth - this.state.left - this.props.app.minWidth;
			const maxBottom = this.props.containerHeight - this.state.top - this.props.app.minHeight;

			this.setState({
				right: clamp(this.state.right - e.movementX, 0, maxRight),
				bottom: clamp(this.state.bottom - e.movementY, 0, maxBottom)
			});
		}
	}

	render() {
		const position = this.props.app.isMaximized ? {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		} : {
			top: this.state.top,
			left: this.state.left,
			right: this.state.right,
			bottom: this.state.bottom
		};

		/*
			this mask is a bit of a hack to prevent window content from
			interfering with click + drag actions (eg if the window content
			is an iframe it would otherwise swallow mouseup and mousemove events)
		*/
		const mask = this.state.isDragging || this.state.isResizing ? (
			<div className="window-content-mask"/>
		) : null;

		const footer = this.props.app.isResizable && !this.props.app.isMaximized ? (
			<div className="window-footer">
				<button
					className="resize"
					onMouseDown={this.startResize}
				/>
			</div>
		) : null;

		return !this.props.app.isMinimized ? (
			<div
				className={classnames('window', {
					focused: this.props.app.isFocused
				})}
				style={position}
				onMouseDown={this.focusWindow}
			>
				<div
					className="window-title"
					onMouseDown={this.startDrag}
				>
					<img src={this.props.app.iconSrc} className="window-title-icon" alt=""/>
					{this.props.app.name}
					<WindowTitleButtons
						onMinimize={this.handleMinimize}
						onMaximize={this.handleMaximize}
						onClose={this.handleClose}
						canMaximize={this.props.app.isResizable}
					/>
				</div>
				<div className="window-content">
					{this.props.children}
					{mask}
				</div>
				{footer}
			</div>
		) : null;
	}
}

Window.propTypes = {
	app: PropTypes.shape({
		width: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),
		height: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),
		name: PropTypes.string.isRequired,
		iconSrc: PropTypes.string,
		isResizable: PropTypes.bool
	}).isRequired,
	killApp: PropTypes.func.isRequired,
	focusApp: PropTypes.func.isRequired,
	maximizeApp: PropTypes.func.isRequired,
	minimizeApp: PropTypes.func.isRequired,
	unmaximizeApp: PropTypes.func.isRequired,
	children: PropTypes.node
};
