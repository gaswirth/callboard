/**
 * Global variables and constants.
 */

import { BeachAccess, Close, Check, Flight, HorizontalRule } from '@mui/icons-material';

export const attendanceStatus = {
	in: {
		text: 'In',
		color: 'success',
		icon: Check,
	},
	out: {
		text: 'Out',
		color: 'error',
		icon: Close,
	},
	pd: {
		text: 'PD',
		color: 'info',
		icon: BeachAccess,
	},
	vac: {
		text: 'Vac',
		color: 'info',
		icon: Flight,
	},
	'': {
		text: '',
		color: 'text.light',
		icon: HorizontalRule,
	},
};
