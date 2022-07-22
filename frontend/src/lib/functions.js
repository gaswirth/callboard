/**
 * Common functions.
 */

import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { Performer, Show } from './classes';

/**
 * Generate a show's label from it's date and time.
 *
 * @param {Date|String} datetime Theshow's date and time string, or a Date object.
 * @return {String} The formatted date string.
 */
export function showLabel(datetime) {
	const date = datetime instanceof Date ? datetime : new Date(datetime);
	return format(date, 'M/d (ha)');
}

/**
 * Creates a collection of Performer objects out of
 *
 * @param Array rosterData A collection of `company_member` data.
 * @returns Array An array of Performers.
 */
export function prepareRoster(rosterData) {
	return rosterData.map((item) => new Performer(item.databaseId, item.title, item.companyMemberData.role));
}

export function prepareShows(showNodes) {
	var shows = {};

	showNodes.forEach((item) => {
		const {
			databaseId,
			showData: { datetime, attendance },
		} = item;

		shows[databaseId] = new Show(databaseId, new Date(datetime), prepareShowAttendance(attendance));
	});

	return shows;
}

export function prepareShowAttendance(attendance) {
	var formattedAttendance = {};

	if (!isEmpty(attendance)) {
		attendance.forEach((item) => {
			const {
				companyMember: { databaseId: id },
				status,
			} = item;

			formattedAttendance[id] = status;
		});
	}

	return formattedAttendance;
}
