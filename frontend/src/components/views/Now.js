import React, { useContext, useEffect } from 'react';
import { Alert, Container } from '@mui/material';

import ShowTable from 'components/ShowTable';

import { AuthContext } from 'context/AuthContext';
import { useLatestShow } from 'hooks/queries/use-latest-show';
import { useUpdateShowAttendance } from 'hooks/mutations/use-update-show-attendance';

/**
 * Print an alert on signin.
 *
 * @returns {string} The alert to print.
 */
const signInAlert = (userStatus) => {
	let alert;

	switch (userStatus) {
		case 'in':
			alert = {
				severity: 'success',
				message: 'You are signed in.',
			};
			break;

		case 'out':
			alert = {
				severity: 'warning',
				message: 'You have already been marked "out." Please see stage management.',
			};
			break;

		case 'pd':
		case 'vac':
			alert = {
				severity: 'warning',
				message: 'You are noted as having a personal or vacation day. Please see stage management.',
			};
			break;

		case 'na':
			alert = {
				severity: 'warning',
				message: 'You are not on the roster for this show. Please see stage management.',
			};
			break;

		default:
			alert = null;
	}

	return alert ? (
		<Alert severity={alert.severity} sx={{ mb: 2 }}>
			{alert.message}
		</Alert>
	) : null;
};

export default function Now({ signUsersIn }) {
	const [{ loading }, show] = useLatestShow();
	const {
		user: { id: userId },
	} = useContext(AuthContext);
	const companyMemberId = userId.toString();
	const userStatus = show?.attendance[companyMemberId];

	const { updateAttendanceMutation } = useUpdateShowAttendance();

	const companyMemberOnRoster = show && companyMemberId in show.attendance ? true : false;

	// Check current user attendance
	useEffect(() => {
		if (!signUsersIn || !show) return;

		if (companyMemberOnRoster && show.attendance[companyMemberId] === '') {
			updateAttendanceMutation({ showId: show.id, companyMemberId, status: 'in' });
		}
	}, [show, companyMemberId, signUsersIn, companyMemberOnRoster, updateAttendanceMutation]);

	return companyMemberOnRoster ? (
		<Container maxWidth="xl">
			{signUsersIn ? signInAlert(userStatus) : null}
			{loading ? 'Loading...' : <ShowTable show={show} allowStatusChanges={false} />}
		</Container>
	) : (
		signInAlert('na')
	);
}
