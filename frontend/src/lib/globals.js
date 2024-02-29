/**
 * Global variables and constants.
 */

import { SlHeart, SlClose, SlCheck, SlPlane, SlQuestion } from 'react-icons/sl';

export const attendanceStatus = {
	in: {
		text: 'In',
		color: 'success',
		icon: SlCheck,
	},
	out: {
		text: 'Out',
		color: 'error',
		icon: SlClose,
	},
	pd: {
		text: 'PD',
		color: 'info',
		icon: SlHeart,
	},
	vac: {
		text: 'Vac',
		color: 'info',
		icon: SlPlane,
	},
	'': {
		text: '',
		color: 'text.light',
		icon: SlQuestion,
	},
};
