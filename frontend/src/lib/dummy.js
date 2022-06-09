/**
 * Dummy data, you dummy.
 */
import { Show } from './classes';
import { Performer } from './classes';

export const data = {
	name: 'Sweet Potato: The Musical',
	currentShow: 6,
	shows: {
		1: new Show(
			1,
			new Date(2022, 1, 1, 20),
			{
				1: 'in',
				2: 'out',
				3: 'vac',
				4: 'out',
				5: 'in',
				6: 'in',
			},
			'Bob on for Jimmifred'
		),
		2: new Show(
			2,
			new Date(2022, 1, 2, 14),
			{
				1: 'in',
				2: 'in',
				3: 'in',
				4: 'in',
				5: 'pd',
				6: 'in',
			},
			'Full company'
		),
		3: new Show(3, new Date(2022, 1, 2, 20), {
			1: 'in',
			2: 'in',
			3: 'in',
			4: 'out',
			5: 'pd',
			6: 'in',
		}),
		4: new Show(4, new Date(2022, 1, 3, 20), {
			1: 'out',
			2: 'in',
			3: 'out',
			4: 'in',
			5: 'vac',
			6: 'in',
		}),
		5: new Show(5, new Date(2022, 1, 4, 20), {
			1: 'in',
			2: 'in',
			3: 'in',
			4: 'in',
			5: 'vac',
			6: 'in',
		}),
		6: new Show(
			6,
			new Date(2022, 1, 5, 14),
			{
				1: 'in',
				3: 'in',
				4: 'in',
				6: 'in',
			},
			'Wilhelm split track: Sally/Ribbonslaps'
		),
		7: new Show(7, new Date(2022, 1, 5, 20), {}),
		8: new Show(8, new Date(2022, 1, 6, 13), {}, 'Last show of the weeeeeeek'),
	},
	roster: {
		1: new Performer(1, 'F***ing Bob', 'Master Peeler', []),
		2: new Performer(2, 'Good Sally', 'Chef Marguerite', []),
		3: new Performer(3, 'Old Jimmifred', 'Doorman', []),
		4: new Performer(4, 'Robertina Berrypants', 'Swing', []),
		5: new Performer(5, 'Wilhelm of the Forest', 'A Tree; u/s Peeler', []),
		6: new Performer(6, 'Rachel Ribbonslaps', 'Herself', []),
	},
};
