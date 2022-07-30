/**
 * Classes.
 */

import { showLabel } from './functions';

/**
 * @module Show
 *
 * @param {String} id Unique.
 * @param {String} datetime Performance date and time.
 * @param {Object} attendance A collection of status strings, keyed by companyMemberId.
 * @param {String} notes Show notes to display.
 */
export const Show = class {
	constructor(id = '', datetime = '', attendance = {}, notes = '') {
		this.id = id;
		this.datetime = datetime;
		this.attendance = attendance;
		this.notes = notes;
		this.label = showLabel(datetime);
	}
};

/**
 * @module CompanyMember
 *
 * @param {String} id Unique.
 * @param {String} name CompanyMember's name.
 * @param {String} role CompanyMember's role.
 */
export const CompanyMember = class {
	constructor(companyMemberId = '', name = '', callboardRole = '') {
		this.companyMemberId = companyMemberId;
		this.name = name;
		this.callboardRole = callboardRole;
	}
};
