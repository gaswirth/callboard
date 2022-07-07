/**
 * Hooks.
 */

import { useEffect, useRef } from 'react';

/**
 * Runs a function at an interval.
 *
 * @link https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param {Function} callback The callback to run at interval.
 * @param {Number} delay The interval.
 */
export function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
