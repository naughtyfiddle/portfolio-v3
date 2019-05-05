import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import styles from './visualizer.module.css';

import Visualization from './visualization';

export default function Visualizer(props) {
	const canvas = React.useRef(null);

	useEffect(() => {
		if (props.audio) {
			// connect audio source to analyzer
			const ctx = new AudioContext();
			const analyser = ctx.createAnalyser();
			const src = ctx.createMediaElementSource(props.audio);
			src.connect(analyser);
			analyser.connect(ctx.destination);

			const frequencyData = new Uint8Array(analyser.frequencyBinCount);
			const vis = new Visualization();

			// grab audio analysis every frame and draw the visualization
			let frame = requestAnimationFrame(
				function getFrequencies() {
					frame = requestAnimationFrame(getFrequencies);
					if (canvas.current) {
						analyser.getByteFrequencyData(frequencyData)
						vis.draw(canvas.current, frequencyData);
					}
				}
			);

			// clean up analysis collection
			return () => {
				cancelAnimationFrame(frame);
			};
		}
	}, [props.audio]);

	return (
		<canvas
			ref={canvas}
			className={styles.canvas}
			width={canvas.current && canvas.current.clientWidth}
			height={canvas.current && canvas.current.clientHeight}
		/>
	);
}

Visualizer.propTypes = {
	audio: PropTypes.object
};
