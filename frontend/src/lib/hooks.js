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

/**
 *
 * @param {Object} shows A collection of Shows.
 * @param {Number} id The Show to retrieve's ID.
 * @returns {Show|void} The selected Show, or void.
 */
export function useShow(shows, id) {
	if (!shows || !id || !shows[id]) return;

	return shows[id];
}
