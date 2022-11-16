/**
 * useUpdateShowNotes hook. GraphQL mutation to update Show Notes.
 */
import { gql, useMutation } from '@apollo/client';

export const MUTATE_UPDATE_SHOW_NOTES = gql`
	mutation UpdateShowNotes($input: UpdateShowNotesInput!) {
		updateShowNotes(input: $input) {
			clientMutationId
			updatedShowNotes
		}
	}
`;

export const useUpdateShowNotes = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_UPDATE_SHOW_NOTES);

	const updateShowNotesMutation = (id, notes) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'updateShowNotesMutation',
					id,
					notes,
				},
			},
		});
	};

	return { updateShowNotesMutation, results: mutationResults };
};
