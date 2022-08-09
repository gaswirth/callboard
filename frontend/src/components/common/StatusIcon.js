import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FlightIcon from '@mui/icons-material/Flight';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import StatusSelect from './StatusSelect';
import { Box } from '@mui/system';

/**
 * Chooses the appropriate icon for attendance status.
 *
 * @param {bool|string} status
 * @returns {React.Component}
 */
const icon = (status) => {
	var icon;

	switch (status) {
		case 'in':
			icon = <CheckIcon color="success" />;
			break;

		case 'out':
			icon = <CloseIcon color="error" />;
			break;

		case 'pd':
			icon = <HorizontalRuleIcon color="info" />;
			break;

		case 'vac':
			icon = <FlightIcon color="info" />;
			break;

		case 'q':
			icon = <QuestionMarkIcon color="info" />;
			break;

		default:
			icon = null;
	}

	return icon;
};

export default function StatusIcon({ status, companyMemberId, showId, buttonEnabled }) {
	return buttonEnabled ? (
		<StatusSelect companyMemberId={companyMemberId} showId={showId} status={status}>
			{icon(status)}
		</StatusSelect>
	) : (
		<Box sx={{ minHeight: 30 }}>{icon(status)}</Box>
	);
}
