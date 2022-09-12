import React, { useContext, useEffect } from 'react';
import { Alert, Container } from '@mui/material';

import ShowTable from 'components/common/ShowTable';
import ViewHeading from 'components/common/ViewHeading';
import ShowNotes from 'components/common/ShowNotes';

import { AuthContext } from 'context/AuthContext';
import { useCompanyName } from 'hooks/queries/use-company-name';
import { useCurrentShowId } from 'hooks/queries/use-current-show-id';
import { useUpdateShowAttendance } from 'hooks/mutations/use-update-show-attendance';

export default function Now({ show }) {
	const { id: showId, attendance } = show;
	const currentShowId = useCurrentShowId();
	const { data: companyData } = useCompanyName();
	const {
		user: { id: userId },
	} = useContext(AuthContext);
	const companyMemberId = userId.toString();
	const userStatus = attendance[companyMemberId];

	const { updateAttendanceMutation } = useUpdateShowAttendance();

	const companyName = companyData?.callboardOptionsSettings.callboardCompanyName;

	// Check current user attendance
	useEffect(() => {
		if (!showId) return;
		console.log(currentShowId);

		if (!attendance[companyMemberId] && showId === currentShowId) {
			updateAttendanceMutation({ showId, companyMemberId, status: 'in' });
		}
	}, [showId, attendance, currentShowId, companyMemberId, updateAttendanceMutation]);

	const signInAlert = () => {
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
					message: 'You have been marked "out." Please see stage management.',
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

	return (
		<Container>
			<ViewHeading>{companyName}</ViewHeading>
			{signInAlert()}
			<ShowTable shows={[show]} iconButtonsDisabled={true} popoverDisabled={true} />
			<ShowNotes show={show} />
		</Container>
	);
}
