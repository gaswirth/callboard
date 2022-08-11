import { gql, useMutation } from '@apollo/client';
import { formatISO } from 'date-fns';

export const MUTATE_NEW_SHOW = gql`
	mutation newShow($input: NewShowInput!) {
		newShow(input: $input) {
			clientMutationId
			newShowId
		}
	}
`;

export const useNewShow = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_NEW_SHOW);

	// TODO make sure datetime is unique?
	const newShowMutation = (datetime) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'newShowMutation',
					datetime: formatISO(datetime),
				},
			},
		});
	};

	return { newShowMutation, results: mutationResults };
};
