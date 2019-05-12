export function clamp(val, min, max) {
	return Math.max(
		Math.min(val, max),
		min
	);
}

export function download(url) {
	const link = document.createElement('a');
	link.href = url;
	link.download = url.substr(url.lastIndexOf('/') + 1);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
