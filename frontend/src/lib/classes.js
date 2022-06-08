/**
 * Classes.
 */

export const Show = class {
	id = '';
	datetime = new Date();
	attendance = {};
	notes = '';

	constructor(id = 0, datetime = new Date(), attendance = {}, notes = '') {
		this.id = id;
		this.datetime = datetime;

		// TODO validate attendance format: { [userId]: <status> }
		this.attendance = attendance;

		this.notes = notes;
	}
};

export const Performer = class {
	id = '';
	name = '';
	role = '';
	outs = [];

	constructor(id, name, role, outs) {
		this.id = id;
		this.name = name;
		this.role = role;
		this.outs = outs;
	}
};
