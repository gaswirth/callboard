/**
 * useDeleteShow hook. GraphQL mutation to delete a Show.
 */

import { gql, useMutation } from '@apollo/client';

export const MUTATE_DELETE_SHOW = gql`
	mutation deleteShow($input: DeleteShowInput = { id: "", forceDelete: false }) {
		deleteShow(input: $input) {
			clientMutationId
			deletedId
		}
	}
`;

export const useDeleteShow = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_DELETE_SHOW);

	const deleteShowMutation = (id) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'deleteShowMutation',
					id,
				},
			},
		});
	};

	return { deleteShowMutation, results: mutationResults };
};
