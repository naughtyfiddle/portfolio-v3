import {useEffect} from 'react';

export default function useClickOutside(ref, cb) {
	useEffect(() => {
		const onClickOutside = (e) => {
			if (ref.current !== e.target && !ref.current.contains(e.target)) {
				cb(e);
			}
		};
		document.addEventListener('click', onClickOutside);

		return () => {
			document.removeEventListener('click', onClickOutside);
		};
	}, []);
}
