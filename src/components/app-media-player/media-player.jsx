import React, {useRef, useState} from 'react';

import songs from './songs';
import NowPlaying from './partials/now-playing';
import Playlist from './partials/playlist';
import Scrubber from './partials/scrubber';

import styles from './media-player.module.css';

export default function MediaPlayer(props) {
	const audio = useRef(null);

	const [nowPlaying, setNowPlaying] = useState(null);
	const [paused, setPaused] = useState(true);
	const [currentTime, setCurrentTime] = useState(0);
	const [seeking, setSeeking] = useState(false);

	const selectSong = (song) => {
		song !== nowPlaying
			? setNowPlaying(song)
			: audio.current.play();
	};

	const playPrev = () => {
		const nowPlayingIndex = songs.findIndex((song) => song === nowPlaying);
		if (nowPlayingIndex > 0) {
			setNowPlaying(songs[nowPlayingIndex - 1]);
		} else {
			audio.current.load();
		}
	};

	const playNext = () => {
		const nowPlayingIndex = songs.findIndex((song) => song === nowPlaying);
		if (nowPlayingIndex + 1 < songs.length) {
			setNowPlaying(songs[nowPlayingIndex + 1])
		} else {
			setNowPlaying(null);
			audio.current.load();
		}
	};

	return (
		<div className={styles.mediaPlayer}>
			<NowPlaying
				song={nowPlaying}
				onPlay={() => audio.current.play()}
				onPause={() => audio.current.pause()}
				onPlayPrev={playPrev}
				onPlayNext={playNext}
				paused={paused}
			/>
			<Scrubber
				disabled={!nowPlaying}
				currentTime={currentTime}
				duration={audio.current && audio.current.duration}
				onSeek={(time) => {
					audio.current.currentTime = time;
					setSeeking(true);
				}}
				seeking={seeking}
			/>
			<Playlist
				songs={songs}
				nowPlaying={nowPlaying}
				onSelectSong={selectSong}
				onPause={() => audio.current.pause()}
				paused={paused}
			/>
			<audio
				src={nowPlaying && nowPlaying.src}
				ref={audio}
				onPlay={() => setPaused(false)}
				onPause={() => setPaused(true)}
				onLoadedData={() => audio.current.play()}
				onTimeUpdate={() => setCurrentTime(audio.current.currentTime)}
				onSeeked={() => setSeeking(false)}
				onEnded={playNext}
			/>
		</div>
	);
}
