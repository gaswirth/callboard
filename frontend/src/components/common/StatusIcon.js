import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FlightIcon from '@mui/icons-material/Flight';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

/**
 * Chooses the appropriate icon for attendance status.
 *
 * @param {bool|string} status
 * @returns {React.Component}
 */
const icon = (status) => {
	switch (status) {
		case true:
			return <CheckIcon color="success" />;

		case false:
			return <CloseIcon color="error" />;

		case 'pd':
			return <HorizontalRuleIcon color="info" />;

		case 'vac':
			return <FlightIcon color="info" />;

		case 'q':
			return <QuestionMarkIcon color="info" />;

		default:
			return;
	}
};

export default function StatusIcon({ status }) {
	return icon(status);
}
