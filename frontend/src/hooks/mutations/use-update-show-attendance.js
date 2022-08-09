import { gql, useMutation } from '@apollo/client';
import { QUERY_RECENT_SHOWS } from 'hooks/queries/use-recent-shows';

export const MUTATE_UPDATE_SHOW_ATTENDANCE = gql`
	mutation UpdateShowAttendance($input: UpdateShowAttendanceInput!) {
		updateShowAttendance(input: $input) {
			clientMutationId
			newStatus
		}
	}
`;

export const useUpdateAttendance = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_UPDATE_SHOW_ATTENDANCE);

	// TODO make sure date time is unique?
	const updateAttendanceMutation = ({ showId, companyMemberId, status }) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'updateShowAttendanceMutation',
					showId,
					companyMemberId,
					status: status,
				},
			},
			refetchQueries: [{ query: QUERY_RECENT_SHOWS }],
		});
	};

	return { updateAttendanceMutation, results: mutationResults };
};
