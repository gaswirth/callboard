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

	// Check current user attendance
	useEffect(() => {
		if (!signUsersIn || !show) return;

		if (!show.attendance[companyMemberId]) {
			updateAttendanceMutation({ showId: show.id, companyMemberId, status: 'in' });
		}
	}, [show, companyMemberId, signUsersIn, updateAttendanceMutation]);

	return (
		<Container maxWidth="xl">
			{signUsersIn ? signInAlert(userStatus) : null}

			{/* MAYBE hide table if signed in but not on the roster? */}
			{loading ? 'Loading...' : <ShowTable show={show} allowStatusChanges={false} />}
		</Container>
	);
}
