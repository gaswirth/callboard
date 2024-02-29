import { useContext, useEffect } from 'react';
import { Alert, CircularProgress, Box } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { useLatestShow } from '@hooks/queries/use-latest-show';
import { useUpdateShowAttendance } from '@hooks/mutations/use-update-show-attendance';
import ShowTable from '@components/ShowTable';

/**
 * Display an alert on signin.
 *
 * @returns {string} The alert to print.
 */
const signInAlert = (userStatus) => {
	let alert;

	switch (userStatus) {
		case 'in':
			alert = {
				status: 'success',
				message: 'You are signed in.',
			};
			break;

		case 'out':
			alert = {
				status: 'warning',
				message: 'You have already been marked "out." Please see stage management.',
			};
			break;

		case 'pd':
		case 'vac':
			alert = {
				status: 'warning',
				message: 'You are noted as having a personal or vacation day. Please see stage management.',
			};
			break;

		case 'na':
			alert = {
				status: 'warning',
				message: 'You are not on the roster for this performance. Please see stage management.',
			};
			break;

		default:
			alert = null;
	}

	return alert ? (
		<Alert status={alert.status} mb={2}>
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

	return (
		<Box maxWidth="xl" mt={4}>
			{signInAlert(userStatus)}

			{loading ? (
				<Box display="flex" justifyContent="center" alignItems="center" mx={4} height="200px">
					<CircularProgress isIndeterminate size="200px" />
				</Box>
			) : !companyMemberOnRoster ? (
				signInAlert('na')
			) : (
				<ShowTable show={show} allowStatusChanges={false} />
			)}
		</Box>
	);
}
