import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Window extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			top: 0,
			left: 0,
			isDragged: false
		};
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

	handleMouseUp() {
		this.setState({isDragged: false});
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
		if (this.state.isDragged) {
			this.setState({
				top: Math.max(this.state.top + e.movementY, 0),
				left: this.state.left + e.movementX
			});
		}
	}

	render() {
		const position = {
			top: this.state.top,
			left: this.state.left
		};

		return !this.props.app.isMinimized ? (
			<div
				className={classnames('window', {
					maximized: this.props.app.isMaximized,
					focused: this.props.app.isFocused
				})}
				style={position}
				onMouseDown={() => this.props.focusApp(this.props.app)}
			>
				<div
					className="window-title"
					onMouseDown={() => this.setState({isDragged: true})}
				>
					<img src={this.props.app.iconSrc} className="window-title-icon" alt=""/>
					{this.props.app.name}
					<div className="window-title-buttons">
						<button
							className="window-title-button"
							onClick={this.handleMinimize}
						>
							<img src="static/img/minimize.png" alt="minimize window"/>
						</button>
						<button
							className="window-title-button"
							onClick={this.handleMaximize}
						>
							<img src="static/img/maximize.png" alt="maximize window"/>
						</button>
						<button
							className="window-title-button"
							onClick={this.handleClose}
						>
							<img src="static/img/close.png" alt="close window"/>
						</button>
					</div>
				</div>
				<div className="window-content">
					{this.props.children}
				</div>
			</div>
		) : null;
	}
}

Window.propTypes = {
	app: PropTypes.shape({
		name: PropTypes.string.isRequired,
		iconSrc: PropTypes.string
	}).isRequired,
	killApp: PropTypes.func.isRequired,
	focusApp: PropTypes.func.isRequired,
	maximizeApp: PropTypes.func.isRequired,
	minimizeApp: PropTypes.func.isRequired,
	unmaximizeApp: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};
