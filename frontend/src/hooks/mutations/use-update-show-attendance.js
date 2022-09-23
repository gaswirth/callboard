/**
 * useUpdateShowAttendance hook. GraphQL mutation to update a the attendance status(es) of
 * a performance's Company Members.
 */
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

export const useUpdateShowAttendance = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_UPDATE_SHOW_ATTENDANCE);

	const updateAttendanceMutation = ({ showId, companyMemberId, status }) => {
		console.info(showId, companyMemberId, status);
		return mutation({
			variables: {
				input: {
					clientMutationId: 'updateShowAttendanceMutation',
					show_id: showId,
					companyMemberId,
					status: status,
				},
			},
			refetchQueries: [{ query: QUERY_RECENT_SHOWS }],
		});
	};

	return { updateAttendanceMutation, results: mutationResults };
};
