import React, {useRef} from 'react';
import {download} from 'src/util';
import MenuBar from '../menu-bar';

import resumePdf from 'static/img/resume/resume.pdf';
import styles from './resume.module.css';

export default function Resume() {
	const iframe = useRef(null);

	return (
		<div className={styles.resume}>
			<MenuBar
				options={{
					File: [
						{
							label: 'Download pdf',
							onClick: () => download(resumePdf)
						},
						{
							label: 'Print',
							onClick: () => iframe.current.contentWindow.print()
						}
					],
					View: [
						{
							label: 'Open in New Tab',
							onClick: () => window.open(resumePdf)
						}
					]
				}}
			/>
			<div className={styles.frame}>
				<iframe
					src={resumePdf}
					ref={iframe}
				/>
			</div>
		</div>
	);
}
