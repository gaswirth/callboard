/**
 * Dummy data, you dummy.
 */
import { Show } from './classes';
import { subDays } from 'date-fns';
import { Performer } from './classes';

const today = new Date();

export const data = {
	name: 'Sweet Potato: The Musical',
	currentShow: 8,
	shows: {
		1: new Show(1, subDays(today, 7), {
			1: 'in',
			2: 'out',
			3: 'vac',
			4: 'out',
			5: 'in',
			6: 'in',
		}),
		2: new Show(2, subDays(today, 6), {
			1: 'in',
			2: 'in',
			3: 'in',
			4: 'in',
			5: 'pd',
			6: 'in',
		}),
		3: new Show(3, subDays(today, 5), {
			1: 'in',
			2: 'in',
			3: 'in',
			4: 'out',
			5: 'pd',
			6: 'in',
		}),
		4: new Show(4, subDays(today, 4), {
			1: 'out',
			2: 'in',
			3: 'out',
			4: 'in',
			5: 'vac',
			6: 'in',
		}),
		5: new Show(5, subDays(today, 3), {
			1: 'in',
			2: 'in',
			3: 'in',
			4: 'in',
			5: 'vac',
			6: 'in',
		}),
		6: new Show(6, subDays(today, 2), {
			1: 'in',
			2: 'in',
			3: 'in',
			4: 'in',
			5: 'vac',
			6: 'in',
		}),
		7: new Show(7, subDays(today, 1), {
			1: 'in',
			2: 'out',
			3: 'pd',
			4: 'in',
			5: 'vac',
			6: 'in',
		}),
		8: new Show(8, today, {
			1: 'in',
			3: 'pd',
			5: 'vac',
			6: 'in',
		}),
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
