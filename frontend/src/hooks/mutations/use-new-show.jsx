/**
 * useNewShow hook. GraphQL mutation to create a new Show.
 */

import { gql, useMutation } from '@apollo/client';
import { formatISO } from 'date-fns';

export const MUTATE_NEW_SHOW = gql`
	mutation newShow($input: NewShowInput!) {
		newShow(input: $input) {
			clientMutationId
			showId
		}
	}
`;

export const useNewShow = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_NEW_SHOW);

	const newShowMutation = ({ datetime, title, notes }) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'newShowMutation',
					datetime: formatISO(datetime),
					title: title ? title : '',
					notes: notes ? notes : '',
				},
			},
		});
	};

	return { newShowMutation, results: mutationResults };
};
