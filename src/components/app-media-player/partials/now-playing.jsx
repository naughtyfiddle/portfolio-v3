import React from 'react';
import PropTypes from 'prop-types';

import placeholderIcon from 'static/img/blank-cd.png';
import styles from './now-playing.module.css';

export default function NowPlaying(props) {
	const {song} = props;

	return (
		<div className={styles.nowPlaying}>
			<div className={styles.album}>
				<img src={song ? song.cover : placeholderIcon} />
			</div>
			{ song ? (
				<div className={styles.songInfo}>
					<div className={styles.song}>
						{song.title}
					</div>
					<div className={styles.artist}>
						{song.artist}
					</div>
					<div className={styles.controls}>
						<button onClick={props.onPlayPrev}>
							{'|<'}
						</button>
						{ props.paused ? (
							<button onClick={props.onPlay}>
								{'>'}
							</button>
						) : (
							<button onClick={props.onPause}>
								{'||'}
							</button>
						) }
						<button onClick={props.onPlayNext}>
							{'>|'}
						</button>
					</div>
				</div>
			) : null }
		</div>
	);
}

NowPlaying.propTypes = {
	song: PropTypes.shape({
		title: PropTypes.string,
		artist: PropTypes.string
	}),
	onPlay: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired,
	onPlayPrev: PropTypes.func.isRequired,
	onPlayNext: PropTypes.func.isRequired,
	paused: PropTypes.bool
};
