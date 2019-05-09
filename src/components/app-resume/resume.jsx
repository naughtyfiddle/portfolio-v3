import React from 'react';
import ResumeImg from 'static/img/resume/resume.jpg';
import styles from './resume.module.css';

export default function(props) {
	return (
		<div className={styles.resume}>
			<img src={ResumeImg} alt="my resume"/>
		</div>
	);
}
