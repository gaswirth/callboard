import React, { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import { attendanceStatus } from '@lib/globals';
import StatusSelect from './StatusSelect';

import { AuthContext } from '@context/AuthContext';

export default function StatusIcon({ status, companyMemberId, showId, allowChange }) {
	const { user } = useContext(AuthContext);
	const Icon = attendanceStatus[status]?.icon;

	return allowChange && user?.isAdmin ? (
		<StatusSelect companyMemberId={companyMemberId} showId={showId} status={status}>
			<Icon color={attendanceStatus[status]?.color} />
		</StatusSelect>
	) : (
		<Flex alignItems="center" justifyContent="center">
			<Icon color={attendanceStatus[status]?.color} />
		</Flex>
	);
}
