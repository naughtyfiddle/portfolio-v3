import React, {useState} from 'react';
import {download} from 'src/util';
import MenuBar from '../menu-bar';

import resumeImg from 'static/img/resume/resume.jpg';
import resumePdf from 'static/img/resume/resume.pdf';
import styles from './resume.module.css';

const DEFAULT_ZOOM = 550;
const MIN_ZOOM = 250;
const MAX_ZOOM = 850;

export default function Resume() {
	const [zoom, setZoom] = useState(DEFAULT_ZOOM);

	return (
		<div className={styles.resume}>
			<MenuBar
				options={{
					File: [
						{
							label: 'Download pdf',
							onClick: () => download(resumePdf)
						}, {
							label: 'Download jpg',
							onClick: () => download(resumeImg)
						}
					],
					View: [
						{
							label: 'Actual Size',
							onClick: () => setZoom(DEFAULT_ZOOM),
							disabled: zoom === DEFAULT_ZOOM
						}, {
							label: 'Zoom In',
							onClick: () => setZoom(zoom + 150),
							disabled: zoom >= MAX_ZOOM
						}, {
							label: 'Zoom Out',
							onClick: () => setZoom(zoom - 150),
							disabled: zoom <= MIN_ZOOM
						}
					]
				}}
			/>
			<div className={styles.frame}>
				<img
					src={resumeImg}
					alt="my resume"
					style={{
						width: zoom
					}}
				/>
			</div>
		</div>
	);
}
