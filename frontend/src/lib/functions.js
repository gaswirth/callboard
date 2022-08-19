/**
 * Common functions.
 */
import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { CompanyMember } from './classes';

/**
 * Generate a show's date and time labels.
 *
 * @param {Date|String} datetime Theshow's date and time string, or a Date object.
 * @return {Object} The formatted date and time strings.
 */
export function showLabel(datetime) {
	const date = datetime instanceof Date ? datetime : new Date(datetime);
	return {
		date: format(date, 'iii M/d'),
		time: format(date, 'h:mm a'),
	};
}

/**
 * Creates a collection of CompanyMember objects out of
 *
 * @param {Array} rosterData A collection of `company_member` data.
 * @returns {Array} An array of CompanyMembers.
 */
export function prepareRoster(rosterData) {
	return rosterData.map(
		(item) => new CompanyMember(item.id, item.firstName, item.lastName, item.email, item.role, item.active)
	);
}

/**
 * Prepares a show's attendance data for use by the app.
 *
 * @param {Array} attendance A collection of company members.
 * @returns {Object} The prepared collection of company member attendance data keyed by `id`.
 */
export function prepareShowAttendance(attendance) {
	const attendanceObj = JSON.parse(attendance);

	var formattedAttendance = {};
	if (!isEmpty(attendanceObj)) {
		Object.keys(attendanceObj).forEach((companyMemberId) => {
			formattedAttendance[companyMemberId] = attendanceObj[companyMemberId];
		});
	}

	return formattedAttendance;
}
