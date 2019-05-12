import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {clamp} from 'src/util';
import Directory from '../app-directory';
import TitleButtons from './partials/title-buttons';
import styles from './window.module.css';

export default class Window extends React.Component {

	static propTypes = {
		app: PropTypes.shape({
			width: PropTypes.number,
			height: PropTypes.number,
			name: PropTypes.string.isRequired,
			iconSrc: PropTypes.string,
			resizeDisabled: PropTypes.bool,
			isMinimized: PropTypes.bool,
			isMaximized: PropTypes.bool
		}).isRequired,
		kill: PropTypes.func.isRequired,
		focus: PropTypes.func.isRequired,
		maximize: PropTypes.func.isRequired,
		minimize: PropTypes.func.isRequired,
		unmaximize: PropTypes.func.isRequired
	};

	state = {
		top: 0,
		left: 0,
		right: this.props.app.width ? (this.props.containerWidth - this.props.app.width) : null,
		bottom: this.props.app.width ? (this.props.containerHeight - this.props.app.height) : null,
		isDragging: false,
		isResizing: false
	};

	componentDidMount() {
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('mouseup', this.handleMouseUp);
		this.titleButtons.focus();
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
		// shift focus if window was just unminimized
		if (prevProps.app.isMinimized && !this.props.app.isMinimized) {
			this.titleButtons.focus();
		}
	}

	componentDidCatch() {
		this.props.kill();
	}

	get width() {
		return this.props.containerWidth - this.state.left - this.state.right;
	}

	get height() {
		return this.props.containerHeight - this.state.top - this.state.bottom;
	}

	handleMouseUp = () => {
		this.setState({
			isDragging: false,
			isResizing: false
		});
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

		this.props.unmaximize();
	}

	render() {
		const {app} = this.props;

		return (
			<div
				className={classnames(styles.window, {
					[styles.focused]: app.isFocused,
					[styles.maximized]: app.isMaximized,
					[styles.minimized]: app.isMinimized
				})}
				style={{
					top: this.state.top,
					left: this.state.left,
					right: this.props.app.resizeDisabled ? null : this.state.right,
					bottom: this.props.app.resizeDisabled ? null : this.state.bottom
				}}
				onMouseDown={this.props.focus}
			>
				<div
					className={styles.title}
					onMouseDown={(e) => {
						e.preventDefault();
						this.setState({isDragging: true});
					}}
				>
					<img
						src={app.iconSrc}
						className={styles.titleIcon}
						alt=""
					/>
					<h2>
						{app.name}
					</h2>
					<TitleButtons
						ref={(e) => { this.titleButtons = e; }}
						appName={app.name}
						onMinimize={this.props.minimize}
						onMaximize={this.props.app.isMaximized ? this.props.unmaximize : this.props.maximize}
						onClose={this.props.kill}
						canMaximize={!app.resizeDisabled}
						isMaximized={app.isMaximized}
					/>
				</div>
				<div className={styles.content}>
					{ app.content ? (
						<app.content isFocused={app.isFocused} />
					) : null }
					{ app.children ? (
						<Directory contents={app.children} />
					) : null }
					{/*
						this mask is a bit of a hack to prevent window content from
						interfering with click + drag actions (eg if the window content
						is an iframe it would otherwise swallow mouseup and mousemove events)
					*/}
					{ this.state.isDragging || this.state.isResizing || !app.isFocused ? (
						<div className={styles.contentMask} />
					) : null }
				</div>
				{ !app.resizeDisabled && !app.isMaximized ? (
					<div className={styles.footer}>
						<div
							className={styles.resize}
							onMouseDown={() => this.setState({isResizing: true})}
						/>
					</div>
				) : null }
			</div>
		);
	}
}
