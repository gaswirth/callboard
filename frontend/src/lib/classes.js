/**
 * Classes for standardized data types.
 */
import { adminRoles } from 'context/AuthContext';
import { prepareShowAttendance } from './functions';

/**
 * @module Show
 *
 * @param {String} id Unique.
 * @param {String} datetime Performance date and time.
 * @param {Object|String} attendance A collection of status strings, keyed by CompanyMember ID.
 * @param {String} notes Show notes to display.
 * @param {String} slug The show's slug (route).
 */
export const Show = class {
	constructor(id = '', datetime = '', attendance = {}, notes = '', slug = '') {
		const attendanceObject = typeof attendance === 'string' ? prepareShowAttendance(attendance) : attendance;

		this.id = id;
		this.datetime = datetime;
		this.attendance = attendanceObject;
		this.notes = notes;
		this.slug = slug;
	}
};

/**
 * @module CompanyMember
 *
 * @param {String} id Unique.
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} email
 * @param {String} role Public/visible role.
 * @param {Boolean} active (default: false) Whether or not the Company Member is on the active roster.
 */
export const CompanyMember = class {
	constructor(id = '', username = '', firstName = '', lastName = '', email = '', role = '', active = false) {
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.fullName = `${this.firstName} ${this.lastName}`;
		this.email = email;
		this.role = role;
		this.active = active;
	}
};

/**
 * @module User Represents the current logged-in user.
 *
 * @param {String} userId Unique.
 * @param {String} roles WP user roles.
 */
export const User = class {
	constructor(userId = '', roles = '') {
		this.id = userId;
		this.roles = roles.split('c');
		this.isAdmin = this.setIsAdmin();
	}

	setIsAdmin() {
		return this.roles.some((item) => adminRoles.indexOf(item) >= 0);
	}
};
