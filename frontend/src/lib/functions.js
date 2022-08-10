/**
 * Common functions.
 */

import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { CompanyMember } from './classes';

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
 * Creates a collection of CompanyMember objects out of
 *
 * @param Array rosterData A collection of `company_member` data.
 * @returns Array An array of CompanyMembers.
 */
export function prepareRoster(rosterData) {
	return rosterData.map((item) => new CompanyMember(item.companyMemberId, item.name, item.role));
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
