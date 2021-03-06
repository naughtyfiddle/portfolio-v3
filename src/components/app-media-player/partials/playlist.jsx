import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {download} from 'src/util';

import playIcon from 'static/img/media-player/play.svg';
import pauseIcon from 'static/img/media-player/pause.svg';
import downloadIcon from 'static/img/media-player/download.svg';
import styles from './playlist.module.css';

const ENTER = 13;

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
							className={classnames(styles.playlistItem, {
								[styles.selected]: song === props.nowPlaying
							})}
							onDoubleClick={() => props.onSelectSong(song)}
							onKeyDown={(e) => {
								if (e.keyCode === ENTER) {
									props.onSelectSong(song);
								}
							}}
							tabIndex={0}
						>
							<td>
								<span className={styles.trackNumber}>
									{song.track}
								</span>
								<div className={styles.trackButtons}>
									{ props.paused || song !== props.nowPlaying ? (
										<button
											className={styles.trackButton}
											onClick={() => props.onSelectSong(song)}
											aria-label={`play ${song.title}`}
											tabIndex={-1}
										>
											<img src={playIcon} alt="play" />
										</button>
									) : (
										<button
											className={styles.trackButton}
											onClick={props.onPause}
											aria-label={`pause ${song.title}`}
											tabIndex={-1}
										>
											<img src={pauseIcon} alt="pause" />
										</button>
									) }
									<button
										className={styles.trackButton}
										onClick={() => download(song.src)}
										aria-label={`download ${song.title}`}
									>
										<img src={downloadIcon} alt="download" />
									</button>
								</div>
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
