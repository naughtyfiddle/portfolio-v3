import React from 'react';
import PropTypes from 'prop-types';

import placeholderIcon from 'static/img/media-player/blank-cd.png';
import playIcon from 'static/img/media-player/play.svg';
import pauseIcon from 'static/img/media-player/pause.svg';
import skipNextIcon from 'static/img/media-player/skip-next.svg';
import skipPrevIcon from 'static/img/media-player/skip-prev.svg';
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
							className={styles.mediaButton}
							aria-label="play previous song"
						>
							<img src={skipPrevIcon} alt="play previous song" />
						</button>
						{ props.paused ? (
							<button
								onClick={props.onPlay}
								className={styles.mediaButton}
								aria-label="play"
							>
								<img src={playIcon}/>
							</button>
						) : (
							<button
								onClick={props.onPause}
								className={styles.mediaButton}
								aria-label="pause"
							>
								<img src={pauseIcon} alt="pause" />
							</button>
						) }
						<button
							onClick={props.onPlayNext}
							className={styles.mediaButton}
							aria-label="play next song"
						>
							<img src={skipNextIcon} alt="play next song" />
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
