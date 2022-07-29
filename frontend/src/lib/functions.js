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

/**
 * Takes a collection of Shows and prepares each one for use by the app.
 *
 * @param {Array} showNodes A collection of nodes representing individual Shows.
 * @returns The prepared collection of Shows.
 */
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

/**
 * Prepares a show's attendance data for use by the app.
 *
 * @param {Array} attendance A collection of company members.
 * @returns {Object} The prepared collection of company member attendance data keyed by `id`.
 */
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

/**
 * Prepares a date for the "range" GraphQL query.
 *
 * @param {Date} date The date to format.
 * @returns {String} The YYYY-MM-DD formatted date string.
 */
export function prepareDateForRangeQuery(date) {
	return format(date, 'yyyy-LL-dd');
}
