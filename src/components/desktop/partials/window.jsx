import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {clamp} from 'src/util';
import Directory from '../../app-directory';
import TitleButtons from './window-title-buttons';
import DragHandle from './window-drag-handle';
import ResizeHandle from './window-resize-handle';

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
		width: this.props.app.width || 'auto',
		height: this.props.app.width || 'auto',
		isDragging: false,
		isResizing: false,
		dragOffsetTop: 0,
		dragOffsetLeft: 0
	};

	componentDidMount() {
		this.titleButtons.focus();
	}

	componentDidUpdate(prevProps) {
		// shift focus if window was just unminimized
		if (prevProps.app.isMinimized && !this.props.app.isMinimized) {
			this.titleButtons.focus();
		}
	}

	componentDidCatch() {
		this.props.kill();
	}

	unmaximizeWithDrag = (x, y) => {
		if (x < this.state.left) {
			this.setState({
				dragOffsetLeft: Math.min(x, Math.ceil(this.state.width / 2))
			});
		} else if (x > this.state.left + this.state.width) {
			this.setState({
				dragOffsetLeft: Math.max(
					this.state.width - (this.props.containerWidth - x),
					Math.ceil(this.state.width / 2)
				)
			});
		}
		this.setState({
			left: x,
			top: 0,
			dragOffsetTop: y
		});
		this.props.unmaximize();
	}

	handleWindowDrag = (e) => {
		if (this.props.app.isMaximized) {
			this.unmaximizeWithDrag(e.clientX, e.clientY);
		} else {
			this.setState((state) => ({
				top: clamp(
					e.clientY - state.dragOffsetTop,
					0,
					this.props.containerHeight - this.header.clientHeight - 6 // 6 = margin + border
				),
				left: clamp(
					e.clientX - state.dragOffsetLeft,
					-state.dragOffsetLeft,
					this.props.containerWidth - state.dragOffsetLeft
				)
			}));
		}
	}

	handleWindowResize = (e) => {
		const maxHeight = this.props.containerHeight - this.state.top;
		const maxWidth = this.props.containerWidth - this.state.left;

		this.setState((state) => ({
			width: clamp(e.clientX - state.left, this.props.app.minWidth, maxWidth),
			height: clamp(e.clientY - state.top, this.props.app.minHeight, maxHeight)
		}));
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
					width: this.state.width,
					height: this.state.height
				}}
				onMouseDown={this.props.focus}
			>
				<div
					className={styles.header}
					ref={(e) => { this.header = e; }}
				>
					<DragHandle
						title={app.name}
						iconSrc={app.iconSrc}
						onDrag={this.handleWindowDrag}
						onDragStart={(e) => {
							this.setState((state) => ({
								isDragging: true,
								dragOffsetLeft: e.clientX - state.left,
								dragOffsetTop: e.clientY - state.top
							}));
						}}
						onDragEnd={() => this.setState({ isDragging: false })}
					/>
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
						<app.content
							isFocused={app.isFocused}
							isDragging={this.state.isDragging}
							isResizing={this.state.isResizing}
						/>
					) : null }
					{ app.children ? (
						<Directory contents={app.children} />
					) : null }
				</div>
				{ !app.resizeDisabled && !app.isMaximized ? (
					<div className={styles.footer}>
						<ResizeHandle
							onResize={this.handleWindowResize}
							onResizeStart={() => this.setState({ isResizing: true })}
							onResizeEnd={() => this.setState({ isResizing: false })}
						/>
					</div>
				) : null }
			</div>
		);
	}
}
