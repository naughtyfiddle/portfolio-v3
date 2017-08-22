import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import WindowTitleButtons from './partials/window-title-buttons';

export default class Window extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			top: 0,
			left: 0,
			width: props.app.width || 500,
			height: props.app.height || 500,
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
		if (this.state.top === 0 && this.state.left === 0 && this.props.app.isMaximized) {
			this.props.unmaximizeApp(this.props.app);
		} else {
			this.setState({top: 0, left: 0});
			this.props.maximizeApp(this.props.app);
		}
	}

	handleClose(e) {
		this.props.killApp(this.props.app);
		e.stopPropagation();
	}

	handleMouseMove(e) {
		if (this.state.isDragging) {
			this.setState({
				top: Math.max(this.state.top + e.movementY, 0),
				left: this.state.left + e.movementX
			});
		} else if (this.state.isResizing) {
			this.setState({
				height: Math.max(this.state.height + e.movementY, 0),
				width: Math.max(this.state.width + e.movementX, 0)
			});
		}
	}

	render() {
		const position = {
			top: this.state.top,
			left: this.state.left
		};

		const footer = this.props.app.isResizable ? (
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
					maximized: this.props.app.isMaximized,
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
					<this.props.app.content
						width={this.state.width}
						height={this.state.height}
					/>
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
		isResizable: PropTypes.bool,
		content: PropTypes.func.isRequired
	}).isRequired,
	killApp: PropTypes.func.isRequired,
	focusApp: PropTypes.func.isRequired,
	maximizeApp: PropTypes.func.isRequired,
	minimizeApp: PropTypes.func.isRequired,
	unmaximizeApp: PropTypes.func.isRequired
};
