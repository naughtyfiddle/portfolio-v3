import React, {useRef, useState} from 'react';

import songs from './songs';
import Visualizer from './partials/visualizer';
import NowPlaying from './partials/now-playing';
import Playlist from './partials/playlist';
import Scrubber from './partials/scrubber';

import styles from './media-player.module.css';

export default function MediaPlayer(props) {
	const [audio, setAudio] = useState(null);
	const [nowPlaying, setNowPlaying] = useState(null);
	const [paused, setPaused] = useState(true);
	const [currentTime, setCurrentTime] = useState(0);
	const [seeking, setSeeking] = useState(false);

	const selectSong = (song) => {
		song !== nowPlaying
			? setNowPlaying(song)
			: audio.play();
	};

	const playPrev = () => {
		const nowPlayingIndex = songs.findIndex((song) => song === nowPlaying);
		if (nowPlayingIndex > 0) {
			setNowPlaying(songs[nowPlayingIndex - 1]);
		} else {
			audio.load();
		}
	};

	const playNext = () => {
		const nowPlayingIndex = songs.findIndex((song) => song === nowPlaying);
		if (nowPlayingIndex + 1 < songs.length) {
			setNowPlaying(songs[nowPlayingIndex + 1])
		} else {
			setNowPlaying(null);
			audio.load();
		}
	};

	return (
		<div className={styles.mediaPlayer}>
			<div className={styles.header}>
				<Visualizer
					audio={audio}
				/>
				<NowPlaying
					song={nowPlaying}
					onPlay={() => audio.play()}
					onPause={() => audio.pause()}
					onPlayPrev={playPrev}
					onPlayNext={playNext}
					paused={paused}
				/>
			</div>
			<Scrubber
				disabled={!nowPlaying}
				currentTime={currentTime}
				duration={audio && audio.duration}
				onSeek={(time) => {
					audio.currentTime = time;
					setSeeking(true);
				}}
				seeking={seeking}
			/>
			<Playlist
				songs={songs}
				nowPlaying={nowPlaying}
				onSelectSong={selectSong}
				onPause={() => audio.pause()}
				paused={paused}
			/>
			<audio
				src={nowPlaying && nowPlaying.src}
				ref={
					// use callback + state rather than useRef so we can rerender when the ref attaches
					(e) => setAudio(e)
				}
				onPlay={() => setPaused(false)}
				onPause={() => setPaused(true)}
				onLoadedData={() => audio.play()}
				onTimeUpdate={() => setCurrentTime(audio.currentTime)}
				onSeeked={() => setSeeking(false)}
				onEnded={playNext}
			/>
		</div>
	);
}
