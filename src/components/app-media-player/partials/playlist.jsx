import React from 'react';
import PropTypes from 'prop-types';
import styles from './playlist.module.css';

export default function Playlist(props) {
	return (
		<div className={styles.wrapper}>
			<table className={styles.playlist}>
				<thead>
					<tr>
						<th>#</th>
						<th className={styles.titleColumn}>
							Title
						</th>
						<th>Length</th>
					</tr>
				</thead>
				<tbody>
					{ props.songs.map((song) => (
						<tr
							key={`${song.artist}/${song.album}/${song.title}`}
							className={song === props.nowPlaying ? styles.selected : null}
							onDoubleClick={() => props.onSelectSong(song)}
						>
							<td>
								<span className={styles.trackNumber}>
									{song.track}
								</span>
								{ props.paused || song !== props.nowPlaying ? (
									<button
										className={styles.playButton}
										onClick={() => props.onSelectSong(song)}
									>
										{'>'}
									</button>
								) : (
									<button
										className={styles.playButton}
										onClick={props.onPause}
									>
										{'||'}
									</button>
								) }
							</td>
							<td className={styles.titleColumn}>
								{song.title}
							</td>
							<td>{song.length}</td>
						</tr>
					)) }
				</tbody>
			</table>
		</div>
	);
}

Playlist.propTypes = {
	songs: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		album: PropTypes.string,
		artist: PropTypes.string,
		length: PropTypes.string
	})),
	onSelectSong: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired,
	paused: PropTypes.bool,
	nowPlaying: PropTypes.object
};
