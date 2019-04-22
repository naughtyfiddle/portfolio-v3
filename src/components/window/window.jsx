import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TitleButtons from './partials/title-buttons';
import styles from './window.module.css';

function clamp(val, min, max) {
	return Math.max(
		Math.min(val, max),
		min
	);
}

export default class Window extends React.Component {

	static propTypes = {
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
	}

	state = {
		top: 0,
		left: 0,
		right: this.props.containerWidth - this.props.app.width,
		bottom: this.props.containerHeight - this.props.app.height,
		isDragging: false,
		isResizing: false
	}

	componentDidMount() {
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	componentWillUnmount() {
		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('mouseup', this.handleMouseUp);
	}

	componentDidUpdate(prevProps) {
		// prevents a bug in which resizing the browser window would let you resize the
		// app below its minWidth and minHeight boundaries
		if (this.props.containerWidth !== prevProps.containerWidth || this.props.containerHeight !== prevProps.containerHeight) {
			const maxRight = this.props.containerWidth - this.state.left - this.props.app.minWidth;
			const maxBottom = this.props.containerHeight - this.state.top - this.props.app.minHeight;

			this.setState({
				right: Math.min(this.state.right, maxRight),
				bottom: Math.min(this.state.bottom, maxBottom)
			});
		}
	}

	get width() {
		return this.props.containerWidth - this.state.left - this.state.right;
	}

	get height() {
		return this.props.containerHeight - this.state.top - this.state.bottom;
	}

	focusWindow = () => {
		this.props.focusApp(this.props.app);
	}

	startDrag = (e) => {
		this.setState({isDragging: true});
		e.preventDefault();
	}

	startResize = () => {
		this.setState({isResizing: true});
	}

	handleMouseUp = () => {
		this.setState({
			isDragging: false,
			isResizing: false
		});
	}

	handleMinimize = (e) => {
		this.props.minimizeApp(this.props.app);
		e.stopPropagation();
	}

	handleMaximize = (e) => {
		if (this.props.app.isMaximized) {
			this.props.unmaximizeApp(this.props.app);
		} else {
			this.props.maximizeApp(this.props.app);
		}
	}

	handleClose = (e) => {
		this.props.killApp(this.props.app);
		e.stopPropagation();
	}

	handleMouseMove = (e) => {
		if (this.state.isDragging) {
			if (this.props.app.isMaximized) {
				this.unmaximizeWithDrag(e.clientX);
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

	unmaximizeWithDrag = (cursorX) => {
		if (cursorX < this.state.left) {
			const left = Math.max(cursorX - Math.ceil(this.width / 2), 0);
			this.setState({
				left,
				right: this.props.containerWidth - left - this.width
			});
		} else if (cursorX > this.state.left + this.width) {
			const right = Math.max(this.props.containerWidth - cursorX - Math.ceil(this.width / 2), 0);
			this.setState({
				right,
				left: this.props.containerWidth - right - this.width
			});
		}

		this.setState({
			top: 0,
			bottom: this.props.containerHeight - this.height
		});

		this.props.unmaximizeApp(this.props.app);
	}

	render() {
		const position = {
			top: this.state.top,
			left: this.state.left,
			right: this.props.app.isResizable ? this.state.right : 'auto',
			bottom: this.props.app.isResizable ? this.state.bottom : 'auto'
		};

		const app = this.props.app;

		/*
			this mask is a bit of a hack to prevent window content from
			interfering with click + drag actions (eg if the window content
			is an iframe it would otherwise swallow mouseup and mousemove events)
		*/
		const mask = this.state.isDragging || this.state.isResizing || !app.isFocused ? (
			<div className={styles.contentMask}/>
		) : null;

		return !app.isMinimized ? (
			<div
				className={classnames(styles.window, {
					[styles.focused]: app.isFocused,
					[styles.maximized]: app.isMaximized
				})}
				style={position}
				onMouseDown={this.focusWindow}
			>
				<div
					className={styles.title}
					onMouseDown={this.startDrag}
				>
					<img src={app.iconSrc} className={styles.titleIcon} alt=""/>
					{app.name}
					<TitleButtons
						onMinimize={this.handleMinimize}
						onMaximize={this.handleMaximize}
						onClose={this.handleClose}
						canMaximize={app.isResizable}
						isMaximized={app.isMaximized}
					/>
				</div>
				<div className={styles.content}>
					{this.props.children}
					{mask}
				</div>
				{app.isResizable && !app.isMaximized ? (
					<div className={styles.footer}>
						{/* purposefully use a div rather than a button here to prevent keyboard interaction */}
						<div
							className={styles.resize}
							onMouseDown={this.startResize}
						/>
					</div>
				) : null}
			</div>
		) : null;
	}
}
