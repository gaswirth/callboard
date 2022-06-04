/**
 * Dummy data, you dummy.
 */

import { Performer } from './classes';

export const data = {
	name: 'Sweet Potato: The Musical',
	shows: [1, 2, 3, 4, 5, 6, 7, 8],
	currentShow: {
		id: 7,
		datetime: new Date(),
		attendance: {
			1: [true, false, true, true, 'pd', true, false],
			2: [true, true, true, true, true, true, 'vac'],
			3: ['vac', 'vac', 'vac', true, true, true],
			4: [false, true, 'pd', true, true, true, true],
			5: [true, true, true, true, true, 'pd', false],
			6: [true, true, true, true, true, true],
		},
	},
	roster: {
		1: new Performer(1, 'F***ing Bob', []),
		2: new Performer(2, 'Good Sally', []),
		3: new Performer(3, 'Old Jimmifred', []),
		4: new Performer(4, 'Robertina Berrypants', []),
		5: new Performer(5, 'Wilhelm of the Forest', []),
		6: new Performer(6, 'Rachel Ribbonslaps', []),
	},
};
