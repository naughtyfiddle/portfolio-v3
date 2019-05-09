import React from 'react';
import PropTypes from 'prop-types';

import placeholderIcon from 'static/img/blank-cd.png';
import styles from './now-playing.module.css';

export default function NowPlaying(props) {
	const {song} = props;

	return (
		<div className={styles.nowPlaying}>
			<img
				src={song ? song.cover : placeholderIcon}
				className={styles.album}
				alt=""
			/>
			<div className={styles.songInfo}>
				<div className={styles.song}>
					{song ? song.title : 'No Song Playing!'}
				</div>
				<div className={styles.artist}>
					{song ? `${song.artist} - ${song.album}` : 'N/A'}
				</div>
				{ song ? (
					<div className={styles.controls}>
						<button
							onClick={props.onPlayPrev}
							aria-label="play previous song"
						>
							{'|<'}
						</button>
						{ props.paused ? (
							<button
								onClick={props.onPlay}
								aria-label="play"
							>
								{'>'}
							</button>
						) : (
							<button
								onClick={props.onPause}
								aria-label="pause"
							>
								{'||'}
							</button>
						) }
						<button
							onClick={props.onPlayNext}
							aria-label="play next song"
						>
							{'>|'}
						</button>
					</div>
				) : null }
			</div>
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