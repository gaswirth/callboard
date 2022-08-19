/**
 *  Generally useful hooks.
 */

import { useEffect, useRef, useState } from 'react';
import { isAfter, isBefore } from 'date-fns';

/**
 * Format a login error message.
 *
 * @param {string} errorCode The login error message returned by the server.
 * @returns {string} The message to print.
 */
export function useLoginError(errorCode) {
	var message = '';

	switch (errorCode) {
		case 'invalid_username':
		case 'invalid_email':
			message = 'Invalid username or email address.';
			break;

		case 'incorrect_password':
			message = 'Incorrect password.';
			break;

		case 'empty_username':
			message = 'Please enter a username or email address.';
			break;

		case 'empty_password':
			message = 'Please enter your password.';
			break;

		default:
			message = '';
	}

	return message;
}

/**
 * Use Local Storage Hook.
 *
 * Works the same as useState, but using localStorage.
 *
 * @see {@link https://github.com/mikejolley/morrics-magical-cauldron/blob/main/src/hooks/use-local-storage.js}
 *
 * @param {string} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
export const useLocalStorage = (
	key,
	defaultValue = '',
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
	const [state, setState] = useState(() => {
		const valueInLocalStorage = window.localStorage.getItem(key);
		if (valueInLocalStorage) {
			return deserialize(valueInLocalStorage);
		}
		return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
	});

	const prevKeyRef = useRef(key);

	useEffect(() => {
		const prevKey = prevKeyRef.current;
		if (prevKey !== key) {
			window.localStorage.removeItem(prevKey);
		}
		prevKeyRef.current = key;
		window.localStorage.setItem(key, serialize(state));
	}, [key, state, serialize]);

	return [state, setState];
};

/**
 * Sorts an array of shows by the `datetime` field, descending.
 *
 * @param {Array} shows A collection of shows.
 * @returns The sorted collection of shows.
 */
export const sortShowsByDatetime = (shows) => {
	// XXX necessary check?
	if (!shows) return;

	return shows.sort((a, b) => (isAfter(a.datetime > b.datetime) ? 1 : isBefore(a.datetime, b.datetime) ? -1 : 0));
};

/**
 * Splits the roster into active and inactive collections.
 *
 * @param {Array} roster A collection of CompanyMembers.
 * @return {Object} The active and inactive collections.
 */
// export const useActiveInactiveRoster = (roster) => {
// 	let splitRoster = {
// 		active: [],
// 		inactive: [],
// 	};

// 	roster.forEach((item) => {
// 		const status = item.active ? 'active' : 'inactive';
// 		splitRoster[status].push(item);
// 	});

// 	return splitRoster;
// };
