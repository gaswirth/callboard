/**
 * Common functions.
 */

import { format } from 'date-fns';

export function showLabel(datetime) {
	return format(datetime, 'M/d (ha)');
}
