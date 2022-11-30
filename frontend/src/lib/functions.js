/**
 * Common functions.
 */
import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { CompanyMember, Show } from './classes';

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
		(item) =>
			new CompanyMember(item.id, item.username, item.firstName, item.lastName, item.email, item.role, item.active)
	);
}

/**
 * Prepares a Show from a GraphQL response.
 *
 * @param {Object} showData A GraphQL node of the `show` type.
 * @returns {Show} The prepared Show.
 */
export function prepareShow(showData) {
	const { databaseId, datetime, attendance, notes, slug } = showData;

	return new Show(databaseId, datetime, attendance, notes, slug);
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

/**
 * Generates an abbreviated company name.
 *
 * @param {string} name
 * @returns The abbreviated company name.
 */
export function generateCompanyShortName(name) {
	const shortName = name
		.split(' ')
		.map((word) => word[0])
		.join('');

	return shortName;
}

/**
 * Count the number of words in a string.
 *
 * @param {String} str The string to process.
 * @returns {Number} The string's word count.
 */
export function getWordCount(str) {
	return str.split(' ').filter(function (n) {
		return n !== '';
	}).length;
}

/**
 * CompanyMember factory.
 *
 * @param {*} attributes The CompanyMember attributes.
 * @returns {CompanyMember}
 */
export function createCompanyMember(attributes = {}) {
	const { id, username, firstName, lastName, email, role, active } = attributes;
	return new CompanyMember(
		id ? id : null,
		username ? username : '',
		firstName ? firstName : '',
		lastName ? lastName : '',
		email ? email : '',
		role ? role : '',
		active ? active : null
	);
}
