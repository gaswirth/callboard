import React, { useContext } from 'react';
import { Box } from '@mui/system';

import { attendanceStatus } from 'lib/globals';
import StatusSelect from './StatusSelect';

import { AuthContext } from 'context/AuthContext';

export default function StatusIcon({ status, companyMemberId, showId, buttonDisabled }) {
	const { user } = useContext(AuthContext);
	const Icon = attendanceStatus[status]?.icon;

	return buttonDisabled || !user?.isAdmin ? (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<Icon color={attendanceStatus[status]?.color} />
		</Box>
	) : (
		<StatusSelect companyMemberId={companyMemberId} showId={showId} status={status}>
			<Icon color={attendanceStatus[status]?.color} />
		</StatusSelect>
	);
}
