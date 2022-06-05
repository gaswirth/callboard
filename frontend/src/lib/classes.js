/**
 * Classes.
 */

export const Performer = class {
	id = '';
	name = '';
	outs = [];

	constructor(id, name, outs) {
		this.id = id;
		this.name = name;
		this.outs = outs;
	}
};

export const Show = class {
	id = '';
	datetime = new Date();
	attendance = {};

	constructor(id = 0, datetime = new Date(), attendance = {}) {
		this.id = id;
		this.datetime = datetime;

		// TODO validate attendance format: { [userId]: <status> }
		this.attendance = attendance;
	}
};
